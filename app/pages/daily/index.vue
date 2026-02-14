<script setup lang="ts">
import { getSudoku } from "sudoku-gen"
definePageMeta({
  middleware: ['authenticated']
})

const { loadGame: load } = useGameStore();

// Load game on mount
onMounted(async () => {
  console.log('watchEffect')
  const dailySudoku = getSudoku('easy')
  load(dailySudoku)

})

</script>
<template>
  <div>
    <SudokuGame />
  </div>
</template>
