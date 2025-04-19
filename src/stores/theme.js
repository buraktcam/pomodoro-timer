import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark'
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.applyTheme()
    },

    initTheme() {
      // Check for saved theme or system preference
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      this.isDark = savedTheme ? savedTheme === 'dark' : prefersDark
      this.applyTheme()

      // Add transition styles after initial load to prevent flash
      setTimeout(() => {
        document.documentElement.classList.add('theme-transition')
      }, 100)
    },

    applyTheme() {
      document.documentElement.classList.toggle('dark', this.isDark)
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', this.isDark ? '#0B061F' : '#f4f4f5')
      }
    }
  }
}) 