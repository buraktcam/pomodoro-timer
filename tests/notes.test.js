import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotesStore } from '../src/stores/notes.js'

describe('notes store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('addNote adds a note', async () => {
    const store = useNotesStore()
    await store.addNote({ content: 'test note', timestamp: Date.now() })

    expect(store.notes.length).toBe(1)
    expect(store.notes[0].content).toBe('test note')
  })

  it('deleteNote removes a note', async () => {
    const store = useNotesStore()
    await store.addNote({ content: 'delete me', timestamp: Date.now() })
    const id = store.notes[0].id

    await store.deleteNote(id)

    expect(store.notes.length).toBe(0)
  })
})
