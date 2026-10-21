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
  onThemes: () => void
  onStarted: () => void
}

export function GamePage({ config, suspended, onExit, onPerformance, onThemes, onStarted }: GamePageProps) {
  const [started, setStarted] = useState(false)
  const game = useGame(config, suspended || !started)
  const { setPaused } = game
  const saved = useRef(false)
  const [comparison, setComparison] = useState<RecordComparison | null>(null)
  const pageClass = config.mode !== 'challenge' ? styles.page
    : `${styles.page} ${config.challengeType === 'attempts' ? styles.challengeAttempts : styles.challengeTime}`
  const theme = THEMES.find(item => item.id === config.themeId)!

  const { result, spentSeconds } = game
  const attempts = game.state.attempts

  useEffect(() => {
    if (!result || saved.current) return
    saved.current = true
    const match = { durationInSeconds: spentSeconds, attempts }
    const comparison = result === 'win'
      ? compareWithRecords(calculateRecords(loadHistory(), config.difficulty, config.mode), match)
      : null
    const success = saveMatch({
      id: crypto.randomUUID(), date: new Date().toISOString(),
      difficulty: config.difficulty, themeId: config.themeId, mode: config.mode,
      ...(config.mode === 'challenge' && { challengeType: config.challengeType }),
      ...match, result,
    })
    queueMicrotask(() => {
      if (!success) window.alert(STORAGE_UNAVAILABLE_MESSAGE)
      setComparison(comparison)
    })
  }, [result, spentSeconds, attempts, config])

  useEffect(() => {
    const hide = () => { if (document.hidden && started && !game.finished) setPaused(true) }
    document.addEventListener('visibilitychange', hide)
    return () => document.removeEventListener('visibilitychange', hide)
  }, [setPaused, started, game.finished])

  useEffect(() => {
    const guard = (event: BeforeUnloadEvent) => {
      if (started && !game.finished) { event.preventDefault(); event.returnValue = '' }
    }
    window.addEventListener('beforeunload', guard)
    return () => window.removeEventListener('beforeunload', guard)
  }, [started, game.finished])

  const restart = () => { saved.current = false; setComparison(null); game.restart() }
  const start = () => { setStarted(true); onStarted() }

  return (
    <main className={pageClass} tabIndex={-1} aria-label={theme.name}
      style={{ '--theme-background': THEME_BACKGROUNDS[theme.id] } as CSSProperties}>
      <GameStatus elapsed={game.displayedSeconds} attempts={game.state.attempts}
        complete={game.finished} mode={config.mode} challengeType={config.challengeType}
        challengeLimit={config.challengeLimit} onPause={() => setPaused(true)} />
      <Board cards={game.state.cards} onFlip={game.flip} concealed={game.paused && !game.finished}
        disabled={game.paused || suspended || !started || game.finished || game.state.selected.length === 2} />
      {!started && (
        <StartConfirmation themeName={theme.name} difficulty={config.difficulty}
          mode={config.mode} challengeType={config.challengeType} challengeLimit={config.challengeLimit} onStart={start} onCancel={onExit} />
      )}
      {game.paused && !game.finished && (
        <PauseModal canRestart={config.mode !== 'challenge'} onContinue={() => setPaused(false)} onRestart={restart} onExit={onExit} />
      )}
      {result && (
        <CompletionNotice result={result} mode={config.mode} challengeType={config.challengeType}
          challengeLimit={config.challengeLimit} elapsed={spentSeconds} attempts={attempts}
          comparison={comparison}
          onRestart={restart} onThemes={onThemes} onPerformance={onPerformance} />
      )}
    </main>
  )
}
