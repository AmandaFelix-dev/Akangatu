import type { Card as CardData } from '../../types/game';
export function Card({ card, index, onFlip, disabled }: {
    card: CardData;
    index: number;
    onFlip: (id: string) => void;
    disabled: boolean;
}) {
    const revealed = card.isFlipped || card.isMatched;
    return <button className={'memory-card ' + (revealed ? 'revealed ' : '') + (card.isMatched ? 'matched' : '')} aria-label={card.isMatched ? 'Par encontrado, carta ' + (index + 1) : revealed ? 'Carta ' + (index + 1) + ' revelada' : 'Virar carta ' + (index + 1)} aria-pressed={revealed} disabled={disabled || card.isMatched || card.isFlipped} onClick={() => onFlip(card.id)}><span className="card-inner"><span className="card-back" aria-hidden="true"><span>✳</span><small>AKANGATU</small></span><span className="card-front" aria-hidden="true"><img src={card.image} alt=""/></span></span>{card.isMatched && <span className="match-check" aria-hidden="true">✓</span>}</button>;
}
