<script setup>
defineProps({
  etudiant: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['editer', 'supprimer'])
</script>

<template>
  <tr>
    <td>
      <span class="numero-badge">{{ etudiant.numEt }}</span>
    </td>
    <td class="text-primary">{{ etudiant.nom }}</td>
    <td class="text-secondary">{{ etudiant.prenom }}</td>
    <td class="text-secondary">{{ etudiant.note_math }}</td>
    <td class="text-secondary">{{ etudiant.note_phys }}</td>
    <td>
      <strong class="moyenne">{{ ((etudiant.note_math + etudiant.note_phys) / 2).toFixed(2) }}</strong>
    </td>
    <td>
      <div class="action-group">
        <button class="btn-edit" @click="emit('editer', etudiant)">Modifier</button>
        <button class="btn-delete" @click="emit('supprimer', etudiant)">Supprimer</button>
      </div>
    </td>
  </tr>
</template>

<style scoped>

td {
  padding: 16px 28px;
  color: var(--color-text-primary);
}

.numero-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background: var(--color-primary-50);
  color: var(--color-primary-800);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
}

.text-primary {
  color: var(--color-text-primary);
  font-weight: 500;
}

.text-secondary {
  color: var(--color-text-secondary);
}

.moyenne {
  color: var(--color-primary-600);
  font-weight: 700;
}

.action-group {
  display: flex;
  gap: var(--space-2);
}

.btn-edit,
.btn-delete {
  padding: var(--space-1) var(--space-3);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.btn-edit {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.btn-edit:hover {
  background: var(--color-primary-400);
  color: var(--color-text-inverse);
}

.btn-delete {
  background: #FEF2F2;
  color: #DC2626;
}

.btn-delete:hover {
  background: #DC2626;
  color: #FFFFFF;
}
</style>