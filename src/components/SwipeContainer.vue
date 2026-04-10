<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['like', 'pass'])

const THRESHOLD = 100
const EXIT_DISTANCE = 600

const startX = ref(0)
const offsetX = ref(0)
const dragging = ref(false)
const exiting = ref(false)
const exitDirection = ref(0)

const cardStyle = computed(() => {
  if (exiting.value) {
    return {
      transform: `translateX(${exitDirection.value * EXIT_DISTANCE}px) rotate(${exitDirection.value * 30}deg)`,
      opacity: 0,
      transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
    }
  }
  if (!dragging.value) {
    return {
      transform: 'translateX(0) rotate(0)',
      transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }
  }
  const rotate = offsetX.value * 0.08
  return {
    transform: `translateX(${offsetX.value}px) rotate(${rotate}deg)`,
    transition: 'none',
  }
})

const swipeIntent = computed(() => {
  if (exiting.value) return exitDirection.value > 0 ? 'like' : 'pass'
  if (!dragging.value) return null
  if (offsetX.value > THRESHOLD * 0.4) return 'like'
  if (offsetX.value < -THRESHOLD * 0.4) return 'pass'
  return null
})

const intentOpacity = computed(() => {
  if (exiting.value) return 1
  const ratio = Math.min(Math.abs(offsetX.value) / THRESHOLD, 1)
  return ratio
})

function onPointerDown(e) {
  if (exiting.value) return
  dragging.value = true
  startX.value = e.clientX ?? e.touches[0].clientX
}

function onPointerMove(e) {
  if (!dragging.value) return
  const clientX = e.clientX ?? e.touches[0].clientX
  offsetX.value = clientX - startX.value
}

function onPointerEnd() {
  if (!dragging.value) return
  dragging.value = false

  if (offsetX.value > THRESHOLD) {
    triggerExit(1)
  } else if (offsetX.value < -THRESHOLD) {
    triggerExit(-1)
  } else {
    offsetX.value = 0
  }
}

function triggerExit(direction) {
  exiting.value = true
  exitDirection.value = direction
  offsetX.value = 0

  setTimeout(() => {
    if (direction > 0) emit('like')
    else emit('pass')
    exiting.value = false
    exitDirection.value = 0
  }, 450)
}

function onLikeButton() {
  if (exiting.value) return
  triggerExit(1)
}

function onPassButton() {
  if (exiting.value) return
  triggerExit(-1)
}

defineExpose({ onLikeButton, onPassButton })
</script>

<template>
  <div class="swipe-area">
    <!-- Card draggable -->
    <div
      class="swipe-card"
      :style="cardStyle"
      @mousedown.prevent="onPointerDown"
      @mousemove.prevent="onPointerMove"
      @mouseup="onPointerEnd"
      @mouseleave="onPointerEnd"
      @touchstart.passive="onPointerDown"
      @touchmove.passive="onPointerMove"
      @touchend="onPointerEnd"
      @touchcancel="onPointerEnd"
    >
      <!-- LIKE / PASS stamps -->
      <div
        v-if="swipeIntent === 'like'"
        class="swipe-stamp swipe-stamp--like"
        :style="{ opacity: intentOpacity }"
      >
        LIKE
      </div>
      <div
        v-if="swipeIntent === 'pass'"
        class="swipe-stamp swipe-stamp--pass"
        :style="{ opacity: intentOpacity }"
      >
        PASS
      </div>

      <slot />
    </div>
  </div>
</template>

<style scoped>
.swipe-area {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  touch-action: pan-y;
}

.swipe-card {
  position: relative;
  height: 100%;
  will-change: transform;
  transform-origin: 50% 80%;
}

.swipe-stamp {
  position: absolute;
  top: 2rem;
  z-index: 30;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  border: 4px solid;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.swipe-stamp--like {
  left: 1.5rem;
  color: #4ade80;
  border-color: #4ade80;
  background: rgb(74 222 128 / 0.1);
  transform: rotate(-12deg);
}

.swipe-stamp--pass {
  right: 1.5rem;
  color: #f87171;
  border-color: #f87171;
  background: rgb(248 113 113 / 0.1);
  transform: rotate(12deg);
}
</style>
