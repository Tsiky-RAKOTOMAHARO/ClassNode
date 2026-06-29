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