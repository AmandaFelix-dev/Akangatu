export const ROUTES = { home: '/', themes: '/jogar/temas', difficulty: '/jogar/dificuldade', game: '/partida', player: '/desempenho', manual: '/manual' } as const;
export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
export function resolveRoute(hash: string): AppRoute { const path = hash.replace(/^#/, ''); if (path === ROUTES.difficulty)
    return ROUTES.themes; return Object.values(ROUTES).find(route => route === path) ?? ROUTES.home; }
