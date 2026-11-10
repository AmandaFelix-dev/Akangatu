import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { RECORD_ANNOUNCEMENT_MS } from '../../data/game'
import { ENDGAME_LABELS, RECORD_LABELS, RECORD_TITLES } from '../../data/texts'
import { recordKind } from '../../utils/calculateRecords'
import type { RecordComparison, RecordKind } from '../../utils/calculateRecords'
import { formatTime } from '../../utils/formatTime'
import newRecord from '../../assets/layout/new_record.png'
import styles from './RecordAnnouncement.module.css'

interface RecordAnnouncementProps {
  comparison: RecordComparison
  elapsed: number
  attempts: number
  onDone: () => void
}

const ENTRANCE = { duration: 0.6, ease: 'easeOut' } as const

const pad = (value: number) => String(value).padStart(2, '0')

function recordValues(kind: RecordKind, comparison: RecordComparison, elapsed: number, attempts: number) {
  if (kind === 'both') {
    return [
      { label: ENDGAME_LABELS.time, value: formatTime(elapsed) },
      { label: ENDGAME_LABELS.attempts, value: pad(attempts) },
    ]
  }
  const [previous, current] = kind === 'time'
    ? [formatTime(comparison.previousTime ?? 0), formatTime(elapsed)]
    : [pad(comparison.previousAttempts ?? 0), pad(attempts)]
  return [
    { label: RECORD_LABELS.previous, value: previous },
    { label: RECORD_LABELS.current, value: current },
  ]
}

export function RecordAnnouncement({ comparison, elapsed, attempts, onDone }: RecordAnnouncementProps) {
  const reduceMotion = useReducedMotion()
  const kind = recordKind(comparison)

  useEffect(() => {
    const timer = setTimeout(onDone, RECORD_ANNOUNCEMENT_MS)
    return () => clearTimeout(timer)
  }, [onDone])

  if (!kind) return null
  const from = (side: -1 | 1) => (reduceMotion ? false : { x: `${side * 100}vw` })
  return (
    <div className={styles.screen} role="status">
      <motion.img className={styles.image} src={newRecord} alt="" initial={from(-1)} animate={{ x: 0 }} transition={ENTRANCE} />
      <motion.h2 className={styles.title} initial={from(1)} animate={{ x: 0 }} transition={ENTRANCE}>
        {RECORD_TITLES[kind]}
      </motion.h2>
      <motion.dl className={styles.values} initial={from(-1)} animate={{ x: 0 }} transition={ENTRANCE}>
        {recordValues(kind, comparison, elapsed, attempts).map(({ label, value }) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </motion.dl>
      <motion.button className={styles.exit} onClick={onDone} initial={from(-1)} animate={{ x: 0 }} transition={ENTRANCE}>
        {RECORD_LABELS.exit}
      </motion.button>
    </div>
  )
}
