import type { DiscordSDK, DiscordSDKMock } from "@discord/embedded-app-sdk";

interface DiscordState {
  sdk: DiscordSDK | DiscordSDKMock | null;
  auth: DiscordAuth | null;
  loading: boolean;
  error: string | null;
}

export const useDiscordStore = defineStore('discordStore', {
  state: (): DiscordState => {
    return {
      sdk: null,
      auth: null,
      loading: false,
      error: null
    }
  },
  getters: {
    user: (state): DiscordAuth['user'] | null => state.auth?.user || null,
    isAuthenticated: (state): boolean => !!state.auth?.user
  },
  actions: {
    setSdk(sdk: DiscordSDK | DiscordSDKMock) {
      this.sdk = sdk;
    },
    setError(error: string) {
      this.error = error;
    },
    setAuth(auth: DiscordAuth) {
      this.auth = auth;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    }
  },
})
