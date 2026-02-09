<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'

const router = useRouter()
const gameStore = useGameStore()

const phrases = [
  {
    text: 'Lo que más me gusta de ti es tu ___',
    options: ['sonrisa', 'mirada', 'personalidad', 'forma de ser'],
    correct: 0 // índice de la respuesta correcta (puedes cambiarlo)
  },
  {
    text: 'Nuestro primer beso fue ___',
    options: ['mágico', 'inesperado', 'perfecto', 'inolvidable'],
    correct: 2
  },
  {
    text: 'Cuando estoy contigo me siento ___',
    options: ['feliz', 'completo/a', 'en casa', 'afortunado/a'],
    correct: 1
  },
  {
    text: 'Lo que más recuerdo de nuestra primera cita es ___',
    options: ['tu nerviosismo', 'tu risa', 'tus ojos', 'nuestra conversación'],
    correct: 3
  },
  {
    text: 'Me enamoré de ti cuando ___',
    options: ['te vi sonreír', 'me miraste así', 'fuiste tú mismo/a', 'me hiciste reír'],
    correct: 0
  }
]

const currentPhraseIndex = ref(0)
const selectedAnswers = ref(Array(phrases.length).fill(null))
const showResults = ref(false)

const currentPhrase = computed(() => phrases[currentPhraseIndex.value])
const isLastPhrase = computed(() => currentPhraseIndex.value === phrases.length - 1)
const canContinue = computed(() => selectedAnswers.value[currentPhraseIndex.value] !== null)

const correctAnswers = computed(() => {
  return selectedAnswers.value.filter((answer, index) => answer === phrases[index].correct).length
})

// Marcar juego como completado cuando se muestran resultados
watch(showResults, (show) => {
  if (show) {
    gameStore.markGameAsCompleted('phrase')
  }
})

const selectAnswer = (optionIndex) => {
  selectedAnswers.value[currentPhraseIndex.value] = optionIndex
}

const nextPhrase = () => {
  if (currentPhraseIndex.value < phrases.length - 1) {
    currentPhraseIndex.value++
  } else {
    showResults.value = true
  }
}

const previousPhrase = () => {
  if (currentPhraseIndex.value > 0) {
    currentPhraseIndex.value--
  }
}

const resetGame = () => {
  currentPhraseIndex.value = 0
  selectedAnswers.value = Array(phrases.length).fill(null)
  showResults.value = false
}

const goToHome = () => {
  router.push('/home')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 pt-20 md:pt-8 pb-8 px-4 md:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-5xl font-bold text-pink-600 mb-4 text-center">Completa la Frase ✍️</h1>
      <p class="text-base md:text-lg text-gray-700 mb-8 text-center">Elige la palabra que mejor complete cada frase</p>

      <!-- Game Content -->
      <div v-if="!showResults" class="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-pink-300">
        <!-- Progress -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-600">Frase {{ currentPhraseIndex + 1 }} de {{ phrases.length }}</span>
            <span class="text-sm text-gray-600">{{ selectedAnswers.filter(a => a !== null).length }}/{{ phrases.length }} completadas</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${((currentPhraseIndex + 1) / phrases.length) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Phrase -->
        <div class="mb-8">
          <p class="text-xl md:text-2xl text-gray-800 text-center font-medium leading-relaxed">
            {{ currentPhrase.text }}
          </p>
        </div>

        <!-- Options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button
            v-for="(option, index) in currentPhrase.options"
            :key="index"
            @click="selectAnswer(index)"
            class="p-4 rounded-2xl font-semibold text-lg transition-all border-2"
            :class="selectedAnswers[currentPhraseIndex] === index 
              ? 'bg-pink-500 text-white border-pink-500 shadow-lg' 
              : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50'"
          >
            {{ option }}
          </button>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between items-center gap-4">
          <button
            @click="previousPhrase"
            :disabled="currentPhraseIndex === 0"
            class="px-6 py-3 rounded-full font-semibold transition-all"
            :class="currentPhraseIndex === 0 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'"
          >
            ← Anterior
          </button>
          
          <button
            @click="nextPhrase"
            :disabled="!canContinue"
            class="px-6 py-3 rounded-full font-semibold transition-all"
            :class="canContinue 
              ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-lg' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'"
          >
            {{ isLastPhrase ? 'Ver resultados' : 'Siguiente →' }}
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-else class="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-pink-300">
        <div class="text-center mb-8">
          <div class="text-6xl mb-4">💕</div>
          <h2 class="text-3xl font-bold text-pink-600 mb-4">¡Juego completado!</h2>
          <p class="text-xl text-gray-700 mb-2">
            Acertaste <span class="font-bold text-pink-600">{{ correctAnswers }}</span> de {{ phrases.length }} frases
          </p>
          <p class="text-lg text-gray-600">
            {{ correctAnswers === phrases.length ? '¡Perfecto! Nos conocemos muy bien 🥰' : correctAnswers >= 3 ? '¡Muy bien! Estamos conectados 💖' : '¡No pasa nada! Lo importante es lo que sentimos 💝' }}
          </p>
        </div>

        <!-- Review Answers -->
        <div class="space-y-4 mb-8">
          <h3 class="font-bold text-lg text-gray-800 mb-4">Tus respuestas:</h3>
          <div v-for="(phrase, index) in phrases" :key="index" class="p-4 rounded-xl bg-gray-50 border-2"
            :class="selectedAnswers[index] === phrase.correct ? 'border-green-500' : 'border-red-300'">
            <p class="text-gray-700 mb-2">{{ phrase.text }}</p>
            <p class="font-semibold"
              :class="selectedAnswers[index] === phrase.correct ? 'text-green-600' : 'text-red-600'">
              Tu respuesta: {{ phrase.options[selectedAnswers[index]] }}
              {{ selectedAnswers[index] === phrase.correct ? '✓' : '✗' }}
            </p>
            <p v-if="selectedAnswers[index] !== phrase.correct" class="text-sm text-gray-600 mt-1">
              Respuesta correcta: {{ phrase.options[phrase.correct] }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <button
            @click="resetGame"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-8 rounded-full transition-all"
          >
            Jugar de nuevo
          </button>
          <button
            @click="goToHome"
            class="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Volver al menú principal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
