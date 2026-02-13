<script setup lang="ts">
interface NoteItem {
  num: number;
  active: boolean;
  highlighted: boolean;
  row: number;
  col: number;
}

const {
  notes,
  highlight
} = defineProps<{
  notes: number[],
  highlight: number | null
}>()

const notesItems = computed<NoteItem[]>(() => {
  return Array.from({ length: 9 }, (_: any, i: number): NoteItem => {
    const num = i + 1;
    return {
      num,
      active: notes.includes(num),
      highlighted: notes.includes(num) && num == highlight,
      row: Math.floor(i / 3) + 1,
      col: (i % 3) + 1
    }
  }).filter((item) => item.active)
})

</script>
<template>
  <div class="grid grid-cols-3 grid-rows-3 w-full h-full">
    <span v-for="item in notesItems" :key="`note-${item.num}`" :style="{
      gridColumn: item.col, gridRow: item.row
    }" :class="[
      'flex items-center justify-center text-xs',
      { 'text-primary font-bold': item.highlighted }
    ]">
      {{ item.num }}
    </span>
  </div>
</template>
