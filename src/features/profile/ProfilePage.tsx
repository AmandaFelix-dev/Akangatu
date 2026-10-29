import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HOME_LABELS, PROFILE_LABELS, difficultyLabel } from "../../data/texts";
import { DIFFICULTIES } from "../../data/difficulties";
import { loadHistory } from "../../services/history.service";
import {
  formatBestAttempts,
  formatBestTime,
  summarizeDifficulty,
  summarizeTotals,
} from "../../utils/performanceSummary";
import type { DifficultyId } from "../../types/game";
import { MainBackground } from "../../components/MainBackground/MainBackground";
import { PerformanceTable } from "./PerformanceTable";
import logo from "../../assets/logo.webp";
import collectionTitle from "../../assets/layout/profile-title.svg";
import backButton from "../../assets/layout/btn/back-to.svg";
import startButton from "../../assets/layout/btn/start.svg";
import styles from "./ProfilePage.module.css";

const DIFFICULTY_IDS = Object.keys(DIFFICULTIES) as DifficultyId[];

function Stat({
  className,
  label,
  value
}: {
  className: string;
  label: string;
  value: string | number;
}) {
    return (
        <div className={className}>
        <dt>{label}</dt>
        <dd>{value}</dd>
        </div>
    )
}

export function ProfilePage({
  onBack,
  onPlay
}: {
  onBack: () => void;
  onPlay: () => void;
}) {
    const [history] = useState(loadHistory);
    const [difficulty, setDifficulty] = useState(DIFFICULTY_IDS[0]);
    const [switched, setSwitched] = useState(false);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const tabId = (item: DifficultyId) => `${id}-tab-${item}`;
    const panelId = `${id}-panel`;
    const totals = summarizeTotals(history);
    const selected = summarizeDifficulty(history, difficulty);

    const select = (item: DifficultyId) => {
        setSwitched(true);
        setDifficulty(item);
    };

    const press = {
        whileTap: reduceMotion ? undefined : { scale: 0.88 },
        transition: { type: 'spring', stiffness: 500, damping: 25 },
    } as const;
    return(
        <main
        className={styles.page}
        tabIndex={-1}
        aria-label={PROFILE_LABELS.title}
        >
        <MainBackground />
        <motion.button
            className={styles.back}
            aria-label={PROFILE_LABELS.back}
            onClick={onBack}
            {...press}
        >
            <img src={backButton} alt="" />
        </motion.button>
        <img className={styles.logo} src={logo} alt={HOME_LABELS.logo} />
        <img
            className={styles.title}
            src={collectionTitle}
            alt={PROFILE_LABELS.title}
        />
        <div className={styles.summary}>
            <dl className={styles.totals}>
            <Stat
                className={styles.total}
                label={PROFILE_LABELS.totalPlayed}
                value={totals.played}
            />
            <Stat
                className={styles.total}
                label={PROFILE_LABELS.totalWins}
                value={totals.wins}
            />
            </dl>
            <div
            className={styles.tabs}
            role="tablist"
            aria-label={PROFILE_LABELS.difficulties}
            >
            {DIFFICULTY_IDS.map((item) => (
                <motion.button
                key={item}
                id={tabId(item)}
                className={styles.tab}
                type="button"
                role="tab"
                aria-selected={item === difficulty}
                aria-controls={panelId}
                onClick={() => select(item)}
                initial={false}
                animate={
                    reduceMotion ? undefined : { height: item === difficulty ? 44 : 38 }
                }
                transition={{ duration: 0.2, ease: "easeOut" }}
                >
                {difficultyLabel(item)}
                </motion.button>
            ))}
            </div>
            <motion.div
            key={difficulty}
            id={panelId}
            className={styles.panel}
            role="tabpanel"
            aria-labelledby={tabId(difficulty)}
            initial={switched && !reduceMotion ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            >
            <dl className={styles.records}>
                <Stat
                className={styles.record}
                label={PROFILE_LABELS.bestTime}
                value={formatBestTime(selected.records.bestTime)}
                />
                <Stat
                className={styles.record}
                label={PROFILE_LABELS.bestAttempts}
                value={formatBestAttempts(selected.records.bestAttempts)}
                />
            </dl>
            <PerformanceTable
                modes={selected.modes}
                empty={selected.played === 0}
            />
            </motion.div>
        </div>
        <motion.button
            className={styles.start}
            aria-label={HOME_LABELS.start}
            onClick={onPlay}
            {...press}
        >
            <img src={startButton} alt="" />
        </motion.button>
        </main>
    )
}
