const STORAGE_KEY = '@akangatu:player-data'

export function loadPlayerData() {
  const savedData = localStorage.getItem(STORAGE_KEY)
  return savedData ? JSON.parse(savedData) : null
}

export function savePlayerData(data: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}