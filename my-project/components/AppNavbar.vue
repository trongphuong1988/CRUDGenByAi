<script setup lang="ts">
</script>

<template>
  <nav class="w-64 bg-gray-900 text-white min-h-screen p-4">
    <ul class="space-y-2">
      <li>
        <NuxtLink
          to="/"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
          active-class="bg-blue-600"
        >
          📊 Dashboard
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/users"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
          active-class="bg-blue-600"
        >
          👥 Users
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/products"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
          active-class="bg-blue-600"
        >
          📦 Products
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/orders"
          class="block px-4 py-2 rounded hover:bg-gray-700 transition"
          active-class="bg-blue-600"
        >
          🛒 Orders
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>