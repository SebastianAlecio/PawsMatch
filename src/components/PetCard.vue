<script setup>
defineProps({
  pet: { type: Object, required: true },
  imagen: { type: String, required: true },
  loading: { type: Boolean, default: false },
})
</script>

<template>
  <div class="pet-card group">
    <!-- Imagen fullbleed -->
    <div class="pet-card__image">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-900/40">
        <div class="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
      <template v-else>
        <img
          :src="imagen"
          :alt="pet.nombre"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
      </template>
    </div>

    <!-- Glass overlay con info -->
    <div class="pet-card__info">
      <div class="pet-card__glass">
        <!-- Badge tipo -->
        <span
          class="inline-block text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full mb-2 transition-colors duration-300"
          :class="
            pet.tipo === 'perro'
              ? 'bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/30'
              : 'bg-purple-400/20 text-purple-200 ring-1 ring-purple-400/30'
          "
        >
          {{ pet.tipo === 'perro' ? 'Perro' : 'Gato' }}
        </span>

        <!-- Nombre y edad -->
        <div class="flex items-baseline gap-2">
          <h2 class="text-2xl sm:text-3xl font-bold text-white leading-tight">
            {{ pet.nombre }}
          </h2>
          <span class="text-white/70 text-sm font-medium">{{ pet.edad }}</span>
        </div>

        <!-- Raza -->
        <p class="text-white/60 text-sm mt-1">{{ pet.raza }}</p>

        <!-- Ubicación -->
        <div class="flex items-center gap-1.5 mt-2 text-white/50 text-xs">
          <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{{ pet.ubicacion }}</span>
        </div>

        <!-- Descripción (visible en hover / tap) -->
        <p class="pet-card__desc text-white/70 text-sm leading-relaxed mt-3">
          {{ pet.descripcion }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pet-card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.25rem;
  overflow: hidden;
  cursor: pointer;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1),
    0 0 0 1px rgb(255 255 255 / 0.05) inset;
  transition: box-shadow 0.4s ease, transform 0.4s ease;
}

.pet-card:hover {
  box-shadow:
    0 20px 40px -12px rgb(0 0 0 / 0.35),
    0 0 0 1px rgb(255 255 255 / 0.1) inset;
  transform: translateY(-4px);
}

.pet-card__image {
  position: absolute;
  inset: 0;
  background-color: #1a1a2e;
}

.pet-card__info {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  padding: 1rem;
  z-index: 10;
}

.pet-card__glass {
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  background: rgb(255 255 255 / 0.08);
  border: 1px solid rgb(255 255 255 / 0.12);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  transition: background 0.4s ease, border-color 0.4s ease;
}

.pet-card:hover .pet-card__glass {
  background: rgb(255 255 255 / 0.14);
  border-color: rgb(255 255 255 / 0.2);
}

/* Descripción: hidden por defecto, aparece en hover */
.pet-card__desc {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.4s ease 0.1s,
              margin-top 0.4s ease;
  margin-top: 0;
}

.pet-card:hover .pet-card__desc {
  max-height: 6rem;
  opacity: 1;
  margin-top: 0.75rem;
}

/* En mobile la descripción siempre es visible (no hay hover) */
@media (hover: none) {
  .pet-card__desc {
    max-height: 6rem;
    opacity: 1;
    margin-top: 0.75rem;
  }
}

@media (min-width: 640px) {
  .pet-card__glass {
    padding: 1.25rem 1.5rem;
  }
}
</style>
