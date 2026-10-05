import type { DifficultyId } from '../types/game'

interface DifficultyLimits {
  timeLimitInSeconds: number
  challengeAttemptsLimit: number
}

export const DIFFICULTY_LIMITS: Record<DifficultyId, DifficultyLimits> = {
  easy: { timeLimitInSeconds: 30, challengeAttemptsLimit: 10 },
  medium: { timeLimitInSeconds: 40, challengeAttemptsLimit: 14 },
  hard: { timeLimitInSeconds: 50, challengeAttemptsLimit: 18 },
}
