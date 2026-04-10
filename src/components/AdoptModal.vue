<script setup>
import { ref } from 'vue'

const props = defineProps({
  pet: { type: Object, required: true },
})

const emit = defineEmits(['close'])

const nombre = ref('')
const email = ref('')
const mensaje = ref('')
const enviado = ref(false)

function onSubmit() {
  enviado.value = true
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-glass">
        <!-- Close -->
        <button class="absolute top-4 right-4 text-white/40 hover:text-white transition-colors" @click="emit('close')">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <!-- Success state -->
        <div v-if="enviado" class="text-center py-6">
          <div class="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white">Solicitud enviada</h3>
          <p class="text-white/50 text-sm mt-2 max-w-[260px] mx-auto">
            El refugio se pondrá en contacto contigo sobre <strong class="text-white/70">{{ pet.nombre }}</strong>.
          </p>
          <button
            class="mt-6 px-6 py-2.5 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-white/90 transition-colors"
            @click="emit('close')"
          >
            Cerrar
          </button>
        </div>

        <!-- Form state -->
        <template v-else>
          <h3 class="text-lg font-bold text-white mb-1">
            Adoptar a {{ pet.nombre }}
          </h3>
          <p class="text-white/40 text-sm mb-5">Completa tus datos y el refugio te contactará.</p>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Nombre</label>
              <input
                v-model="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                class="modal-input"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Email</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="tu@email.com"
                class="modal-input"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-white/50 mb-1.5">Mensaje</label>
              <textarea
                v-model="mensaje"
                rows="3"
                placeholder="Cuéntanos por qué quieres adoptar..."
                class="modal-input resize-none"
              />
            </div>
            <button
              type="submit"
              class="w-full py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-colors"
            >
              Enviar solicitud
            </button>
          </form>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgb(0 0 0 / 0.6);
  backdrop-filter: blur(4px);
  animation: overlay-in 0.2s ease;
}

.modal-glass {
  position: relative;
  width: 100%;
  max-width: 24rem;
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  background: rgb(30 30 50 / 0.85);
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: 1.25rem;
  padding: 1.75rem;
  animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-input {
  width: 100%;
  padding: 0.6rem 0.85rem;
  border-radius: 0.625rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background: rgb(255 255 255 / 0.05);
  color: white;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.25s ease;
  box-sizing: border-box;
}

.modal-input::placeholder {
  color: rgb(255 255 255 / 0.25);
}

.modal-input:focus {
  border-color: rgb(99 102 241 / 0.6);
}

@keyframes overlay-in {
  from { opacity: 0; }
}

@keyframes modal-in {
  from { opacity: 0; transform: scale(0.92) translateY(12px); }
}
</style>
