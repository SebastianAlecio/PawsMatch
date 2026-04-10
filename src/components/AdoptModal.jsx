import { useState } from 'react'

export default function AdoptModal({ pet, onClose }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviado, setEnviado] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-glass" role="dialog" aria-label="Adoption detail">
        <button
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {enviado ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Solicitud enviada</h3>
            <p className="text-white/50 text-sm mt-2 max-w-[260px] mx-auto">
              El refugio se pondrá en contacto contigo sobre{' '}
              <strong className="text-white/70">{pet.nombre}</strong>.
            </p>
            <button
              className="mt-6 px-6 py-2.5 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-white/90 transition-colors"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold text-white mb-1">
              Adoptar a {pet.nombre}
            </h3>
            <p className="text-white/40 text-sm mb-5">
              Completa tus datos y el refugio te contactará.
            </p>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Nombre</label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="modal-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="tu@email.com"
                  className="modal-input"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Mensaje</label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={3}
                  placeholder="Cuéntanos por qué quieres adoptar..."
                  className="modal-input resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-colors"
              >
                Enviar solicitud
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
