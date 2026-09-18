import { useEffect, useRef, useState } from 'react'
import type { GameConfig } from '../../types/game'
import { DIFFICULTIES } from '../../data/difficulties'
import { THEMES } from '../../data/themes'
import { saveMatch } from '../../services/history.service'
import { useGame } from './useGame'
import { Board } from './Board'
import { GameStatus } from './GameStatus'
import { PauseModal } from './PauseModal'
import { CompletionNotice } from './CompletionNotice'

interface GamePageProps {
  config: GameConfig
  suspended: boolean
  onExit: () => void
  onPerformance: () => void
}

export function GamePage({ config, suspended, onExit, onPerformance }: GamePageProps) {
  const game = useGame(config, suspended)
  const { setPaused } = game
  const saved = useRef(false)
  const [persistent, setPersistent] = useState(true)
  const found = game.state.cards.filter(card => card.isMatched).length / 2
  const difficulty = DIFFICULTIES[config.difficulty]
  const theme = THEMES.find(item => item.id === config.themeId)!

  useEffect(() => {
    if (!game.complete || saved.current) return
    saved.current = true
    const success = saveMatch({
      id: crypto.randomUUID(), date: new Date().toISOString(),
      difficulty: config.difficulty, themeId: config.themeId, mode: 'traditional',
      durationInSeconds: game.state.elapsed, attempts: game.state.attempts, result: 'win',
    })
    queueMicrotask(() => setPersistent(success))
  }, [game.complete, game.state.elapsed, game.state.attempts, config])

  useEffect(() => {
    const hide = () => { if (document.hidden) setPaused(true) }
    document.addEventListener('visibilitychange', hide)
    return () => document.removeEventListener('visibilitychange', hide)
  }, [setPaused])

  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => {
      if (!game.complete) { event.preventDefault(); event.returnValue = '' }
    }
    window.addEventListener('beforeunload', guard)
    return () => window.removeEventListener('beforeunload', guard)
  }, [game.complete])

  const restart = () => { saved.current = false; game.restart() }

  return (
    <main className="page game-page">
      <div className="game-heading">
        <div>
          <p className="eyebrow">03 / ENCONTRE OS PARES</p>
          <h1 tabIndex={-1}>{theme.name}<em> em memória.</em></h1>
        </div>
        <span className="badge-inline">{difficulty.name} · {difficulty.pairs} pares</span>
      </div>
      <GameStatus elapsed={game.state.elapsed} attempts={game.state.attempts}
        found={found} total={difficulty.pairs} complete={game.complete} onPause={() => setPaused(true)} />
      <Board cards={game.state.cards} onFlip={game.flip}
        disabled={game.paused || suspended || game.state.selected.length === 2} />
      <p className="game-hint" role="status">
        {found > 0 ? `${found} pares encontrados. Continue explorando.` : 'Vire duas cartas e descubra os encontros.'}
      </p>
      {game.paused && !game.complete && (
        <PauseModal onContinue={() => setPaused(false)} onRestart={restart} onExit={onExit} />
      )}
      {game.complete && (
        <CompletionNotice elapsed={game.state.elapsed} attempts={game.state.attempts}
          persistent={persistent} onPerformance={onPerformance} onRestart={restart} onExit={onExit} />
      )}
    </main>
  )
}
