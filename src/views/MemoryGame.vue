<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 flex items-center justify-center pt-20 md:pt-8">
    <div class="max-w-2xl w-full bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-purple-300 text-center">
      <h2 class="text-2xl md:text-4xl font-bold text-purple-600 mb-6">🃏 Memory Game</h2>
      <p class="text-sm md:text-base text-gray-700 mb-8">Próximamente...</p>
      <router-link to="/" class="inline-block bg-purple-500 text-white px-5 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-full font-semibold hover:bg-purple-600">
        Volver al inicio
      </router-link>
    </div>
  </div>
</template>
