<script setup>
import { usePetsStore } from '../stores/pets'

const store = usePetsStore()
</script>

<template>
  <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
    <div class="max-w-lg mx-auto">
      <h2 class="text-xl font-bold text-white mb-1">Mis Matches</h2>
      <p class="text-white/40 text-sm mb-6">
        {{ store.matchCount }} mascota{{ store.matchCount !== 1 ? 's' : '' }} que te gustaron
      </p>

      <!-- Grid -->
      <div v-if="store.matchCount > 0" class="grid grid-cols-2 gap-3">
        <router-link
          v-for="pet in store.matches"
          :key="pet.id"
          :to="{ name: 'pet-detail', params: { id: pet.id } }"
          class="match-card group"
        >
          <img
            :src="pet.imagen"
            :alt="pet.nombre"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 inset-x-0 p-3">
            <div class="match-card__glass">
              <h3 class="text-sm font-bold text-white leading-tight">{{ pet.nombre }}</h3>
              <p class="text-white/50 text-[11px] mt-0.5">{{ pet.raza }}</p>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Empty -->
      <div v-else class="text-center py-20">
        <div class="w-16 h-16 mx-auto rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center mb-4">
          <svg class="w-7 h-7 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <p class="text-white/30">Aún no tienes matches</p>
        <p class="text-white/20 text-sm mt-1">Haz swipe a la derecha en las mascotas que te gusten</p>
        <router-link
          :to="{ name: 'home' }"
          class="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 text-white/60 text-sm hover:bg-white/15 transition-colors ring-1 ring-white/10"
        >
          Ir a buscar
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.match-card {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 1rem;
  overflow: hidden;
  background: #1a1a2e;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.match-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -8px rgb(0 0 0 / 0.4);
}

.match-card__glass {
  backdrop-filter: blur(12px) saturate(1.3);
  -webkit-backdrop-filter: blur(12px) saturate(1.3);
  background: rgb(255 255 255 / 0.08);
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: 0.625rem;
  padding: 0.5rem 0.625rem;
}
</style>
