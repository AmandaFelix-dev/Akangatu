import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
export function PauseModal({ onContinue, onRestart, onExit }: {
    onContinue: () => void;
    onRestart: () => void;
    onExit: () => void;
}) {
    const [confirm, setConfirm] = useState<'restart' | 'exit' | null>(null);
    return <Modal title={confirm ? confirm === 'restart' ? 'Começar de novo?' : 'Sair da partida?' : 'Um respiro.'} onClose={confirm ? () => setConfirm(null) : onContinue}>{confirm ? <><p>Seu progresso nesta partida será descartado. Partidas anteriores continuam salvas.</p><button className="primary full" onClick={confirm === 'restart' ? onRestart : onExit}>{confirm === 'restart' ? 'Sim, reiniciar' : 'Sim, sair'}</button><button className="text-button full" onClick={() => setConfirm(null)}>Cancelar</button></> : <><p>As cartas esperam. O cronômetro está pausado.</p><button className="primary full" onClick={onContinue}>Continuar →</button><button className="secondary full" onClick={() => setConfirm('restart')}>Reiniciar</button><button className="text-button full" onClick={() => setConfirm('exit')}>Sair</button></>}</Modal>;
}
