<script setup>
import { useRouter } from 'vue-router'
import { useEtudiantStore } from '@/stores/etudiantStore'
import EtudiantForm from '../components/etudiant/EtudiantForm.vue'

const store = useEtudiantStore()
const router = useRouter()

async function gererAjout(nouvelEtudiant) {
  try {
    await store.createEtudiant(nouvelEtudiant)
    router.push('/list')
  } catch (error) {
    console.error('Erreur lors de la création:', error)
  }
}

function allerALaListe() {
  router.push('/list')
}
</script>

<template>
  <div class="create-content">

    <div class="create-header">
      <h1 class="create-title">Ajouter un Étudiant</h1>
    </div>

    <div class="create-body">
      <EtudiantForm
        :isEdit="false"
        @sauvegarder="gererAjout"
        @annuler="allerALaListe"
      />
    </div>

  </div>
</template>

<style scoped>
.create-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.create-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.create-title {
  font-size: var(--text-display);
  font-weight: 700;
  color: var(--color-text-primary);
}

.create-body {
  width: 100%;
  /* max-width: 720px; */
}
</style>