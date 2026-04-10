import { usePets } from '../context/PetsContext'

export default function MatchesView() {
  const { matches, matchCount, navigate } = usePets()

  return (
    <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-1">Mis Matches</h2>
        <p className="text-white/40 text-sm mb-6">
          {matchCount} mascota{matchCount !== 1 ? 's' : ''} que te gustaron
        </p>

        {matchCount > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {matches.map((pet) => (
              <button
                key={pet.id}
                onClick={() => navigate('detail', { id: pet.id })}
                className="match-card group text-left"
              >
                <img
                  src={pet.imagen}
                  alt={pet.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <div className="match-card__glass">
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {pet.nombre}
                    </h3>
                    <p className="text-white/50 text-[11px] mt-0.5">{pet.raza}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p className="text-white/30">Aún no tienes matches</p>
            <p className="text-white/20 text-sm mt-1">
              Haz swipe a la derecha en las mascotas que te gusten
            </p>
            <button
              onClick={() => navigate('home')}
              className="inline-block mt-4 px-5 py-2 rounded-full bg-white/10 text-white/60 text-sm hover:bg-white/15 transition-colors ring-1 ring-white/10"
            >
              Ir a buscar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
