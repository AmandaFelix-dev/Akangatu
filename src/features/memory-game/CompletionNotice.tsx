import { Modal } from '../../components/Modal/Modal'
import { formatTime } from '../../utils/formatTime'
import { FIRST_MATCH_MESSAGE } from '../../data/texts'
import type { RecordComparison } from '../../utils/calculateRecords'
import concluded from '../../assets/layout/endgame/concluded.png'
import styles from './CompletionNotice.module.css'
interface CompletionNoticeProps {
  elapsed: number
  attempts: number
  comparison: RecordComparison | null
  onRestart: () => void
  onHome: () => void
  onPerformance: () => void
}

function recordMessages(comparison: RecordComparison | null) {
  if (!comparison) return []
  if (comparison.first) return [FIRST_MATCH_MESSAGE]
  const messages: string[] = []
  if (comparison.previousTime !== null) messages.push(`Novo recorde de tempo! Antes: ${formatTime(comparison.previousTime)}`)
  if (comparison.previousAttempts !== null) messages.push(`Novo recorde de tentativas! Antes: ${comparison.previousAttempts}`)
  return messages
}

// Theme unlock progress awaits the unlock rules.
export function CompletionNotice({ elapsed, attempts, comparison, onRestart, onHome, onPerformance }: CompletionNoticeProps) {
  const messages = recordMessages(comparison)
  return (
    <Modal title="Partida concluída!" flush above={<img className={styles.image} src={concluded} alt="" />}>
      <div className={styles.content}>
        <dl className={styles.values}>
          <div><dt>TEMPO TOTAL</dt><dd>{formatTime(elapsed)}</dd></div>
          <div><dt>Nº DE TENTATIVAS</dt><dd>{String(attempts).padStart(2, '0')}</dd></div>
        </dl>
        {messages.length > 0 && (
          <div className={styles.records} role="status">
            {messages.map(message => <p key={message}>{message}</p>)}
          </div>
        )}
        <button className={styles.wood} onClick={onRestart}>Jogar novamente</button>
        <button className={styles.wood} onClick={onHome}>Voltar ao início</button>
        <button className={styles.link} onClick={onPerformance}>Ver desempenho</button>
      </div>
    </Modal>
  )
}
