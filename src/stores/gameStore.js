import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // Estado
  const currentGame = ref(null)
  const completedGames = ref(new Set())
  
  // Lista de todos los juegos
  const allGames = ['quiz', 'memory', 'phrase', 'guess-photo']
  
  // Computed
  const allGamesCompleted = computed(() => {
    return allGames.every(game => completedGames.value.has(game))
  })
  
  // Acciones
  function setCurrentGame(game) {
    currentGame.value = game
  }
  
  function markGameAsCompleted(game) {
    completedGames.value.add(game)
    // Guardar en localStorage para persistencia
    localStorage.setItem('completedGames', JSON.stringify([...completedGames.value]))
  }
  
  function loadCompletedGames() {
    const saved = localStorage.getItem('completedGames')
    if (saved) {
      completedGames.value = new Set(JSON.parse(saved))
    }
  }
  
  function resetProgress() {
    completedGames.value = new Set()
    localStorage.removeItem('completedGames')
  }
  
  // Cargar juegos completados al iniciar
  loadCompletedGames()
  
  return {
    currentGame,
    completedGames,
    allGamesCompleted,
    setCurrentGame,
    markGameAsCompleted,
    resetProgress
  }
})
