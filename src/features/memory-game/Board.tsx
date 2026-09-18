import type { Card as CardData } from '../../types/game';
import { Card } from './Card';
export function Board({ cards, onFlip, disabled }: {
    cards: CardData[];
    onFlip: (id: string) => void;
    disabled: boolean;
}) { return <div className="board" aria-label="Tabuleiro de cartas">{cards.map((card, index) => <Card key={card.id} card={card} index={index} onFlip={onFlip} disabled={disabled}/>)}</div>; }
