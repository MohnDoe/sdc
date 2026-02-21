<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated']
})
import { CalendarDate, DateFormatter } from "@internationalized/date";

const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
})

const { data, error, status } = useFetch("/api/games/dailies");

</script>
<template>
  <div class="flex flex-col gap-4 justify-center items-center h-screen w-full">
    <span class="text-toned">{{ df.format(new Date()) }}</span>
    <UCalendar :monthControls="false" :yearControls="false" :weekStartsOn="1" :fixedWeeks="false" :numberOfMonths="1"
      :readonly="true" weekdayFormat="short" :disableDaysOutsideCurrentView="true">
      <template #heading>
        &nbsp;
      </template>
    </UCalendar>
    <UButton class="font-black text-xl" variant="elevated" color="primary" size="xl" :to="{ name: 'daily' }">
      Play daily
    </UButton>
  </div>
</template>
