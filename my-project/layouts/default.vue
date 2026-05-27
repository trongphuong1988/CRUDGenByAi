<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <AppHeader />
    <div class="flex flex-1">
      <AppNavbar />
      <main class="flex-1 p-6">
        fgsdagdfgdfgdgfgd
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>