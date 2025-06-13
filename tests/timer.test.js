import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTimerStore } from '../src/stores/timer.js'

describe('timer store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('reset sets defaults', () => {
    const store = useTimerStore()

    store.timeLeft = 10
    store.isRunning = true
    store.currentMode = 'break'

    store.reset()

    expect(store.isRunning).toBe(false)
    expect(store.timeLeft).toBe(store.settings.focusDuration * 60)
    expect(store.currentMode).toBe('focus')
  })
})
