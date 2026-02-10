<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 flex items-center justify-center p-4 overflow-hidden">
    <div class="text-center max-w-md relative">

      <!-- Corazón -->
      <div class="mb-8 text-6xl md:text-8xl animate-bounce">💕</div>

      <h1 class="text-3xl md:text-5xl font-bold text-pink-700 mb-4">
        ¿Usted desearía ser mi San Valentín?
      </h1>

      <p class="text-lg md:text-xl text-gray-700 mb-12">
        Tengo algunos jueguecillos preparados para nosotros dos. ¿Aseptas?
      </p>

      <!-- Botón SI -->
      <button
        ref="yesButton"
        @click="acceptProposal"
        class="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-lg transition-all duration-300 relative z-10"
        :style="{
          padding: `${yesPadding}px ${yesPadding * 1.6}px`,
          fontSize: `${yesSize}px`,
          transform: finalMode ? 'scale(1.3)' : 'scale(1)'
        }"
      >
        ¡Sí! 💖
      </button>

      <!-- Texto motivador -->
      <p v-if="noClickCount > 0" class="mt-6 text-gray-600 animate-pulse">
        {{ encouragementTexts[Math.min(noClickCount - 1, encouragementTexts.length - 1)] }}
      </p>
    </div>

    <!-- Botón NO -->
    <button
      ref="noButton"
      @mouseenter="handleNoHover"
      @click="handleNoClick"
      class="fixed bg-gray-400 text-white font-bold rounded-full shadow-lg transition-all"
      :style="{
        left: `${noPos.x}px`,
        top: `${noPos.y}px`,
        padding: '12px 24px',
        zIndex: 9999,
        cursor: dodgesLeft ? 'pointer' : 'not-allowed'
      }"
    >
      No
    </button>

    <!-- Efecto final -->
    <div v-if="finalMode" class="fixed inset-0 pointer-events-none hearts">
      💕 💖 💘 💝 💞 💗 💓
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const MAX_DODGES = 5

const yesButton = ref(null)
const noButton = ref(null)

const noHoverCount = ref(0)
const noClickCount = ref(0)
const finalMode = ref(false)

const yesSize = ref(18)
const yesPadding = computed(() => 14 + noClickCount.value * 6)

const noPos = ref({ x: 0, y: 0 })

const encouragementTexts = [
  '¿Seguro? 🥺',
  'Piénsalo mejor...',
  'Venga 😭',
  'Por favor!!',
  'Ya sabes la respuesta 😏'
]

const dodgesLeft = computed(() => noHoverCount.value < MAX_DODGES)

const randomPosition = () => {
  const padding = 20
  return {
    x: Math.random() * (window.innerWidth - 150) + padding,
    y: Math.random() * (window.innerHeight - 100) + padding
  }
}

const placeNoNextToYes = () => {
  const rect = yesButton.value.getBoundingClientRect()
  noPos.value = {
    x: rect.right + 20,
    y: rect.top
  }
}

const handleNoHover = () => {
  if (!dodgesLeft.value) return
  noHoverCount.value++
  noPos.value = randomPosition()
}

const handleNoClick = () => {
  if (dodgesLeft.value) {
    handleNoHover()
    return
  }

  noClickCount.value++
  yesSize.value += 10

  if (yesSize.value > 48) {
    triggerFinal()
  }
}

const triggerFinal = () => {
  finalMode.value = true
  setTimeout(acceptProposal, 1500)
}

const acceptProposal = () => {
  router.push('/home')
}

const handleResize = () => {
  if (noHoverCount.value === 0) {
    placeNoNextToYes()
  }
}

onMounted(() => {
  placeNoNextToYes()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes hearts {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(2); }
}

.hearts {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  animation: hearts 1.2s ease-out forwards;
}
</style>
