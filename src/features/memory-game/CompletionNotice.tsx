import { Modal } from '../../components/Modal/Modal'
import { formatTime } from '../../utils/formatTime'
interface CompletionNoticeProps {
  elapsed: number
  attempts: number
  persistent: boolean
  onPerformance: () => void
  onRestart: () => void
  onExit: () => void
}
// Minimal completion feedback; rewards and a full results screen are deferred.
export function CompletionNotice({ elapsed, attempts, persistent, onPerformance, onRestart, onExit }: CompletionNoticeProps) {
  return (
    <Modal title="Coleção encontrada!">
      <p>Você encontrou todos os pares em {formatTime(elapsed)}, com {attempts} tentativas.</p>
      <p>{persistent
        ? 'Seu desempenho foi salvo neste dispositivo.'
        : 'O armazenamento não está disponível. Seu desempenho fica disponível nesta sessão.'}</p>
      <button className="primary full" onClick={onPerformance}>Ver desempenho →</button>
      <button className="secondary full" onClick={onRestart}>Jogar novamente</button>
      <button className="text-button full" onClick={onExit}>Escolher coleção</button>
    </Modal>
  )
}
