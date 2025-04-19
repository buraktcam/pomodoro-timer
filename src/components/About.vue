<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

defineEmits(['close'])

onMounted(() => {
  document.body.classList.add('modal-open')
})

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
})
</script>

<template>
  <div class="fixed inset-0 isolate z-[100] bg-[#f4f4f5] dark:bg-space-dark overflow-auto">
    <!-- Header -->
    <div class="sticky top-0 z-10 bg-[#f4f4f5] dark:bg-space-dark border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">About / How It Works</h1>
        <button
          @click="$emit('close')"
          class="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-3xl mx-auto px-4 py-8">
      <div class="space-y-8 animate-fade-in">
        <!-- App Overview -->
        <section class="bg-white dark:bg-[#1A123F] rounded-2xl p-6 shadow-sm">
          <div class="flex items-start space-x-4">
            <div class="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <span class="text-2xl" role="img" aria-label="timer">⏰</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">What is this app?</h2>
              <p class="text-gray-600 dark:text-gray-300">
                A modern, minimal Pomodoro Timer with note-taking and goal tracking to help you focus.
                Built with a clean interface and powerful features to boost your productivity.
              </p>
            </div>
          </div>
        </section>

        <!-- Timer Section -->
        <section class="bg-white dark:bg-[#1A123F] rounded-2xl p-6 shadow-sm">
          <div class="flex items-start space-x-4">
            <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <span class="text-2xl" role="img" aria-label="timer">⏱️</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">How the Timer Works</h2>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Default focus sessions are 25 minutes</li>
                <li>• Short breaks (5 min) after each focus session</li>
                <li>• Long breaks (15 min) after 4 focus sessions</li>
                <li>• All durations can be customized in settings</li>
                <li>• Optional auto-start for breaks and sessions</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Notes Section -->
        <section class="bg-white dark:bg-[#1A123F] rounded-2xl p-6 shadow-sm">
          <div class="flex items-start space-x-4">
            <div class="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <span class="text-2xl" role="img" aria-label="notes">📝</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Taking Notes</h2>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Write and organize notes during your sessions</li>
                <li>• Notes are automatically saved locally</li>
                <li>• Access your notes anytime</li>
                <li>• Export functionality for backup</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Goal Tracker Section -->
        <section class="bg-white dark:bg-[#1A123F] rounded-2xl p-6 shadow-sm">
          <div class="flex items-start space-x-4">
            <div class="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <span class="text-2xl" role="img" aria-label="goal">🎯</span>
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Goal Tracking</h2>
              <ul class="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Set daily Pomodoro goals in settings</li>
                <li>• Visual progress tracking with completion boxes</li>
                <li>• Optional feature - enable/disable as needed</li>
                <li>• Manual reset available for shared devices</li>
                <li>• Automatic reset at midnight</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Back Button -->
        <div class="flex justify-center pt-4">
          <button
            @click="$emit('close')"
            class="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                   rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700
                   focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500
                   transition-all duration-200"
          >
            Back to Timer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style> 