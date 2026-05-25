<script setup lang="ts">
</script>

<template>
  <header class="bg-blue-600 text-white p-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold">
        CRUDGenByAi
      </NuxtLink>
      <nav class="space-x-4">
        <NuxtLink to="/users" class="hover:text-blue-200 transition">
          Users
        </NuxtLink>
        <NuxtLink to="/products" class="hover:text-blue-200 transition">
          Products
        </NuxtLink>
        <NuxtLink to="/orders" class="hover:text-blue-200 transition">
          Orders
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>