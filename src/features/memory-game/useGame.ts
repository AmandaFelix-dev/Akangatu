import { useEffect, useReducer, useState } from 'react'
import { THEMES } from '../../data/themes'
import { DIFFICULTIES } from '../../data/difficulties'
import { createDeck } from '../../utils/createDeck'
import { gameReducer } from './gameReducer'
import type { GameConfig } from '../../types/game'

function deckFor(config: GameConfig) {
  const theme = THEMES.find(item => item.id === config.themeId)!
  return createDeck(theme.cards, DIFFICULTIES[config.difficulty].pairs)
}

export function useGame(config: GameConfig, suspended = false) {
  const [state, dispatch] = useReducer(gameReducer, config, value => ({
    cards: deckFor(value), attempts: 0, selected: [], elapsed: 0,
  }))
  const [paused, setPaused] = useState(false)
  const complete = state.cards.every(card => card.isMatched)

  useEffect(() => {
    if (paused || suspended || complete) return
    let last = Date.now()
    const interval = setInterval(() => {
      const now = Date.now()
      const delta = Math.floor((now - last) / 1000)
      if (delta > 0) {
        dispatch({ type: 'tick', seconds: delta })
        last += delta * 1000
      }
    }, 200)
    return () => clearInterval(interval)
  }, [paused, suspended, complete])

  useEffect(() => {
    if (paused || suspended || state.selected.length !== 2) return
    const timeout = setTimeout(() => dispatch({ type: 'resolve' }), 850)
    return () => clearTimeout(timeout)
  }, [paused, suspended, state.selected])

  const flip = (id: string) => {
    if (!paused && !suspended && !complete) dispatch({ type: 'flip', id })
  }
  const restart = () => {
    dispatch({ type: 'reset', cards: deckFor(config) })
    setPaused(false)
  }
  return { state, paused, setPaused, complete, flip, restart }
}
