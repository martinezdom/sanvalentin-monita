<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-pink-200 pt-24 md:pt-8 pb-8 px-4 md:px-8 flex items-center justify-center">
    <div class="max-w-4xl mx-auto">
      <!-- Celebration Header -->
      <div class="text-center mb-8">
        <div class="text-6xl md:text-8xl mb-4 animate-bounce">💖</div>
        <h1 class="text-4xl md:text-6xl font-bold text-pink-600 mb-4">¡Completaste todos los juegos!</h1>
        <p class="text-xl md:text-2xl text-gray-700">Esto es para ti...</p>
      </div>

      <!-- Love Letter Card -->
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300 mb-8">
        <!-- Letter Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-pink-600 mb-2">Mi carta para ti 💕</h2>
          <p class="text-gray-500 italic">Con todo mi amor...</p>
        </div>

        <!-- Letter Content -->
        <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4">
          <p class="text-lg md:text-xl">
            <strong>Mi amor,</strong>
          </p>

          <p class="text-base md:text-lg">
            Escribo esta carta para decirte lo mucho que significas para mí. Cada día a tu lado es un regalo,
            cada sonrisa tuya ilumina mi mundo, y cada momento juntos es un recuerdo que atesoro en mi corazón.
          </p>

          <p class="text-base md:text-lg">
            Desde que llegaste a mi vida, todo tiene más sentido. Tu risa es mi melodía favorita,
            tus ojos son mi hogar, y tu amor es el mejor regalo que he recibido.
          </p>

          <p class="text-base md:text-lg">
            Gracias por ser tú, por estar aquí, por amarme como lo haces. Gracias por cada pequeño momento,
            por cada gesto, por cada palabra. Eres mi persona, mi complemento, mi todo.
          </p>

          <p class="text-base md:text-lg">
            Prometo cuidarte, respetarte y amarte cada día más. Prometo estar a tu lado en los buenos y malos momentos,
            celebrar tus triunfos y apoyarte en tus desafíos.
          </p>

          <p class="text-base md:text-lg">
            Espero que estos jueguecillos te hayan sacado alguna sonrisa y te hayan recordado lo especial que eres para mí.
          </p>

          <p class="text-lg md:text-xl mt-8">
            <strong>Te amo con todo mi corazón,</strong>
          </p>

          <p class="text-base md:text-lg italic">
            [Tu nombre aquí] 💖
          </p>
        </div>

        <!-- Optional: Add image section for handwritten letter -->
        <!-- Uncomment and add your image path when ready -->
        <!-- 
        <div class="mt-8 border-t-2 border-pink-200 pt-8">
          <p class="text-center text-gray-600 mb-4 italic">También te escribí esto a mano...</p>
          <img 
            src="/carta_amor.jpg" 
            alt="Carta de amor escrita a mano"
            class="w-full rounded-2xl shadow-lg"
          >
        </div>
        -->
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <router-link
          to="/home"
          class="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-center"
        >
          Volver al menú principal
        </router-link>
        <button
          @click="downloadLetter"
          class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all"
        >
          Guardar carta 📥
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const downloadLetter = () => {
  // Esta función permite descargar/guardar la carta
  alert('¡Carta guardada en tu corazón! 💕')
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.prose p:first-of-type::first-letter {
  font-size: 2em;
  font-weight: bold;
  color: #ec4899;
  float: left;
  line-height: 1;
  margin-right: 0.1em;
}
</style>
