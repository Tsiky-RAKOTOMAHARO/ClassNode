<script setup>
import { ref } from 'vue'
import { useEtudiantStore } from '@/stores/etudiantStore'
import EtudiantRow from './EtudiantRow.vue'
import EtudiantForm from './EtudiantForm.vue'
import AppModal from '../common/AppModal.vue'
import DeleteConfirm from './DeleteConfirm.vue'

const store = useEtudiantStore()

const etudiantAModifier = ref(null)
const afficherModalSuppression = ref(false)
const etudiantASupprimer = ref(null)

function activerEdition(etudiant) {
  etudiantAModifier.value = { ...etudiant }
}

function annulerEdition() {
  etudiantAModifier.value = null
}

async function soumettreModification(donneesModifiees) {
  await store.updateEtudiant(donneesModifiees.numEt, donneesModifiees)
  etudiantAModifier.value = null
}

function ouvrirConfirmationSuppression(etudiant) {
  etudiantASupprimer.value = etudiant
  afficherModalSuppression.value = true
}

function fermerModalSuppression() {
  afficherModalSuppression.value = false
  etudiantASupprimer.value = null
}

async function validerSuppression() {
  if (etudiantASupprimer.value) {
    await store.deleteEtudiant(etudiantASupprimer.value.numEt)
    fermerModalSuppression()
  }
}
</script>

<template>
  <div class="table-wrapper">

    <div class="table-scroll">
      <table class="data-table">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Math</th>
            <th>Physique</th>
            <th>Moyenne</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <EtudiantRow
            v-for="item in store.etudiants"
            :key="item.numEt"
            :etudiant="item"
            @editer="activerEdition"
            @supprimer="ouvrirConfirmationSuppression"
          />
        </tbody>
      </table>
    </div>

    <div v-if="etudiantAModifier" class="form-overlay" @click.self="annulerEdition">
      <div class="form-modal">
        <EtudiantForm
          v-model="etudiantAModifier"
          :isEdit="true"
          @sauvegarder="soumettreModification"
          @annuler="annulerEdition"
        />
      </div>
    </div>

    <AppModal :visible="afficherModalSuppression" @close="fermerModalSuppression">
      <DeleteConfirm
        :itemIdentifier="etudiantASupprimer?.numEt"
        @confirm="validerSuppression"
        @cancel="fermerModalSuppression"
      />
    </AppModal>

  </div>
</template>

<style scoped>
.table-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.table-scroll {
  background: var(--color-surface-card);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-md);
}

.data-table thead tr {
  background: var(--color-primary-50);
  border-bottom: 1px solid var(--color-surface-border);
}

.data-table th {
  padding: 28px 32px;
  text-align: left;
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--color-primary-800);
  white-space: nowrap;
}

.data-table tbody tr {
  border-bottom: 1px solid var(--color-surface-border);
  transition: background 0.12s;
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

.data-table tbody tr:hover {
  background: var(--color-surface-subtle);
}

.form-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
}

.form-modal {
  background: var(--color-surface-card);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 32px rgba(26, 22, 40, 0.2);
  padding: var(--space-6);
  width: 100%;
  max-width: 490px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>