export default function PetCard({ pet }) {
  return (
    <div className="pet-card" role="article">
      <div className="pet-card__image">
        <img
          src={pet.imagen}
          alt={pet.nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="pet-card__info">
        <div className="pet-card__glass">
          <span
            className={`inline-block text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full mb-2 ${
              pet.tipo === 'perro'
                ? 'bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/30'
                : 'bg-purple-400/20 text-purple-200 ring-1 ring-purple-400/30'
            }`}
          >
            {pet.tipo === 'perro' ? 'Perro' : 'Gato'}
          </span>

          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {pet.nombre}
            </h2>
            <span className="text-white/70 text-sm font-medium">{pet.edad}</span>
          </div>

          <p className="text-white/60 text-sm mt-1">{pet.raza}</p>

          <div className="flex items-center gap-1.5 mt-2 text-white/50 text-xs">
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{pet.ubicacion}</span>
          </div>

          <p className="text-white/70 text-sm leading-relaxed mt-3">
            {pet.descripcion}
          </p>
        </div>
      </div>
    </div>
  )
}
