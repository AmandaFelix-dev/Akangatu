import { DIFFICULTY_LIMITS } from '../data/difficultyLimits'
import type { SetupModeId } from '../data/texts'
import type { ChallengeType, DifficultyId, GameConfig, GameMode, GameResult } from '../types/game'

export interface ChallengeRules {
  mode: GameMode
  challengeType?: ChallengeType
  challengeLimit?: number
}

export interface ChallengeProgress {
  attempts: number
  elapsed: number
  complete: boolean
  // Two cards are flipped and the comparison has not been resolved yet.
  comparing: boolean
}

function activeLimit(rules: ChallengeRules, type: ChallengeType) {
  return rules.mode === 'challenge' && rules.challengeType === type ? rules.challengeLimit ?? null : null
}

export function isTimeUp(rules: ChallengeRules, elapsed: number) {
  const limit = activeLimit(rules, 'time')
  return limit !== null && elapsed >= limit
}

export function getChallengeOutcome(rules: ChallengeRules, progress: ChallengeProgress): GameResult | null {
  if (progress.complete) return 'win'
  if (progress.comparing) return null
  if (isTimeUp(rules, progress.elapsed)) return 'loss'
  const attemptsLimit = activeLimit(rules, 'attempts')
  return attemptsLimit !== null && progress.attempts >= attemptsLimit ? 'loss' : null
}

// Seconds shown on the clock: counts down in the time challenge, up otherwise.
export function getDisplayedSeconds(rules: ChallengeRules, elapsed: number) {
  const limit = activeLimit(rules, 'time')
  return limit === null ? elapsed : Math.max(0, limit - elapsed)
}

// Seconds actually played; never above the time limit.
export function getSpentSeconds(rules: ChallengeRules, elapsed: number) {
  const limit = activeLimit(rules, 'time')
  return limit === null ? elapsed : Math.min(elapsed, limit)
}

export function buildGameConfig(themeId: string, difficulty: DifficultyId, setupMode: SetupModeId): GameConfig {
  const limits = DIFFICULTY_LIMITS[difficulty]
  if (setupMode === 'time') return { themeId, difficulty, mode: 'challenge', challengeType: 'time', challengeLimit: limits.timeLimitInSeconds }
  if (setupMode === 'attempts') return { themeId, difficulty, mode: 'challenge', challengeType: 'attempts', challengeLimit: limits.challengeAttemptsLimit }
  return { themeId, difficulty, mode: 'traditional' }
}
