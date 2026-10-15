import type { Card as CardData } from '../../types/game';
import styles from './Card.module.css';
export function Card({ card, index, onFlip, disabled, concealed }: {
    card: CardData;
    index: number;
    onFlip: (id: string) => void;
    disabled: boolean;
    concealed: boolean;
}) {
    const hidden = concealed && !card.isMatched;
    const revealed = !hidden && (card.isFlipped || card.isMatched);
    return <button className={styles.card + ' memory-card ' + (revealed ? 'revealed ' : '') + (card.isMatched ? 'matched' : '')} aria-label={card.isMatched ? 'Par encontrado, carta ' + (index + 1) : revealed ? 'Carta ' + (index + 1) + ' revelada' : 'Virar carta ' + (index + 1)} aria-pressed={revealed} disabled={disabled || card.isMatched || card.isFlipped} onClick={() => onFlip(card.id)}><span className={styles.inner}><span className={styles.back} aria-hidden="true"><span>✳</span><small>AKANGATU</small></span><span className={styles.front} aria-hidden="true">{!hidden && <img src={card.image} alt=""/>}</span></span>{card.isMatched && <span className={styles.check} aria-hidden="true">✓</span>}</button>;
}
