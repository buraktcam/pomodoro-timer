<template>
  <!-- Main Container with Ambient Background -->
  <div class="relative flex flex-col items-center justify-center min-h-[500px] p-8">
    <!-- Ambient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#f3f1f8] to-[#e8e4f3] dark:from-[#0B061F] dark:to-[#150D35] rounded-3xl overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-transparent to-purple-500/5 dark:to-purple-500/10"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_60%)]"></div>
    </div>

    <!-- Timer Container -->
    <div class="relative z-10 flex flex-col items-center">
      <!-- Timer Display -->
      <div 
        class="font-['DM_Mono'] text-[10rem] font-medium tracking-tight text-space-purple dark:text-white 
               text-shadow-glow transition-all duration-300 animate-number-slide select-none"
        :key="timerStore.formattedTimeLeft"
      >
        {{ timerStore.formattedTimeLeft }}
      </div>

      <!-- Controls -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          v-if="!timerStore.isRunning"
          @click="startTimer"
          class="group relative px-8 py-3 bg-space-purple/90 text-white rounded-2xl font-medium
                 hover:bg-space-purple focus:outline-none focus:ring-2 focus:ring-space-purple focus:ring-offset-2 
                 dark:focus:ring-space-purple-light dark:focus:ring-offset-[#0B061F]
                 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 bg-glass"
        >
          <span class="relative z-10">Start</span>
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        <button
          v-else
          @click="timerStore.pause"
          class="px-8 py-3 bg-purple-100/90 dark:bg-space-purple/20 text-space-purple dark:text-space-purple-light 
                 rounded-2xl font-medium hover:bg-purple-200/90 dark:hover:bg-space-purple/30 
                 focus:outline-none focus:ring-2 focus:ring-space-purple focus:ring-offset-2 
                 dark:focus:ring-space-purple-light dark:focus:ring-offset-[#0B061F]
                 transition-all duration-200 shadow-lg hover:shadow-xl bg-glass"
        >
          Pause
        </button>
        <button
          @click="timerStore.reset"
          class="px-8 py-3 bg-purple-100/90 dark:bg-space-purple/20 text-space-purple dark:text-space-purple-light 
                 rounded-2xl font-medium hover:bg-purple-200/90 dark:hover:bg-space-purple/30 
                 focus:outline-none focus:ring-2 focus:ring-space-purple focus:ring-offset-2 
                 dark:focus:ring-space-purple-light dark:focus:ring-offset-[#0B061F]
                 transition-all duration-200 shadow-lg hover:shadow-xl bg-glass"
        >
          Reset
        </button>
        <button
          @click="showSettings = true"
          class="px-8 py-3 bg-purple-100/90 dark:bg-space-purple/20 text-space-purple dark:text-space-purple-light 
                 rounded-2xl font-medium hover:bg-purple-200/90 dark:hover:bg-space-purple/30 
                 focus:outline-none focus:ring-2 focus:ring-space-purple focus:ring-offset-2 
                 dark:focus:ring-space-purple-light dark:focus:ring-offset-[#0B061F]
                 transition-all duration-200 shadow-lg hover:shadow-xl bg-glass"
        >
          Settings
        </button>
      </div>

      <!-- Goal Tracker -->
      <div class="mt-12 w-full max-w-sm">
        <GoalTracker />
      </div>
    </div>

    <!-- Settings Modal -->
    <Settings
      v-if="showSettings"
      @close="showSettings = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useTimerStore } from '../stores/timer'
import Settings from './Settings.vue'
import GoalTracker from './GoalTracker.vue'

const timerStore = useTimerStore()
const showSettings = ref(false)
let timerInterval = null

const startTimer = () => {
  timerStore.start()
  timerInterval = setInterval(() => {
    timerStore.tick()
  }, 1000)
}

onMounted(() => {
  // Clean up any existing interval
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

// Watch for pause state
watch(
  () => timerStore.isRunning,
  (isRunning) => {
    if (!isRunning && timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }
)
</script>

<style scoped>
.animate-ambient-glow {
  animation: ambient-glow 2s ease-in-out infinite;
}

@keyframes ambient-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.1),
                0 0 40px rgba(139, 92, 246, 0.05);
  }
  50% {
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.15),
                0 0 60px rgba(139, 92, 246, 0.1);
  }
}

.dark .animate-ambient-glow {
  animation: ambient-glow-dark 2s ease-in-out infinite;
}

@keyframes ambient-glow-dark {
  0%, 100% {
    box-shadow: 0 0 20px rgba(167, 139, 250, 0.1),
                0 0 40px rgba(167, 139, 250, 0.05);
  }
  50% {
    box-shadow: 0 0 30px rgba(167, 139, 250, 0.15),
                0 0 60px rgba(167, 139, 250, 0.1);
  }
}
</style> 