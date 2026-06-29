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
        Êtes-vous sûr de vouloir supprimer l'étudiant avec le matricule
        <span class="matricule-badge">{{ itemIdentifier }}</span> ?
      </p>
      <p class="confirm-warning">Cette action est irréversible.</p>
    </div>

    <div class="confirm-actions">
      <button class="btn-secondary" @click="$emit('cancel')">Annuler</button>
      <button class="btn-danger" @click="$emit('confirm')">Confirmer la suppression</button>
    </div>

  </div>
</template>