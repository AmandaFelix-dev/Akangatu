import { DIFFICULTIES } from './difficulties'
import type { DifficultyId, GameMode } from '../types/game'

export const MODE_LABELS: Record<GameMode, string> = {
  traditional: 'Normal',
  challenge: 'Desafio',
}

export function difficultyLabel(id: DifficultyId) {
  return `${DIFFICULTIES[id].totalCards} cartas`
}

export function difficultyDetail(id: DifficultyId) {
  return `${DIFFICULTIES[id].pairs} pares`
}

export function difficultySummary(id: DifficultyId) {
  return `${difficultyLabel(id)} · ${difficultyDetail(id)}`
}

export const SETUP_BUTTONS = {
  continue: 'Continuar →',
  changeTheme: '← Trocar tema',
  start: 'Começar →',
  cancel: 'Cancelar',
} as const

export const FIRST_MATCH_MESSAGE = 'Primeira partida concluída.'
