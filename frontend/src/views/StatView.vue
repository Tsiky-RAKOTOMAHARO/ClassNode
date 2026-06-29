<script setup>
import { onMounted } from 'vue'
import { useEtudiantStore } from '../stores/etudiantStore'
import BilanMetrics from '../components/bilan/BilanMetrics.vue'
import BilanPie from '../components/bilan/BilanPie.vue'

const store = useEtudiantStore()

onMounted(async () => {
  await store.chargerEnseignants()
})
</script>

<template>
  <div class="stat-content">

    <div class="stat-header">
      <h1 class="stat-title">Bilan Général</h1>
    </div>

    <BilanMetrics />

    <div class="charts-grid">
      <BilanPie />
    </div>

  </div>
</template>

<style scoped>
.stat-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-title {
  font-size: var(--text-display);
  font-weight: 700;
  color: var(--color-text-primary);
}

.charts-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr; */
  /* gap: var(--space-4); */
}
</style>