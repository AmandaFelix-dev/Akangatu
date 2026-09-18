import type { MatchHistory } from '../types/game'
const KEY = '@akangatu:history:v1'
let memory: MatchHistory[] = []
let sessionOnly = false

function valid(value: unknown): value is MatchHistory {
  if (!value || typeof value !== 'object') return false
  const item = value as MatchHistory
  return typeof item.id === 'string' && typeof item.themeId === 'string'
    && ['easy', 'medium', 'hard'].includes(item.difficulty) && item.result === 'win'
    && Number.isInteger(item.durationInSeconds) && item.durationInSeconds >= 0
    && Number.isInteger(item.attempts) && item.attempts > 0
}

export function loadHistory(): MatchHistory[] {
  if (sessionOnly) return [...memory]
  let raw: string | null
  try { raw = localStorage.getItem(KEY) } catch { return [...memory] }
  try {
    const data: unknown = raw ? JSON.parse(raw) : []
    memory = Array.isArray(data) ? data.filter(valid) : []
  } catch { memory = [] }
  return [...memory]
}

export function saveMatch(match: MatchHistory): boolean {
  memory = [...loadHistory().filter(item => item.id !== match.id), match]
  try {
    localStorage.setItem(KEY, JSON.stringify(memory))
    sessionOnly = false
    return true
  } catch {
    sessionOnly = true
    return false
  }
}
