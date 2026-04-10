<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="h-dvh bg-gray-950 text-white flex flex-col overflow-hidden pb-16">
    <!-- Header -->
    <header class="px-4 pt-6 pb-4 sm:pt-8 sm:pb-6">
      <div class="max-w-lg mx-auto">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight">PawsMatch</h1>
        <p class="text-white/40 text-sm mt-0.5">Encuentra tu compañero ideal</p>
      </div>
    </header>

    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <NavBar />
  </div>
</template>

<style>
/* Action buttons (used by HomeView) */
.action-btn {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  border: none;
}

.action-btn:active {
  transform: scale(0.9);
}

.action-btn--pass {
  background: rgb(255 255 255 / 0.05);
  color: #f87171;
  box-shadow: 0 0 0 1px rgb(248 113 113 / 0.2);
}

.action-btn--pass:hover {
  background: rgb(248 113 113 / 0.15);
  box-shadow: 0 0 20px rgb(248 113 113 / 0.15), 0 0 0 1px rgb(248 113 113 / 0.3);
  transform: scale(1.1);
}

.action-btn--like {
  background: rgb(255 255 255 / 0.05);
  color: #4ade80;
  box-shadow: 0 0 0 1px rgb(74 222 128 / 0.2);
}

.action-btn--like:hover {
  background: rgb(74 222 128 / 0.15);
  box-shadow: 0 0 20px rgb(74 222 128 / 0.15), 0 0 0 1px rgb(74 222 128 / 0.3);
  transform: scale(1.1);
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
