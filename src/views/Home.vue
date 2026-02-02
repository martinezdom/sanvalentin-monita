<script setup>
</script>

<template>
  <div class="min-h-screen p-8 md:p-16">
    <!-- Hero Section -->
    <section class="reveal reveal-fade max-w-4xl mx-auto text-center py-20">
      <div class="mb-8 animate-pulse">
        <img src="/main_monkey.jpg" alt="mono wapo" class="w-64 h-64 object-cover rounded-2xl mx-auto">
      </div>
      
      <h1 class="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
        ¡Feliz San Valentín loquilla!
      </h1>

      <p class="text-xl text-gray-700 mb-8">
        Espero que te guste este detallito. <br><br>
        No tendré mucho dinerito para comprarte mil cosas, <br>pero siempre buscaré la forma de sacarte una sonrisa. <br>
      </p>

      <button 
        onclick="window.scrollTo({top: window.innerHeight, behavior: 'smooth'})"
        class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-110 transition-transform shadow-xl"
      >
        ¿A que desea usted jugar? 🙊
      </button>
    </section>

    <!-- Sección de juegos disponibles -->
    <section class="reveal reveal-fade max-w-6xl mx-auto py-20">
      <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
        Elige un juego
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Quiz -->
        <div class="reveal reveal-left bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform cursor-pointer">
          <div class="text-6xl mb-4">❓</div>
          <h3 class="text-2xl font-bold text-pink-600 mb-3">¿Cuánto nos conocemos?</h3>
          <p class="text-gray-700 mb-4">Responde preguntas sobre nosotros, espero que no la cagues o pipaso.</p>
          <router-link to="/quiz" class="inline-block bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600">
            Jugar →
          </router-link>
        </div>

        <!-- Memory -->
        <div class="reveal reveal-right bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-4 border-purple-300 hover:scale-105 transition-transform cursor-pointer">
          <div class="text-6xl mb-4">🃏</div>
          <h3 class="text-2xl font-bold text-purple-600 mb-3">Memory Game</h3>
          <p class="text-gray-700 mb-4">Encuentra las parejas de cartas con fotos de nuestros mejores momentos juntos.</p>
          <router-link to="/memory" class="inline-block bg-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-600">
            Jugar →
          </router-link>
        </div>

        <!-- Phrase -->
        <div class="reveal reveal-left bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border-4 border-pink-300 hover:scale-105 transition-transform cursor-pointer">
          <div class="text-6xl mb-4">✍️</div>
          <h3 class="text-2xl font-bold text-pink-600 mb-3">Completa la Frase</h3>
          <p class="text-gray-700 mb-4">Completa las frases, poco más que añadir.</p>
          <router-link to="/phrase" class="inline-block bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600">
            Jugar →
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
