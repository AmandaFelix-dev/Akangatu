export type DifficultyId = 'easy' | 'medium' | 'hard'
export type GameMode = 'traditional' | 'challenge'
export type ChallengeType = 'time' | 'attempts'
export type GameResult = 'win' | 'loss'

export interface Card {
  id: string
  pairId: string
  image: string
  isFlipped: boolean
  isMatched: boolean
}

export interface GameConfig {
  difficulty: DifficultyId
  themeId: string
  mode: GameMode
  challengeType?: ChallengeType
  challengeLimit?: number
}

export interface MatchHistory {
  id: string
  date: string
  difficulty: DifficultyId
  themeId: string
  mode: GameMode
  durationInSeconds: number
  attempts: number
  result: GameResult
}