<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})

const { initDaily, isLoading } = useGameStore();

// Load game on mount
onMounted(async () => {
  await initDaily()
})

</script>
<template>
  <SudokuGame v-if="isLoading" />
  <p v-else>Ça arrive mdr</p>
</template>
