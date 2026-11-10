import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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
  const reduceMotion = useReducedMotion();
  const press = {
    whileTap: reduceMotion ? undefined : { scale: 0.88 },
    transition: { type: "spring", stiffness: 500, damping: 25 },
  } as const;
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
          <motion.button aria-label="Cancelar" className={styles.cancel} onClick={() => setConfirmingExit(false)} {...press}>
            <img src={closeButton} alt="" />
          </motion.button>
          <motion.button aria-label="Sim, sair" className={styles.confirm} onClick={onExit} {...press}>
            <img src={confirmButton} alt="" />
          </motion.button>
        </div>
      </Modal>
    );
  }
  return (
    <Modal title="Deseja continuar?" onClose={onContinue} ownClose flush titleTop="calc(30 * var(--u))">
      <div className={styles.actions}>
        <motion.button aria-label="Sair" className={styles.action} onClick={() => setConfirmingExit(true)} {...press}>
          <img src={homeButton} alt="" />
        </motion.button>
        <motion.button aria-label="Continuar" className={styles.action} onClick={onContinue} {...press}>
          <img src={playButton} alt="" />
        </motion.button>
        {canRestart && (
          <motion.button aria-label="Reiniciar" className={styles.action} onClick={onRestart} {...press}>
            <img src={replayButton} alt="" />
          </motion.button>
        )}
      </div>
    </Modal>
  );
}
