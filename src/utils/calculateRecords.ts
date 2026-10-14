import type { DifficultyId, GameMode, MatchHistory } from '../types/game'

export interface Records {
  bestTime: number | null
  bestAttempts: number | null
}

export interface MatchPerformance {
  durationInSeconds: number
  attempts: number
}

export interface RecordComparison {
  first: boolean
  // Previous best, set only when the match strictly beats it.
  previousTime: number | null
  previousAttempts: number | null
}

export function calculateRecords(history: MatchHistory[], difficulty: DifficultyId, mode: GameMode): Records {
  const wins = history.filter(match => match.result === 'win' && match.difficulty === difficulty && match.mode === mode)
  if (wins.length === 0) return { bestTime: null, bestAttempts: null }
  return {
    bestTime: Math.min(...wins.map(match => match.durationInSeconds)),
    bestAttempts: Math.min(...wins.map(match => match.attempts)),
  }
}

export function compareWithRecords(records: Records, match: MatchPerformance): RecordComparison {
  const { bestTime, bestAttempts } = records
  return {
    first: bestTime === null && bestAttempts === null,
    previousTime: bestTime !== null && match.durationInSeconds < bestTime ? bestTime : null,
    previousAttempts: bestAttempts !== null && match.attempts < bestAttempts ? bestAttempts : null,
  }
}
