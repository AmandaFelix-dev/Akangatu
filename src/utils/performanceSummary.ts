import type { ChallengeType, DifficultyId, GameMode, MatchHistory } from '../types/game'
import { calculateRecords } from './calculateRecords'
import type { Records } from './calculateRecords'
import { formatTime } from './formatTime'

export type PerformanceModeId = 'traditional' | ChallengeType

export interface PerformanceTotals {
  played: number
  wins: number
}

export interface ModePerformance extends Records {
  mode: PerformanceModeId
  played: number
}

export interface DifficultyPerformance {
  played: number
  records: Records
  modes: ModePerformance[]
}

const PERFORMANCE_MODES: { id: PerformanceModeId, mode: GameMode, challengeType?: ChallengeType }[] = [
  { id: 'traditional', mode: 'traditional' },
  { id: 'time', mode: 'challenge', challengeType: 'time' },
  { id: 'attempts', mode: 'challenge', challengeType: 'attempts' },
]

const lowest = (values: (number | null)[]) => {
  const known = values.filter((value): value is number => value !== null)
  return known.length ? Math.min(...known) : null
}

// Sem vitória não há recorde: a tela mostra zero.
export const formatBestTime = (seconds: number | null) => formatTime(seconds ?? 0)

export const formatBestAttempts = (attempts: number | null) => String(attempts ?? 0).padStart(2, '0')

export function summarizeTotals(history: MatchHistory[]): PerformanceTotals {
  return {
    played: history.length,
    // No Normal a partida só é concluída; vitória é do Desafio.
    wins: history.filter(match => match.mode === 'challenge' && match.result === 'win').length,
  }
}

export function summarizeDifficulty(history: MatchHistory[], difficulty: DifficultyId): DifficultyPerformance {
  const matches = history.filter(match => match.difficulty === difficulty)
  const byMode = (['traditional', 'challenge'] as const).map(mode => calculateRecords(matches, difficulty, mode))
  const modes = PERFORMANCE_MODES.map(({ id, mode, challengeType }) => {
    const items = matches.filter(match => match.mode === mode && (!challengeType || match.challengeType === challengeType))
    return { mode: id, played: items.length, ...calculateRecords(items, difficulty, mode) }
  })
  return {
    played: matches.length,
    records: {
      bestTime: lowest(byMode.map(records => records.bestTime)),
      bestAttempts: lowest(byMode.map(records => records.bestAttempts)),
    },
    modes,
  }
}
