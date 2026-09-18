import { Button } from '../../components/Button/Button'
import { ROUTES, type AppRoute } from '../../app/routes'
import styles from './UpcomingPage.module.css'
const content = {
  [ROUTES.difficulty]: { eyebrow: 'NOVA PARTIDA', title: 'Escolha de dificuldade', description: 'Aqui você poderá escolher entre Fácil, Médio e Difícil antes de selecionar suas cartas.' },
  [ROUTES.themes]: { eyebrow: 'SUAS COLEÇÕES', title: 'Temas de cartas', description: 'Aqui ficarão as coleções disponíveis e os temas desbloqueados ao longo do jogo.' },
  [ROUTES.game]: { eyebrow: 'UMA CARTA DE CADA VEZ', title: 'Sua partida', description: 'Este espaço receberá o tabuleiro, o cronômetro e as tentativas da partida.' },
  [ROUTES.manual]: { eyebrow: 'PARA COMEÇAR', title: 'Manual de como jogar', description: 'O manual terá seu próprio espaço, com orientações sobre pares, dificuldades e modos de jogo.' },
  [ROUTES.player]: { eyebrow: 'SEU CAMINHO', title: 'Área do jogador', description: 'Seu histórico, vitórias, progresso, recordes por dificuldade e coleções ficarão reunidos aqui.' },
}
interface UpcomingPageProps { route: Exclude<AppRoute, '/' | '/sobre'>; onHome: () => void; onPlay: () => void }
export function UpcomingPage({ route, onHome, onPlay }: UpcomingPageProps) {
  const page = content[route]
  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <p className={styles.eyebrow}>{page.eyebrow}</p>
      <h1 tabIndex={-1}>{page.title}</h1>
      <span className={styles.status}>Em preparação</span>
      <p className={styles.description}>{page.description} Esta funcionalidade ainda não está disponível.</p>
      <div className={styles.actions}>
        {route === ROUTES.player && <Button onClick={onPlay}>Novo jogo <span aria-hidden="true">→</span></Button>}
        <Button variant="secondary" onClick={onHome}>Voltar ao início</Button>
      </div>
    </main>
  )
}