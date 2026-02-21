import 'dotenv/config';

import db from "#server/db";
import * as schema from "#server/db/schema";
import type { DiscordTypes } from '~~/shared/types/discord';

export class UserService {
  static async syncDiscordUser(user: DiscordAPIUser, guild: { id: string, member: DiscordTypes.GuildMember } | null): Promise<{ user: typeof schema.users.$inferSelect, guildMembership: typeof schema.userGuildMemberships.$inferSelect | null }> {
    const result = await db
      .insert(schema.users)
      .values({
        discordDiscriminator: user.discriminator,
        discordGlobalUsername: user.global_name,
        discordId: user.id,
        discordUsername: user.username,
      })
      .onConflictDoUpdate({
        target: [schema.users.discordId],
        set: {
          discordDiscriminator: user.discriminator,
          discordGlobalUsername: user.global_name,
          discordUsername: user.username,
        }
      })
      .returning()
    const resultUser = result[0]!;

    let guildMembership = null;

    if (guild) {
      const resultGuildMember = await db
        .insert(schema.userGuildMemberships)
        .values({
          guildId: guild.id,
          userId: resultUser.id,
          discordDiscriminator: guild.member.user.discriminator,
          discordId: resultUser.discordId,
          discordUsername: guild.member.user.username,
          discordGlobalUsername: guild.member.user.global_name
        })
        .onConflictDoUpdate({
          target: [schema.userGuildMemberships.userId, schema.userGuildMemberships.guildId],
          set: {
            discordDiscriminator: guild.member.user.discriminator,
            discordId: resultUser.discordId,
            discordUsername: guild.member.user.username,
            discordGlobalUsername: guild.member.user.global_name
          }
        })
        .returning();

      guildMembership = resultGuildMember[0]!
    }

    return { user: resultUser, guildMembership };
  }
}
