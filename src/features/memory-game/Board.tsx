import type { Card as CardData } from '../../types/game';
import { Card } from './Card';
export function Board({ cards, onFlip, disabled, concealed }: {
    cards: CardData[];
    onFlip: (id: string) => void;
    disabled: boolean;
    concealed: boolean;
}) { return <div className="board" aria-label="Tabuleiro de cartas">{cards.map((card, index) => <Card key={card.id} card={card} index={index} onFlip={onFlip} disabled={disabled} concealed={concealed}/>)}</div>; }
