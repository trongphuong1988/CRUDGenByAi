<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

interface Product {
  id: number
  name: string
  price: number
  stock: number
  createdAt: string
}

interface Order {
  id: number
  userId: number
  total: number
  createdAt: string
  user: User
}

definePageMeta({
  layout: 'default',
})

const { data: users } = await useAsyncData('users', async () => {
  const result = await $fetch('/api/users')
  return result as User[]
})

const { data: products } = await useAsyncData<Product[]>('products', () =>
  $fetch('/api/products')
)

const { data: orders } = await useAsyncData<Order[]>('orders', () =>
  $fetch('/api/orders')
)

const userCount = computed(() => users.value?.length || 0)
const productCount = computed(() => products.value?.length || 0)
const orderCount = computed(() => orders.value?.length || 0)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Users Card -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm uppercase">Total Users</p>
            <p class="text-3xl font-bold text-gray-800">
              {{ userCount }}
            </p>
          </div>
          <div class="text-blue-500 text-4xl">👥</div>
        </div>
        <NuxtLink
          to="/users"
          class="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          View all users →
        </NuxtLink>
      </div>

      <!-- Products Card -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm uppercase">Total Products</p>
            <p class="text-3xl font-bold text-gray-800">
              {{ productCount }}
            </p>
          </div>
          <div class="text-green-500 text-4xl">📦</div>
        </div>
        <NuxtLink
          to="/products"
          class="mt-4 inline-block text-green-600 hover:text-green-800 font-medium"
        >
          View all products →
        </NuxtLink>
      </div>

      <!-- Orders Card -->
      <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm uppercase">Total Orders</p>
            <p class="text-3xl font-bold text-gray-800">
              {{ orderCount }}
            </p>
          </div>
          <div class="text-purple-500 text-4xl">🛒</div>
        </div>
        <NuxtLink
          to="/orders"
          class="mt-4 inline-block text-purple-600 hover:text-purple-800 font-medium"
        >
          View all orders →
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        Welcome to CRUDGenByAi
      </h2>
      <p class="text-gray-600">
        This is a user, product, and order management system built with Nuxt 4,
        TypeScript, Tailwind CSS, and Prisma ORM. Updateeeeeeeeeeeeeeeeee, test round 2
      </p>
    </div>
  </div>
</template>