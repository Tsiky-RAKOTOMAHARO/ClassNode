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