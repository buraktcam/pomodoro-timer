<template>
  <div class="w-full max-w-4xl mx-auto p-6">
    <!-- Export Button -->
    <div class="flex justify-end mb-4">
      <button
        @click="exportNotes"
        class="p-2 rounded-lg bg-light-surface dark:bg-space-dark text-space-purple hover:bg-light-bg dark:hover:bg-space-card transition-colors duration-300 flex items-center space-x-2 border border-gray-200 dark:border-gray-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Export Notes</span>
      </button>
    </div>

    <!-- Notes Toggle Button -->
    <button
      @click="isNotesVisible = !isNotesVisible"
      class="w-full flex items-center justify-between p-4 bg-light-surface dark:bg-space-dark rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-light-bg dark:hover:bg-space-card transition-colors duration-300"
    >
      <div class="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-space-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <span class="text-xl font-semibold text-light-text dark:text-white">Notes</span>
      </div>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 text-light-text-secondary dark:text-gray-400 transform transition-transform duration-300"
        :class="{ 'rotate-180': isNotesVisible }"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Notes Panel -->
    <div
      v-show="isNotesVisible"
      class="mt-4 space-y-4 transform transition-all duration-300"
      :class="{ 'opacity-0 scale-95': !isNotesVisible, 'opacity-100 scale-100': isNotesVisible }"
    >
      <div class="bg-white dark:bg-space-dark rounded-2xl p-6 shadow-lg space-y-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
          {{ editingNote ? 'Edit Note' : 'New Note' }}
        </h2>
        
        <!-- Note Input Section -->
        <div class="space-y-4">
          <!-- Title Input -->
          <input
            v-model="noteTitle"
            type="text"
            placeholder="Note title (optional)"
            class="w-full px-4 py-2 bg-gray-50 dark:bg-[#0B061F] border border-gray-200 dark:border-none
                   rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600
                   focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                   transition-all duration-200"
          >
          
          <!-- Note Content -->
          <textarea
            v-model="noteContent"
            placeholder="Take notes for your current task..."
            rows="4"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-[#0B061F] border border-gray-200 dark:border-none
                   rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600
                   focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                   transition-all duration-200 resize-none"
          ></textarea>
          
          <!-- Error Message -->
          <p v-if="notesStore.error" class="text-red-500 text-sm">{{ notesStore.error }}</p>
          
          <!-- Action Buttons -->
          <div class="flex gap-4">
            <button
              v-if="editingNote"
              @click="cancelEdit"
              class="flex-1 px-4 py-2 bg-gray-100 dark:bg-space-purple/20 text-gray-700 dark:text-space-purple-light 
                     rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-space-purple/30 
                     focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                     transition-all duration-200"
            >
              Cancel
            </button>
            <button
              @click="saveNote"
              :disabled="!noteContent.trim() || notesStore.loading"
              class="flex-1 px-4 py-2 bg-space-purple text-white rounded-xl font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed
                     hover:bg-space-purple-light focus:outline-none focus:ring-2 
                     focus:ring-space-purple dark:focus:ring-purple-500
                     transition-all duration-200"
            >
              {{ notesStore.loading ? 'Saving...' : (editingNote ? 'Update Note' : 'Save Note') }}
            </button>
          </div>
        </div>
        
        <!-- Notes List -->
        <div v-if="notesStore.sortedNotes.length > 0" class="space-y-4">
          <div v-for="note in notesStore.sortedNotes" :key="note.id"
               class="bg-gray-50 dark:bg-[#0B061F] rounded-xl p-4 space-y-2">
            <!-- Note Header -->
            <div class="flex items-center justify-between">
              <h3 class="font-medium text-gray-900 dark:text-white">
                {{ note.title || 'Untitled Note' }}
              </h3>
              <div class="flex items-center space-x-2">
                <!-- Edit Button -->
                <button
                  @click="startEdit(note)"
                  :disabled="editingNote"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:text-space-purple dark:hover:text-purple-500
                         focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                         rounded-lg transition-colors disabled:opacity-50"
                  title="Edit note"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <!-- Download Button -->
                <button
                  @click="downloadNote(note)"
                  :disabled="editingNote"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:text-space-purple dark:hover:text-purple-500
                         focus:outline-none focus:ring-2 focus:ring-space-purple dark:focus:ring-purple-500
                         rounded-lg transition-colors disabled:opacity-50"
                  title="Download note"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <!-- Delete Button Group -->
                <div class="relative flex items-center">
                  <!-- Delete Button -->
                  <button
                    @click="showDeleteConfirm(note.id)"
                    class="p-2 text-gray-600 dark:text-gray-400 hover:text-red-500
                           focus:outline-none focus:ring-2 focus:ring-red-500
                           rounded-lg transition-colors"
                    :class="{ 'opacity-50': deleteConfirmMap[note.id] }"
                    title="Delete note"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>

                  <!-- Delete Confirmation -->
                  <div
                    v-if="deleteConfirmMap[note.id]"
                    class="flex items-center space-x-1 ml-1 animate-fade-in-right"
                  >
                    <button
                      @click="deleteNote(note.id)"
                      class="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10
                             rounded transition-colors"
                      title="Confirm delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      @click="hideDeleteConfirm(note.id)"
                      class="p-1.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800
                             rounded transition-colors"
                      title="Cancel delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Note Content -->
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ note.content }}</p>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ new Date(note.timestamp).toLocaleString() }}
            </span>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No notes yet. Start by adding one above!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNotesStore } from '../stores/notes'
import { useThemeStore } from '../stores/theme'

const notesStore = useNotesStore()
const themeStore = useThemeStore()
const noteTitle = ref('')
const noteContent = ref('')
const isNotesVisible = ref(false)
const deleteConfirmMap = ref({})
const editingNote = ref(null)

// Clear delete confirmations when clicking outside
const handleClickOutside = (event) => {
  const confirmations = document.querySelectorAll('.delete-confirmation')
  if (!confirmations.length) return
  
  const isClickInside = Array.from(confirmations).some(el => el.contains(event.target))
  if (!isClickInside) {
    deleteConfirmMap.value = {}
  }
}

onMounted(() => {
  themeStore.initTheme()
  notesStore.loadFromLocalStorage()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const saveNote = () => {
  if (!noteContent.value.trim()) return
  
  const noteData = {
    title: noteTitle.value.trim(),
    content: noteContent.value.trim(),
    timestamp: Date.now()
  }
  
  if (editingNote.value) {
    noteData.id = editingNote.value.id
    notesStore.updateNote(noteData)
  } else {
    notesStore.addNote(noteData)
  }
  
  resetForm()
}

const startEdit = (note) => {
  editingNote.value = note
  noteTitle.value = note.title
  noteContent.value = note.content
  // Scroll to the input area
  document.querySelector('textarea').scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  editingNote.value = null
  noteTitle.value = ''
  noteContent.value = ''
}

const showDeleteConfirm = (noteId) => {
  // Simply set the confirmation state for this note
  deleteConfirmMap.value[noteId] = true
}

const hideDeleteConfirm = (noteId) => {
  deleteConfirmMap.value[noteId] = false
}

const deleteNote = async (noteId) => {
  await notesStore.deleteNote(noteId)
  hideDeleteConfirm(noteId)
}

const downloadNote = (note) => {
  // Create the note content with title and timestamp
  const content = `${note.title || 'Untitled Note'}\n${new Date(note.timestamp).toLocaleString()}\n\n${note.content}`
  
  // Create blob and download link
  const blob = new Blob([content], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  
  // Generate filename
  const filename = note.title
    ? `${note.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`
    : `note-${new Date(note.timestamp).toISOString().split('.')[0].replace(/[^0-9]+/g, '-')}.txt`
  
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  
  // Cleanup
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

const exportNotes = () => {
  if (!notesStore.hasNotes) return

  const content = notesStore.sortedNotes
    .map(note => `[${new Date(note.timestamp).toLocaleString()}]\n${note.content}\n\n`)
    .join('---\n\n')

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const date = new Date().toISOString().split('T')[0]
  
  const a = document.createElement('a')
  a.href = url
  a.download = `pomodoro-notes-${date}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Add to your global styles */
.theme-transition {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* Prevent transition flash on page load */
.theme-transition * {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-right {
  animation: fadeInRight 0.2s ease-out forwards;
}
</style> 