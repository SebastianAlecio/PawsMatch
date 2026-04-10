import { defineStore } from 'pinia'
import { getImageForPet, prefetchPets, getPets } from '../services/petService'

export const usePetsStore = defineStore('pets', {
  state: () => ({
    pets: getPets(),
    currentIndex: 0,
    currentImage: null,
    loading: false,
    filtroTipo: '',
    filtroUbicacion: '',
    matches: [],
  }),
  getters: {
    petsFiltrados(state) {
      let result = state.pets
      if (state.filtroTipo) {
        result = result.filter((pet) => pet.tipo === state.filtroTipo)
      }
      if (state.filtroUbicacion) {
        result = result.filter((pet) => pet.ubicacion === state.filtroUbicacion)
      }
      return result
    },
    currentPet() {
      return this.petsFiltrados[this.currentIndex] ?? null
    },
    hasNext() {
      return this.currentIndex < this.petsFiltrados.length - 1
    },
    progress() {
      const total = this.petsFiltrados.length
      if (total === 0) return '0 / 0'
      return `${this.currentIndex + 1} / ${total}`
    },
    matchCount(state) {
      return state.matches.length
    },
  },
  actions: {
    async loadCurrentPet() {
      const pet = this.currentPet
      if (!pet) return

      this.loading = true
      this.currentImage = await getImageForPet(pet)
      this.loading = false

      prefetchPets(this.petsFiltrados, this.currentIndex + 1)
    },
    async advance() {
      if (!this.hasNext) return
      this.currentIndex++
      await this.loadCurrentPet()
    },
    async like() {
      const pet = this.currentPet
      if (!pet) return
      if (!this.matches.some((m) => m.id === pet.id)) {
        this.matches.push({ ...pet, imagen: this.currentImage })
      }
      await this.advance()
    },
    async pass() {
      await this.advance()
    },
    async init() {
      this.currentIndex = 0
      await this.loadCurrentPet()
    },
    removeMatch(id) {
      this.matches = this.matches.filter((m) => m.id !== id)
    },
    async setFiltroTipo(tipo) {
      this.filtroTipo = tipo
      this.currentIndex = 0
      await this.loadCurrentPet()
    },
  },
})
