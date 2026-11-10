import { DIFFICULTIES } from './difficulties'
import { DIFFICULTY_LIMITS } from './difficultyLimits'
import type { UnlockRule } from './unlockRules'
import type { ChallengeType, DifficultyId, GameMode } from '../types/game'
import type { Theme } from '../types/theme'
import type { RecordKind } from '../utils/calculateRecords'

export const MODE_LABELS: Record<GameMode, string> = {
  traditional: 'Normal',
  challenge: 'Desafio',
}

// Opções de modo da seleção: Normal, Desafio com limite de tempo e Desafio com limite de tentativas.
export const SETUP_MODES = [
  { id: 'traditional', label: 'Normal' },
  { id: 'time', label: 'Limite de tempo' },
  { id: 'attempts', label: 'Quantidade de tentativas' },
] as const

export type SetupModeId = typeof SETUP_MODES[number]['id']

export function modeSummary(mode: GameMode, challengeType?: ChallengeType, limit?: number) {
  if (mode !== 'challenge' || !challengeType || limit === undefined) return MODE_LABELS[mode]
  const detail = challengeType === 'time' ? `${limit} s` : `${limit} tentativas`
  return `${MODE_LABELS.challenge} · ${detail}`
}

export const ENDGAME_TITLES = {
  concluded: 'Partida concluída!',
  win: 'Você venceu o desafio!',
  loss: 'Você perdeu o desafio',
} as const

export const ENDGAME_LABELS = {
  time: 'TEMPO TOTAL',
  attempts: 'Nº DE TENTATIVAS',
} as const

export const RECORD_TITLES: Record<RecordKind, string> = {
  time: 'Novo recorde de tempo!',
  attempts: 'Novo recorde de tentativas!',
  both: 'Novos recordes!',
}

export const RECORD_LABELS = {
  previous: 'ANTERIOR',
  current: 'ATUAL',
  exit: 'Sair',
} as const

export const STORAGE_UNAVAILABLE_MESSAGE = 'O armazenamento não está disponível. Seu desempenho fica disponível nesta sessão.'

export function difficultyLabel(id: DifficultyId) {
  return `${DIFFICULTIES[id].totalCards} cartas`
}

export function difficultyDetail(id: DifficultyId) {
  return `${DIFFICULTIES[id].pairs} pares`
}

export function difficultySummary(id: DifficultyId) {
  return `${difficultyLabel(id)} · ${difficultyDetail(id)}`
}

export const SETUP_BUTTONS = {
  continue: 'Continuar',
  changeTheme: 'Trocar tema',
  start: 'Iniciar partida',
  cancel: 'Cancelar',
} as const

export const FIRST_MATCH_MESSAGE = 'Primeira partida concluída.'

export const HOME_LABELS = {
  logo: 'Akangatu',
  start: 'Começar a jogar',
  performance: 'Desempenho',
  about: 'Manual / Sobre',
} as const

export const GAME_LABELS = {
  time: 'Tempo',
  attempts: 'Tentativas',
  pause: 'Pausar',
} as const

export const THEMES_LABELS = {
  title: 'Coleções',
  back: 'Voltar',
  locked: 'bloqueado',
  progress: 'Progresso para desbloquear',
} as const

export const PROFILE_LABELS = {
  title: 'Desempenho',
  back: 'Voltar',
  totalPlayed: 'Total de Partidas concluídas',
  totalWins: 'Total de vitórias',
  bestTime: 'Melhor tempo',
  bestAttempts: 'Menor tentativas',
  difficulties: 'Dificuldade',
  table: 'Recordes por modo',
  columns: {
    mode: 'Modos',
    played: 'Partidas',
    bestTime: 'Melhor tempo',
    bestAttempts: 'Melhor tentativas',
  },
  modes: {
    traditional: 'Normal',
    time: 'Limite de tempo',
    attempts: 'Limite de tentativas',
  },
  empty: 'Seu primeiro encontro está por vir.',
} as const

export function unlockCondition(rule: UnlockRule) {
  const { consecutiveWins, difficulty, challengeType } = rule
  const matches = consecutiveWins === 1 ? '1 partida' : `${consecutiveWins} partidas consecutivas`
  const challenge = challengeType === 'time'
    ? `Modo Limite de Tempo`
    : `Modo Quantidade de Tentativas`
  return `Conclua ${matches} com ${difficultyLabel(difficulty)} no ${challenge}.`
}

export function unlockProgressText(current: number, target: number) {
  return `${current} de ${target}`
}

export function unlockedThemesMessage(names: string[]) {
  if (names.length === 1) return `Novo tema desbloqueado: ${names[0]}!`
  return `Novos temas desbloqueados: ${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}!`
}

export const MANUAL_TEXTS = {
  play: {
    title: 'Como jogar',
  },
  modes: {
    title: 'Modo Normal e Modo Desafio',
    normal: 'No modo Normal, você joga no seu ritmo: não há limite, e o tempo e as tentativas ficam no seu desempenho.',
    challenge: 'No modo Desafio, você escolhe um limite, que depende do número de cartas:',
    countdown: 'O cronômetro conta para trás.',
    outro: 'Encontre todos os pares antes de o limite acabar para vencer. Se ele acabar, você perde o desafio.',
  },
  themes: {
    title: 'Coleções da natureza e de culturas diferentes',
    intro: 'Cada coleção traz cartas inspiradas na natureza ou em culturas diferentes.',
  },
  unlock: {
    title: 'Desbloqueie novas coleções',
    intro: 'Para liberar uma coleção bloqueada, vença desafios em sequência:',
    outro: 'Uma derrota nessa combinação zera a sequência; partidas no Normal ou em outra combinação não atrapalham. O progresso de cada coleção aparece na tela de coleções.',
  },
} as const

const DIFFICULTY_IDS = Object.keys(DIFFICULTIES) as DifficultyId[]

function joinList(items: string[], conjunction: 'e' | 'ou') {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} ${conjunction} ${items[items.length - 1]}`
}

function challengeLabel(type: ChallengeType) {
  return SETUP_MODES.find(mode => mode.id === type)!.label
}

export function manualSteps() {
  const cards = joinList(DIFFICULTY_IDS.map(id => String(DIFFICULTIES[id].totalCards)), 'ou')
  return [
    {
      title: 'Toque em START.',
      text: 'Na tela inicial, toque em START.',
    },
    {
      title: 'Escolha uma coleção.',
      text: 'Toque em uma das coleções liberadas. As bloqueadas mostram o que falta para liberá-las.',
    },
    {
      title: 'Escolha as cartas e o modo.',
      text: `Toque em ${cards} cartas: quanto mais cartas, mais difícil. Depois escolha o modo e toque em ${SETUP_BUTTONS.continue}. No Normal não há limite; no Desafio, há um limite de tempo ou de tentativas.`,
    },
    {
      title: 'Toque em Começar.',
      text: `Confira suas escolhas e toque em Começar: o cronômetro começa a contar. Para mudar algo, toque em ${SETUP_BUTTONS.cancel}.`,
    },
    {
      title: 'Encontre os pares.',
      text: 'Toque em uma carta e depois em outra. Se forem iguais, ficam viradas para cima; se forem diferentes, voltam a ficar viradas para baixo. Cada duas cartas viradas contam uma tentativa. Para pausar, toque no botão de pausa: o cronômetro para e as cartas que ainda não formaram par ficam escondidas. Na pausa, você pode continuar, reiniciar ou sair; no Desafio, não há reiniciar.',
    },
    {
      title: 'Fim da partida.',
      text: 'Quando você encontra todos os pares, aparecem seu tempo e suas tentativas. Daí você pode jogar novamente, voltar às coleções ou ver seu desempenho.',
    },
  ]
}

export function manualChallengeItems() {
  const times = DIFFICULTY_IDS.map(id => `${DIFFICULTY_LIMITS[id].timeLimitInSeconds} s`)
  const attempts = DIFFICULTY_IDS.map(id => `${DIFFICULTY_LIMITS[id].challengeAttemptsLimit}`)
  return [
    `${challengeLabel('time')}: ${joinList(times, 'ou')}. ${MANUAL_TEXTS.modes.countdown}`,
    `${challengeLabel('attempts')}: ${joinList(attempts, 'ou')}.`,
  ]
}

export function manualThemesText(themes: Pick<Theme, 'id' | 'name' | 'isUnlocked'>[], rules: Record<string, UnlockRule>) {
  const free = themes.filter(theme => theme.isUnlocked).map(theme => theme.name)
  const locked = themes.filter(theme => rules[theme.id]).map(theme => theme.name)
  const freeVerb = free.length === 1 ? 'está liberada' : 'estão liberadas'
  const lockedVerb = locked.length === 1 ? 'começa bloqueada' : 'começam bloqueadas'
  const parts: string[] = []
  if (free.length > 0) parts.push(`${joinList(free, 'e')} ${freeVerb} desde o início`)
  if (locked.length > 0) parts.push(`${joinList(locked, 'e')} ${lockedVerb}`)
  return parts.length > 0 ? `${MANUAL_TEXTS.themes.intro} ${parts.join('; ')}.` : MANUAL_TEXTS.themes.intro
}

export function manualUnlockItem(themeName: string, rule: UnlockRule) {
  const { consecutiveWins, difficulty, challengeType } = rule
  const wins = consecutiveWins === 1 ? '1 vitória' : `${consecutiveWins} vitórias seguidas`
  const challenge = challengeLabel(challengeType)
  const challengeName = challenge.charAt(0).toLowerCase() + challenge.slice(1)
  return `${themeName}: ${wins} com ${difficultyLabel(difficulty)}, no Desafio de ${challengeName}.`
}
