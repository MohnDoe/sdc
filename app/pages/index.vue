<script setup lang="ts">
const discord = useDiscordSDK();
const store = discord.store;
const handleAuth = async () => {
  try {
    await discord.authenticate();
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div v-if="store.loading">
    <p>Loading Discord SDK...</p>
  </div>


  <div v-else-if="store.error">
    <p>Error: {{ store.error }}</p>
  </div>

  <div v-else-if="!store.isAuthenticated">
    <UButton @click="handleAuth">Authorize with Discord</UButton>
  </div>

  <div v-else>
    <h1>{{ JSON.stringify(store.user) }}</h1>
  </div>
</template>
