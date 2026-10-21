import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { DIFFICULTIES } from '../../data/difficulties';
import { SETUP_BUTTONS, SETUP_MODES, difficultyLabel } from '../../data/texts';
import type { SetupModeId } from '../../data/texts';
import type { Theme } from '../../types/theme';
import type { DifficultyId, GameConfig } from '../../types/game';
import { buildGameConfig } from '../../utils/challenge';
import closeButton from '../../assets/layout/btn/close.svg';
import continueButton from '../../assets/layout/btn/continue.svg';
import checkboxEmpty from '../../assets/layout/btn/checkbox-empty.svg';
import checkboxMarked from '../../assets/layout/btn/checkbox-marked.svg';
import styles from './DifficultySelection.module.css';
export function DifficultySelection({ theme, onClose, onStart }: {
    theme: Theme;
    onClose: () => void;
    onStart: (config: GameConfig) => void;
}) {
    const [difficulty, setDifficulty] = useState<DifficultyId>('easy');
    const [mode, setMode] = useState<SetupModeId>(SETUP_MODES[0].id);
    return <Modal title="Dificuldade" onClose={onClose} ownClose flush sansTitle titleTop="calc(38 * var(--u))">
        <div className={styles.content}>
            <button className={styles.close} aria-label={SETUP_BUTTONS.changeTheme} onClick={onClose}>
                <img src={closeButton} alt=""/>
            </button>
            <div className={styles.plaques} role="radiogroup" aria-label="Dificuldade">
                {Object.values(DIFFICULTIES).map(item => <button key={item.id} type="button" role="radio"
                    aria-checked={difficulty === item.id} aria-label={difficultyLabel(item.id)}
                    className={styles.plaque + (difficulty === item.id ? ' ' + styles.selected : '')}
                    onClick={() => setDifficulty(item.id)}>{item.totalCards}</button>)}
            </div>
            <h2 className={styles.modeTitle}>Modo</h2>
            <div className={styles.modes} role="radiogroup" aria-label="Modo">
                {SETUP_MODES.map(item => <button key={item.id} type="button" role="radio"
                    aria-checked={mode === item.id} className={styles.mode} onClick={() => setMode(item.id)}>
                    <img src={mode === item.id ? checkboxMarked : checkboxEmpty} alt=""/>
                    <span>{item.label}</span>
                </button>)}
            </div>
            <button className={styles.continue} aria-label={SETUP_BUTTONS.continue}
                onClick={() => onStart(buildGameConfig(theme.id, difficulty, mode))}>
                <img src={continueButton} alt=""/>
            </button>
        </div>
    </Modal>;
}
