export const MISMATCH_DELAY_MS = 850

// Largura ÷ altura da carta; o Card.module.css usa a mesma proporção (2/3).
export const CARD_ASPECT_RATIO = 2 / 3
export const PREFERRED_BOARD_COLUMNS = 4

// Celular em pé: mesmo corte do GamePage.module.css (abaixo de 701 px).
export const MOBILE_PORTRAIT_MEDIA = '(max-width: 700px) and (orientation: portrait)'
// Colunas fixas no celular em pé, por número de cartas (P15).
export const MOBILE_BOARD_COLUMNS: Partial<Record<number, number>> = { 8: 2, 12: 3, 16: 4 }
export const RECORD_ANNOUNCEMENT_MS = 5000
