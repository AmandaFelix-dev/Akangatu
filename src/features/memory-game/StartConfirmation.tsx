import { Modal } from '../../components/Modal/Modal'
import { SETUP_BUTTONS, modeSummary, difficultySummary } from '../../data/texts'
import type { ChallengeType, DifficultyId, GameMode } from '../../types/game'
import confirmImage from '../../assets/layout/confirm_game.png'
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
    <Modal title="Tudo pronto?" flush above={<img className={styles.image} src={confirmImage} alt="" />}>
      <div className={styles.content}>
        <dl className={styles.summary}>
          <div className={styles.item}><dt>Coleção</dt><dd>{themeName}</dd></div>
          <div className={styles.item}><dt>Dificuldade</dt><dd>{difficultySummary(difficulty)}</dd></div>
          <div className={styles.item}><dt>Modo</dt><dd>{modeSummary(mode, challengeType, challengeLimit)}</dd></div>
        </dl>
        <button className={styles.wood} onClick={onStart}>{SETUP_BUTTONS.start}</button>
        <button className={styles.link} onClick={onCancel}>{SETUP_BUTTONS.cancel}</button>
      </div>
    </Modal>
  )
}
