<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const userName = ref('')
const userPassword = ref('')

async function gererConnexion() {
  const connexionReussie = await authStore.connecter(userName.value, userPassword.value)
  if (connexionReussie) {
    router.push('/list')
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">

      <div class="login-header">
        <!-- <img src="../assets/img/education.png" class="login-icon" width="24" height="24"> -->
        <h1 class="login-title">ClassNode</h1>
        <!-- <p class="login-subtitle">Panneau de gestion</p>  -->
      </div>

      <form @submit.prevent="gererConnexion" class="login-form">
        <div class="field">
          <label class="field-label">Identifiant</label>
          <input
            type="text"
            v-model="userName"
            placeholder="Votre identifiant"
            class="field-input"
            required
          />
        </div>

        <div class="field">
          <label class="field-label">Mot de passe</label>
          <input
            type="password"
            v-model="userPassword"
            placeholder="Votre mot de passe"
            class="field-input"
            required
          />
        </div>

        <p v-if="authStore.messageErreur" class="error-msg">
          {{ authStore.messageErreur }}
        </p>

        <button type="submit" class="submit-btn">
          Se connecter
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-page);
}

.login-card {
  width: 420px;
  background: var(--color-surface-card);
  border: 1px solid var(--color-surface-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-surface-border);
}

.login-icon {
  font-size: 36px;
}

.login-title {
  font-size: var(--text-display);
  font-weight: 700;
  color: var(--color-primary-600);
  letter-spacing: -0.5px;
}

.login-subtitle {
  font-size: var(--text-md);
  color: var(--color-text-tertiary);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
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

.error-msg {
  font-size: var(--text-md);
  color: #DC2626;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}

.submit-btn {
  width: 100%;
  padding: var(--space-3) var(--space-4);
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

.submit-btn:hover {
  background: var(--color-primary-800);
}
</style>