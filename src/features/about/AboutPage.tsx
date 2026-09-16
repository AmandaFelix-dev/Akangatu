import { motion } from 'motion/react'
import styles from './AboutPage.module.css'

interface AboutPageProps {
  onBack: () => void
}

const themes = [
  ['Pessoas', 'Cartas inspiradas em estilos, histórias e diferentes personalidades.'],
  ['Animais', 'Uma coleção para descobrir a diversidade e a beleza dos animais.'],
  ['Emoções', 'Um tema que convida o jogador a reconhecer sentimentos de forma leve.'],
  ['Xadrez', 'Estratégia, peças e movimentos transformados em uma coleção visual.'],
  ['Princesas', 'Personagens com identidades, cenários e detalhes marcantes.'],
  ['Criaturas', 'Seres originais, divertidos, misteriosos e cheios de personalidade.'],
]

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <main className={styles.about}>
      <section className={styles.intro}>
        <span>Sobre o Akangatu</span>
        <h1>
          Mais que encontrar pares:
          <em> criar conexões.</em>
        </h1>
        <p>
          Akangatu é um jogo da memória que transforma cada partida em uma
          pequena experiência de atenção, descoberta e evolução.
        </p>
      </section>

      <section className={styles.objective}>
        <span>O objetivo</span>
        <p>
          Encontrar todos os pares no menor tempo e com o menor número de
          tentativas possível. Cada partida ajuda a desbloquear novos temas,
          registrar recordes e acompanhar a sua evolução.
        </p>
      </section>

      <section className={styles.themes}>
        <div className={styles.sectionHeading}>
          <span>Os temas</span>
          <h2>Um universo diferente a cada partida.</h2>
        </div>

        <div className={styles.themeGrid}>
          {themes.map(([name, description], index) => (
            <motion.article
              key={name}
              className={styles.theme}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <span>0{index + 1}</span>
              <h3>{name}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <button className={styles.backButton} type="button" onClick={onBack}>
        ← Voltar ao início
      </button>
    </main>
  )
}