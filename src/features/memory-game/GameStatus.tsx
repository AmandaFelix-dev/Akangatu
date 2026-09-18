import { formatTime } from '../../utils/formatTime'
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
    <div className="game-status">
      <div><span>TEMPO</span><strong>{formatTime(elapsed)}</strong></div>
      <div><span>TENTATIVAS</span><strong>{attempts.toString().padStart(2, '0')}</strong></div>
      <div><span>PARES</span><strong>{found} / {total}</strong></div>
      <button className="secondary" onClick={onPause} disabled={complete}>Ⅱ <span>Pausar</span></button>
    </div>
  )
}
