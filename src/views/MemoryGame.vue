<script setup>
import { ref, computed, watch } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const baseUrl = import.meta.env.BASE_URL

// Definir las 5 parejas de cartas con sus significados
const cardPairs = [
  { 
    pairId: 1, 
    images: ['1_1.jpg', '1_2.jpg'],
    meaning: 'Nuestras primeras fotitos!'
  },
  { 
    pairId: 2, 
    images: ['2_1.jpg', '2_2.jpg'],
    meaning: 'Tú con los michis! 🐱'
  },
  { 
    pairId: 3, 
    images: ['3_1.jpg', '3_2.jpg'],
    meaning: 'Tus siestecitas y lo guapa que estás recién despertada 😍'
  },
  { 
    pairId: 4, 
    images: ['4_1.jpg', '4_2.jpg'],
    meaning: 'No hace falta explicación JAJAJA'
  },
  { 
    pairId: 5, 
    images: ['5_1.jpg', '5_2.jpg'],
    meaning: 'Mi niña bonita 💕'
  }
]

const cards = ref([])
const flippedCards = ref([])
const moves = ref(0)
const matchedPairs = ref(0)
const messageQueue = ref([])
const currentMessage = ref(null)
let messageTimeout = null

const gameWon = computed(() => matchedPairs.value === 5)

// Marcar juego como completado cuando se gana
watch(gameWon, (won) => {
  if (won) {
    gameStore.markGameAsCompleted('memory')
  }
})

// Inicializar el juego
const initializeGame = () => {
  const allCards = []
  
  // Crear todas las cartas
  cardPairs.forEach(pair => {
    pair.images.forEach(image => {
      allCards.push({
        pairId: pair.pairId,
        image: image,
        isFlipped: false,
        isMatched: false
      })
    })
  })
  
  // Barajar las cartas
  cards.value = allCards.sort(() => Math.random() - 0.5)
  flippedCards.value = []
  moves.value = 0
  matchedPairs.value = 0
}

// Voltear carta
const flipCard = (index) => {
  const card = cards.value[index]
  
  // No hacer nada si la carta ya está volteada o emparejada
  if (card.isFlipped || card.isMatched) return
  
  // Voltear la carta
  card.isFlipped = true
  flippedCards.value.push(index)
  
  // Si hay dos cartas volteadas, comprobar si coinciden
  if (flippedCards.value.length === 2) {
    moves.value++
    checkMatch()
  }
}

// Mostrar mensaje con cola
const showMessage = (message, type) => {
  messageQueue.value.push({ message, type, id: Date.now() })
  
  // Si no hay un mensaje mostrandose actualmente, mostrar el siguiente
  if (!currentMessage.value) {
    showNextMessage()
  }
}

const showNextMessage = () => {
  if (messageQueue.value.length === 0) {
    currentMessage.value = null
    return
  }
  
  // Mostrar el siguiente mensaje de la cola
  currentMessage.value = messageQueue.value.shift()
  
  // Limpiar el timeout anterior si existe
  if (messageTimeout) {
    clearTimeout(messageTimeout)
  }
  
  // Programar la eliminación del mensaje y mostrar el siguiente
  messageTimeout = setTimeout(() => {
    showNextMessage()
  }, 3000)
}

// Comprobar si hay coincidencia
const checkMatch = () => {
  const [firstIndex, secondIndex] = flippedCards.value
  const firstCard = cards.value[firstIndex]
  const secondCard = cards.value[secondIndex]
  
  if (firstCard.pairId === secondCard.pairId) {
    // ¡Coincidencia!
    firstCard.isMatched = true
    secondCard.isMatched = true
    matchedPairs.value++
    flippedCards.value = []
    
    // Buscar el significado de esta pareja
    const pair = cardPairs.find(p => p.pairId === firstCard.pairId)
    if (pair) {
      showMessage(pair.meaning, 'success')
    }
  } else {
    // No coinciden, mostrar mensaje de error
    showMessage('Cagaste! 😅', 'error')
    
    // Voltear de nuevo después de un momento
    setTimeout(() => {
      firstCard.isFlipped = false
      secondCard.isFlipped = false
      flippedCards.value = []
    }, 1000)
  }
}

// Reiniciar el juego
const resetGame = () => {
  messageQueue.value = []
  currentMessage.value = null
  if (messageTimeout) {
    clearTimeout(messageTimeout)
  }
  initializeGame()
}

// Inicializar al montar el componente
initializeGame()
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 pt-24 md:pt-8 pb-8 px-4 md:px-8 flex flex-col justify-center">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl md:text-5xl font-bold text-purple-600 mb-4 text-center">Memory Game 🃏</h1>
      <p class="text-base md:text-lg text-gray-700 mb-6 text-center">Encuentra todas las parejas de fotos</p>
      
      <!-- Stats -->
      <div class="flex justify-center gap-6 mb-8 text-center">
        <div class="bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg">
          <div class="text-sm text-gray-600">Movimientos</div>
          <div class="text-2xl font-bold text-purple-600">{{ moves }}</div>
        </div>
        <div class="bg-white/80 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg">
          <div class="text-sm text-gray-600">Parejas encontradas</div>
          <div class="text-2xl font-bold text-pink-600">{{ matchedPairs }}/5</div>
        </div>
      </div>

      <!-- Game Board -->
      <div class="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 perspective-1000">
        <div
          v-for="(card, index) in cards"
          :key="index"
          @click="flipCard(index)"
          class="w-24 h-24 md:w-48 md:h-48 relative cursor-pointer group"
          :class="{
            'pointer-events-none': card.isFlipped || card.isMatched || flippedCards.length >= 2
          }"
        >
          <div
            class="w-full h-full transition-all duration-500 transform-style-3d shadow-xl rounded-xl"
            :class="{ 'rotate-y-180': card.isFlipped || card.isMatched }"
          >
            <!-- Front (card back) -->
            <div
              class="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center backface-hidden border-2 border-white/20"
            >
              <div class="text-3xl md:text-6xl animate-pulse">💕</div>
            </div>
            
            <!-- Back (card image) -->
            <div
              class="absolute inset-0 w-full h-full bg-white rounded-xl rotate-y-180 backface-hidden overflow-hidden border-2 border-purple-200"
            >
              <img
                :src="`${baseUrl}games/memory/${card.image}`"
                :alt="`Carta ${card.pairId}`"
                class="w-full h-full object-cover"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Message Toast -->
      <transition name="slide-up">
        <div
          v-if="currentMessage"
          :key="currentMessage.id"
          class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-md mx-4"
        >
          <div
            class="rounded-2xl p-4 shadow-2xl backdrop-blur-lg"
            :class="currentMessage.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'"
          >
            <p class="text-center font-semibold">{{ currentMessage.message }}</p>
          </div>
        </div>
      </transition>

      <!-- Reset Button -->
      <div class="text-center">
        <button
          @click="resetGame"
          class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
        >
          Reiniciar Juego
        </button>
      </div>

      <!-- Victory Modal -->
      <div
        v-if="gameWon"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl" @click.stop>
          <div class="text-6xl mb-4">💖</div>
          <h2 class="text-3xl font-bold text-purple-600 mb-4">¡Felicidades putilla!</h2>
          <p class="text-lg text-gray-600 mb-6">Te ha costado un total de <span class="font-bold text-purple-600">{{ moves }}</span> movimientos</p>
          <router-link
            to="/home"
            class="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Volver al menú principal
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translate(-50%, 100px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translate(-50%, 100px);
  opacity: 0;
}
</style>
