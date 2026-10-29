import { Modal } from '../../components/Modal/Modal'
import { formatTime } from '../../utils/formatTime'
import { ENDGAME_TITLES, FIRST_MATCH_MESSAGE, unlockedThemesMessage } from '../../data/texts'
import type { RecordComparison } from '../../utils/calculateRecords'
import concluded from '../../assets/layout/endgame/concluded.png'
import win from '../../assets/layout/endgame/win.png'
import defeat from '../../assets/layout/endgame/defeat.png'
import type { ChallengeType, GameMode, GameResult } from '../../types/game'
import styles from './CompletionNotice.module.css'
interface CompletionNoticeProps {
  result: GameResult
  mode: GameMode
  challengeType?: ChallengeType
  challengeLimit?: number
  elapsed: number
  attempts: number
  comparison: RecordComparison | null
  firstMatch: boolean
  // Names of the themes unlocked by this match.
  unlockedThemes: string[]
  onRestart: () => void
  onThemes: () => void
  onPerformance: () => void
}

function recordMessages(comparison: RecordComparison | null, firstMatch: boolean) {
  if (firstMatch) return [FIRST_MATCH_MESSAGE]
  if (!comparison) return []
  const messages: string[] = []
  if (comparison.previousTime !== null) messages.push(`Novo recorde de tempo! Antes: ${formatTime(comparison.previousTime)}`)
  if (comparison.previousAttempts !== null) messages.push(`Novo recorde de tentativas! Antes: ${comparison.previousAttempts}`)
  return messages
}

export function CompletionNotice({ result, mode, challengeType, challengeLimit, elapsed, attempts, comparison, firstMatch, unlockedThemes, onRestart, onThemes, onPerformance }: CompletionNoticeProps) {
  const isChallenge = mode === 'challenge'
  const lost = result === 'loss'
  const messages = result === 'win' ? recordMessages(comparison, firstMatch) : []
  const title = !isChallenge ? ENDGAME_TITLES.concluded : lost ? ENDGAME_TITLES.loss : ENDGAME_TITLES.win
  const image = !isChallenge ? concluded : lost ? defeat : win
  const showLimit = isChallenge && challengeType === 'attempts' && challengeLimit !== undefined
  const pad = (value: number) => String(value).padStart(2, '0')
  return (
    <Modal title={title} flush above={<img className={styles.image} src={image} alt="" />}>
      <div className={styles.content}>
        {unlockedThemes.length > 0 && <p className={styles.unlocked}>{unlockedThemesMessage(unlockedThemes)}</p>}
        <dl className={styles.values}>
          <div>
            <dt>TEMPO TOTAL</dt>
            <dd className={lost && challengeType === 'time' ? styles.defeat : undefined}>{formatTime(elapsed)}</dd>
          </div>
          <div>
            <dt>Nº DE TENTATIVAS</dt>
            <dd>
              {pad(attempts)}
              {showLimit && <span className={lost ? styles.defeat : undefined}>/{pad(challengeLimit)}</span>}
            </dd>
          </div>
        </dl>
        {messages.length > 0 && (
          <div className={styles.records} role="status">
            {messages.map(message => <p key={message}>{message}</p>)}
          </div>
        )}
        <button className={styles.wood} onClick={onRestart}>Jogar novamente</button>
        <button className={styles.wood} onClick={onThemes}>Voltar ao início</button>
        <button className={styles.link} onClick={onPerformance}>Ver desempenho</button>
      </div>
    </Modal>
  )
}
