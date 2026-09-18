import { describe, it, expect } from 'vitest';
import type { GameState } from './features/memory-game/gameReducer';
import { gameReducer } from './features/memory-game/gameReducer';
import { createDeck } from './utils/createDeck';
import { resolveRoute, ROUTES } from './app/routes';
import { loadHistory, saveMatch } from './services/history.service';
const initial = (): GameState => ({ cards: createDeck(['a', 'b', 'c', 'd'], 4), selected: [], elapsed: 0, attempts: 0 });
describe('Memory game', () => {
    it('creates shuffled pairs without changing source', () => { const images = ['a', 'b', 'c', 'd']; const deck = createDeck(images, 4); expect(deck).toHaveLength(8); expect(new Set(deck.map(card => card.id)).size).toBe(8); for (const image of images)
        expect(deck.filter(card => card.image === image)).toHaveLength(2); expect(deck.every(card => !card.isFlipped)).toBe(true); });
    it('counts only pairs of flips, locks a third card, and matches pairs', () => { let state = initial(); const a = state.cards[0]; const b = state.cards.find(card => card.id !== a.id && card.pairId === a.pairId)!; state = gameReducer(state, { type: 'flip', id: a.id }); expect(state.attempts).toBe(0); expect(gameReducer(state, { type: 'flip', id: a.id })).toBe(state); state = gameReducer(state, { type: 'flip', id: b.id }); expect(state.attempts).toBe(1); expect(gameReducer(state, { type: 'flip', id: state.cards.find(card => card.pairId !== a.pairId)!.id })).toBe(state); state = gameReducer(state, { type: 'resolve' }); expect(state.cards.filter(card => card.isMatched)).toHaveLength(2); expect(state.selected).toHaveLength(0); });
    it('hides mismatches and resets progress', () => { let state = initial(); const a = state.cards[0]; const b = state.cards.find(card => card.pairId !== a.pairId)!; state = gameReducer(state, { type: 'flip', id: a.id }); state = gameReducer(state, { type: 'flip', id: b.id }); state = gameReducer(state, { type: 'resolve' }); expect(state.cards.every(card => !card.isFlipped)).toBe(true); state = gameReducer(state, { type: 'tick', seconds: 4 }); expect(state.elapsed).toBe(4); state = gameReducer(state, { type: 'reset', cards: createDeck(['a'], 1) }); expect(state.attempts).toBe(0); expect(state.elapsed).toBe(0); });
    it('resolves direct routes safely', () => { expect(resolveRoute('#/jogar/temas')).toBe(ROUTES.themes); expect(resolveRoute('#/partida')).toBe(ROUTES.game); expect(resolveRoute('#/invalid')).toBe(ROUTES.home); });
    it('persists completed matches without duplicates and handles corrupt data', () => { localStorage.clear(); expect(loadHistory()).toHaveLength(0); const match = { id: 'test', date: new Date().toISOString(), difficulty: 'easy' as const, themeId: 'fauna', mode: 'traditional' as const, durationInSeconds: 12, attempts: 4, result: 'win' as const }; saveMatch(match); saveMatch(match); expect(loadHistory()).toHaveLength(1); localStorage.setItem('@akangatu:history:v1', '{}'); expect(loadHistory()).toHaveLength(0); });
});
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
beforeEach(() => {
    window.history.replaceState(null, '', '/');
    localStorage.clear();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable:true, value:function (this: HTMLDialogElement) { this.setAttribute('open', ''); } });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable:true, value:function (this: HTMLDialogElement) { this.removeAttribute('open'); } });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
describe('Main journey', () => {
    it('requires a theme before difficulty, handles pause confirmation, completes and saves a game', async () => {
        const user = userEvent.setup();
        render(<App />);
        await user.click(screen.getByRole('button', { name: /Começar a jogar/ }));
        await user.click(await screen.findByRole('button', { name: /Fauna/ }));
        expect(screen.getByRole('dialog')).toBeTruthy();
        expect(screen.getByRole('radio', { name: /Fácil/ })).toBeTruthy();
        await user.click(screen.getByRole('button', { name: /Iniciar partida/ }));
        await screen.findByRole('button', { name: 'Virar carta 1' });
        expect(document.querySelectorAll('.memory-card')).toHaveLength(8);
        window.location.hash = '/';
        expect(await screen.findByRole('heading', { name: 'Sair da partida?' })).toBeTruthy();
        await user.click(screen.getByRole('button', { name: 'Continuar jogando' }));
        expect(screen.getByRole('button', { name: 'Virar carta 1' })).toBeTruthy();
        await user.click(screen.getByRole('button', { name: /Pausar/ }));
        await user.click(screen.getByRole('button', { name: 'Reiniciar' }));
        expect(screen.getByRole('heading', { name: 'Começar de novo?' })).toBeTruthy();
        await user.click(screen.getByRole('button', { name: 'Cancelar' }));
        await user.click(screen.getByRole('button', { name: 'Sair' }));
        expect(screen.getByRole('heading', { name: 'Sair da partida?' })).toBeTruthy();
        await user.click(screen.getByRole('button', { name: 'Cancelar' }));
        await user.click(screen.getByRole('button', { name: /Continuar/ }));
        const groups = new Map<string, HTMLButtonElement[]>();
        document.querySelectorAll<HTMLButtonElement>('.memory-card').forEach(button => { const image = button.querySelector('img')!.src; groups.set(image, [...(groups.get(image) ?? []), button]); });
        for (const buttons of groups.values()) {
            await user.click(buttons[0]);
            await user.click(buttons[1]);
            await waitFor(() => expect(buttons.every(button => button.classList.contains('matched'))).toBe(true), { timeout: 2000 });
        }
        expect(await screen.findByRole('heading', { name: 'Coleção encontrada!' })).toBeTruthy();
        expect(loadHistory()).toHaveLength(1);
        expect(loadHistory()[0].attempts).toBe(4);
        await user.click(screen.getByRole('button', { name: /Ver desempenho/ }));
        expect(await screen.findByRole('heading', { name: 'Memórias que ficam.' })).toBeTruthy();
        expect(screen.queryByText('Seu primeiro encontro está por vir.')).toBeNull();
    });
    it('shows an honest empty state and locked collections', async () => {
        const user = userEvent.setup();
        render(<App />);
        await user.click(screen.getByRole('button', { name: /Desempenho/ }));
        expect(await screen.findByText('Seu primeiro encontro está por vir.')).toBeTruthy();
        await user.click(screen.getByRole('button', { name: /Começar a jogar/ }));
        const locked = await screen.findByRole('button', { name: /Flora/ }) as HTMLButtonElement;
        expect(locked.disabled).toBe(true);
    });
});


import { act,renderHook } from '@testing-library/react'
import { useGame } from './features/memory-game/useGame'
describe('Game clock',()=>{
 it('freezes time and card actions while paused or awaiting navigation confirmation',()=>{
 vi.useFakeTimers()
 const {result,rerender}=renderHook(({suspended})=>useGame({themeId:'fauna',difficulty:'easy',mode:'traditional'},suspended),{initialProps:{suspended:false}})
 act(()=>vi.advanceTimersByTime(2200))
 expect(result.current.state.elapsed).toBe(2)
 act(()=>result.current.setPaused(true))
 act(()=>{vi.advanceTimersByTime(5000);result.current.flip(result.current.state.cards[0].id)})
 expect(result.current.state.elapsed).toBe(2)
 expect(result.current.state.selected).toHaveLength(0)
 act(()=>result.current.setPaused(false))
 rerender({suspended:true})
 act(()=>vi.advanceTimersByTime(3000))
 expect(result.current.state.elapsed).toBe(2)
 rerender({suspended:false})
 act(()=>vi.advanceTimersByTime(1000))
 expect(result.current.state.elapsed).toBe(3)
 act(()=>result.current.restart())
 expect(result.current.state.elapsed).toBe(0)
 vi.useRealTimers()
 })
})
