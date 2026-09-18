import type { Theme } from '../types/theme';
import fauna from '../assets/images/optimized/covers/Animals.jpg';
import flora from '../assets/images/optimized/covers/Flowers.jpg';
import woodcut from '../assets/images/optimized/covers/Xilogravura.jpg';
const animals = import.meta.glob('../assets/images/optimized/fauna/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
export const THEMES: Theme[] = [
    { id: 'fauna', name: 'Fauna', coverImage: fauna, isUnlocked: true, cards: Object.values(animals) },
    { id: 'flora', name: 'Flora', coverImage: flora, isUnlocked: false, unlockDescription: 'Uma coleção para desbloquear em breve.', cards: [] },
    { id: 'xilogravura', name: 'Xilogravura', coverImage: woodcut, isUnlocked: false, unlockDescription: 'Uma coleção para desbloquear em breve.', cards: [] }
];
