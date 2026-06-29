<script setup>
import { ref, watch } from 'vue'
import { useEtudiantStore } from '@/stores/etudiantStore'

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

<style scoped>
.toast {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: 200;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  min-width: 280px;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(26, 22, 40, 0.15);
}

.toast.success {
  background: #F0FDF4;
  border-color: #BBF7D0;
  color: #166534;
}

.toast.error {
  background: #FEF2F2;
  border-color: #FECACA;
  color: #DC2626;
}

.toast-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  font-size: var(--text-md);
  font-weight: 500;
}

.toast-close {
  background: transparent;
  border: none;
  font-size: var(--text-sm);
  cursor: pointer;
  opacity: 0.5;
  color: inherit;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.toast-close:hover {
  opacity: 1;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>