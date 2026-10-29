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

// Keeps the order of `rules`, which is the order of the unlock message.
export function findNewUnlocks(history: MatchHistory[], unlockedIds: string[], rules: Record<string, UnlockRule>): string[] {
  return Object.entries(rules)
    .filter(([id, rule]) => {
      if (unlockedIds.includes(id)) return false
      const { current, target } = calculateUnlockProgress(history, rule)
      return current >= target
    })
    .map(([id]) => id)
}
