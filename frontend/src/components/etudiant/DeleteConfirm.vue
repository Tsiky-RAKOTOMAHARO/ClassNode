<script setup>
defineProps({
  itemIdentifier: {
    type: [String, Number],
    required: true
  }
})
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div class="delete-confirm">

    <div class="confirm-header">
      <span class="confirm-icon"></span>
      <h3 class="confirm-title">Confirmation de suppression</h3>
    </div>

    <div class="confirm-body">
      <p class="confirm-message">
        Êtes-vous sûr de vouloir supprimer l'étudiant numéro
        <span class="numero-badge">{{ itemIdentifier }}</span> ?
      </p>
      <p class="confirm-warning">Cette action est irréversible.</p>
    </div>

    <div class="confirm-actions">
      <button class="btn-secondary" @click="$emit('cancel')">Annuler</button>
      <button class="btn-danger" @click="$emit('confirm')">Confirmer la suppression</button>
    </div>

  </div>
</template>

<style scoped>
.delete-confirm {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.confirm-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-surface-border);
}

.confirm-icon {
  font-size: 24px;
}

.confirm-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.confirm-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.confirm-message {
  font-size: var(--text-md);
  color: var(--color-text-primary);
  margin: 0;
}

.numero-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--color-primary-50);
  color: var(--color-primary-800);
  border-radius: var(--radius-full);
  font-weight: 600;
  font-size: var(--text-sm);
}

.confirm-warning {
  font-size: var(--text-sm);
  color: #A32D2D;
  margin: 0;
  font-weight: 500;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-surface-border);
}

.btn-secondary {
  padding: var(--space-3) var(--space-5);
  background: transparent;
  color: var(--color-text-secondary);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-md);
  font-size: var(--text-md);
  font-family: var(--font-mono);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.btn-secondary:hover {
  background: var(--color-surface-subtle);
  color: var(--color-text-primary);
}

.btn-danger {
  padding: var(--space-3) var(--space-5);
  background: #DC2626;
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-md);
  font-family: var(--font-mono);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-danger:hover {
  background: #B91C1C;
}
</style>