<script setup lang="ts">
import { DateFormatter } from '@internationalized/date';
const gameStore = useGameStore();

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

</script>
<template>
  <div class="flex flex-row w-full gap-4 items-center py-1 border-b-2 border-b-primary">
    <div class="flex flex-row grow justify-between">
      <div class="flex flex-col font-outfit justify-start">
        <div class="inline-flex flew-row items-center gap-2">
          <span class="font-bold text-xl">Daily</span>
          <UBadge class="elevated elevated--xs px-1.5 py-0.5 font-extrabold text-sm leading-none">#001</UBadge>
        </div>
        <div class="flex flex-row items-center gap-1.5">
          <div class="inline-flex gap-0.5">
            <div class="h-2.5 w-5 rounded-sm bg-primary"></div>
            <div class="h-2.5 w-2.5 rounded-sm bg-secondary"></div>
          </div>
          <span class="font-bold text-sm">{{ df.format(new Date(gameStore.puzzleDate!)) }}</span>
        </div>
      </div>
      <div class="flex flex-col">
        <span>Time</span>
        <span class="text-xs">{{ gameStore.formattedTimeSpent }}</span>
      </div>
      <div class="flex flex-col">
        <span>Mistakes</span>
        <span>{{ gameStore.mistakes }}</span>
      </div>
      <div class="flex flex-col">
        <span>Difficulty</span>
        <span>{{ gameStore.difficulty }}</span>
      </div>
    </div>
    <UButton size="lg" @click="gameStore.isPaused ? gameStore.unpauseGame() : gameStore.pauseGame()"
      :disabled="gameStore.isCompleted">
      <UIcon :name="gameStore.isPaused ? 'i-lucide-play' : 'i-lucide-pause'" />
    </UButton>
  </div>
</template>
