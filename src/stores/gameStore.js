import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  // Estado
  const currentGame = ref(null)
  const scores = ref({
    quiz: 0,
    memory: 0,
    hearts: 0,
    phrase: 0
  })
  const completedGames = ref([])
  
  // Acciones
  function setCurrentGame(game) {
    currentGame.value = game
  }
  
  function updateScore(game, score) {
    scores.value[game] = score
  }
  
  function markGameAsCompleted(game) {
    if (!completedGames.value.includes(game)) {
      completedGames.value.push(game)
    }
  }
  
  function resetScores() {
    scores.value = {
      quiz: 0,
      memory: 0,
      hearts: 0,
      phrase: 0
    }
    completedGames.value = []
  }
  
  return {
    currentGame,
    scores,
    completedGames,
    setCurrentGame,
    updateScore,
    markGameAsCompleted,
    resetScores
  }
})
