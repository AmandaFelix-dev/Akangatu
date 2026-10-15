import { Modal } from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import type { GameMode } from '../../types/game'
import styles from './StartConfirmation.module.css'

const MODE_LABELS: Partial<Record<GameMode, string>> = { traditional: 'Tradicional' }

interface StartConfirmationProps {
  themeName: string
  difficultyName: string
  pairs: number
  mode: GameMode
  onStart: () => void
  onCancel: () => void
}

export function StartConfirmation({ themeName, difficultyName, pairs, mode, onStart, onCancel }: StartConfirmationProps) {
  const modeLabel = MODE_LABELS[mode]
  return (
    <Modal title="Tudo pronto?">
      <p className={styles.eyebrow}>03 / CONFIRMAÇÃO</p>
      <dl className={styles.summary}>
        <div className={styles.item}><dt>Coleção</dt><dd>{themeName}</dd></div>
        <div className={styles.item}><dt>Dificuldade</dt><dd>{difficultyName} · {pairs} pares</dd></div>
        {modeLabel && <div className={styles.item}><dt>Modo</dt><dd>{modeLabel}</dd></div>}
      </dl>
      <Button fullWidth onClick={onStart}>Começar →</Button>
      <Button variant="text" fullWidth onClick={onCancel}>Cancelar</Button>
    </Modal>
  )
}
