import type { Theme } from '../types/theme';
import fauna from '../assets/images/optimized/covers/Animals.jpg';
import artifacts from '../assets/images/optimized/covers/Draws.jpg';
import flora from '../assets/images/optimized/covers/Flowers.jpg';
import reserves from '../assets/images/optimized/covers/Biological reserves.jpg';
import world from '../assets/images/optimized/covers/Around the world.jpg';
import woodcut from '../assets/images/optimized/covers/Xilogravura.jpg';
const animals = import.meta.glob('../assets/images/optimized/fauna/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const draws = import.meta.glob('../assets/images/optimized/artifacts/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const flowers = import.meta.glob('../assets/images/optimized/flora/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const reserveCards = import.meta.glob('../assets/images/optimized/biological-reserves/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const worldCards = import.meta.glob('../assets/images/optimized/around-the-world/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const woodcutCards = import.meta.glob('../assets/images/optimized/xilogravura/*.jpg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
export const THEMES: Theme[] = [
    { id: 'fauna', name: 'Fauna', coverImage: fauna, isUnlocked: true, cards: Object.values(animals) },
    { id: 'artifacts', name: 'Artefatos', coverImage: artifacts, isUnlocked: true, cards: Object.values(draws) },
    { id: 'flora', name: 'Flora', coverImage: flora, isUnlocked: true, cards: Object.values(flowers) },
    { id: 'biological-reserves', name: 'Reservas biológicas', coverImage: reserves, isUnlocked: false, unlockDescription: 'Uma coleção para desbloquear em breve.', cards: Object.values(reserveCards) },
    { id: 'around-the-world', name: 'Cultura global', coverImage: world, isUnlocked: false, unlockDescription: 'Uma coleção para desbloquear em breve.', cards: Object.values(worldCards) },
    { id: 'xilogravura', name: 'Xilogravura', coverImage: woodcut, isUnlocked: false, unlockDescription: 'Uma coleção para desbloquear em breve.', cards: Object.values(woodcutCards) }
];
