import type { DiscordAPIToken } from "~~/server/services/auth/discord/discord.auth.service";

declare module '#auth-utils' {
  interface User {
    id: string;
    discordId: string;
  }

  interface UserSession {
    user: User
  }

  interface SecureSessionData {
    token: DiscordAPIToken
  }
}

export { }
