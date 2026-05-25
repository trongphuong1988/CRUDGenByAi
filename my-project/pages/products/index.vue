<script setup lang="ts">
interface Product {
  id: number
  name: string
  price: number
  stock: number
  createdAt: string
}

definePageMeta({
  layout: 'default',
})

const { data: products, refresh } = await useFetch<Product[]>('/api/products')

const newName = ref('')
const newPrice = ref('')
const newStock = ref('')
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

  if (!newName.value.trim()) {
    error.value = 'Name is required'
    return
  }

  const price = parseFloat(newPrice.value)
  if (isNaN(price) || price <= 0) {
    error.value = 'Price must be greater than 0'
    return
  }

  const stock = parseInt(newStock.value) || 0

  loading.value = true

  try {
    await $fetch('/api/products', {
      method: 'POST',
      body: {
        name: newName.value.trim(),
        price,
        stock,
      },
    })

    newName.value = ''
    newPrice.value = ''
    newStock.value = ''
    await refresh()
  } catch (err) {
    error.value = 'Failed to create product'
  } finally {
    loading.value = false
  }
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  {
    key: 'price',
    label: 'Price',
  },
  { key: 'stock', label: 'Stock' },
  {
    key: 'createdAt',
    label: 'Created At',
  },
]

const tableData = computed(() =>
  products.value
    ? products.value.map((product) => ({
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        stock: product.stock,
        createdAt: formatDate(product.createdAt),
      }))
    : []
)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      Quản lý Sản phẩm
    </h1>

    <!-- Add Product Form -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        Thêm sản phẩm mới
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            v-model="newName"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter product name"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              id="price"
              v-model="newPrice"
              type="number"
              step="0.01"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter price"
            />
          </div>
          <div>
            <label for="stock" class="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              id="stock"
              v-model="newStock"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter stock"
            />
          </div>
        </div>
        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Adding...' : 'Add Product' }}
        </button>
      </form>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-lg shadow">
      <AppTable :columns="columns" :data="tableData" />
    </div>
  </div>
</template>