import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import homeButton from "../../assets/layout/btn/home.svg";
import playButton from "../../assets/layout/btn/play.svg";
import replayButton from "../../assets/layout/btn/replay.svg";
import closeButton from "../../assets/layout/btn/close.svg";
import confirmButton from "../../assets/layout/btn/confirm.svg";
import styles from "./PauseModal.module.css";
export function PauseModal({
  onContinue,
  onRestart,
  onExit,
  canRestart,
}: {
  onContinue: () => void;
  onRestart: () => void;
  onExit: () => void;
  canRestart: boolean;
}) {
  const [confirmingExit, setConfirmingExit] = useState(false);
  if (confirmingExit) {
    return (
      <Modal
        title={<>Certeza de que deseja <span className={styles.titleBreak}>sair da partida?</span></>}
        onClose={() => setConfirmingExit(false)}
        ownClose
        flush
        titleTop="calc(25 * var(--u))"
        titleSize="clamp(20px, 6.6vw, 24px)"
        titlePad="30px"
      >
        <div className={styles.exitButtons}>
          <button aria-label="Cancelar" className={styles.cancel} onClick={() => setConfirmingExit(false)}>
            <img src={closeButton} alt="" />
          </button>
          <button aria-label="Sim, sair" className={styles.confirm} onClick={onExit}>
            <img src={confirmButton} alt="" />
          </button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal title="Deseja continuar?" onClose={onContinue} ownClose flush titleTop="calc(95 * var(--u))">
      <button aria-label="Sair" className={styles.home} onClick={() => setConfirmingExit(true)}>
        <img src={homeButton} alt="" />
      </button>
      <div className={styles.actions}>
        <button aria-label="Continuar" className={styles.action} onClick={onContinue}>
          <img src={playButton} alt="" />
        </button>
        {canRestart && (
          <button aria-label="Reiniciar" className={styles.action} onClick={onRestart}>
            <img src={replayButton} alt="" />
          </button>
        )}
      </div>
    </Modal>
  );
}
