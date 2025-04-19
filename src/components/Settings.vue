<template>
  <Teleport to="body">
    <!-- Global Modal Container -->
    <div class="fixed inset-0 isolate z-[9999]">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/40 backdrop-blur-sm"
        @click="$emit('close')"
      ></div>
      
      <!-- Modal Positioning Container -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <!-- Modal Content -->
        <div 
          class="w-[400px] max-h-[80vh] overflow-y-auto bg-[#f4f4f5] dark:bg-[#1A123F] 
                 rounded-2xl shadow-xl relative scrollbar-thin scrollbar-track-transparent 
                 scrollbar-thumb-gray-400/20 hover:scrollbar-thumb-gray-400/30 dark:scrollbar-thumb-gray-600/20 
                 dark:hover:scrollbar-thumb-gray-600/30"
        >
          <!-- Modal Inner Content -->
          <div class="px-5 py-5">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-5 leading-snug">Settings</h2>
            
            <div class="space-y-4">
              <!-- Focus Duration -->
              <div>
                <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1.5 leading-snug">Focus Duration (minutes)</label>
                <input
                  type="number"
                  v-model="settings.focusDuration"
                  class="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#0B061F] border border-gray-200 dark:border-none
                         rounded-xl text-gray-900 dark:text-white leading-snug
                         focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                         transition-all duration-200"
                  min="1"
                  max="60"
                >
              </div>
              
              <!-- Break Duration -->
              <div>
                <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1.5 leading-snug">Break Duration (minutes)</label>
                <input
                  type="number"
                  v-model="settings.breakDuration"
                  class="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#0B061F] border border-gray-200 dark:border-none
                         rounded-xl text-gray-900 dark:text-white leading-snug
                         focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                         transition-all duration-200"
                  min="1"
                  max="30"
                >
              </div>
              
              <!-- Long Break Duration -->
              <div>
                <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1.5 leading-snug">Long Break Duration (minutes)</label>
                <input
                  type="number"
                  v-model="settings.longBreakDuration"
                  class="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#0B061F] border border-gray-200 dark:border-none
                         rounded-xl text-gray-900 dark:text-white leading-snug
                         focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                         transition-all duration-200"
                  min="1"
                  max="45"
                >
              </div>
              
              <!-- Auto-start Options -->
              <div class="space-y-2.5">
                <label class="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    v-model="settings.autoStartBreaks"
                    class="w-4 h-4 rounded bg-white dark:bg-[#0B061F] border-gray-300 dark:border-purple-500 
                           text-space-purple dark:text-purple-500
                           focus:ring-space-purple dark:focus:ring-purple-500 focus:ring-offset-2
                           dark:focus:ring-offset-[#1A123F] transition-colors"
                  >
                  <span class="text-sm text-gray-700 dark:text-gray-300 leading-snug">Auto-start breaks</span>
                </label>
                
                <label class="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    v-model="settings.autoStartPomodoros"
                    class="w-4 h-4 rounded bg-white dark:bg-[#0B061F] border-gray-300 dark:border-purple-500 
                           text-space-purple dark:text-purple-500
                           focus:ring-space-purple dark:focus:ring-purple-500 focus:ring-offset-2
                           dark:focus:ring-offset-[#1A123F] transition-colors"
                  >
                  <span class="text-sm text-gray-700 dark:text-gray-300 leading-snug">Auto-start focus sessions</span>
                </label>

                <label class="flex items-start space-x-2.5">
                  <input
                    type="checkbox"
                    v-model="settings.enableGoalTracker"
                    class="w-4 h-4 mt-0.5 rounded bg-white dark:bg-[#0B061F] border-gray-300 dark:border-purple-500 
                           text-space-purple dark:text-purple-500
                           focus:ring-space-purple dark:focus:ring-purple-500 focus:ring-offset-2
                           dark:focus:ring-offset-[#1A123F] transition-colors"
                  >
                  <div>
                    <span class="text-sm text-gray-700 dark:text-gray-300 leading-snug">Enable Daily Pomodoro Goal Tracker</span>
                    <p v-if="settings.enableGoalTracker" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Track your daily focus progress visually
                    </p>
                  </div>
                </label>
              </div>

              <!-- Daily Pomodoro Goal (conditional) -->
              <div v-if="settings.enableGoalTracker">
                <label class="block text-sm text-gray-700 dark:text-gray-300 mb-1.5 leading-snug">Daily Pomodoro Goal</label>
                <input
                  type="number"
                  v-model="settings.dailyGoal"
                  class="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#0B061F] border border-gray-200 dark:border-none
                         rounded-xl text-gray-900 dark:text-white leading-snug
                         focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                         transition-all duration-200"
                  min="1"
                  max="16"
                >
                <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  Set how many focus sessions you aim to complete today
                </p>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="mt-5 flex flex-col gap-3">
              <!-- Reset Daily Progress -->
              <div v-if="settings.enableGoalTracker" class="space-y-2.5">
                <button
                  v-if="!showResetConfirm"
                  @click="showResetConfirm = true"
                  class="w-full px-3.5 py-2 text-sm bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 
                         rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-500/30 leading-snug
                         focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 
                         focus:ring-offset-2 focus:ring-offset-[#f4f4f5] dark:focus:ring-offset-[#1A123F]
                         transition-all duration-200"
                >
                  Reset Daily Progress
                </button>

                <!-- Reset Confirmation -->
                <div 
                  v-if="showResetConfirm"
                  class="bg-red-50 dark:bg-red-500/10 rounded-xl p-3.5 animate-scale-in"
                >
                  <p class="text-sm text-red-700 dark:text-red-300 mb-2.5 leading-snug">
                    Are you sure you want to reset your daily progress?
                  </p>
                  <div class="flex gap-2.5">
                    <button
                      @click="confirmReset"
                      class="flex-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg font-medium leading-snug
                             hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500
                             focus:ring-offset-2 focus:ring-offset-red-50 dark:focus:ring-offset-[#1A123F]
                             transition-all duration-200"
                    >
                      Confirm
                    </button>
                    <button
                      @click="showResetConfirm = false"
                      class="flex-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                             rounded-lg font-medium leading-snug hover:bg-gray-200 dark:hover:bg-gray-600
                             focus:outline-none focus:ring-2 focus:ring-gray-400
                             focus:ring-offset-2 focus:ring-offset-red-50 dark:focus:ring-offset-[#1A123F]
                             transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Main Actions -->
              <div class="flex justify-end gap-3">
                <button
                  @click="$emit('close')"
                  class="px-3.5 py-2 text-sm bg-gray-100 dark:bg-space-purple/20 text-gray-700 dark:text-space-purple-light 
                         rounded-xl font-medium leading-snug hover:bg-gray-200 dark:hover:bg-space-purple/30 
                         focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-space-purple-light 
                         focus:ring-offset-2 focus:ring-offset-[#f4f4f5] dark:focus:ring-offset-[#1A123F]
                         transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  @click="saveSettings"
                  class="px-3.5 py-2 text-sm bg-space-purple text-white rounded-xl font-medium leading-snug
                         hover:bg-space-purple-light focus:outline-none focus:ring-2 
                         focus:ring-space-purple dark:focus:ring-space-purple-light 
                         focus:ring-offset-2 focus:ring-offset-[#f4f4f5] dark:focus:ring-offset-[#1A123F]
                         transition-all duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useTimerStore } from '../stores/timer'

const timerStore = useTimerStore()
const emit = defineEmits(['close'])
const showResetConfirm = ref(false)

const settings = reactive({
  focusDuration: timerStore.settings.focusDuration,
  breakDuration: timerStore.settings.breakDuration,
  longBreakDuration: timerStore.settings.longBreakDuration,
  autoStartBreaks: timerStore.settings.autoStartBreaks,
  autoStartPomodoros: timerStore.settings.autoStartPomodoros,
  enableGoalTracker: timerStore.settings.enableGoalTracker,
  dailyGoal: timerStore.settings.dailyGoal,
})

const saveSettings = () => {
  timerStore.updateSettings(settings)
  emit('close')
}

const confirmReset = () => {
  timerStore.resetDailyProgress()
  showResetConfirm.value = false
  emit('close')
}
</script>

<style scoped>
.modal-portal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  z-index: 50;
}

.modal-portal > * {
  grid-area: 1 / 1;
}
</style> 