import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import petsData from '../data/pets.json'

const PetsContext = createContext(null)

export function PetsProvider({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroUbicacion, setFiltroUbicacion] = useState('')
  const [matches, setMatches] = useState([])
  const [view, setView] = useState('home')
  const [selectedPetId, setSelectedPetId] = useState(null)

  const pets = petsData

  const petsFiltrados = useMemo(() => {
    return pets.filter((pet) => {
      if (filtroTipo && pet.tipo !== filtroTipo) return false
      if (filtroUbicacion && pet.ubicacion !== filtroUbicacion) return false
      return true
    })
  }, [pets, filtroTipo, filtroUbicacion])

  const currentPet = petsFiltrados[currentIndex] ?? null
  const hasNext = currentIndex < petsFiltrados.length - 1
  const progress =
    petsFiltrados.length === 0
      ? '0 / 0'
      : `${currentIndex + 1} / ${petsFiltrados.length}`
  const matchCount = matches.length

  const like = useCallback(() => {
    const pet = petsFiltrados[currentIndex]
    if (!pet) return
    setMatches((prev) => {
      if (prev.some((m) => m.id === pet.id)) return prev
      return [...prev, { ...pet }]
    })
    setCurrentIndex((i) => i + 1)
  }, [currentIndex, petsFiltrados])

  const pass = useCallback(() => {
    setCurrentIndex((i) => i + 1)
  }, [])

  const removeMatch = useCallback((id) => {
    setMatches((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const navigate = useCallback((newView, params) => {
    setView(newView)
    if (params?.id !== undefined) setSelectedPetId(params.id)
  }, [])

  const resetIndex = useCallback(() => {
    setCurrentIndex(0)
  }, [])

  const clearFilters = useCallback(() => {
    setFiltroTipo('')
    setFiltroUbicacion('')
  }, [])

  const value = {
    pets,
    petsFiltrados,
    currentPet,
    currentIndex,
    hasNext,
    progress,
    matchCount,
    matches,
    filtroTipo,
    filtroUbicacion,
    view,
    selectedPetId,
    setFiltroTipo,
    setFiltroUbicacion,
    like,
    pass,
    removeMatch,
    navigate,
    resetIndex,
    clearFilters,
  }

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>
}

export function usePets() {
  const ctx = useContext(PetsContext)
  if (!ctx) throw new Error('usePets must be used within PetsProvider')
  return ctx
}
