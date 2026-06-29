<script setup>
import { ref, watch } from 'vue'
import { useEtudiantStore } from '@/store/etudiant'

const store = useEtudiantStore()
const visible = ref(false)
const message = ref('')
const type = ref('success')

let timer = null

watch(() => store.message, (nouveau) => {
  if (!nouveau) return

  message.value = nouveau
  type.value = nouveau.toLowerCase().includes('erreur') || 
                nouveau.toLowerCase().includes('impossible') ? 'error' : 'success'
  visible.value = true

  clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
    store.message = ''
  }, 3500)
})
</script>

<template>
  <Transition name="toast">
    <div v-if="visible" class="toast" :class="type">
      <span class="toast-icon">{{ type === 'success' ? '' : '' }}</span>
      <span class="toast-message">{{ message }}</span>
      <button class="toast-close" @click="visible = false">✕</button>
    </div>
  </Transition>
</template>