import { useState } from "react";
import { THEMES } from "../../data/themes";
import { HOME_LABELS, THEMES_LABELS } from "../../data/texts";
import type { Theme } from "../../types/theme";
import type { GameConfig } from "../../types/game";
import { DifficultySelection } from "./DifficultySelection";
import { MainBackground } from "../../components/MainBackground/MainBackground";
import logo from "../../assets/logo.svg";
import collectionTitle from "../../assets/layout/collection-title.svg";
import backButton from "../../assets/layout/btn/back-to.svg";
import styles from "./ThemeSelection.module.css";
export function ThemeSelection({
  onStart,
  onBack,
}: {
  onStart: (config: GameConfig) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<Theme | null>(null);
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
        {THEMES.map((theme, index) => (
          <li key={theme.id}>
            <button
              className={
                styles.card + (index % 2 === 1 ? " " + styles.reversed : "")
              }
              onClick={() => setSelected(theme)}
            >
              <img src={theme.coverImage} alt="" className={styles.image} />
              <span className={styles.name}>{theme.name}</span>
            </button>
          </li>
        ))}
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
