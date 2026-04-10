import { PetsProvider, usePets } from './context/PetsContext'
import NavBar from './components/NavBar'
import HomeView from './views/HomeView'
import FiltrosView from './views/FiltrosView'
import MatchesView from './views/MatchesView'
import PetDetailView from './views/PetDetailView'
import './App.css'

function AppContent() {
  const { view, selectedPetId } = usePets()

  let content
  switch (view) {
    case 'filtros':
      content = <FiltrosView />
      break
    case 'matches':
      content = <MatchesView />
      break
    case 'detail':
      content = <PetDetailView id={selectedPetId} />
      break
    default:
      content = <HomeView />
  }

  return (
    <div className="h-dvh bg-gray-950 text-white flex flex-col overflow-hidden pb-16">
      <header className="px-4 pt-6 pb-4 sm:pt-8 sm:pb-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">PawsMatch</h1>
          <p className="text-white/40 text-sm mt-0.5">Encuentra tu compañero ideal</p>
        </div>
      </header>
      {content}
      <NavBar />
    </div>
  )
}

export default function App() {
  return (
    <PetsProvider>
      <AppContent />
    </PetsProvider>
  )
}
