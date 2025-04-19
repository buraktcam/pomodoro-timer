<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="mb-8">
      <div class="flex items-center space-x-2">
        <svg class="w-8 h-8 text-space-purple" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
        <h1 class="text-2xl font-semibold text-light-text dark:text-white">Pomodoro Timer</h1>
      </div>
    </header>

    <div class="max-w-4xl mx-auto space-y-8">
      <Timer />
      <Notes />
    </div>
  </div>
</template>

<script setup>
import Timer from '../components/Timer.vue'
import Notes from '../components/Notes.vue'
</script> 