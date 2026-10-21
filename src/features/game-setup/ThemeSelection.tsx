import { useState } from "react";
import { THEMES } from "../../data/themes";
import { HOME_LABELS, THEMES_LABELS, unlockCondition, unlockProgressText } from "../../data/texts";
import { UNLOCK_RULES } from "../../data/unlockRules";
import { loadHistory } from "../../services/history.service";
import { calculateUnlockProgress } from "../../utils/unlockProgress";
import type { Theme } from "../../types/theme";
import type { GameConfig } from "../../types/game";
import { DifficultySelection } from "./DifficultySelection";
import { MainBackground } from "../../components/MainBackground/MainBackground";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import logo from "../../assets/logo.svg";
import collectionTitle from "../../assets/layout/collection-title.svg";
import backButton from "../../assets/layout/btn/back-to.svg";
import blockedIcon from "../../assets/layout/btn/blocked.svg";
import plaque from "../../assets/layout/retangle-base.svg";
import styles from "./ThemeSelection.module.css";

export function ThemeSelection({
  onStart,
  onBack,
}: {
  onStart: (config: GameConfig) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Theme | null>(null);
  const [history] = useState(loadHistory);
  return (
    <main
      className={styles.page}
      tabIndex={-1}
      aria-label={THEMES_LABELS.title}
    >
      <MainBackground />
      <button
        className={styles.back}
        aria-label={THEMES_LABELS.back}
        onClick={onBack}
      >
        <img src={backButton} alt="" />
      </button>
      <img className={styles.logo} src={logo} alt={HOME_LABELS.logo} />
      <img
        className={styles.title}
        src={collectionTitle}
        alt={THEMES_LABELS.title}
      />
      <ul className={styles.list}>
        {THEMES.map((theme, index) => {
          const locked = !theme.isUnlocked;
          const conditionId = `condition-${theme.id}`;
          const rule = UNLOCK_RULES[theme.id];
          const progress = rule && calculateUnlockProgress(history, rule);
          return (
            <li key={theme.id}>
              <div
                className={styles.item + (locked ? " " + styles.locked : "")}
              >
                <button
                  className={
                    styles.card +
                    (index % 2 === 1 ? " " + styles.reversed : "")
                  }
                  aria-disabled={locked || undefined}
                  aria-label={
                    locked
                      ? `${theme.name}, ${THEMES_LABELS.locked}`
                      : undefined
                  }
                  aria-describedby={locked ? conditionId : undefined}
                  onClick={() => {
                    if (!locked) setSelected(theme);
                  }}
                >
                  <img src={theme.coverImage} alt="" className={styles.image} />
                  <span className={styles.name}>{theme.name}</span>
                </button>
                {locked && (
                  <>
                    <div className={styles.veil} aria-hidden="true" />
                    <img
                      className={styles.blocked}
                      src={blockedIcon}
                      alt=""
                    />
                    <div className={styles.plaque}>
                      <img src={plaque} alt="" className={styles.plaqueImage} />
                      <p id={conditionId} className={styles.condition}>
                        {rule && unlockCondition(rule)}
                      </p>
                      <div className={styles.bar}>
                        <ProgressBar
                          value={progress ? (progress.current / progress.target) * 100 : 0}
                          valueText={progress && unlockProgressText(progress.current, progress.target)}
                          label={`${THEMES_LABELS.progress}: ${theme.name}`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {selected && (
        <DifficultySelection
          theme={selected}
          onClose={() => setSelected(null)}
          onStart={onStart}
        />
      )}
    </main>
  );
}
