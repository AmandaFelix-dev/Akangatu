import { useId } from 'react'
import styles from './MemoryIllustration.module.css'

// Original linework: a flowering branch, repeated to suggest a matching pair.
function BotanicalPrint() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 81C-7 45 9 16 0-37M-1 48C-21 32-33 20-40 0M3 22C24 5 35-10 39-29" />
      <path d="M-17 35C-43 37-54 19-55 4C-34 3-20 16-17 35ZM17 10C11-15 23-34 45-40C47-17 37 0 17 10ZM-3 65C20 61 35 47 39 29C17 30 2 44-3 65Z" fill="currentColor" fillOpacity=".09" />
      <path d="M-46 10L-21 30M21 5L40-33M3 59L33 35" strokeWidth=".8" />
      <g transform="translate(0 -53)" stroke="#9c793c" fill="#c6a15a" fillOpacity=".2">
        <path d="M0-8C-20-32-29-17-16-5C-44-6-40 15-15 9C-28 35-8 42-3 16C12 40 28 27 12 9C41 14 44-8 16-6C27-29 7-37 0-8Z" />
        <circle r="7" fill="#9c793c" fillOpacity=".8" />
        <circle r="12" strokeWidth=".7" />
      </g>
      <path d="M-28 87Q0 94 28 87" strokeWidth=".7" />
    </g>
  )
}

export function MemoryIllustration() {
  const patternId = useId()
  return (
    <figure className={styles.figure}>
      <svg className={styles.art} viewBox="0 0 500 390" role="img" aria-label="Um par de cartas com um ramo florido e um verso azul-marinho com moldura artesanal">
        <defs>
          <pattern id={patternId} width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M6 1L11 6L6 11L1 6Z" fill="none" stroke="#ebdfc6" strokeOpacity=".12" strokeWidth=".6" />
          </pattern>
        </defs>
        <path d="M54 307Q230 336 448 295" fill="none" stroke="#b5b9a6" strokeWidth=".8" />
        <g transform="translate(179 22) rotate(7 82 132)">
          <rect width="164" height="264" rx="8" fill="#203c48" stroke="#203c48" />
          <rect x="7" y="7" width="150" height="250" rx="4" fill={'url(#' + patternId + ')'} stroke="#b6a47b" strokeWidth=".8" />
          <rect x="12" y="12" width="140" height="240" rx="2" fill="none" stroke="#b6a47b" strokeOpacity=".5" strokeWidth=".6" />
          <path d="M82 164V105M82 135C65 134 59 124 59 112C73 111 82 121 82 135ZM82 122C83 109 91 98 106 95C106 109 96 121 82 122Z" fill="none" stroke="#e8dcc1" strokeWidth="1.5" />
        </g>
        <g transform="translate(75 74) rotate(-11 82 132)" color="#48614b">
          <rect width="164" height="264" rx="8" fill="#e8ebdf" stroke="#6d7c70" />
          <rect x="7" y="7" width="150" height="250" rx="4" fill="none" stroke="#a5af9b" strokeWidth=".7" />
          <g transform="translate(82 132)"><BotanicalPrint /></g>
        </g>
        <g transform="translate(266 101) rotate(10 82 132)" color="#365541">
          <rect width="164" height="264" rx="8" fill="#faf4e5" stroke="#6d7c70" />
          <rect x="7" y="7" width="150" height="250" rx="4" fill="none" stroke="#bcb799" strokeWidth=".7" />
          <g transform="translate(82 132)"><BotanicalPrint /></g>
        </g>
      </svg>
      <figcaption>Uma carta de cada vez.</figcaption>
    </figure>
  )
}
