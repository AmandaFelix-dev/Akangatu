export interface Theme {
  id: string
  name: string
  coverImage: string
  isUnlocked: boolean
  unlockDescription?: string
  cards: string[]
}