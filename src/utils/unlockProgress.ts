import type { MatchHistory } from '../types/game'
import type { UnlockRule } from '../data/unlockRules'

export interface UnlockProgress {
  current: number
  target: number
}

export function calculateUnlockProgress(history: MatchHistory[], rule: UnlockRule): UnlockProgress {
  const target = rule.consecutiveWins
  let streak = 0
  let best = 0
  for (const match of history) {
    if (match.mode !== 'challenge' || match.difficulty !== rule.difficulty || match.challengeType !== rule.challengeType) continue
    streak = match.result === 'win' ? streak + 1 : 0
    best = Math.max(best, streak)
  }
  return { current: best >= target ? target : Math.min(streak, target), target }
}
