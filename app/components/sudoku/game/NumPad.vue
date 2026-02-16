<script setup lang="ts">

</script>
<template>
  <div className="grid gap-2 gap-y-3 grid-cols-3">
    <SudokuGameNumPadButton v-for="i in GRID_SIZE" :key="`numpad-button-${i}`" :num="i" />
  </div>
</template>
