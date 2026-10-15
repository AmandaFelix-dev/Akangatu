import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
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
  const [confirm, setConfirm] = useState<"restart" | "exit" | null>(null);
  return (
    <Modal
      title={
        confirm
          ? confirm === "restart"
            ? "Começar de novo?"
            : "Sair da partida?"
          : "Um respiro."
      }
      onClose={confirm ? () => setConfirm(null) : onContinue}
    >
      {confirm ? (
        <>
          <p>
            Seu progresso nesta partida será descartado. Partidas anteriores
            continuam salvas.
          </p>
          <Button
            fullWidth
            onClick={confirm === "restart" ? onRestart : onExit}
          >
            {confirm === "restart" ? "Sim, reiniciar" : "Sim, sair"}
          </Button>
          <Button variant="text" fullWidth onClick={() => setConfirm(null)}>
            Cancelar
          </Button>
        </>
      ) : (
        <>
          <p>As cartas esperam. O cronômetro está pausado.</p>
          <Button fullWidth onClick={onContinue}>
            Continuar →
          </Button>
          {canRestart && (
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setConfirm("restart")}
            >
              Reiniciar
            </Button>
          )}
          <Button
            variant="text"
            fullWidth
            onClick={() => setConfirm("exit")}
          >
            Sair
          </Button>
        </>
      )}
    </Modal>
  );
}
