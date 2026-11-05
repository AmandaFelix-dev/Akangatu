import { Button } from '../../components/Button/Button';
import { THEMES } from '../../data/themes';
import { UNLOCK_RULES } from '../../data/unlockRules';
import { MANUAL_TEXTS, manualChallengeItems, manualSteps, manualThemesText, manualUnlockItem } from '../../data/texts';
import styles from './AboutPage.module.css';
export function AboutPage({ onBack }: {
    onBack: () => void;
}) {
    const { play, modes, themes, unlock } = MANUAL_TEXTS;
    const lockedThemes = THEMES.filter(theme => UNLOCK_RULES[theme.id]);
    return <main className={styles.page}>
        <Button variant="text" className={styles.back} onClick={onBack}>← Voltar ao início</Button>
        <p className={styles.eyebrow}>MANUAL / SOBRE</p>
        <h1 tabIndex={-1}>O segredo é <em>olhar.</em></h1>
        <p className={styles.lead}>Akangatu é um jogo da memória sobre atenção, natureza e cultura. Uma pequena pausa para descobrir a beleza dos encontros.</p>
        <div className={styles.steps}>
            <article className={styles.walkthrough}>
                <span>01</span>
                <h2>{play.title}</h2>
                <ol>{manualSteps().map(step => <li key={step.title}><strong>{step.title}</strong> {step.text}</li>)}</ol>
            </article>
            <article>
                <span>02</span>
                <h2>{modes.title}</h2>
                <p>{modes.normal}</p>
                <p>{modes.challenge}</p>
                <ul>{manualChallengeItems().map(item => <li key={item}>{item}</li>)}</ul>
                <p>{modes.outro}</p>
            </article>
            <article>
                <span>03</span>
                <h2>{themes.title}</h2>
                <p>{manualThemesText(THEMES, UNLOCK_RULES)}</p>
            </article>
            <article>
                <span>04</span>
                <h2>{unlock.title}</h2>
                <p>{unlock.intro}</p>
                <ul>{lockedThemes.map(theme => <li key={theme.id}>{manualUnlockItem(theme.name, UNLOCK_RULES[theme.id])}</li>)}</ul>
                <p>{unlock.outro}</p>
            </article>
        </div>
        <p className={styles.note}>Seus registros são locais a este navegador. Reiniciar ou sair descarta apenas a partida em andamento.</p>
    </main>;
}
