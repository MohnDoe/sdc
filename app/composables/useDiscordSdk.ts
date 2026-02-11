
import { DiscordSDKMock, type Types } from "@discord/embedded-app-sdk";

export const useDiscordSDK = () => {
  useNuxtApp();
  const discordStore = useDiscordStore();
  const config = useRuntimeConfig();

  const authenticate = async () => {
    console.debug("Initializing auth.");
    if (!discordStore.sdk) {
      discordStore.setError("Discord SDK not initialized");
      return;
    }
    try {
      discordStore.setLoading(true);
      // Authorize with Discord Client
      const { code } = await discordStore.sdk.commands.authorize({
        client_id: config.public.discordClientId,
        response_type: 'code',
        state: '',
        prompt: 'none',
        // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
        scope: [
          // Activities will launch through app commands and interactions of user-installable apps.
          // https://discord.com/developers/docs/tutorials/developing-a-user-installable-app#configuring-default-install-settings-adding-default-install-settings
          'applications.commands',

          // "applications.builds.upload",
          // "applications.builds.read",
          // "applications.store.update",
          // "applications.entitlements",
          // "bot",
          'identify',
          // "connections",
          // "email",
          // "gdm.join",
          'guilds',
          // "guilds.join",
          'guilds.members.read',
          // "messages.read",
          // "relationships.read",
          'rpc.activities.write',
          // "rpc.notifications.read",
          // 'rpc.voice.write',
          // 'rpc.voice.read',
          // "webhook.incoming",
          // discordSdk.guildId == null ? 'dm_channels.read' : null, // This scope requires approval from Discord.
        ].filter((scope) => scope != null) as Types.OAuthScopes[],
      });

      if (discordStore.sdk instanceof DiscordSDKMock) {
        console.log("Using mock auth")
        const mockData: DiscordAuth = {
          user: {
            avatar: null,
            discordId: 'mock_discord_id',
            userId: 'mock_user_id',
            username: 'mock_username'
          },
          access_token: 'mock_access_token',
          expires_in: 10000000,
          refresh_token: 'mock_refresh_token'
        }

        discordStore.setAuth(mockData);

        // await discordSdk.commands.authenticate({
        //   access_token: 'mock_access_token'
        // })
      } else {
        const { data: tokenData, error } = await useFetch<DiscordTokenResponse>('/api/auth/discord/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
          }),
        });
        if (!error) {
          console.error(`Error fetching token`, error)
          throw new Error(error || 'Failed to exchange code for token');
        }
        discordStore.setAuth(tokenData.value as DiscordAuth);

        // Authenticate with Discord SDK
        await discordStore.sdk.commands.authenticate({
          access_token: tokenData.value!.access_token,
        });
      }


    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      discordStore.setError(message);
      console.error('Discord SDK initialization failed PROUT:', message, err);
    } finally {
      discordStore.setLoading(false);
    }
  }


  return {
    authenticate,
    store: discordStore
  }
}
