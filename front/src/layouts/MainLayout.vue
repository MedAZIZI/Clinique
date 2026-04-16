<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-slate-50">
    <Sidebar />
    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <div class="p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>