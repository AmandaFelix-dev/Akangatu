import type { Card } from '../../types/game';
export interface GameState {
    cards: Card[];
    selected: string[];
    attempts: number;
    elapsed: number;
}
type Action = {
    type: 'flip';
    id: string;
} | {
    type: 'resolve';
} | {
    type: 'tick';
    seconds: number;
} | {
    type: 'reset';
    cards: Card[];
};
export function gameReducer(state: GameState, action: Action): GameState {
    if (action.type === 'reset')
        return { cards: action.cards, selected: [], attempts: 0, elapsed: 0 };
    if (action.type === 'tick')
        return { ...state, elapsed: state.elapsed + action.seconds };
    if (action.type === 'flip') {
        const card = state.cards.find(item => item.id === action.id);
        if (!card || card.isFlipped || card.isMatched || state.selected.length === 2)
            return state;
        const selected = [...state.selected, action.id];
        return { ...state, selected, attempts: state.attempts + (selected.length === 2 ? 1 : 0), cards: state.cards.map(item => item.id === action.id ? { ...item, isFlipped: true } : item) };
    }
    if (state.selected.length !== 2)
        return state;
    const [a, b] = state.selected.map(id => state.cards.find(card => card.id === id)!);
    const match = a.pairId === b.pairId;
    return { ...state, selected: [], cards: state.cards.map(card => state.selected.includes(card.id) ? { ...card, isFlipped: match, isMatched: match } : card) };
}
