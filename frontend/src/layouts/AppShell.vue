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
      <header class="topbar-container">
        <AppTopBar/>
      </header>
      <main class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
  <AppToast/>
</template>