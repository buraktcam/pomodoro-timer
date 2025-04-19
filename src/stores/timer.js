import { defineStore } from 'pinia';

export const useTimerStore = defineStore('timer', {
  state: () => {
    // Load saved state from localStorage
    const savedState = localStorage.getItem('timerState');
    const defaultState = {
      isRunning: false,
      timeLeft: 25 * 60,
      currentMode: 'focus',
      focusCount: 0,
      completedToday: 0,
      lastCompletedDate: null,
      settings: {
        focusDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        enableGoalTracker: false,
        dailyGoal: 4,
      }
    };

    const state = savedState ? { ...defaultState, ...JSON.parse(savedState) } : defaultState;
    
    // Reset completed count if it's a new day
    const today = new Date().toLocaleDateString();
    if (state.lastCompletedDate !== today) {
      state.completedToday = 0;
      state.lastCompletedDate = today;
    }

    return state;
  },
  
  getters: {
    formattedTimeLeft: (state) => {
      const minutes = Math.floor(state.timeLeft / 60);
      const seconds = state.timeLeft % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    
    progress: (state) => {
      const totalTime = state.currentMode === 'focus' 
        ? state.settings.focusDuration * 60
        : state.currentMode === 'break' 
          ? state.settings.breakDuration * 60
          : state.settings.longBreakDuration * 60;
      
      return (totalTime - state.timeLeft) / totalTime;
    },

    isGoalComplete: (state) => {
      return state.settings.enableGoalTracker && state.completedToday >= state.settings.dailyGoal;
    },

    showGoalTracker: (state) => {
      return state.settings.enableGoalTracker;
    }
  },
  
  actions: {
    saveState() {
      const stateToSave = {
        isRunning: this.isRunning,
        timeLeft: this.timeLeft,
        currentMode: this.currentMode,
        focusCount: this.focusCount,
        completedToday: this.completedToday,
        lastCompletedDate: this.lastCompletedDate,
        settings: this.settings
      };
      localStorage.setItem('timerState', JSON.stringify(stateToSave));
    },

    start() {
      this.isRunning = true;
      this.saveState();
    },
    
    pause() {
      this.isRunning = false;
      this.saveState();
    },
    
    reset() {
      this.isRunning = false;
      this.timeLeft = this.settings.focusDuration * 60;
      this.currentMode = 'focus';
      this.saveState();
    },
    
    tick() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.saveState();
      } else {
        this.handleSessionComplete();
      }
    },
    
    handleSessionComplete() {
      if (this.currentMode === 'focus') {
        this.focusCount++;
        if (this.settings.enableGoalTracker) {
          this.completedToday++;
        }
        
        if (this.focusCount % 4 === 0) {
          this.currentMode = 'longBreak';
          this.timeLeft = this.settings.longBreakDuration * 60;
        } else {
          this.currentMode = 'break';
          this.timeLeft = this.settings.breakDuration * 60;
        }
      } else {
        this.currentMode = 'focus';
        this.timeLeft = this.settings.focusDuration * 60;
      }
      
      this.playNotification();
      
      if (this.settings.autoStartBreaks && this.currentMode !== 'focus') {
        this.start();
      } else if (this.settings.autoStartPomodoros && this.currentMode === 'focus') {
        this.start();
      } else {
        this.pause();
      }
      
      this.saveState();
    },
    
    updateSettings(newSettings) {
      this.settings = { ...this.settings, ...newSettings };
      this.reset();
      this.saveState();
    },
    
    playNotification() {
      const audio = new Audio('/notification.mp3');
      audio.play().catch(error => console.log('Error playing notification:', error));
    },

    resetDailyProgress() {
      this.completedToday = 0;
      this.lastCompletedDate = new Date().toLocaleDateString();
      this.saveState();
    }
  }
});