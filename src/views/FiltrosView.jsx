import { useMemo } from 'react'
import { usePets } from '../context/PetsContext'

export default function FiltrosView() {
  const {
    pets,
    petsFiltrados,
    filtroTipo,
    filtroUbicacion,
    setFiltroTipo,
    setFiltroUbicacion,
    clearFilters,
    resetIndex,
    navigate,
  } = usePets()

  const ubicaciones = useMemo(() => {
    return [...new Set(pets.map((p) => p.ubicacion))].sort()
  }, [pets])

  function aplicar() {
    resetIndex()
    navigate('home')
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">Filtros</h2>

        <section className="mb-8">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            Tipo de mascota
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Perro', value: 'perro', icon: '🐕' },
              { label: 'Gato', value: 'gato', icon: '🐈' },
              { label: 'Todos', value: '', icon: '🐾' },
            ].map((opt) => (
              <button
                key={opt.value}
                className={`filter-chip ${filtroTipo === opt.value ? 'filter-chip--active' : ''}`}
                onClick={() => setFiltroTipo(opt.value)}
              >
                <span className="text-lg">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            Ubicación
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`filter-pill ${filtroUbicacion === '' ? 'filter-pill--active' : ''}`}
              onClick={() => setFiltroUbicacion('')}
            >
              Todas
            </button>
            {ubicaciones.map((ubi) => (
              <button
                key={ubi}
                className={`filter-pill ${filtroUbicacion === ubi ? 'filter-pill--active' : ''}`}
                onClick={() => setFiltroUbicacion(ubi)}
              >
                {ubi}
              </button>
            ))}
          </div>
        </section>

        <div className="text-white/30 text-sm mb-6">
          {petsFiltrados.length} mascota{petsFiltrados.length !== 1 ? 's' : ''}{' '}
          encontrada{petsFiltrados.length !== 1 ? 's' : ''}
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 py-2.5 rounded-full bg-white/5 text-white/50 text-sm font-medium ring-1 ring-white/10 hover:bg-white/10 transition-colors"
            onClick={clearFilters}
          >
            Limpiar
          </button>
          <button
            className="flex-1 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors"
            onClick={aplicar}
          >
            Aplicar y buscar
          </button>
        </div>
      </div>
    </div>
  )
}
