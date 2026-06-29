<script setup>
import AppSideBar from '@/components/common/AppSideBar.vue'
import AppTopBar from '@/components/common/AppTopBar.vue'
import AppToast from '@/components/common/AppToast.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar-container">
      <AppSideBar/>
    </aside>
    <div class="main-content">
      <!-- <header class="topbar-container">
        <AppTopBar/>
      </header> -->
      <main class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
  <AppToast/>
</template>

<style scoped>
.app-shell {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background: var(--color-surface-page);
}

.sidebar-container {
  width: 220px;
  height: 100%;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
}

.topbar-container {
  width: 100%;
  height: 60px;
  flex-shrink: 0;
}

.page-content {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding: var(--space-6);
}
</style>