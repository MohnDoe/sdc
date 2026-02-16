<template>
  <div class="flex flex-col justify-between p-1 h-full">
    <div class="flex flex-col gap-4">
      <SudokuGameInfos />
      <SudokuBoard />
    </div>
    <div className="p-2">
      <SudokuGameButtons />
    </div>
  </div>
</template>
