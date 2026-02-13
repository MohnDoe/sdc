<script setup lang="ts">
import "~/assets/css/sudoku.css";

const { toggleNotesMode, selectCell, unselectCell, insertNumber, clearCell } = useGameStore();
const { selectedIndex, grid } = storeToRefs(useGameStore())

const relativeMove = (arrow: string) => {
  if (selectedIndex.value == null) return;
  const row = Math.floor(selectedIndex.value / 9);
  const col = selectedIndex.value % 9;

  let newRow = row;
  let newCol = col;

  switch (arrow) {
    case "ArrowUp":
      newRow = (row + 9 - 1) % 9;
      break;
    case "ArrowDown":
      newRow = (row + 1) % 9;
      break;
    case "ArrowLeft":
      newCol = (col + 9 - 1) % 9;
      break;
    case "ArrowRight":
      newCol = (col + 1) % 9;
      break;
  }

  selectCell(newRow * 9 + newCol);
}

const onKeyDown = (e: KeyboardEvent) => {
  console.log(`Key pressed on ${selectedIndex} : ${e.key}`)

  if (e.key === 'e') {
    toggleNotesMode();
    return;
  }

  if (selectedIndex.value == null) return;

  if (e.key === 'Escape') {
    unselectCell();
    return;
  }

  if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
    e.preventDefault();
    relativeMove(e.key);
    return;
  }

  if (/[1-9]/.test(e.key)) {
    const num = parseInt(e.key);
    insertNumber(num);
    return;
  }

  if (e.key === "Basckpace" || e.key === "Delete") {
    clearCell(selectedIndex.value)
  }

}

</script>
<template>
  <div className="sudoku-board w-full p-1">
    <div className="
        sudoku-grid
        w-full aspect-square
        grid grid-cols-9 grid-rows-9
        gap-0
        " tabIndex="0" @keydown.prevent="onKeyDown">
      <SudokuCell v-for="(cell, index) in grid" :index="index" :cell="cell" :key="index" @click="selectCell(index)" />
    </div>
  </div>
</template>

<style scoped>
.sudoku-grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  width: 100%;
  aspect-ratio: 1 / 1;
  border-collapse: collapse;
  border: var(--region-border-thickness) solid var(--region-border-color);
}
</style>
