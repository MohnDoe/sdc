export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      discordClientId: process.env.NUXT_PUBLIC_DISCORD_CLIENT_ID
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: process.env.NODE_ENV === 'development' && !process.env.DISCORD_ACTIVITY,
    timeline: {
      enabled: true
    }
  },
  css: ['~/assets/css/main.css', '~/assets/css/elevated.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    // '@nuxthub/core',
    '@nuxt/ui',
    '@nuxt/fonts',
    'nuxt-auth-utils'
  ],
  typescript: {
    typeCheck: true,
  },
  vite: {
    server: {
      allowedHosts: ["nonillusional-unfederative-lonna.ngrok-free.dev"]
    }
  },
  ui: {
    colorMode: false,
  },
  fonts: {
    families: [
      {
        name: "Switzer", provider: 'local',
      },
      {
        name: "Alpino", provider: 'local'
      }
    ]
  }
})
