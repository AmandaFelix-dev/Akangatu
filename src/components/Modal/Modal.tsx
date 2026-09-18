import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
  title: string
  children: ReactNode
  onClose?: () => void
}

export function Modal({ title, children, onClose }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const dialog = ref.current!
    dialog.showModal()
    return () => {
      dialog.close()
      previous?.focus()
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose?.() }}
    >
      {onClose && <button className="modal-close" aria-label="Fechar" onClick={onClose}>×</button>}
      <h2 id={titleId}>{title}</h2>
      {children}
    </dialog>
  )
}
