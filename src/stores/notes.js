import { defineStore } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    error: null,
    loading: false
  }),

  getters: {
    hasNotes: (state) => state.notes.length > 0,
    sortedNotes: (state) => [...state.notes].sort((a, b) => b.timestamp - a.timestamp)
  },

  actions: {
    async addNote(note) {
      try {
        this.loading = true
        this.error = null
        
        const newNote = {
          id: Date.now().toString(),
          title: note.title || '',
          content: note.content,
          timestamp: note.timestamp
        }
        
        this.notes.unshift(newNote)
        this.saveToLocalStorage()
        return true
      } catch (error) {
        this.error = 'Failed to save note'
        console.error('Error saving note:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    async updateNote(note) {
      try {
        this.loading = true
        this.error = null
        
        const index = this.notes.findIndex(n => n.id === note.id)
        if (index === -1) {
          throw new Error('Note not found')
        }
        
        this.notes[index] = {
          ...this.notes[index],
          title: note.title,
          content: note.content,
          timestamp: note.timestamp
        }
        
        this.saveToLocalStorage()
        return true
      } catch (error) {
        this.error = 'Failed to update note'
        console.error('Error updating note:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    async deleteNote(noteId) {
      try {
        this.error = null
        this.notes = this.notes.filter(note => note.id !== noteId)
        this.saveToLocalStorage()
        return true
      } catch (error) {
        this.error = 'Failed to delete note'
        console.error('Error deleting note:', error)
        return false
      }
    },

    deleteAllNotes() {
      try {
        this.notes = []
        this.saveToLocalStorage()
        return true
      } catch (error) {
        this.error = 'Failed to delete all notes'
        return false
      }
    },

    loadFromLocalStorage() {
      try {
        const savedNotes = localStorage.getItem('notes')
        if (savedNotes) {
          this.notes = JSON.parse(savedNotes)
          // Migrate old notes to new format if needed
          this.notes = this.notes.map(note => {
            if (typeof note === 'string' || !note.title) {
              return {
                id: Date.now().toString(),
                title: '',
                content: typeof note === 'string' ? note : note.content,
                timestamp: note.timestamp || Date.now()
              }
            }
            return note
          })
          this.saveToLocalStorage() // Save migrated notes
        }
      } catch (error) {
        console.error('Error loading notes:', error)
        this.error = 'Failed to load notes'
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem('notes', JSON.stringify(this.notes))
      } catch (error) {
        console.error('Error saving notes to localStorage:', error)
        this.error = 'Failed to save notes to storage'
      }
    }
  }
}) 