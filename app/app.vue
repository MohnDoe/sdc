<script setup lang="ts">
const discord = useDiscordSDK();
const store = discord.store;
const handleAuth = async () => {
  console.log("handleAuth");
  try {
    await discord.authenticate();
  } catch (error) {
    console.error(error);
  }
}
</script>
<template>
  <div id="app">
    <div v-if="store.loading">
      <p>Loading Discord SDK...</p>
    </div>


    <div v-else-if="store.error">
      <p>Error: {{ store.error }}</p>
    </div>

    <div v-else-if="!store.isAuthenticated">
      <button @click="handleAuth">Authorize with Discord</button>
    </div>

    <div v-else>
      <h1>{{ JSON.stringify(store.user) }}</h1>
    </div>
  </div>
</template>
