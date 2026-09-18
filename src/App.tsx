import { useEffect, useState } from 'react'
import { HomePage } from './features/home/HomePage'
import { ThemeSelection } from './features/game-setup/ThemeSelection'
import { GamePage } from './features/memory-game/GamePage'
import { ProfilePage } from './features/profile/ProfilePage'
import { AboutPage } from './features/about/AboutPage'
import { Modal } from './components/Modal/Modal'
import { resolveRoute, ROUTES } from './app/routes'
import type { AppRoute } from './app/routes'
import type { GameConfig } from './types/game'
import styles from './App.module.css'

export default function App() {
  const [route, setRoute] = useState(() => resolveRoute(location.hash))
  const [config, setConfig] = useState<GameConfig | null>(null)
  const [pendingRoute, setPendingRoute] = useState<AppRoute | null>(null)
  const navigate = (path: string) => { location.hash = path }

  useEffect(() => {
    const update = () => {
      const next = resolveRoute(location.hash)
      if (route === ROUTES.game && config && next !== ROUTES.game) {
        setPendingRoute(next)
        location.replace('#' + ROUTES.game)
        return
      }
      setRoute(next)
    }
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [route, config])

  useEffect(() => {
    document.querySelector<HTMLElement>('main h1')?.focus()
    window.scrollTo?.({ top: 0 })
  }, [route])

  const exitTo = (destination: AppRoute) => {
    setConfig(null)
    setPendingRoute(null)
    navigate(destination)
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <button className={styles.logo} disabled={route === ROUTES.game && !!config} onClick={() => navigate(ROUTES.home)}>
          ✳ akangatu<sup>®</sup>
        </button>
        <nav aria-label="Navegação principal" className={styles.navigation}>
          {route !== ROUTES.game ? (
            <>
              <button onClick={() => navigate(ROUTES.manual)}>Manual / Sobre</button>
              <button onClick={() => navigate(ROUTES.player)}>Desempenho ↗</button>
            </>
          ) : <span>Uma descoberta de cada vez.</span>}
        </nav>
      </header>
      {route === ROUTES.home && <HomePage onPlay={() => navigate(ROUTES.themes)} onAbout={() => navigate(ROUTES.manual)} />}
      {(route === ROUTES.themes || (route === ROUTES.game && !config)) && (
        <ThemeSelection onBack={() => navigate(ROUTES.home)} onStart={value => { setConfig(value); navigate(ROUTES.game) }} />
      )}
      {route === ROUTES.game && config && (
        <GamePage config={config} suspended={pendingRoute !== null} onExit={() => exitTo(ROUTES.themes)} onPerformance={() => exitTo(ROUTES.player)} />
      )}
      {route === ROUTES.player && <ProfilePage onPlay={() => navigate(ROUTES.themes)} />}
      {route === ROUTES.manual && <AboutPage onBack={() => navigate(ROUTES.home)} />}
      {pendingRoute && (
        <Modal title="Sair da partida?" onClose={() => setPendingRoute(null)}>
          <p>Seu progresso nesta partida será descartado. Os registros anteriores continuam salvos.</p>
          <button className="primary full" onClick={() => exitTo(pendingRoute)}>Sim, sair</button>
          <button className="text-button full" onClick={() => setPendingRoute(null)}>Continuar jogando</button>
        </Modal>
      )}
      <footer className={styles.footer}>
        <span>AKANGATU · JOGO DA MEMÓRIA</span><span>Observe. Conecte. Descubra.</span>
      </footer>
    </div>
  )
}
