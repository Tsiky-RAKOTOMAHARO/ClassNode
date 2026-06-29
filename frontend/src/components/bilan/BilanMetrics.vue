<script setup>
import { computed } from 'vue'
import { useEtudiantStore } from '@/stores/etudiantStore'

const store = useEtudiantStore()

const totalEtudiants = computed(() => store.etudiants.length)

const moyenneGenerale = computed(() => {
  if (store.etudiants.length === 0) return '-'
  const total = store.etudiants.reduce((sum, e) => sum + (e.note_math + e.note_phys) / 2, 0)
  return (total / store.etudiants.length).toFixed(2)
})

const moyenneMath = computed(() => {
  if (store.etudiants.length === 0) return '-'
  const total = store.etudiants.reduce((sum, e) => sum + (Number(e.note_math) || 0), 0)
  return (total / store.etudiants.length).toFixed(2)
})

const moyennePhys = computed(() => {
  if (store.etudiants.length === 0) return '-'
  const total = store.etudiants.reduce((sum, e) => sum + (Number(e.note_phys) || 0), 0)
  return (total / store.etudiants.length).toFixed(2)
})

const meilleureNote = computed(() => {
  if (store.etudiants.length === 0) return '-'
  const notes = store.etudiants.flatMap(e => [Number(e.note_math) || 0, Number(e.note_phys) || 0])
  return Math.max(...notes).toFixed(2)
})
</script>

<template>
  <div class="metrics-grid">

    <div class="metric-card">
      <span class="metric-icon"></span>
      <div class="metric-body">
        <p class="metric-label">Total Étudiants</p>
        <p class="metric-value" style="color: var(--color-primary-400);">{{ totalEtudiants }}</p>
      </div>
    </div>

    <div class="metric-card">
      <span class="metric-icon"></span>
      <div class="metric-body">
        <p class="metric-label">Moyenne Générale</p>
        <p class="metric-value" style="color: #059669;">{{ moyenneGenerale }}</p>
      </div>
    </div>

    <div class="metric-card">
      <span class="metric-icon"></span>
      <div class="metric-body">
        <p class="metric-label">Moyenne Mathématiques</p>
        <p class="metric-value" style="color: #7c3aed;">{{ moyenneMath }}</p>
      </div>
    </div>

    <div class="metric-card">
      <span class="metric-icon"></span>
      <div class="metric-body">
        <p class="metric-label">Moyenne Physique</p>
        <p class="metric-value" style="color: #2563eb;">{{ moyennePhys }}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.metric-card {
  background: var(--color-surface-card);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  transition: box-shadow 0.15s;
}

.metric-card:hover {
  box-shadow: 0 4px 20px rgba(83, 74, 183, 0.08);
}

.metric-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.metric-label {
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-value {
  font-size: var(--text-display);
  font-weight: 700;
  color: var(--color-primary-600);
}
</style>