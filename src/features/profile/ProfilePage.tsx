import { loadHistory } from '../../services/history.service';
import { DIFFICULTIES } from '../../data/difficulties';
import { formatTime } from '../../utils/formatTime';
export function ProfilePage({ onPlay }: {
    onPlay: () => void;
}) {
    const history = loadHistory();
    const bestTime = history.length ? formatTime(Math.min(...history.map(item => item.durationInSeconds))) : '—';
    const bestAttempts = history.length ? Math.min(...history.map(item => item.attempts)) : '—';
    return <main className="page"><p className="eyebrow">SEU CADERNO DE DESCOBERTAS</p><h1 tabIndex={-1}>Memórias que <em>ficam.</em></h1><p className="lead">Cada encontro faz parte da sua evolução.</p><div className="stats"><article><span>PARTIDAS CONCLUÍDAS</span><strong>{history.length.toString().padStart(2, '0')}</strong></article><article><span>MELHOR TEMPO</span><strong>{bestTime}</strong></article><article><span>MENOS TENTATIVAS</span><strong>{bestAttempts}</strong></article></div>{!history.length && <section className="empty"><span aria-hidden="true">✳</span><h2>Seu primeiro encontro está por vir.</h2><p>Conclua uma partida para começar seu caderno de descobertas.<br />Seus recordes serão guardados neste dispositivo.</p><button className="primary" onClick={onPlay}>Começar a jogar ↗</button></section>}<section className="difficulty-summary"><h2>Um ritmo, uma história.</h2><p>Seus melhores registros por dificuldade.</p><div className="table-wrap"><table><thead><tr><th>Dificuldade</th><th>Partidas</th><th>Melhor tempo</th><th>Menos tentativas</th></tr></thead><tbody>{Object.values(DIFFICULTIES).map(difficulty => { const items = history.filter(item => item.difficulty === difficulty.id); return <tr key={difficulty.id}><th scope="row">{difficulty.name} <small>· {difficulty.pairs} pares</small></th><td>{items.length}</td><td>{items.length ? formatTime(Math.min(...items.map(item => item.durationInSeconds))) : '—'}</td><td>{items.length ? Math.min(...items.map(item => item.attempts)) : '—'}</td></tr>; })}</tbody></table></div></section>{!!history.length && <button className="primary" onClick={onPlay}>Uma nova descoberta ↗</button>}</main>;
}
