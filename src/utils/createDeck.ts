import type { Card } from '../types/game';
import { shuffle } from './shuffle';
export function createDeck(images: string[], pairs: number): Card[] { return shuffle(shuffle(images).slice(0, pairs).flatMap((image, index) => [0, 1].map(copy => ({ id: index + '-' + copy, pairId: String(index), image, isFlipped: false, isMatched: false })))); }
