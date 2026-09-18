import styles from './HomeShortcut.module.css'

interface HomeShortcutProps {
  title: string
  description: string
  onClick: () => void
}

export function HomeShortcut({ title, description, onClick }: HomeShortcutProps) {
  return (
    <button className={styles.shortcut} type="button" onClick={onClick}>
      <span className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </button>
  )
}
