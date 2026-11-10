import type { CSSProperties } from 'react';
import type { Card as CardData } from '../../types/game';
import { Card } from './Card';
import { useBoardColumns } from './useBoardColumns';
import styles from './Board.module.css';
export function Board({ cards, onFlip, disabled, concealed }: {
    cards: CardData[];
    onFlip: (id: string) => void;
    disabled: boolean;
    concealed: boolean;
}) {
    const { probeRef, columns } = useBoardColumns(cards.length);
    return <>
        <div className={styles.board} style={{ '--columns': columns, '--rows': cards.length / columns } as CSSProperties} aria-label="Tabuleiro de cartas">{cards.map((card, index) => <Card key={card.id} card={card} index={index} onFlip={onFlip} disabled={disabled} concealed={concealed}/>)}</div>
        <div ref={probeRef} className={styles.area} aria-hidden="true"/>
    </>;
}
