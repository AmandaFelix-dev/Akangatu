import { MainBackground } from "../../components/MainBackground/MainBackground";
import { HOME_LABELS } from "../../data/texts";
import logo from "../../assets/logo.svg";
import startButton from "../../assets/layout/btn/start.svg";
import performanceButton from "../../assets/layout/btn/perfomance.svg";
import aboutButton from "../../assets/layout/btn/about.svg";
import styles from "./HomePage.module.css";
export function HomePage({
  onPlay,
  onPerformance,
  onAbout,
}: {
  onPlay: () => void;
  onPerformance: () => void;
  onAbout: () => void;
}) {
  return (
    <main className={styles.home}>
      <MainBackground />
      <button
        className={styles.about}
        aria-label={HOME_LABELS.about}
        onClick={onAbout}
      >
        <img src={aboutButton} alt="" />
      </button>
      <h1 className={styles.logo} tabIndex={-1}>
        <img src={logo} alt={HOME_LABELS.logo} />
      </h1>
      <button
        className={styles.action}
        aria-label={HOME_LABELS.start}
        onClick={onPlay}
      >
        <img src={startButton} alt="" />
      </button>
      <button
        className={styles.action}
        aria-label={HOME_LABELS.performance}
        onClick={onPerformance}
      >
        <img src={performanceButton} alt="" />
      </button>
    </main>
  );
}
