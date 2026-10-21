import type { ChallengeType, DifficultyId } from '../types/game'

export interface UnlockRule {
  difficulty: DifficultyId
  challengeType: ChallengeType
  consecutiveWins: number
}

export const UNLOCK_RULES: Record<string, UnlockRule> = {
  'biological-reserves': { difficulty: 'easy', challengeType: 'attempts', consecutiveWins: 3 },
  'around-the-world': { difficulty: 'medium', challengeType: 'time', consecutiveWins: 2 },
  xilogravura: { difficulty: 'hard', challengeType: 'time', consecutiveWins: 1 },
}
