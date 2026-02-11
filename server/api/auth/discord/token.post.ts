import { exchangeCodeForToken, fetchDiscordUser } from "~~/server/services/auth/discord/discord.auth.service";
import { UserService } from "~~/server/services/user.service";

export default defineEventHandler(async (event) => {
  try {
    const { code } = await readBody(event);

    if (!code) {
      setResponseStatus(event, 400);
      return { error: 'Authorization code required' };
    }

    // Exchange code for token with Discord
    const tokenData = await exchangeCodeForToken(code);

    // Fetch user info
    const discordUser = await fetchDiscordUser(tokenData.access_token);

    // Sync/create user in database
    const user = await UserService.syncUser({
      discordId: discordUser.id,
      avatar: discordUser.avatar
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
        : null,
      username: discordUser.username
    });

    // Return access token and user info
    //
    const response = {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
      user,
    }

    setResponseStatus(event, 200)

    return response;
  } catch (error) {
    console.error('Token endpoint error:', error);
    setResponseStatus(event, 500);
    return {
      error: 'Failed to exchange code for token',
      details: error instanceof Error ? error.message : 'Unknown error',
    }


  }
})
