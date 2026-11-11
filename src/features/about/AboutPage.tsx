import { Button } from '../../components/Button/Button';
import { THEMES } from '../../data/themes';
import { THEME_BACKGROUNDS } from '../../data/themeBackgrounds';
import { UNLOCK_RULES } from '../../data/unlockRules';
import {
    MANUAL_TEXTS,
    manualChallengeItems,
    manualSteps,
    manualThemesText,
    manualUnlockItem,
} from '../../data/texts';
import styles from './AboutPage.module.css';

function ManualIllustration() {
    return (
        <svg
            className={styles.illustration}
            viewBox="0 0 360 250"
            role="img"
            aria-label="Duas cartas de memória, uma com uma folha e outra com uma estrela"
        >
            <ellipse
                cx="180"
                cy="218"
                rx="133"
                ry="15"
                fill="#183e35"
                opacity=".12"
            />

            <path
                d="M62 174c17-30 28-49 46-69M79 145c-17 1-28-5-36-16 17-4 29 1 36 16Zm12-23c-1-17 4-29 16-38 4 17 0 29-16 38Zm-19 30c-15 6-27 5-39-3 14-9 27-9 39 3Z"
                fill="#7b9a67"
                stroke="#456847"
                strokeWidth="3"
                strokeLinejoin="round"
            />

            <g transform="rotate(-10 145 135)">
                <rect
                    x="91"
                    y="60"
                    width="103"
                    height="143"
                    rx="12"
                    fill="#704a30"
                />
                <rect
                    x="97"
                    y="55"
                    width="103"
                    height="143"
                    rx="12"
                    fill="#21483b"
                    stroke="#704a30"
                    strokeWidth="4"
                />
                <path
                    d="m148 91 6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2 6-13Z"
                    fill="#e2b45c"
                />
                <circle cx="117" cy="75" r="3" fill="#e2b45c" />
                <circle cx="180" cy="177" r="3" fill="#e2b45c" />
            </g>

            <g transform="rotate(9 222 130)">
                <rect
                    x="166"
                    y="48"
                    width="106"
                    height="148"
                    rx="12"
                    fill="#704a30"
                />
                <rect
                    x="172"
                    y="43"
                    width="106"
                    height="148"
                    rx="12"
                    fill="#f5eddb"
                    stroke="#704a30"
                    strokeWidth="4"
                />
                <path
                    d="M224 151c-2-30 4-51 19-68M223 126c-15-1-25-8-31-21 15-3 26 4 31 21Zm6-18c1-15 8-25 21-31 3 15-4 26-21 31Zm-5 34c-13 2-23-2-31-12 14-5 25-1 31 12Z"
                    fill="#7b9a67"
                    stroke="#456847"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>

            <circle cx="294" cy="63" r="5" fill="#c7924c" />
            <circle cx="72" cy="83" r="4" fill="#c55c43" />
            <path
                d="m306 112 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8Z"
                fill="#c7924c"
            />
        </svg>
    );
}

export function AboutPage({ onBack }: {
    onBack: () => void;
}) {
    const { play, modes, themes, unlock } = MANUAL_TEXTS;
    const steps = manualSteps();
    const lockedThemes = THEMES.filter(theme => UNLOCK_RULES[theme.id]);

    return (
        <main className={styles.page}>
            <Button
                variant="text"
                className={styles.back}
                onClick={onBack}
            >
                ← Voltar ao início
            </Button>

            <header className={styles.hero}>
                <div className={styles.heroText}>
                    <p className={styles.eyebrow}>MANUAL DO JOGO</p>
                    <h1 tabIndex={-1}>
                        O segredo é <em>olhar.</em>
                    </h1>
                    <p className={styles.lead}>
                        Akangatu é um jogo da memória sobre atenção, natureza
                        e cultura. Uma pequena pausa para descobrir a beleza
                        dos encontros.
                    </p>
                </div>

                <ManualIllustration />
            </header>

            <section className={styles.manualSection}>
                <h2 className={styles.woodTitle}>{play.title}</h2>

                <ol className={styles.stepList}>
                    {steps.map((step, index) => (
                        <li className={styles.step} key={step.title}>
                            <span className={styles.stepNumber}>
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div>
                                <strong>{step.title}</strong>
                                <p>{step.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section className={styles.manualSection}>
                <h2 className={styles.woodTitle}>{modes.title}</h2>

                <div className={styles.modeGrid}>
                    <article className={styles.modeCard}>
                        <div className={styles.modeHeading}>
                            <span className={styles.modeSymbol} aria-hidden="true">
                                ∞
                            </span>
                            <div>
                                <small>JOGUE NO SEU RITMO</small>
                                <h3>Modo Normal</h3>
                            </div>
                        </div>

                        <p>{modes.normal}</p>
                        <div className={styles.modeFact}>
                            Sem limite de tempo ou tentativas
                        </div>
                    </article>

                    <article className={styles.modeCard}>
                        <div className={styles.modeHeading}>
                            <span className={styles.modeSymbol} aria-hidden="true">
                                <svg viewBox="0 0 32 32">
                                    <circle cx="16" cy="17" r="11" />
                                    <path d="M16 10v7l5 3M12 3h8" />
                                </svg>
                            </span>
                            <div>
                                <small>ACEITE O DESAFIO</small>
                                <h3>Modo Desafio</h3>
                            </div>
                        </div>

                        <p>{modes.challenge}</p>

                        <ul className={styles.challengeList}>
                            {manualChallengeItems().map(item => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <p>{modes.outro}</p>
                    </article>
                </div>
            </section>

            <section className={styles.manualSection}>
                <h2 className={styles.woodTitle}>{themes.title}</h2>
                <p className={styles.sectionIntro}>
                    {manualThemesText(THEMES, UNLOCK_RULES)}
                </p>

                <div className={styles.themeGrid}>
                    {THEMES.map(theme => {
                        const isLocked = Boolean(UNLOCK_RULES[theme.id]);

                        return (
                            <article className={styles.themeCard} key={theme.id}>
                                <div
                                    className={styles.themeImage}
                                    style={{
                                        backgroundColor: THEME_BACKGROUNDS[theme.id],
                                    }}
                                >
                                    <img
                                        src={theme.coverImage}
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </div>

                                <div className={styles.themeInfo}>
                                    <strong>{theme.name}</strong>
                                    <small
                                        className={
                                            isLocked
                                                ? styles.locked
                                                : styles.available
                                        }
                                    >
                                        {isLocked
                                            ? 'Desbloqueada por desafio'
                                            : 'Disponível desde o início'}
                                    </small>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className={styles.manualSection}>
                <h2 className={styles.woodTitle}>{unlock.title}</h2>
                <p className={styles.sectionIntro}>{unlock.intro}</p>

                <ul className={styles.unlockList}>
                    {lockedThemes.map(theme => (
                        <li key={theme.id}>
                            <span className={styles.lockMark} aria-hidden="true">
                                ◆
                            </span>
                            <span>
                                {manualUnlockItem(
                                    theme.name,
                                    UNLOCK_RULES[theme.id],
                                )}
                            </span>
                        </li>
                    ))}
                </ul>

                <p>{unlock.outro}</p>
            </section>

            <p className={styles.note}>
                Seus registros são locais a este navegador. Reiniciar ou sair
                descarta apenas a partida em andamento.
            </p>
        </main>
    );
}