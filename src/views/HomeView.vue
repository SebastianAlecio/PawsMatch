<script setup>
import { ref, onMounted } from 'vue'
import { usePetsStore } from '../stores/pets'
import PetCard from '../components/PetCard.vue'
import SwipeContainer from '../components/SwipeContainer.vue'

const store = usePetsStore()
const swipeRef = ref(null)

onMounted(() => {
  if (!store.currentImage) store.init()
})
</script>

<template>
  <div class="flex flex-col items-center flex-1 min-h-0 px-4 pb-2">
    <!-- Swipe card area -->
    <div class="w-full max-w-md flex-1 min-h-0">
      <SwipeContainer
        v-if="store.currentPet"
        :key="store.currentPet.id"
        ref="swipeRef"
        @like="store.like()"
        @pass="store.pass()"
      >
        <PetCard
          :pet="store.currentPet"
          :imagen="store.currentImage"
          :loading="store.loading"
        />
      </SwipeContainer>

      <!-- Empty state -->
      <div
        v-else-if="!store.loading"
        class="h-full flex flex-col items-center justify-center text-center py-20"
      >
        <div class="w-16 h-16 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <p class="text-white/30 text-lg">No hay más mascotas</p>
        <p v-if="store.matchCount > 0" class="text-white/20 text-sm mt-1">
          Tienes {{ store.matchCount }} match{{ store.matchCount > 1 ? 'es' : '' }}
        </p>
        <router-link
          v-if="store.matchCount > 0"
          :to="{ name: 'matches' }"
          class="mt-4 px-5 py-2 rounded-full bg-white/10 text-white/60 text-sm hover:bg-white/15 transition-colors ring-1 ring-white/10"
        >
          Ver matches
        </router-link>
      </div>
    </div>

    <!-- Action buttons -->
    <div v-if="store.currentPet" class="flex items-center gap-8 mt-3 shrink-0">
      <button class="action-btn action-btn--pass" @click="swipeRef?.onPassButton()">
        <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <span class="text-sm text-white/30 tabular-nums min-w-[3.5rem] text-center">
        {{ store.progress }}
      </span>

      <button class="action-btn action-btn--like" @click="swipeRef?.onLikeButton()">
        <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
    </div>
  </div>
</template>
