<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const authStore = useAuthStore()
const router = useRouter()

function gererDeconnexion() {
  authStore.deconnecter()
  router.push('/')
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-brand">
      <!-- <img src="../../assets/img/education.png" class="brand-icon" width="24" height="24"> -->
      <span class="brand-name">GestTeach</span>
    </div>

    <nav class="sidebar-nav">
      <RouterLink to="/create" class="nav-item">
        <span class="nav-icon icon-add"></span>
        <span>Ajout</span>
      </RouterLink>
      <RouterLink to="/list" class="nav-item">
        <span class="nav-icon icon-list"></span>
        <span>Liste</span>
      </RouterLink>
      <RouterLink to="/stats" class="nav-item">
        <span class="nav-icon icon-stats"></span> 
        <span>Bilan</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <button @click="gererDeconnexion" class="logout-btn">
        <span class="logout-icon"></span>
        <span>Déconnexion</span>
      </button>
    </div>
  </div>
</template>