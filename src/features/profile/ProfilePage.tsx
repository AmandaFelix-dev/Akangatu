import { loadHistory } from '../../services/history.service';
import { DIFFICULTIES } from '../../data/difficulties';
import { formatTime } from '../../utils/formatTime';
import { Button } from '../../components/Button/Button';
import styles from './ProfilePage.module.css';
export function ProfilePage({ onPlay }: {
    onPlay: () => void;
}) {
    const history = loadHistory();
    const bestTime = history.length ? formatTime(Math.min(...history.map(item => item.durationInSeconds))) : '—';
    const bestAttempts = history.length ? Math.min(...history.map(item => item.attempts)) : '—';
    return <main className={styles.page}><p className={styles.eyebrow}>SEU CADERNO DE DESCOBERTAS</p><h1 tabIndex={-1}>Memórias que <em>ficam.</em></h1><p className={styles.lead}>Cada encontro faz parte da sua evolução.</p><div className={styles.stats}><article><span>PARTIDAS CONCLUÍDAS</span><strong>{history.length.toString().padStart(2, '0')}</strong></article><article><span>MELHOR TEMPO</span><strong>{bestTime}</strong></article><article><span>MENOS TENTATIVAS</span><strong>{bestAttempts}</strong></article></div>{!history.length && <section className={styles.empty}><span aria-hidden="true">✳</span><h2>Seu primeiro encontro está por vir.</h2><p>Conclua uma partida para começar seu caderno de descobertas.<br />Seus recordes serão guardados neste dispositivo.</p><Button onClick={onPlay}>Começar a jogar ↗</Button></section>}<section className={styles.summary}><h2>Um ritmo, uma história.</h2><p>Seus melhores registros por dificuldade.</p><div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Dificuldade</th><th>Partidas</th><th>Melhor tempo</th><th>Menos tentativas</th></tr></thead><tbody>{Object.values(DIFFICULTIES).map(difficulty => { const items = history.filter(item => item.difficulty === difficulty.id); return <tr key={difficulty.id}><th scope="row">{difficulty.name} <small>· {difficulty.pairs} pares</small></th><td>{items.length}</td><td>{items.length ? formatTime(Math.min(...items.map(item => item.durationInSeconds))) : '—'}</td><td>{items.length ? Math.min(...items.map(item => item.attempts)) : '—'}</td></tr>; })}</tbody></table></div></section>{!!history.length && <Button onClick={onPlay}>Uma nova descoberta ↗</Button>}</main>;
}
