<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'

const router = useRouter()
const gameStore = useGameStore()
const baseUrl = import.meta.env.BASE_URL

const phrases = [
  {
    text: 'Lo que más me gusta de ti es tu ___',
    options: ['sonrisa', 'mirada', 'personalidad', 'qlo'],
    correct: 0,
    image: `${baseUrl}games/phrase/sonrisa.jpg`
  },
  {
    text: 'Si fueras un animal serías ___',
    options: ['un koala', 'un pingüino', 'una perra (roar)', 'una gata'],
    correct: 1,
    image: `${baseUrl}games/phrase/pinguino.jpg`
  },
  {
    text: 'Tu superpoder secreto es ___',
    options: ['Desquiciarme a más no poder', 'Cagar truños inmensos', 'Dormir ilimitadamente', 'Levantar cosas sin tocarlas'],
    correct: 4,
    image: `${baseUrl}games/phrase/todo.jpg`,
    specialQuestion: true
  },
  {
    text: 'Tu peor defecto es que ___',
    options: ['me robas la manta', 'te duermes sin avisar durante 3h', 'escuchas cantantes mierdosos', 'siempre tienes razón (aunque no la tengas)'],
    correct: 3,
    image: `${baseUrl}games/phrase/mono.jpg`
  },
  {
    text: 'Si pudieras comer solo una cosa el resto de tu vida sería ___',
    options: ['pablo', 'mi pichote', 'kinder buenos', 'ensalada'],
    correct: 0,
    image: `${baseUrl}games/phrase/pablo.jpg`
  }

]

const currentPhraseIndex = ref(0)
const selectedAnswers = ref(Array(phrases.length).fill(null))
const showResults = ref(false)
const showReward = ref(false)
const failedAttempts = ref(new Set())
const showGeneralError = ref(false)
const question3Attempts = ref(new Set())
const showQuestion3Error = ref(false)

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
  // Special handling for Question 3 (Index 2)
  if (currentPhraseIndex.value === 2) {
    if (optionIndex !== 4) {
      question3Attempts.value.add(optionIndex)
      showQuestion3Error.value = true
      setTimeout(() => showQuestion3Error.value = false, 2000)
      return
    }
  } else {
    // Normal handling for other questions
    if (optionIndex !== currentPhrase.value.correct) {
      failedAttempts.value.add(optionIndex)
      showGeneralError.value = true
      setTimeout(() => showGeneralError.value = false, 2000)
      return
    }
  }
  
  // If correct (or special question accepted)
  selectedAnswers.value[currentPhraseIndex.value] = optionIndex
  showReward.value = true
}

const closeReward = () => {
  showReward.value = false
  // Optional: Auto-advance after closing reward
  // nextPhrase() 
}

const nextPhrase = () => {
  if (currentPhraseIndex.value < phrases.length - 1) {
    currentPhraseIndex.value++
    // Reset state for next question
    failedAttempts.value.clear()
    showGeneralError.value = false
    if (currentPhraseIndex.value !== 2) {
      showQuestion3Error.value = false
    }
  } else {
    showResults.value = true
  }
}

const previousPhrase = () => {
  if (currentPhraseIndex.value > 0) {
    currentPhraseIndex.value--
    // We might want to keep history if they go back, but resetting is cleaner for "retry" logic
    // actually, if they go back to a question they already answered correctly, we should probably keep it answered.
    // The current logic stores answer in `selectedAnswers`.
    // We can clear failedAttempts effectively since they might re-try? No, let's just clear failedAttempts.
    failedAttempts.value.clear()
    showGeneralError.value = false
  }
}

const resetGame = () => {
  currentPhraseIndex.value = 0
  selectedAnswers.value = Array(phrases.length).fill(null)
  showResults.value = false
  question3Attempts.value = new Set()
  showQuestion3Error.value = false
  failedAttempts.value = new Set()
  showGeneralError.value = false
}

const goToHome = () => {
  router.push('/home')
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 pt-24 md:pt-8 pb-8 px-4 md:px-8 flex flex-col justify-center">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-5xl font-bold text-pink-600 mb-4 text-center">Completa la Frase ✍️</h1>
      <p class="text-base md:text-lg text-gray-700 mb-8 text-center">Elige la palabra que mejor complete cada frase</p>

      <!-- Game Content -->
      <div v-if="!showResults"
        class="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-pink-300">
        <!-- Progress -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-600">Frase {{ currentPhraseIndex + 1 }} de {{ phrases.length }}</span>
            <span class="text-sm text-gray-600">{{selectedAnswers.filter(a => a !== null).length}}/{{ phrases.length
            }} completadas</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${((currentPhraseIndex + 1) / phrases.length) * 100}%` }"></div>
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
          <button v-for="(option, index) in currentPhrase.options" :key="index" @click="selectAnswer(index)"
            class="p-4 rounded-2xl font-semibold text-lg transition-all border-2" :class="[
              selectedAnswers[currentPhraseIndex] === index
                ? 'bg-pink-500 text-white border-pink-500 shadow-lg'
                : failedAttempts.has(index) || (currentPhraseIndex === 2 && question3Attempts.has(index))
                  ? 'bg-red-100 text-red-600 border-red-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300 hover:bg-pink-50'
            ]">
            {{ option }}
            <span v-if="failedAttempts.has(index) || (currentPhraseIndex === 2 && question3Attempts.has(index))" class="ml-2">❌</span>
          </button>
          
          <!-- Botón especial para pregunta 3 -->
          <button v-if="currentPhraseIndex === 2 && question3Attempts.size === 4"
            @click="selectAnswer(4)"
            class="p-4 rounded-2xl font-semibold text-lg transition-all border-2 col-span-1 md:col-span-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-lg hover:shadow-xl animate-bounce-in">
            ✨ Todas son correctas ✨
          </button>
        </div>

        <!-- Mensaje de error (General y Especial) -->
        <div v-if="showGeneralError || (currentPhraseIndex === 2 && showQuestion3Error)"
          class="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-2xl text-center animate-shake">
          <p class="text-red-600 font-semibold text-lg">❌ ¡Incorrecto! Sigue intentando...</p>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between items-center gap-4">
          <button @click="previousPhrase" :disabled="currentPhraseIndex === 0"
            class="px-6 py-3 rounded-full font-semibold transition-all" :class="currentPhraseIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-300 text-gray-700 hover:bg-gray-400'">
            ← Anterior
          </button>

          <button @click="nextPhrase" :disabled="!canContinue"
            class="px-6 py-3 rounded-full font-semibold transition-all" :class="canContinue
              ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'">
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
          <button @click="resetGame"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-8 rounded-full transition-all">
            Jugar de nuevo
          </button>
          <button @click="goToHome"
            class="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
            Volver al menú principal
          </button>
        </div>
      </div>
    </div>
    <!-- Reward Modal -->
    <div v-if="showReward" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="closeReward">
      <div
        class="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[90vh] flex flex-col items-center shadow-2xl animate-bounce-in relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-red-50/50 -z-10"></div>
        <h3 class="text-3xl font-bold text-pink-600 mb-6">¡Correcto! 🥰</h3>
        <div class="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-inner bg-gray-100 flex items-center justify-center">
          <img :src="currentPhrase.image || '/assets/placeholder.jpg'" alt="Recompensa"
            class="w-full h-full object-contain" />
        </div>
        <button @click="closeReward"
          class="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
          Continuar 💖
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
}

.animate-shake {
  animation: shake 0.6s ease-in-out;
}
</style>
