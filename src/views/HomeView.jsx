import { useState } from 'react'
import { usePets } from '../context/PetsContext'
import PetCard from '../components/PetCard'
import AdoptModal from '../components/AdoptModal'

export default function HomeView() {
  const { currentPet, like, pass, progress, matchCount, navigate } = usePets()
  const [showAdoptModal, setShowAdoptModal] = useState(false)

  if (!currentPet) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4">
        <div className="w-16 h-16 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <p className="text-white/30 text-lg">No hay más mascotas</p>
        {matchCount > 0 && (
          <>
            <p className="text-white/20 text-sm mt-1">
              Tienes {matchCount} match{matchCount > 1 ? 'es' : ''}
            </p>
            <button
              onClick={() => navigate('matches')}
              className="mt-4 px-5 py-2 rounded-full bg-white/10 text-white/60 text-sm hover:bg-white/15 transition-colors ring-1 ring-white/10"
            >
              Ver matches
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center flex-1 min-h-0 px-4 pb-2">
      <div className="w-full max-w-md flex-1 min-h-0">
        <PetCard pet={currentPet} />
      </div>

      <div className="flex items-center gap-8 mt-3 shrink-0">
        <button className="action-btn action-btn--pass" onClick={pass} aria-label="Pass">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span className="text-xs mt-0.5">Pass</span>
        </button>

        <span className="text-sm text-white/30 tabular-nums min-w-[3.5rem] text-center">
          {progress}
        </span>

        <button className="action-btn action-btn--like" onClick={like} aria-label="Like">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-xs mt-0.5">Like</span>
        </button>
      </div>

      <div className="mt-2 shrink-0">
        <button
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          onClick={() => setShowAdoptModal(true)}
        >
          Adoptar a {currentPet.nombre}
        </button>
      </div>

      {showAdoptModal && (
        <AdoptModal pet={currentPet} onClose={() => setShowAdoptModal(false)} />
      )}
    </div>
  )
}
