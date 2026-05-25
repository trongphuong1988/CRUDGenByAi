<script setup lang="ts">
interface Column {
  key: string
  label: string
}

defineProps<{
  columns: Column[]
  data: Record<string, unknown>[]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-300">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(row, index) in data"
          :key="index"
          class="hover:bg-gray-50 transition"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 text-sm text-gray-700 border-b"
          >
            {{ row[column.key] }}
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td
            :colspan="columns.length"
            class="px-4 py-8 text-center text-gray-500"
          >
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>