<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'sauvegarder', 'annuler'])

const formVide = () => ({
  numEt: null,
  nom: '',
  prenom: '',
  note_math: 0,
  note_phys: 0
})

const localEtudiant = ref(formVide())

const erreurs = ref({
  numEt: '',
  nom: '',
  prenom: ''
})

watch(() => props.modelValue, (nouveau) => {
  if (nouveau) {
    localEtudiant.value = { ...nouveau }
  } else {
    localEtudiant.value = formVide()
  }
}, { immediate: true })

function capitaliser(valeur) {
  if (!valeur) return valeur
  return valeur.charAt(0).toUpperCase() + valeur.slice(1)
}

function validerFormulaire() {
  erreurs.value = { numEt: '', nom: '', prenom: '' }
  let estValide = true

  if (!localEtudiant.value.numEt || localEtudiant.value.numEt <= 0) {
    erreurs.value.numEt = 'Le numéro étudiant est requis'
    estValide = false
  }

  if (!localEtudiant.value.nom || !localEtudiant.value.nom.trim()) {
    erreurs.value.nom = 'Le nom est requis'
    estValide = false
  }

  if (!localEtudiant.value.prenom || !localEtudiant.value.prenom.trim()) {
    erreurs.value.prenom = 'Le prénom est requis'
    estValide = false
  }

  return estValide
}

function soumettre() {
  localEtudiant.value.nom = capitaliser((localEtudiant.value.nom || '').trim())
  localEtudiant.value.prenom = capitaliser((localEtudiant.value.prenom || '').trim())

  if (!validerFormulaire()) {
    return
  }

  emit('sauvegarder', { ...localEtudiant.value })
  if (!props.isEdit) {
    localEtudiant.value = formVide()
    erreurs.value = { numEt: '', nom: '', prenom: '' }
  }
}
</script>

<template>
  <div class="form-card">

    <div class="form-header">
      <h3 class="form-title">
        {{ isEdit
          ? `Modifier l'Étudiant (N° : ${modelValue?.numEt ?? '—'})`
          : 'Ajouter un nouvel Étudiant'
        }}
      </h3>
    </div>

    <form @submit.prevent="soumettre" class="form-body">

      <div class="form-row">
        <div class="field">
          <label class="field-label">Numéro Étudiant</label>
          <input
            type="number"
            v-model.number="localEtudiant.numEt"
            class="field-input"
            :class="{ 'field-input--error': erreurs.numEt }"
            placeholder="1"
            :disabled="isEdit"
          />
          <span v-if="erreurs.numEt" class="field-error">{{ erreurs.numEt }}</span>
        </div>
        <div class="field">
          <label class="field-label">Nom</label>
          <input
            type="text"
            v-model="localEtudiant.nom"
            class="field-input"
            :class="{ 'field-input--error': erreurs.nom }"
          />
          <span v-if="erreurs.nom" class="field-error">{{ erreurs.nom }}</span>
        </div>
        <div class="field">
          <label class="field-label">Prénom</label>
          <input
            type="text"
            v-model="localEtudiant.prenom"
            class="field-input"
            :class="{ 'field-input--error': erreurs.prenom }"
          />
          <span v-if="erreurs.prenom" class="field-error">{{ erreurs.prenom }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="field">
          <label class="field-label">Note Mathématiques</label>
          <input type="number" step="0.5" min="0" max="20" v-model.number="localEtudiant.note_math" class="field-input" />
        </div>
        <div class="field">
          <label class="field-label">Note Physique</label>
          <input type="number" step="0.5" min="0" max="20" v-model.number="localEtudiant.note_phys" class="field-input" />
        </div>
      </div>

      <div class="form-actions">
        <button type="button" @click="emit('annuler')" class="btn-secondary">
          Annuler
        </button>
        <button type="submit" class="btn-primary">
          {{ isEdit ? 'Enregistrer' : 'Ajouter' }}
        </button>
      </div>

    </form>
  </div>
</template>

<style scoped>
.form-card {
  background: var(--color-surface-card);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.form-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-surface-border);
}

.form-icon {
  font-size: 20px;
}

.form-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--color-text-primary);
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.form-row {
  display: flex;
  gap: var(--space-4);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.field-label {
  font-size: var(--text-md);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.field-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-subtle);
  font-size: var(--text-md);
  font-family: var(--font-mono);
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 0.15s;
}

.field-input:focus {
  border-color: var(--color-surface-border-focus);
  background: var(--color-surface-card);
}

.field-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.field-input--error {
  border-color: #A32D2D;
  background: #FCEBEB;
}

.field-input--error:focus {
  border-color: #A32D2D;
}

.field-error {
  font-size: var(--text-sm);
  color: #A32D2D;
  font-family: var(--font-sans);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-surface-border);
}

.btn-primary {
  padding: var(--space-3) var(--space-5);
  background: var(--color-primary-600);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-md);
  font-family: var(--font-mono);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-primary:hover {
  background: var(--color-primary-800);
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
</style>