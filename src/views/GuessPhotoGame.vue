<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const baseUrl = import.meta.env.BASE_URL

// Marcar como completado cuando se monta el componente (ya que es un viewer sin final)
onMounted(() => {
  gameStore.markGameAsCompleted('guess-photo')
})

const photos = [
  {
    image: `${baseUrl}games/fotos/foto_altea_amanecer.jpg`,
    hints: ['Amanecer', 'Playa', 'Primeras luces'],
    displayAnswer: 'Nuestro primer (y único) amanecer!'
  },
  {
    image: `${baseUrl}games/fotos/foto_altea_ivan.jpg`,
    hints: ['Altea', 'Con Iván', 'Paseo'],
    displayAnswer: 'La que nos hizo Iván en Altea!'
  },
  {
    image: `${baseUrl}games/fotos/serelles_todos.jpg`,
    hints: ['Grupo', 'Todos juntos', 'Serelles'],
    displayAnswer: 'La trupe en Serelles!'
  },
  {
    image: `${baseUrl}games/fotos/vall_aran_tonto.jpg`,
    hints: ['Sexo entre maderas', 'Valle de Arán', 'Mi primer viaje'],
    displayAnswer: 'Nada más que añadir.'
  },
  {
    image: `${baseUrl}games/fotos/ella_mascarilla.jpg`,
    hints: ['Grinch', 'Sexy', 'Mascarilla'],
    displayAnswer: 'Que sexy te veías...'
  },
  {
    image: `${baseUrl}games/fotos/ella_moquillo.jpg`,
    hints: ['Selfies', 'Chiqutina', 'Mocaso'],
    displayAnswer: 'Moquitooo.'
  },
  {
    image: `${baseUrl}games/fotos/ella_noeta.jpg`,
    hints: ['Gocerda', 'La celosa', 'Mis dos niñas'],
    displayAnswer: 'La celosita con la otra celosita.'
  },
  {
    image: `${baseUrl}games/fotos/sexy.jpg`,
    hints: ['Mascareta', 'Sepsi', 'Tentador'],
    displayAnswer: 'Roaarr'
  },
  {
    image: `${baseUrl}games/fotos/xd.jpg`,
    hints: ['?', 'Grinch', '?'],
    displayAnswer: 'Simplemente no tengo palabras para esta foto.'
  }
]

const currentPhotoIndex = ref(0)
const blurLevel = ref(20)
const hintsRevealed = ref(0)
const showAnswer = ref(false)

const currentPhoto = computed(() => photos[currentPhotoIndex.value])

const blurStyle = computed(() => ({
  filter: `blur(${blurLevel.value}px)`,
  transition: 'filter 0.5s ease-in-out'
}))

function revealMore() {
  if (blurLevel.value > 0) {
    blurLevel.value = Math.max(0, blurLevel.value - 5)
  } else if (hintsRevealed.value < currentPhoto.value.hints.length) {
    hintsRevealed.value++
  }
}

function nextPhoto() {
  if (currentPhotoIndex.value < photos.length - 1) {
    currentPhotoIndex.value++
    resetPhoto()
  }
}

function previousPhoto() {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
    resetPhoto()
  }
}

function resetPhoto() {
  blurLevel.value = 20
  hintsRevealed.value = 0
  showAnswer.value = false
}
</script>

<template>
  <div class="min-h-screen p-4 md:p-8 flex items-center justify-center pt-24 md:pt-8">
    <div class="max-w-2xl w-full">
      <div class="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-purple-300">
        
        <!-- Progreso -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-semibold text-gray-600">Foto {{ currentPhotoIndex + 1 }}/{{ photos.length }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
              :style="{ width: `${((currentPhotoIndex + 1) / photos.length) * 100}%` }">
            </div>
          </div>
        </div>

        <h2 class="text-xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          ¿Te acuerdas de este momento? 📸
        </h2>

        <!-- Foto difuminada -->
        <div class="mb-6 overflow-hidden rounded-2xl border-4 border-purple-200 bg-gray-100">
          <img 
            :src="currentPhoto.image" 
            alt="Foto misteriosa" 
            :style="blurStyle"
            class="w-full h-64 md:h-96 object-contain"
            @error="(e) => { console.error('Error cargando:', currentPhoto.image); e.target.src = baseUrl + 'main_monkey.jpg' }"
          >
        </div>

        <!-- Información -->
        <div class="mb-6 text-center">
          <p class="text-sm text-gray-600 mb-2">Nivel de difuminado: {{ blurLevel }}px</p>
          <div class="flex justify-center gap-2 mb-4">
            <div v-for="i in 5" :key="i" 
              class="w-8 h-2 rounded-full"
              :class="blurLevel >= (5 - i) * 4 ? 'bg-purple-500' : 'bg-gray-300'"
            ></div>
          </div>
        </div>

        <!-- Pistas -->
        <div v-if="hintsRevealed > 0" class="mb-6 p-4 bg-purple-50 rounded-xl">
          <h3 class="font-bold text-purple-700 mb-2">💡 Pistas:</h3>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="i in hintsRevealed" :key="i" class="text-gray-700">
              {{ currentPhoto.hints[i - 1] }}
            </li>
          </ul>
        </div>

        <!-- Botón revelar más -->
        <button 
          @click="revealMore"
          class="w-full mb-4 bg-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-600 transition-all"
        >
          {{ blurLevel > 0 ? '🔍 Revelar más' : '💡 Ver pista' }}
        </button>

        <!-- Botón ver respuesta -->
        <button 
          v-if="!showAnswer"
          @click="showAnswer = true"
          class="w-full mb-4 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all"
        >
          👀 Ver respuesta
        </button>

        <!-- Mostrar respuesta -->
        <div v-if="showAnswer" class="mb-6 p-4 bg-orange-50 rounded-xl border-2 border-orange-300">
          <p class="text-center text-orange-800 font-semibold text-lg">{{ currentPhoto.displayAnswer }}</p>
        </div>

        <!-- Botones de navegación -->
        <div class="flex gap-4">
          <button 
            @click="previousPhoto"
            :disabled="currentPhotoIndex === 0"
            class="flex-1 bg-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <button 
            @click="nextPhoto"
            :disabled="currentPhotoIndex === photos.length - 1"
            class="flex-1 bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>

        <!-- Volver al inicio -->
        <router-link 
          to="/"
          class="mt-4 block text-center bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-purple-200 transition-all"
        >
          🏠 Volver al inicio
        </router-link>

      </div>
    </div>
  </div>
</template>
