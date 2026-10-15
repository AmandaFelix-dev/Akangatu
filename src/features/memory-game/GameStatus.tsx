import { formatTime } from '../../utils/formatTime'
import { Button } from '../../components/Button/Button'
import styles from './GameStatus.module.css'
interface GameStatusProps {
  elapsed: number
  attempts: number
  found: number
  total: number
  complete: boolean
  onPause: () => void
}
export function GameStatus({ elapsed, attempts, found, total, complete, onPause }: GameStatusProps) {
  return (
    <div className={styles.status}>
      <div><span>TEMPO</span><strong>{formatTime(elapsed)}</strong></div>
      <div><span>TENTATIVAS</span><strong>{attempts.toString().padStart(2, '0')}</strong></div>
      <div><span>PARES</span><strong>{found} / {total}</strong></div>
      <Button variant="secondary" onClick={onPause} disabled={complete}>Ⅱ <span>Pausar</span></Button>
    </div>
  )
}
