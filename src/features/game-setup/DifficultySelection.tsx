import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { DIFFICULTIES } from '../../data/difficulties';
import type { Theme } from '../../types/theme';
import type { DifficultyId, GameConfig } from '../../types/game';
export function DifficultySelection({ theme, onClose, onStart }: {
    theme: Theme;
    onClose: () => void;
    onStart: (config: GameConfig) => void;
}) {
    const [difficulty, setDifficulty] = useState<DifficultyId>('easy');
    return <Modal title="No seu ritmo." onClose={onClose}><p className="eyebrow">02 / DIFICULDADE · {theme.name}</p><p>Escolha o tamanho da sua descoberta.</p><fieldset className="difficulty"><legend className="sr-only">Dificuldade</legend>{Object.values(DIFFICULTIES).map(item => <label key={item.id} className={difficulty === item.id ? 'selected' : ''}><input type="radio" name="difficulty" value={item.id} checked={difficulty === item.id} onChange={() => setDifficulty(item.id)}/><strong>{item.name}</strong><span>{item.pairs} pares · {item.totalCards} cartas</span></label>)}</fieldset><button className="primary full" onClick={() => onStart({ themeId: theme.id, difficulty, mode: 'traditional' })}>Iniciar partida →</button><button className="text-button full" onClick={onClose}>← Trocar tema</button></Modal>;
}
