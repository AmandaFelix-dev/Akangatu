import { motion } from 'motion/react'
import styles from './HomePage.module.css'

interface HomePageProps {
  onAbout: () => void
}

const themes = [
  { name: 'Pessoas', text: 'Histórias, estilos e personalidades.', color: 'green' },
  { name: 'Animais', text: 'Fauna brasileira em cada par.', color: 'blue' },
  { name: 'Emoções', text: 'Sentimentos para reconhecer e combinar.', color: 'pink' },
]

export function HomePage({ onAbout }: HomePageProps) {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.intro}>
          <span className={styles.label}>JOGO DA MEMÓRIA</span>

          <h1>
            Pausar.
            <br />
            <em>Encontrar.</em>
            <br />
            Jogar.
          </h1>

          <p>
            Akangatu é um jogo de memória feito para exercitar a mente,
            descobrir coleções e celebrar pequenas conquistas.
          </p>

          <div className={styles.actions}>
            <button className={styles.playButton} type="button">
              Começar uma partida <span>↗</span>
            </button>

            <button className={styles.aboutButton} type="button" onClick={onAbout}>
              Conhecer o Akangatu
            </button>
          </div>
        </div>

        <motion.div
          className={styles.themeArea}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <span className={styles.themeTitle}>Escolha um universo</span>

          <div className={styles.themeCards}>
            {themes.map((theme, index) => (
              <motion.article
                key={theme.name}
                className={`${styles.themeCard} ${styles[theme.color]}`}
                variants={{
                  hidden: { opacity: 0, y: 30, rotate: index === 0 ? -5 : index === 2 ? 5 : 0 },
                  visible: { opacity: 1, y: 0, rotate: index === 0 ? -5 : index === 2 ? 5 : 0 },
                }}
                whileHover={{ y: -14, rotate: 0 }}
              >
                <span className={styles.cardNumber}>0{index + 1}</span>
                <div className={styles.cardDoodle}>{index === 0 ? '✦' : index === 1 ? '●' : '♥'}</div>
                <h2>{theme.name}</h2>
                <p>{theme.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className={styles.steps}>
        <p className={styles.stepsTitle}>Como funciona?</p>

        <div className={styles.stepList}>
          <article>
            <span>01</span>
            <h2>Escolha seu tema</h2>
            <p>Comece com uma coleção e desbloqueie outras conforme joga.</p>
          </article>

          <article>
            <span>02</span>
            <h2>Encontre os pares</h2>
            <p>Observe as cartas, use sua memória e complete o tabuleiro.</p>
          </article>

          <article>
            <span>03</span>
            <h2>Acompanhe sua evolução</h2>
            <p>Registre seu tempo, suas tentativas e os seus recordes.</p>
          </article>
        </div>
      </section>
    </main>
  )
}