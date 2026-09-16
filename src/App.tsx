import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { AboutPage } from './features/about/AboutPage'
import { HomePage } from './features/home/HomePage'
import styles from './App.module.css'

type Page = 'home' | 'about'

function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <button className={styles.logo} onClick={() => setPage('home')}>
          Akangatu
        </button>

        <nav className={styles.navigation}>
          <button onClick={() => setPage('home')}>Início</button>
          <button onClick={() => setPage('about')}>Sobre o jogo</button>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        {page === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <HomePage onAbout={() => setPage('about')} />
          </motion.div>
        ) : (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <AboutPage onBack={() => setPage('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App