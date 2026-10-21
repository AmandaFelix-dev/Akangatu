import { DIFFICULTIES } from './difficulties'
import type { ChallengeType, DifficultyId, GameMode } from '../types/game'

export const MODE_LABELS: Record<GameMode, string> = {
  traditional: 'Normal',
  challenge: 'Desafio',
}

// Opções de modo da seleção: Normal, Desafio com limite de tempo e Desafio com limite de tentativas.
export const SETUP_MODES = [
  { id: 'traditional', label: 'Normal' },
  { id: 'time', label: 'Limite de tempo' },
  { id: 'attempts', label: 'Quantidade de tentativas' },
] as const

export type SetupModeId = typeof SETUP_MODES[number]['id']

export function modeSummary(mode: GameMode, challengeType?: ChallengeType, limit?: number) {
  if (mode !== 'challenge' || !challengeType || limit === undefined) return MODE_LABELS[mode]
  const detail = challengeType === 'time' ? `${limit} s` : `${limit} tentativas`
  return `${MODE_LABELS.challenge} · ${detail}`
}

export const ENDGAME_TITLES = {
  concluded: 'Partida concluída!',
  win: 'Você venceu o desafio!',
  loss: 'Você perdeu o desafio',
} as const

export const STORAGE_UNAVAILABLE_MESSAGE = 'O armazenamento não está disponível. Seu desempenho fica disponível nesta sessão.'

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
  continue: 'Continuar',
  changeTheme: 'Trocar tema',
  start: 'Começar →',
  cancel: 'Cancelar',
} as const

export const FIRST_MATCH_MESSAGE = 'Primeira partida concluída.'

export const HOME_LABELS = {
  logo: 'Akangatu',
  start: 'Começar a jogar',
  performance: 'Desempenho',
  about: 'Manual / Sobre',
} as const

export const GAME_LABELS = {
  time: 'Tempo',
  attempts: 'Tentativas',
  pause: 'Pausar',
} as const

export const THEMES_LABELS = {
  title: 'Coleções',
  back: 'Voltar',
  locked: 'bloqueado',
  progress: 'Progresso para desbloquear',
} as const
