# Carpeta de Imágenes de los Juegos

## Estructura:
```
public/games/
├── quiz/       → Imágenes para el juego de preguntas
├── memory/     → Fotos para el memory game
├── hearts/     → Imágenes para caza de corazones
└── phrase/     → Imágenes para completa la frase
```

## Cómo usar las imágenes:

### En Vue (template):
```vue
<img src="/games/memory/foto1.jpg" alt="Descripción">
```

### Con v-for dinámico:
```vue
<img :src="`/games/memory/${image}`" alt="Foto">
```

### En JavaScript:
```js
const imagePath = '/games/quiz/pregunta1.jpg'
```

## Formatos recomendados:
- JPG/JPEG: Fotos
- PNG: Imágenes con transparencia
- WebP: Mejor compresión (recomendado)
