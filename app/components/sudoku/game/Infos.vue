<script setup lang="ts">
const gameStore = useGameStore();
const infos = computed(() => ([
  {
    value: gameStore.formattedTimeSpent,
  },
  {
    title: "mistakes",
    value: gameStore.mistakes,
  },
  {
    value: gameStore.difficulty
  }
]))
</script>
<template>
  <div class="flex flex-row md:gap-4 justify-between md:bg-accented md:p-4 md:pb-5 rounded md:rounded-lg ">
    <UBadge v-for="info in infos" class="font-bold elevated elevated--xs bg-elevated text-sm capitalize">
      {{ info.value }} {{ info.title }}
    </UBadge>
  </div>
</template>
