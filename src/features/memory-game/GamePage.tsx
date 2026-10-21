import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { GameConfig } from '../../types/game'
import { THEMES } from '../../data/themes'
import { THEME_BACKGROUNDS } from '../../data/themeBackgrounds'
import { STORAGE_UNAVAILABLE_MESSAGE } from '../../data/texts'
import { loadHistory, saveMatch } from '../../services/history.service'
import { calculateRecords, compareWithRecords } from '../../utils/calculateRecords'
import type { RecordComparison } from '../../utils/calculateRecords'
import { useGame } from './useGame'
import { Board } from './Board'
import { GameStatus } from './GameStatus'
import { PauseModal } from './PauseModal'
import { CompletionNotice } from './CompletionNotice'
import { StartConfirmation } from './StartConfirmation'
import styles from './GamePage.module.css'

interface GamePageProps {
  config: GameConfig
  suspended: boolean
  onExit: () => void
  onPerformance: () => void
  onHome: () => void
  onStarted: () => void
}

export function GamePage({ config, suspended, onExit, onPerformance, onHome, onStarted }: GamePageProps) {
  const [started, setStarted] = useState(false)
  const game = useGame(config, suspended || !started)
  const { setPaused } = game
  const saved = useRef(false)
  const [comparison, setComparison] = useState<RecordComparison | null>(null)
  const theme = THEMES.find(item => item.id === config.themeId)!

  useEffect(() => {
    if (!game.complete || saved.current) return
    saved.current = true
    const match = { durationInSeconds: game.state.elapsed, attempts: game.state.attempts }
    const result = compareWithRecords(calculateRecords(loadHistory(), config.difficulty, config.mode), match)
    const success = saveMatch({
      id: crypto.randomUUID(), date: new Date().toISOString(),
      difficulty: config.difficulty, themeId: config.themeId, mode: config.mode,
      ...match, result: 'win',
    })
    queueMicrotask(() => {
      if (!success) window.alert(STORAGE_UNAVAILABLE_MESSAGE)
      setComparison(result)
    })
  }, [game.complete, game.state.elapsed, game.state.attempts, config])

  useEffect(() => {
    const hide = () => { if (document.hidden && started) setPaused(true) }
    document.addEventListener('visibilitychange', hide)
    return () => document.removeEventListener('visibilitychange', hide)
  }, [setPaused, started])

  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => {
      if (started && !game.complete) { event.preventDefault(); event.returnValue = '' }
    }
    window.addEventListener('beforeunload', guard)
    return () => window.removeEventListener('beforeunload', guard)
  }, [started, game.complete])

  const restart = () => { saved.current = false; setComparison(null); game.restart() }
  const start = () => { setStarted(true); onStarted() }

  return (
    <main className={styles.page} tabIndex={-1} aria-label={theme.name}
      style={{ '--theme-background': THEME_BACKGROUNDS[theme.id] } as CSSProperties}>
      <GameStatus elapsed={game.state.elapsed} attempts={game.state.attempts}
        complete={game.complete} onPause={() => setPaused(true)} />
      <Board cards={game.state.cards} onFlip={game.flip} concealed={game.paused && !game.complete}
        disabled={game.paused || suspended || !started || game.state.selected.length === 2} />
      {!started && (
        <StartConfirmation themeName={theme.name} difficulty={config.difficulty}
          mode={config.mode} onStart={start} onCancel={onExit} />
      )}
      {game.paused && !game.complete && (
        <PauseModal canRestart={config.mode !== 'challenge'} onContinue={() => setPaused(false)} onRestart={restart} onExit={onExit} />
      )}
      {game.complete && (
        <CompletionNotice elapsed={game.state.elapsed} attempts={game.state.attempts}
          comparison={comparison}
          onRestart={restart} onHome={onHome} onPerformance={onPerformance} />
      )}
    </main>
  )
}
