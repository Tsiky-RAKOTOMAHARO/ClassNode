<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
defineEmits(['close'])
</script>

<template>
  <Transition name="modal">
    <div v-if="visible" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-card">
        <button class="modal-close" @click="$emit('close')">✕</button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 22, 40, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-card {
  position: relative;
  background: var(--color-surface-card);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(26, 22, 40, 0.2);
}

.modal-close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-subtle);
  border: none;
  border-radius: var(--radius-full);
  font-size: var(--text-md);
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.modal-close:hover {
  background: #FEF2F2;
  color: #DC2626;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-card {
  transform: translateY(-12px) scale(0.97);
}

.modal-leave-to .modal-card {
  transform: translateY(12px) scale(0.97);
}
</style>