import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';
import { DIFFICULTIES } from '../../data/difficulties';
import type { Theme } from '../../types/theme';
import type { DifficultyId, GameConfig } from '../../types/game';
import styles from './DifficultySelection.module.css';
export function DifficultySelection({ theme, onClose, onStart }: {
    theme: Theme;
    onClose: () => void;
    onStart: (config: GameConfig) => void;
}) {
    const [difficulty, setDifficulty] = useState<DifficultyId>('easy');
    return <Modal title="No seu ritmo." onClose={onClose}><p className={styles.eyebrow}>02 / DIFICULDADE · {theme.name}</p><p>Escolha o tamanho da sua descoberta.</p><fieldset className={styles.options}><legend className={styles.srOnly}>Dificuldade</legend>{Object.values(DIFFICULTIES).map(item => <label key={item.id} className={styles.option + (difficulty === item.id ? ' ' + styles.selected : '')}><input type="radio" name="difficulty" value={item.id} checked={difficulty === item.id} onChange={() => setDifficulty(item.id)}/><strong>{item.name}</strong><span>{item.pairs} pares · {item.totalCards} cartas</span></label>)}</fieldset><Button fullWidth onClick={() => onStart({ themeId: theme.id, difficulty, mode: 'traditional' })}>Iniciar partida →</Button><Button variant="text" fullWidth onClick={onClose}>← Trocar tema</Button></Modal>;
}
