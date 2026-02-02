<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Memory', path: '/memory' },
  { name: 'Frases', path: '/phrase' }
]
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
    <div class="flex justify-center items-center h-16 gap-6 px-4">
      <RouterLink
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
        class="px-4 py-2 font-medium transition-colors"
        :class="route.path === page.path 
          ? 'text-pink-600 border-b-2 border-pink-600' 
          : 'text-gray-700 hover:text-pink-500'"
      >
        {{ page.name }}
      </RouterLink>
    </div>
  </nav>

</template>
