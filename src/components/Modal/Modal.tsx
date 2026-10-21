import { useEffect, useId, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import styles from './Modal.module.css'

interface ModalProps {
  title: ReactNode
  children: ReactNode
  onClose?: () => void
  // Modais com botão de fechar próprio (layout novo) desligam o padrão.
  ownClose?: boolean
  // Sem padding nem margem no título: o conteúdo se posiciona sozinho.
  flush?: boolean
  // Distância do topo ao título nos modais flush.
  titleTop?: string
  // Conteúdo acima do título (ex.: imagem do fim de partida).
  above?: ReactNode
  // Título na fonte do corpo (Poppins), em vez da Lilita One.
  sansTitle?: boolean
  titleSize?: string
  // Margem lateral do título nos modais flush.
  titlePad?: string
}

export function Modal({ title, children, onClose, ownClose = false, flush = false, titleTop, above, sansTitle = false, titleSize, titlePad }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const dialog = ref.current!
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      document.body.style.overflow = overflow
      dialog.close()
      previous?.focus()
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className={flush ? `${styles.modal} ${styles.flush}` : styles.modal}
      style={titleTop || titleSize || titlePad ? { '--title-top': titleTop, '--title-size': titleSize, '--title-pad': titlePad } as CSSProperties : undefined}
      aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose?.() }}
    >
      {onClose && !ownClose && <button className={styles.close} aria-label="Fechar" onClick={onClose}>×</button>}
      {above}
      <h2 id={titleId} className={sansTitle ? `${styles.title} ${styles.sans}` : styles.title}>{title}</h2>
      {children}
    </dialog>
  )
}
