import { Modal } from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import { formatTime } from '../../utils/formatTime'
import type { RecordComparison } from '../../utils/calculateRecords'
import styles from './CompletionNotice.module.css'
interface CompletionNoticeProps {
  elapsed: number
  attempts: number
  difficultyName: string
  comparison: RecordComparison | null
  persistent: boolean
  onRestart: () => void
  onExit: () => void
  onHome: () => void
  onPerformance: () => void
}

function recordMessages(comparison: RecordComparison | null, difficultyName: string) {
  if (!comparison) return []
  if (comparison.first) return [`Primeira partida concluída no ${difficultyName}.`]
  const messages: string[] = []
  if (comparison.previousTime !== null) messages.push(`Novo recorde de tempo! Antes: ${formatTime(comparison.previousTime)}`)
  if (comparison.previousAttempts !== null) messages.push(`Novo recorde de tentativas! Antes: ${comparison.previousAttempts}`)
  return messages
}

// Theme unlock progress awaits the unlock rules.
export function CompletionNotice({ elapsed, attempts, difficultyName, comparison, persistent, onRestart, onExit, onHome, onPerformance }: CompletionNoticeProps) {
  const messages = recordMessages(comparison, difficultyName)
  return (
    <Modal title="Coleção encontrada!">
      <p>Você encontrou todos os pares em {formatTime(elapsed)}, com {attempts} tentativas.</p>
      {messages.length > 0 && (
        <div className={styles.records} role="status">
          {messages.map(message => <p key={message}>{message}</p>)}
        </div>
      )}
      <p>{persistent
        ? 'Seu desempenho foi salvo neste dispositivo.'
        : 'O armazenamento não está disponível. Seu desempenho fica disponível nesta sessão.'}</p>
      <Button fullWidth onClick={onRestart}>Jogar novamente</Button>
      <Button variant="secondary" fullWidth onClick={onExit}>Novo jogo</Button>
      <Button variant="secondary" fullWidth onClick={onHome}>Voltar ao início</Button>
      <Button variant="text" fullWidth onClick={onPerformance}>Ver desempenho →</Button>
    </Modal>
  )
}
