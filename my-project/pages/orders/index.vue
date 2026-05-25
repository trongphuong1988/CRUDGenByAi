<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
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

const { data: orders, refresh } = await useFetch<Order[]>('/api/orders')
const { data: users } = await useFetch<User[]>('/api/users')

const newUserId = ref('')
const newTotal = ref('')
const loading = ref(false)
const error = ref('')

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

const handleSubmit = async () => {
  error.value = ''

  const userId = parseInt(newUserId.value)
  if (isNaN(userId)) {
    error.value = 'User ID is required'
    return
  }

  const total = parseFloat(newTotal.value)
  if (isNaN(total) || total <= 0) {
    error.value = 'Total must be greater than 0'
    return
  }

  loading.value = true

  try {
    await $fetch('/api/orders', {
      method: 'POST',
      body: {
        userId,
        total,
      },
    })

    newUserId.value = ''
    newTotal.value = ''
    await refresh()
  } catch (err) {
    error.value = 'Failed to create order. User may not exist.'
  } finally {
    loading.value = false
  }
}

const columns = [
  { key: 'id', label: 'ID' },
  {
    key: 'userName',
    label: 'User Name',
  },
  {
    key: 'total',
    label: 'Total',
  },
  {
    key: 'createdAt',
    label: 'Created At',
  },
]

const tableData = computed(() =>
  orders.value
    ? orders.value.map((order) => ({
        id: order.id,
        userName: order.user?.name || 'Unknown',
        total: formatPrice(order.total),
        createdAt: formatDate(order.createdAt),
      }))
    : []
)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      Quản lý Đơn hàng
    </h1>

    <!-- Add Order Form -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        Thêm đơn hàng mới
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="userId" class="block text-sm font-medium text-gray-700 mb-1">
            User ID
          </label>
          <select
            id="userId"
            v-model="newUserId"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select a user</option>
            <option
              v-for="user in users"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }} (ID: {{ user.id }})
            </option>
          </select>
        </div>
        <div>
          <label for="total" class="block text-sm font-medium text-gray-700 mb-1">
            Total
          </label>
          <input
            id="total"
            v-model="newTotal"
            type="number"
            step="0.01"
            min="0"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter total amount"
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Adding...' : 'Add Order' }}
        </button>
      </form>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow">
      <AppTable :columns="columns" :data="tableData" />
    </div>
  </div>
</template>