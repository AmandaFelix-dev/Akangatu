import { useEffect, useRef, useState } from 'react'
import { PREFERRED_BOARD_COLUMNS } from '../../data/game'
import { chooseBoardColumns } from '../../utils/boardLayout'

// The probe element covers the free area left for the board (sized in CSS).
export function useBoardColumns(cardCount: number) {
  const probeRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(PREFERRED_BOARD_COLUMNS)

  useEffect(() => {
    const probe = probeRef.current
    if (!probe || typeof ResizeObserver === 'undefined') return
    const update = () => {
      const { width, height } = probe.getBoundingClientRect()
      const gap = parseFloat(getComputedStyle(probe).columnGap) || 0
      setColumns(chooseBoardColumns(cardCount, { width, height, gap }))
    }
    const observer = new ResizeObserver(update)
    observer.observe(probe)
    update()
    return () => observer.disconnect()
  }, [cardCount])

  return { probeRef, columns }
}
