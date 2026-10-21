import type { ReactNode } from 'react'
import type { ChallengeType, GameMode } from '../../types/game'
import { formatTime } from '../../utils/formatTime'
import { GAME_LABELS } from '../../data/texts'
import pauseButton from '../../assets/layout/btn/pause.svg'
import timerAsset from '../../assets/layout/game-timer.svg'
import attemptsAsset from '../../assets/layout/count-attempts.svg'
import layout from '../../styles/layout.module.css'
import styles from './GameStatus.module.css'

interface GameStatusProps {
  elapsed: number
  attempts: number
  complete: boolean
  mode?: GameMode
  challengeType?: ChallengeType
  challengeLimit?: number
  onPause: () => void
}

export function GameStatus({ elapsed, attempts, complete, mode, challengeType, challengeLimit, onPause }: GameStatusProps) {
  const time = formatTime(elapsed)
  const paddedAttempts = attempts.toString().padStart(2, '0')
  const pause = (
    <button className={styles.pause} aria-label={GAME_LABELS.pause} onClick={onPause} disabled={complete}>
      <img src={pauseButton} alt="" />
    </button>
  )

  if (mode === 'challenge' && challengeType) {
    const timeStat = (
      <div className={styles.stat}><span>{GAME_LABELS.time}</span><strong>{time}</strong></div>
    )
    const attemptsStat = (
      <div className={styles.stat}><span>{GAME_LABELS.attempts}</span><strong>{paddedAttempts}</strong></div>
    )
    const bottom = (stat: ReactNode) => (
      <div className={styles.bottom}>{stat}{pause}</div>
    )

    if (challengeType === 'time') {
      return (
        <>
          <div className={`${styles.hud} ${styles.timerHud}`}>
            <img src={timerAsset} alt="" />
            <div className={styles.timerValue}>
              <span className={layout.srOnly}>{GAME_LABELS.time}</span>
              <strong>{time}</strong>
            </div>
          </div>
          {bottom(attemptsStat)}
        </>
      )
    }
    return (
      <>
        <div className={`${styles.hud} ${styles.attemptsHud}`}>
          <img src={attemptsAsset} alt="" />
          <div className={styles.attemptsValue}>
            <span>{GAME_LABELS.attempts}</span>
            <strong>{attempts}/{challengeLimit}</strong>
          </div>
        </div>
        {bottom(timeStat)}
      </>
    )
  }

  return (
    <div className={styles.status}>
      <div className={styles.stats}>
        <div><span>{GAME_LABELS.time}</span><strong>{time}</strong></div>
        <div><span>{GAME_LABELS.attempts}</span><strong>{paddedAttempts}</strong></div>
      </div>
      {pause}
    </div>
  )
}
