<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePetsStore } from '../stores/pets'

const store = usePetsStore()
const router = useRouter()

const ubicaciones = computed(() => {
  return [...new Set(store.pets.map((p) => p.ubicacion))].sort()
})

function aplicar() {
  store.init()
  router.push({ name: 'home' })
}

function limpiar() {
  store.filtroTipo = ''
  store.filtroUbicacion = ''
}
</script>

<template>
  <div class="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
    <div class="max-w-lg mx-auto">
      <h2 class="text-xl font-bold text-white mb-6">Filtros</h2>

      <!-- Tipo de mascota -->
      <section class="mb-8">
        <h3 class="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Tipo de mascota</h3>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="opt in [
              { label: 'Perro', value: 'perro', icon: '🐕' },
              { label: 'Gato', value: 'gato', icon: '🐈' },
              { label: 'Todos', value: '', icon: '🐾' },
            ]"
            :key="opt.value"
            class="filter-chip"
            :class="store.filtroTipo === opt.value ? 'filter-chip--active' : ''"
            @click="store.filtroTipo = opt.value"
          >
            <span class="text-lg">{{ opt.icon }}</span>
            <span>{{ opt.label }}</span>
          </button>
        </div>
      </section>

      <!-- Ubicación -->
      <section class="mb-8">
        <h3 class="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Ubicación</h3>
        <div class="flex flex-wrap gap-2">
          <button
            class="filter-pill"
            :class="store.filtroUbicacion === '' ? 'filter-pill--active' : ''"
            @click="store.filtroUbicacion = ''"
          >
            Todas
          </button>
          <button
            v-for="ubi in ubicaciones"
            :key="ubi"
            class="filter-pill"
            :class="store.filtroUbicacion === ubi ? 'filter-pill--active' : ''"
            @click="store.filtroUbicacion = ubi"
          >
            {{ ubi }}
          </button>
        </div>
      </section>

      <!-- Resultados preview -->
      <div class="text-white/30 text-sm mb-6">
        {{ store.petsFiltrados.length }} mascota{{ store.petsFiltrados.length !== 1 ? 's' : '' }} encontrada{{ store.petsFiltrados.length !== 1 ? 's' : '' }}
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button
          class="flex-1 py-2.5 rounded-full bg-white/5 text-white/50 text-sm font-medium ring-1 ring-white/10 hover:bg-white/10 transition-colors"
          @click="limpiar"
        >
          Limpiar
        </button>
        <button
          class="flex-1 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors"
          @click="aplicar"
        >
          Aplicar y buscar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 0.875rem 0.5rem;
  border-radius: 0.875rem;
  background: rgb(255 255 255 / 0.04);
  border: 1px solid rgb(255 255 255 / 0.08);
  color: rgb(255 255 255 / 0.5);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-chip:hover {
  background: rgb(255 255 255 / 0.08);
  color: rgb(255 255 255 / 0.7);
}

.filter-chip--active {
  background: rgb(99 102 241 / 0.15);
  border-color: rgb(99 102 241 / 0.4);
  color: white;
}

.filter-pill {
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  background: rgb(255 255 255 / 0.04);
  border: 1px solid rgb(255 255 255 / 0.08);
  color: rgb(255 255 255 / 0.5);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-pill:hover {
  background: rgb(255 255 255 / 0.08);
}

.filter-pill--active {
  background: rgb(99 102 241 / 0.15);
  border-color: rgb(99 102 241 / 0.4);
  color: white;
}
</style>
