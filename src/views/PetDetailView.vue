<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePetsStore } from '../stores/pets'
import AdoptModal from '../components/AdoptModal.vue'

const props = defineProps({
  id: { type: [String, Number], required: true },
})

const store = usePetsStore()
const router = useRouter()
const showModal = ref(false)

const pet = computed(() => store.matches.find((m) => m.id === Number(props.id)))

function removeMatch() {
  store.removeMatch(Number(props.id))
  router.push({ name: 'matches' })
}
</script>

<template>
  <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
    <div class="max-w-lg mx-auto">
      <!-- Back -->
      <button
        class="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors"
        @click="router.back()"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Volver
      </button>

      <template v-if="pet">
        <!-- Image -->
        <div class="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
          <img :src="pet.imagen" :alt="pet.nombre" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <!-- Info -->
        <div class="space-y-4">
          <div class="flex items-start justify-between">
            <div>
              <h1 class="text-2xl font-bold text-white">{{ pet.nombre }}</h1>
              <p class="text-white/50 text-sm mt-0.5">{{ pet.raza }} · {{ pet.edad }}</p>
            </div>
            <span
              class="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full shrink-0"
              :class="
                pet.tipo === 'perro'
                  ? 'bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30'
                  : 'bg-purple-400/15 text-purple-300 ring-1 ring-purple-400/30'
              "
            >
              {{ pet.tipo === 'perro' ? 'Perro' : 'Gato' }}
            </span>
          </div>

          <!-- Location -->
          <div class="flex items-center gap-2 text-white/40 text-sm">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ pet.ubicacion }}
          </div>

          <!-- Description -->
          <div class="detail-glass">
            <p class="text-white/70 text-sm leading-relaxed">{{ pet.descripcion }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-2">
            <button
              class="flex-1 py-3 rounded-2xl bg-white/5 text-white/40 text-sm font-medium ring-1 ring-white/10 hover:bg-white/10 hover:text-white/60 transition-all"
              @click="removeMatch"
            >
              Quitar match
            </button>
            <button
              class="flex-1 py-3 rounded-2xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20"
              @click="showModal = true"
            >
              Adoptar
            </button>
          </div>
        </div>
      </template>

      <!-- Not found -->
      <div v-else class="text-center py-20">
        <p class="text-white/30">Mascota no encontrada</p>
      </div>
    </div>
  </div>

  <AdoptModal v-if="showModal" :pet="pet" @close="showModal = false" />
</template>

<style scoped>
.detail-glass {
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
  background: rgb(255 255 255 / 0.04);
  border: 1px solid rgb(255 255 255 / 0.08);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
}
</style>
