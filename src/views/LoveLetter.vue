<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-200 via-red-100 to-pink-200 pt-24 md:pt-8 pb-8 px-4 md:px-8 flex items-center justify-center">
    <div class="max-w-4xl mx-auto">
      <!-- Celebration Header -->
      <div class="text-center mb-8">
        <div class="text-6xl md:text-8xl mb-4 animate-bounce">💖</div>
        <p class="text-xl md:text-2xl text-gray-700">Esto es para ti...</p>
      </div>

      <!-- Love Letter Card -->
      <div class="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-pink-300 mb-8">
        <!-- Letter Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-pink-600 mb-2">San Valentin 💕</h2>
        </div>

        <!-- Letter Content -->
        <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4">
          <p class="text-lg md:text-xl">
            <strong>Mi amorcito bello,</strong>
          </p>

          <p class="text-base md:text-lg">
            Escribo esta cartita para decirte lo mucho que significas para mí. Miro atrás y sé que nada fue fácil, que no tenía mi cabeza al sitio y que no te lo hice pasar bien, pero aún así seguiste aquí conmigo.
          </p>

          <p class="text-base md:text-lg">
            Gracias a ti he aprendido a ser una mejor persona. Gracias a ti he vuelvo a tener ilusión por la vida y sobre todo, pasarla tu lado.
          </p>

          <p class="text-base md:text-lg">
            Gracias por ser tú, por estar aquí, por amarme como lo haces.
          </p>

          <p class="text-base md:text-lg">
            En su día te prometí mil veces que todo mejoraría, que dejariamos las peleas por mi forma de ser, que dejaria de tratarte mal y que lucharia por ti y por nosotros. Parecía que todo eran palabras, pero aquí estamos, más fuertes que nunca y cada día mejor.
          </p>

          <p class="text-base md:text-lg">
            Espero que estos jueguecillos te hayan sacado alguna sonrisa y te hayan recordado lo especial que eres para mí.
          </p>

          <p class="text-base md:text-lg">
            También espero que te guste la cenita del sábado, que salgamos empachados y nos acostemos a mimir abrazaditos como siempre.
          </p>

          <p class="text-lg md:text-xl mt-8">
            <strong>Te amo más que a mi vida amorcito!!!</strong>
          </p>

        </div>

        <div class="mt-8 border-t-2 border-pink-200 pt-8">
          <p class="text-center text-gray-600 mb-4 italic">Esperos que seamos estos dos durante toda nuestra vida</p>
          <img 
            src="/carta_amor.jpg" 
            alt="Carta de amor escrita a mano"
            class="w-full rounded-2xl shadow-lg"
          >
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col md:flex-row gap-4 justify-center">
        <router-link
          to="/home"
          class="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-center"
        >
          Volver al menú principal
        </router-link>
      </div>
    </div>
  </div>
</template>



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


</style>
