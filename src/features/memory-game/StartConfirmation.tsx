import { Modal } from '../../components/Modal/Modal'
import { Button } from '../../components/Button/Button'
import { SETUP_BUTTONS, modeSummary, difficultySummary } from '../../data/texts'
import type { ChallengeType, DifficultyId, GameMode } from '../../types/game'
import styles from './StartConfirmation.module.css'

interface StartConfirmationProps {
  themeName: string
  difficulty: DifficultyId
  mode: GameMode
  challengeType?: ChallengeType
  challengeLimit?: number
  onStart: () => void
  onCancel: () => void
}

export function StartConfirmation({ themeName, difficulty, mode, challengeType, challengeLimit, onStart, onCancel }: StartConfirmationProps) {
  return (
    <Modal title="Tudo pronto?">
      <p className={styles.eyebrow}>03 / CONFIRMAÇÃO</p>
      <dl className={styles.summary}>
        <div className={styles.item}><dt>Coleção</dt><dd>{themeName}</dd></div>
        <div className={styles.item}><dt>Dificuldade</dt><dd>{difficultySummary(difficulty)}</dd></div>
        <div className={styles.item}><dt>Modo</dt><dd>{modeSummary(mode, challengeType, challengeLimit)}</dd></div>
      </dl>
      <Button fullWidth onClick={onStart}>{SETUP_BUTTONS.start}</Button>
      <Button variant="text" fullWidth onClick={onCancel}>{SETUP_BUTTONS.cancel}</Button>
    </Modal>
  )
}
