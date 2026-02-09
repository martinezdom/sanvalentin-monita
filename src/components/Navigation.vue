<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const pages = [
  { name: 'Inicio', path: '/home' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Memory', path: '/memory' },
  { name: 'Frases', path: '/phrase' },
  { name: 'Foto', path: '/guess-photo' }
]
</script>

<template>
  <nav v-if="route.path !== '/' && route.path !== '/love-letter'" class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">
    <div class="flex justify-center items-center gap-2 px-2 py-3 flex-wrap">
      <RouterLink
        v-for="page in pages"
        :key="page.path"
        :to="page.path"
        class="px-4 py-2 font-semibold rounded-lg transition-all text-sm min-w-[70px] text-center"
        :class="route.path === page.path 
          ? 'bg-pink-500 text-white' 
          : 'text-gray-700 hover:bg-pink-100'"
      >
        {{ page.name }}
      </RouterLink>
    </div>
  </nav>

</template>
