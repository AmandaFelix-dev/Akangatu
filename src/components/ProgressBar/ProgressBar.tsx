import styles from './ProgressBar.module.css'

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const percent = Math.min(100, Math.max(0, value))
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
    >
      <div className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  )
}
