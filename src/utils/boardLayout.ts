import { CARD_ASPECT_RATIO, PREFERRED_BOARD_COLUMNS } from '../data/game'

export interface BoardArea {
  width: number
  height: number
  gap: number
}

// Column counts that fill every row, with at least two rows and two columns.
export function boardColumnOptions(cardCount: number): number[] {
  const options: number[] = []
  for (let columns = 2; columns <= cardCount / 2; columns++) {
    if (cardCount % columns === 0) options.push(columns)
  }
  return options
}

export function cardWidthFor(cardCount: number, columns: number, { width, height, gap }: BoardArea): number {
  const rows = cardCount / columns
  const byWidth = (width - (columns - 1) * gap) / columns
  const byHeight = ((height - (rows - 1) * gap) / rows) * CARD_ASPECT_RATIO
  return Math.max(0, Math.min(byWidth, byHeight))
}

export function chooseBoardColumns(cardCount: number, area: BoardArea): number {
  const options = boardColumnOptions(cardCount)
  const preferred = options.includes(PREFERRED_BOARD_COLUMNS) ? PREFERRED_BOARD_COLUMNS : options[0]
  if (preferred === undefined || area.width <= 0 || area.height <= 0) return PREFERRED_BOARD_COLUMNS
  let best = preferred
  let bestWidth = cardWidthFor(cardCount, preferred, area)
  for (const columns of options) {
    const width = cardWidthFor(cardCount, columns, area)
    // Sub-pixel gains do not justify leaving the preferred layout.
    if (width > bestWidth + 0.5) {
      best = columns
      bestWidth = width
    }
  }
  return best
}
