import { Button } from '../../../components/Button/Button'
import { MemoryIllustration } from './MemoryIllustration'
import styles from './HomeHero.module.css'

interface HomeHeroProps {
  isFirstAccess: boolean
  onPlay: () => void
  onManual: () => void
}

export function HomeHero({ isFirstAccess, onPlay, onManual }: HomeHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>JOGO DA MEMÓRIA</p>
        <h1 id="home-title" tabIndex={-1}>Akangatu</h1>
        <p className={styles.tagline}>Memórias que <em>florescem.</em></p>
        <p className={styles.description}>
          Encontre os pares e descubra a beleza de olhar com atenção.
        </p>
        <div className={styles.actions}>
          <Button className={styles.play} onClick={onPlay}>
            {isFirstAccess ? 'Entrar' : 'Jogar'}
            <span aria-hidden="true">→</span>
          </Button>
          <button className={styles.manual} type="button" onClick={onManual}>
            Manual de como jogar
          </button>
        </div>
      </div>
      <MemoryIllustration />
    </section>
  )
}
