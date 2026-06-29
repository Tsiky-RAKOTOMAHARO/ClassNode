<script setup>
import { onMounted } from 'vue'
import { useEtudiantStore } from '../stores/etudiantStore'
import EtudiantTable from '@/components/etudiant/EtudiantTable.vue'

const store = useEtudiantStore()

onMounted(async () => {
  await store.getAllEtudiants()
})
</script>

<template>
  <div class="list-content">

    <div class="list-header">
      <h1 class="list-title">Liste des Etudiants</h1>
    </div>

    <EtudiantTable />

  </div>
</template>

<style scoped>
.list-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.list-title {
  font-size: var(--text-display);
  font-weight: 700;
  color: var(--color-text-primary);
}

.store-message {
  font-size: var(--text-md);
  color: var(--color-primary-600);
  background: var(--color-primary-50);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}
</style>