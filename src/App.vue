<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navigation from './components/Navigation.vue'

const route = useRoute()
let observer = null

function setupObserver() {
  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  )

  const revealElements = document.querySelectorAll('.reveal')
  revealElements.forEach((el) => observer.observe(el))
}

onMounted(() => {
  nextTick(() => {
    setupObserver()
  })
})

// Re-observar elementos cuando cambie la ruta
watch(route, () => {
  nextTick(() => {
    setupObserver()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <Navigation />
  
  <div class="hearts-pattern min-h-screen">
    <RouterView />
  </div>
</template>
