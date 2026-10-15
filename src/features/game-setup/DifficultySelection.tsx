import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { DIFFICULTIES } from '../../data/difficulties';
import { MODE_LABELS, SETUP_BUTTONS, difficultyDetail, difficultyLabel } from '../../data/texts';
import type { Theme } from '../../types/theme';
import type { DifficultyId, GameConfig } from '../../types/game';
import styles from './DifficultySelection.module.css';
export function DifficultySelection({ theme, onClose, onStart }: {
    theme: Theme;
    onClose: () => void;
    onStart: (config: GameConfig) => void;
}) {
    const [difficulty, setDifficulty] = useState<DifficultyId>('easy');
    return <Modal title="No seu ritmo." onClose={onClose}>
        <p className={styles.eyebrow}>02 / DIFICULDADE · {theme.name}</p>
        <p>Escolha o tamanho da sua descoberta.</p>
        <fieldset className={styles.options}>
            <legend className={styles.srOnly}>Dificuldade</legend>
            {Object.values(DIFFICULTIES).map(item => <label key={item.id} className={styles.option + (difficulty === item.id ? ' ' + styles.selected : '')}>
                <input type="radio" name="difficulty" value={item.id} checked={difficulty === item.id} onChange={() => setDifficulty(item.id)}/>
                <strong>{difficultyLabel(item.id)}</strong>
                <span>{difficultyDetail(item.id)}</span>
            </label>)}
        </fieldset>
        {/* Challenge stays disabled until its mode is implemented. */}
        <fieldset className={styles.options}>
            <legend className={styles.srOnly}>Modo</legend>
            <label className={styles.option + ' ' + styles.single + ' ' + styles.selected}>
                <input type="radio" name="mode" value="traditional" defaultChecked/>
                <strong>{MODE_LABELS.traditional}</strong>
            </label>
            <label className={styles.option + ' ' + styles.single + ' ' + styles.disabled}>
                <input type="radio" name="mode" value="challenge" disabled/>
                <strong>{MODE_LABELS.challenge}</strong>
            </label>
        </fieldset>
        <Button fullWidth onClick={() => onStart({ themeId: theme.id, difficulty, mode: 'traditional' })}>{SETUP_BUTTONS.continue}</Button>
        <Button variant="text" fullWidth onClick={onClose}>{SETUP_BUTTONS.changeTheme}</Button>
    </Modal>;
}
