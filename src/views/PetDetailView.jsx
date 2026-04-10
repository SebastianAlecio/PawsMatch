import { useState } from 'react'
import { usePets } from '../context/PetsContext'
import AdoptModal from '../components/AdoptModal'

export default function PetDetailView({ id }) {
  const { matches, removeMatch, navigate } = usePets()
  const [showModal, setShowModal] = useState(false)

  const pet = matches.find((m) => m.id === Number(id))

  function handleRemove() {
    removeMatch(Number(id))
    navigate('matches')
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
      <div className="max-w-lg mx-auto">
        <button
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors"
          onClick={() => navigate('matches')}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Volver
        </button>

        {pet ? (
          <>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5">
              <img src={pet.imagen} alt={pet.nombre} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">{pet.nombre}</h1>
                  <p className="text-white/50 text-sm mt-0.5">
                    {pet.raza} · {pet.edad}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full shrink-0 ${
                    pet.tipo === 'perro'
                      ? 'bg-amber-400/15 text-amber-300 ring-1 ring-amber-400/30'
                      : 'bg-purple-400/15 text-purple-300 ring-1 ring-purple-400/30'
                  }`}
                >
                  {pet.tipo === 'perro' ? 'Perro' : 'Gato'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-white/40 text-sm">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {pet.ubicacion}
              </div>

              <div className="detail-glass">
                <p className="text-white/70 text-sm leading-relaxed">{pet.descripcion}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  className="flex-1 py-3 rounded-2xl bg-white/5 text-white/40 text-sm font-medium ring-1 ring-white/10 hover:bg-white/10 hover:text-white/60 transition-all"
                  onClick={handleRemove}
                >
                  Quitar match
                </button>
                <button
                  className="flex-1 py-3 rounded-2xl bg-indigo-500 text-white text-sm font-semibold hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20"
                  onClick={() => setShowModal(true)}
                >
                  Adoptar
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/30">Mascota no encontrada</p>
          </div>
        )}
      </div>

      {showModal && pet && (
        <AdoptModal pet={pet} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
