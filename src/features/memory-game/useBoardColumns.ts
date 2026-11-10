import { useEffect, useRef, useState } from 'react'
import { MOBILE_PORTRAIT_MEDIA, PREFERRED_BOARD_COLUMNS } from '../../data/game'
import { boardColumnsFor } from '../../utils/boardLayout'

// The probe element covers the free area left for the board (sized in CSS).
export function useBoardColumns(cardCount: number) {
  const probeRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(PREFERRED_BOARD_COLUMNS)

  useEffect(() => {
    const probe = probeRef.current
    if (!probe) return
    const media = typeof window.matchMedia === 'function' ? window.matchMedia(MOBILE_PORTRAIT_MEDIA) : null
    const update = () => {
      const { width, height } = probe.getBoundingClientRect()
      const gap = parseFloat(getComputedStyle(probe).columnGap) || 0
      setColumns(boardColumnsFor(cardCount, { width, height, gap }, media?.matches ?? false))
    }
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(probe)
    media?.addEventListener('change', update)
    update()
    return () => {
      observer?.disconnect()
      media?.removeEventListener('change', update)
    }
  }, [cardCount])

  return { probeRef, columns }
}
