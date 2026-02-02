<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'

const gameStore = useGameStore()
const currentQuestion = ref(0)
const score = ref(0)
const gameFinished = ref(false)
const selectedAnswer = ref(null)
const showResults = ref(false)

const questions = [
    {
        question: '¿Cuál fue nuestra primera película juntos?',
        options: ['Host', 'A todos los chicos de los que me enamore', 'Hush', 'After'],
        correct: 2
    },
    {
        question: '¿Cuál es mi comida favorita?',
        options: ['Anvorguesa', 'Pipsa', 'Petxugas empanadas', 'Ous rellens'],
        correct: 2
    },
]

function selectAnswer(index) {
    if (showResults.value) return // Evitar múltiples clicks
    
    selectedAnswer.value = index
    showResults.value = true
    
    if (index === questions[currentQuestion.value].correct) {
        score.value++
    }

    // Esperar 1.5 segundos antes de continuar
    setTimeout(() => {
        if (currentQuestion.value < questions.length - 1) {
            currentQuestion.value++
            selectedAnswer.value = null
            showResults.value = false
        } else {
            finishGame()
        }
    }, 1500)
}

function getButtonClass(index) {
    if (!showResults.value) {
        return 'border-pink-200 hover:border-pink-500 hover:bg-pink-50'
    }
    
    const correctIndex = questions[currentQuestion.value].correct
    
    if (index === correctIndex) {
        return 'border-green-500 bg-green-100 text-green-800'
    } else if (index === selectedAnswer.value) {
        return 'border-red-500 bg-red-100 text-red-800'
    } else {
        return 'border-gray-300 bg-gray-50 text-gray-500'
    }
}

function finishGame() {
    gameFinished.value = true
    gameStore.updateScore('quiz', score.value)
    gameStore.markGameAsCompleted('quiz')
}

function restartGame() {
    currentQuestion.value = 0
    score.value = 0
    gameFinished.value = false
    selectedAnswer.value = null
    showResults.value = false
}
</script>

<template>
    <div class="min-h-screen p-8 flex items-center justify-center">
        <div class="max-w-2xl w-full">

            <div v-if="!gameFinished"
                class="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-4 border-pink-300">
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-sm font-semibold text-gray-600">Pregunta {{ currentQuestion + 1 }}/{{
                            questions.length }}</span>
                        <span class="text-sm font-semibold text-purple-600">Puntos: {{ score }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                            :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }">
                        </div>
                    </div>
                </div>

                <h2 class="text-3xl font-bold text-gray-800 mb-8">
                    {{ questions[currentQuestion].question }}
                </h2>

                <div class="space-y-4">
                    <button v-for="(option, index) in questions[currentQuestion].options" :key="index"
                        @click="selectAnswer(index)"
                        :disabled="showResults"
                        class="w-full p-4 text-left rounded-xl border-2 transition-all font-semibold"
                        :class="getButtonClass(index)">
                        {{ option }}
                    </button>
                </div>
            </div>

            <div v-else
                class="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-4 border-pink-300 text-center">
                <div class="flex flex-col items-center space-y-6">
                    <img src="/games/quiz/happy_monkey.jpg" alt="Monazo" class="w-48 h-48 object-cover rounded-lg">
                    <h2 class="text-4xl font-bold text-gray-800">¡Juego Completado!</h2>
                    <p class="text-2xl text-purple-600">Puntuación: {{ score }}/{{ questions.length }}</p>
                    <p v-if="score <= questions.length / 2" class="text-xl text-gray-800">Cagaste <b>mamarracha</b>, que poco me conoces.</p>

                    <div class="flex gap-4">
                        <button @click="restartGame"
                            class="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600">
                            Jugar de nuevo
                        </button>
                        <router-link to="/"
                            class="inline-block bg-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600">
                            Volver al inicio
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
