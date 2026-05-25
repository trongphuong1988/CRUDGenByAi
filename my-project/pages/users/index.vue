<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  createdAt: string
}

definePageMeta({
  layout: 'default',
})

const { data: users, refresh } = await useFetch<User[]>('/api/users')

const newName = ref('')
const newEmail = ref('')
const loading = ref(false)
const error = ref('')

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}

const handleSubmit = async () => {
  error.value = ''

  if (!newName.value.trim() || !newEmail.value.trim()) {
    error.value = 'Name and email are required'
    return
  }

  loading.value = true

  try {
    await $fetch('/api/users', {
      method: 'POST',
      body: {
        name: newName.value.trim(),
        email: newEmail.value.trim(),
      },
    })

    newName.value = ''
    newEmail.value = ''
    await refresh()
  } catch (err) {
    error.value = 'Failed to create user. Email may already exist.'
  } finally {
    loading.value = false
  }
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'createdAt',
    label: 'Created At',
  },
]

const tableData = computed(() =>
  users.value
    ? users.value.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: formatDate(user.createdAt),
      }))
    : []
)
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      Quản lý Người dùng
    </h1>

    <!-- Add User Form -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">
        Thêm người dùng mới
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
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            v-model="newEmail"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Adding...' : 'Add User' }}
        </button>
      </form>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow">
      <AppTable :columns="columns" :data="tableData" />
    </div>
  </div>
</template>