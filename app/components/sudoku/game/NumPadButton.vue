<script setup lang="ts">
const { num } = defineProps<{
  num: number;
}>();

const { insertNumber } = useGameStore();
const { remainingCount } = storeToRefs(useGameStore());

const done = computed(() => remainingCount.value(num) <= 0);
</script>

<template>
  <UButton class="relative flex flex-col cursor-pointer bg-white items-center  elevated--xs" variant="elevated"
    :disabled="done" color="neutral" size="xs" @click="done ? null : insertNumber(num)">
    <div class="h-10 flex items-center">
      <UIcon v-if="done" name="i-lucide-check" class="size-5" />
      <span v-if="!done" class="text-2xl font-outfit">{{ num }}</span>
    </div>
    <div v-if="!done" class="
      absolute
      left-1 top-1
      grid grid-cols-3 grid-rows-3 gap-0.5 flex-wrap">
      <div v-for="i in remainingCount(num)" class="h-1.5 w-1.5 bg-secondary rounded"
        :key="`remaining-indicator-${num - 1}-${i}`" />
    </div>
  </UButton>
</template>
