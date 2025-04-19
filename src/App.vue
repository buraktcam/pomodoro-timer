<script setup>
import { ref } from 'vue'
import ThemeToggle from './components/ThemeToggle.vue'
import About from './components/About.vue'

const showAbout = ref(false)
</script>

<template>
  <div class="min-h-screen bg-light-bg dark:bg-space-dark transition-colors duration-300">
    <!-- Header Actions -->
    <nav class="fixed top-0 right-0 p-6 z-50">
      <div class="flex flex-row items-center justify-end gap-3">
        <!-- Info Button -->
        <button
          @click="showAbout = true"
          class="w-10 h-10 inline-flex items-center justify-center
                 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white
                 bg-white dark:bg-[#1A123F]
                 rounded-full hover:bg-gray-50 dark:hover:bg-space-card
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400
                 transition-all duration-200"
          title="About / How It Works"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <!-- Theme Toggle -->
        <ThemeToggle />
      </div>
    </nav>

    <!-- Main Content -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="!showAbout" class="min-h-screen">
        <router-view v-slot="{ Component }">
          <Transition
            enter-active-class="transition-opacity duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </Transition>

    <!-- About Modal -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <About v-if="showAbout" @close="showAbout = false" />
    </Transition>
  </div>
</template>

<style>
body {
  margin: 0;
  min-height: 100vh;
  overflow-y: auto;
}

#app {
  min-height: 100vh;
}

/* Prevent background scrolling when About is open */
body.modal-open {
  overflow: hidden;
}
</style> 