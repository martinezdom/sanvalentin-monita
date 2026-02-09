<script setup>
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 lg:p-16 pt-20 md:pt-8">
    <!-- All Games Completed Banner -->
    <div v-if="gameStore.allGamesCompleted" class="reveal reveal-fade max-w-4xl mx-auto mb-8">
      <router-link to="/love-letter" class="block">
        <div class="bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-white text-center hover:scale-105 transition-transform cursor-pointer">
          <div class="text-5xl md:text-6xl mb-4 animate-bounce">💕</div>
          <h2 class="text-2xl md:text-4xl font-bold mb-2">¡Has completado todos los juegos!</h2>
          <p class="text-lg md:text-xl mb-4">Tengo algo especial para ti...</p>
          <div class="inline-block bg-white text-pink-600 px-6 py-3 rounded-full font-bold shadow-lg">
            Ver mi carta de amor →
          </div>
        </div>
      </router-link>
    </div>

    <!-- Hero Section -->
    <section class="reveal reveal-fade max-w-4xl mx-auto text-center py-10 md:py-20">
      <div class="mb-6 md:mb-8 animate-pulse">
        <img src="/main_monkey.jpg" alt="mono wapo" class="w-40 h-40 md:w-64 md:h-64 object-cover rounded-2xl mx-auto">
      </div>
      
      <h1 class="text-3xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 bg-linear-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
        ¡Feliz San Valentín loquilla!
      </h1>

      <p class="text-sm md:text-base lg:text-xl text-gray-700 mb-6 md:mb-8">
        Espero que te guste este detallito. <br><br>
        No tendré mucho dinerito para comprarte mil cosas, <br>pero siempre buscaré la forma de sacarte una sonrisita. <br>
      </p>

      <button 
        onclick="window.scrollTo({top: window.innerHeight, behavior: 'smooth'})"
        class="bg-linear-to-r from-pink-500 to-purple-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-bold hover:scale-110 transition-transform shadow-xl"
      >
        ¿A que desea usted jugar? 🙊
      </button>
    </section>

    <!-- Sección de juegos disponibles -->
    <section class="reveal reveal-fade max-w-6xl mx-auto py-10 md:py-20">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <!-- Quiz -->
        <div class="reveal reveal-left bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform cursor-pointer">
          <div class="mb-4 flex justify-center">
            <img src="/foto_juego_quiz.jpg" alt="Quiz" class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-lg">
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-pink-600 mb-3">¿Cuánto nos conocemos?</h3>
          <p class="text-sm md:text-base text-gray-700 mb-4">Responde preguntas sobre nosotros, espero que no la cagues o pipaso.</p>
          <router-link to="/quiz" class="inline-block bg-pink-500 text-white px-5 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold hover:bg-pink-600">
            Jugar →
          </router-link>
        </div>

        <!-- Memory -->
        <div class="reveal reveal-right bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border-4 border-purple-300 hover:scale-105 transition-transform cursor-pointer">
          <div class="mb-4 flex justify-center">
            <img src="/foto_juego_memory.jpg" alt="Memory" class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-lg">
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-purple-600 mb-3">Memory Game</h3>
          <p class="text-sm md:text-base text-gray-700 mb-4">Encuentra las parejas de cartas con fotos de nuestros mejores momentos juntos.</p>
          <router-link to="/memory" class="inline-block bg-purple-500 text-white px-5 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold hover:bg-purple-600">
            Jugar →
          </router-link>
        </div>

        <!-- Phrase -->
        <div class="reveal reveal-left bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform cursor-pointer">
          <div class="mb-4 flex justify-center">
            <img src="/foto_juego_memoria.jpg" alt="Frases" class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-lg">
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-pink-600 mb-3">Completa la Frase</h3>
          <p class="text-sm md:text-base text-gray-700 mb-4">Completa las frases, poco más que añadir.</p>
          <router-link to="/phrase" class="inline-block bg-pink-500 text-white px-5 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold hover:bg-pink-600">
            Jugar →
          </router-link>
        </div>

        <!-- Guess Photo -->
        <div class="reveal reveal-right bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl border-4 border-purple-300 hover:scale-105 transition-transform cursor-pointer">
          <div class="mb-4 flex justify-center">
            <img src="/foto_juego_adivinar.jpg" alt="Adivina" class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-lg">
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-purple-600 mb-3">Adivina la Foto</h3>
          <p class="text-sm md:text-base text-gray-700 mb-4">Adivina el monumentazo de foto. Se vienen cositas.</p>
          <router-link to="/guess-photo" class="inline-block bg-purple-500 text-white px-5 md:px-6 py-2 text-sm md:text-base rounded-full font-semibold hover:bg-purple-600">
            Jugar →
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
