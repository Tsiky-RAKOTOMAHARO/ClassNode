<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

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
      <span class="brand-name">ClassNode</span>
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

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-surface-card);
  border-right: 1px solid var(--color-surface-border);
  padding: var(--space-4);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-2);
  margin-bottom: var(--space-6);
}

.brand-icon {
  font-size: 22px;
}

.brand-name {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-primary-600);
  letter-spacing: -0.3px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text-secondary);
  font-size: var(--text-md);
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: var(--color-surface-subtle);
  color: var(--color-primary-600);
}

.nav-item.router-link-active {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
  font-weight: 600;
}

.nav-icon,
.logout-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: currentColor;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  flex-shrink: 0;
}

.icon-add {
  -webkit-mask-image: url('../../assets/img/add.svg');
  mask-image: url('../../assets/img/add.svg');
}

.icon-list {
  -webkit-mask-image: url('../../assets/img/list.svg');
  mask-image: url('../../assets/img/list.svg');
}

.icon-stats {
  -webkit-mask-image: url('../../assets/img/pieChart.svg');
  mask-image: url('../../assets/img/pieChart.svg');
}

.logout-icon {
  -webkit-mask-image: url('../../assets/img/logout.svg');
  mask-image: url('../../assets/img/logout.svg');
}

.sidebar-footer {
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-surface-border);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: none;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-text-tertiary);
  font-size: var(--text-md);
  font-family: var(--font-mono);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.logout-btn:hover {
  background: #FEF2F2;
  color: #DC2626;
}
</style>