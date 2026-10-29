import { motion, useReducedMotion } from 'motion/react';
import { MainBackground } from "../../components/MainBackground/MainBackground";
import { HOME_LABELS } from "../../data/texts";
import logo from "../../assets/logo.webp";
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
  const reduceMotion = useReducedMotion();
  const press = {
      whileTap: reduceMotion ? undefined : { scale: 0.88 },
      transition: { type: 'spring', stiffness: 500, damping: 25 },
  } as const;
  return (
    <main className={styles.home}>
      <MainBackground />
      <motion.button
        className={styles.about}
        aria-label={HOME_LABELS.about}
        onClick={onAbout}
        {...press}
      >
        <img src={aboutButton} alt="" />
      </motion.button>
      <h1 className={styles.logo} tabIndex={-1}>
        <img src={logo} alt={HOME_LABELS.logo} />
      </h1>
      <motion.button
        className={styles.action}
        aria-label={HOME_LABELS.start}
        onClick={onPlay}
        {...press}
      >
        <img src={startButton} alt="" />
      </motion.button>
      <motion.button
        className={styles.action}
        aria-label={HOME_LABELS.performance}
        onClick={onPerformance}
        {...press}
      >
        <img src={performanceButton} alt="" />
      </motion.button>
    </main>
  );
}
