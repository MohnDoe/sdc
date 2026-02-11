export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      discordClientId: process.env.NUXT_PUBLIC_DISCORD_CLIENT_ID
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxthub/core'],
  typescript: {
    typeCheck: true,
  },
  vite: {
    server: {
      allowedHosts: ["nonillusional-unfederative-lonna.ngrok-free.dev"]
    }
  },
  hub: {
    db: {
      dialect: "postgresql",
      driver: "neon-http"
    }
  }
})
