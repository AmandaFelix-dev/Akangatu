import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Modal } from '../../components/Modal/Modal';
import { DIFFICULTIES } from '../../data/difficulties';
import { SETUP_BUTTONS, SETUP_MODES, difficultyLabel } from '../../data/texts';
import type { SetupModeId } from '../../data/texts';
import type { Theme } from '../../types/theme';
import type { DifficultyId, GameConfig } from '../../types/game';
import { buildGameConfig } from '../../utils/challenge';
import closeButton from '../../assets/layout/btn/close.svg';
import continueButton from '../../assets/layout/btn/continue.svg';
import radioEmpty from '../../assets/layout/btn/radio-empty.svg';
import radioMarked from '../../assets/layout/btn/radio-marked.svg';
import styles from './DifficultySelection.module.css';
export function DifficultySelection({ theme, onClose, onStart }: {
    theme: Theme;
    onClose: () => void;
    onStart: (config: GameConfig) => void;
}) {
    const [difficulty, setDifficulty] = useState<DifficultyId>('easy');
    const [mode, setMode] = useState<SetupModeId>(SETUP_MODES[0].id);
    // Só anima o radio depois de uma troca, não ao abrir o modal.
    const [modePicked, setModePicked] = useState(false);
    const reduceMotion = useReducedMotion();
    const press = {
        whileTap: reduceMotion ? undefined : { scale: 0.88 },
        transition: { type: 'spring', stiffness: 500, damping: 25 },
    } as const;
    const pickMode = (id: SetupModeId) => {
        if (id === mode) return;
        setMode(id);
        setModePicked(true);
    };
    return <Modal title="Dificuldade" onClose={onClose} ownClose flush sansTitle titleTop="calc(38 * var(--u))">
        <div className={styles.content}>
            <motion.button className={styles.close} aria-label={SETUP_BUTTONS.changeTheme} onClick={onClose} {...press}>
                <img src={closeButton} alt=""/>
            </motion.button>
            <div className={styles.plaques} role="radiogroup" aria-label="Dificuldade">
                {Object.values(DIFFICULTIES).map(item => <button key={item.id} type="button" role="radio"
                    aria-checked={difficulty === item.id} aria-label={difficultyLabel(item.id)}
                    className={styles.plaque + (difficulty === item.id ? ' ' + styles.selected : '')}
                    onClick={() => setDifficulty(item.id)}>{item.totalCards}</button>)}
            </div>
            <h2 className={styles.modeTitle}>Modo</h2>
            <div className={styles.modes} role="radiogroup" aria-label="Modo">
                {SETUP_MODES.map(item => {
                    const checked = mode === item.id;
                    return <motion.button key={item.id} type="button" role="radio"
                        aria-checked={checked} className={styles.mode} onClick={() => pickMode(item.id)} {...press}>
                        <motion.img key={String(checked)} src={checked ? radioMarked : radioEmpty} alt=""
                            initial={checked && modePicked && !reduceMotion ? { scale: 0.6 } : false}
                            animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 14 }}/>
                        <span>{item.label}</span>
                    </motion.button>;
                })}
            </div>
            <motion.button className={styles.continue} aria-label={SETUP_BUTTONS.continue}
                onClick={() => onStart(buildGameConfig(theme.id, difficulty, mode))} {...press}>
                <img src={continueButton} alt=""/>
            </motion.button>
        </div>
    </Modal>;
}
