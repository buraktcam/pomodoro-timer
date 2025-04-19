<script setup>
import { useTimerStore } from '../stores/timer';
import { computed } from 'vue';

const timerStore = useTimerStore();

const boxes = computed(() => {
  return Array.from({ length: timerStore.settings.dailyGoal }, (_, index) => ({
    isCompleted: index < timerStore.completedToday
  }));
});

const goalMessage = computed(() => {
  if (timerStore.isGoalComplete) {
    return 'Daily Goal Complete';
  }
  return `${timerStore.completedToday}/${timerStore.settings.dailyGoal} Sessions`;
});
</script>

<template>
  <div v-if="timerStore.showGoalTracker" class="flex flex-col items-center space-y-4">
    <!-- Goal Progress Message -->
    <div 
      class="text-sm font-medium tracking-wide transition-all duration-300"
      :class="{
        'text-green-600 dark:text-green-400': timerStore.isGoalComplete,
        'text-gray-600 dark:text-gray-400': !timerStore.isGoalComplete
      }"
    >
      {{ goalMessage }}
    </div>

    <!-- Progress Circles -->
    <div class="flex flex-wrap justify-center gap-3">
      <div
        v-for="(box, index) in boxes"
        :key="index"
        class="w-3 h-3 rounded-full transition-all duration-300 transform"
        :class="{
          'bg-space-purple dark:bg-space-purple-light shadow-lg shadow-purple-500/20 scale-110': box.isCompleted,
          'border-2 border-gray-300 dark:border-gray-600': !box.isCompleted
        }"
      >
        <div
          v-if="box.isCompleted"
          class="w-full h-full rounded-full animate-scale-in"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scale-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
</style> 