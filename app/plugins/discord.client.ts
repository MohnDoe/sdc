import { DiscordSDK, DiscordSDKMock, patchUrlMappings } from "@discord/embedded-app-sdk";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const discordStore = useDiscordStore();

  let discordSdk: DiscordSDK | DiscordSDKMock;

  const queryParams = new URLSearchParams(window.location.search);
  const isEmbedded = queryParams.get('frame_id') != null;

  if (isEmbedded) {
    discordSdk = new DiscordSDK(config.public.discordClientId, {
      disableConsoleLogOverride: false
    });
  } else {
    // Development/testing mode - use mock SDK
    discordSdk = new DiscordSDKMock(config.public.discordClientId, null, null, null);
    console.log("Using mock SDK")
    // patchUrlMappings([{ prefix: '/api', target: 'localhost:3001' }]);
  }

  await discordSdk.ready();

  discordStore.setSdk(discordSdk);

  return {
    provide: {
      discordSdk,
    },
  };
});
