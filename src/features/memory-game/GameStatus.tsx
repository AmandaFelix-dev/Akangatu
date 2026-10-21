import { formatTime } from '../../utils/formatTime'
import { GAME_LABELS } from '../../data/texts'
import pauseButton from '../../assets/layout/btn/pause.svg'
import styles from './GameStatus.module.css'
interface GameStatusProps {
  elapsed: number
  attempts: number
  complete: boolean
  onPause: () => void
}
export function GameStatus({ elapsed, attempts, complete, onPause }: GameStatusProps) {
  return (
    <div className={styles.status}>
      <div className={styles.stats}>
        <div><span>{GAME_LABELS.time}</span><strong>{formatTime(elapsed)}</strong></div>
        <div><span>{GAME_LABELS.attempts}</span><strong>{attempts.toString().padStart(2, '0')}</strong></div>
      </div>
      <button className={styles.pause} aria-label={GAME_LABELS.pause} onClick={onPause} disabled={complete}>
        <img src={pauseButton} alt="" />
      </button>
    </div>
  )
}
