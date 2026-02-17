import { type DiscordAPIToken, type DiscordAPIUser, exchangeCodeForToken, fetchDiscordUser } from "~~/server/services/auth/discord/discord.auth.service";
import { UserService } from "~~/server/services/user.service";

export default defineEventHandler({
  onRequest: [],
  onBeforeResponse: [],
  handler: async (event) => {
    try {
      const { code } = await readBody(event);

      console.log(code);

      if (!code) {
        setResponseStatus(event, 400);
        return { error: 'Authorization code required' };
      }

      let tokenData: DiscordAPIToken;
      let discordUser: DiscordAPIUser;

      if (process.env.NODE_ENV === 'development' && code === 'mock_code') {
        console.warn("[/api/auth/discord/token] Using Mock user !")
        discordUser = {
          avatar: null,
          discriminator: "0000",
          global_name: "Mock user",
          id: 'discord_mock_id',
          username: 'discord_mock_username',
        }
        tokenData = {
          access_token: 'discord_mock_access_token',
          expires_in: 100000000,
          refresh_token: 'discord_mock_refresh_token',
          scope: '',
          token_type: ''
        }
      } else {
        // Exchange code for token with Discord
        tokenData = await exchangeCodeForToken(code);
        // Fetch user info
        discordUser = await fetchDiscordUser(tokenData.access_token);
      }

      // Sync/create user in database
      const user = await UserService.syncUser({
        discordId: discordUser.id,
        avatar: discordUser.avatar
          ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
          : null,
        username: discordUser.username
      });



      await setUserSession(event, {
        user: {
          id: user.id,
          discordId: user.discordId
        },
        secure: {
          token: tokenData
        }
      })

      setResponseStatus(event, 200)

      // Return access token and user info
      const response = {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
        user,
      }
      return response;
    } catch (error) {
      console.error('Token endpoint error:', error);
      setResponseStatus(event, 500);
      return {
        error: 'Failed to exchange code for token',
        details: error instanceof Error ? error.message : 'Unknown error',
      }


    }
  }
})
