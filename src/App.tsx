import { useEffect, useState } from "react";
import { HomePage } from "./features/home/HomePage";
import { ThemeSelection } from "./features/game-setup/ThemeSelection";
import { GamePage } from "./features/memory-game/GamePage";
import { ProfilePage } from "./features/profile/ProfilePage";
import { AboutPage } from "./features/about/AboutPage";
import { Modal } from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";
import { resolveRoute, ROUTES } from "./app/routes";
import type { AppRoute } from "./app/routes";
import type { GameConfig } from "./types/game";
import styles from "./App.module.css";

export default function App() {
  const [route, setRoute] = useState(() => resolveRoute(location.hash));
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [pendingRoute, setPendingRoute] = useState<AppRoute | null>(null);
  const [started, setStarted] = useState(false);
  const navigate = (path: string) => {
    location.hash = path;
  };

  useEffect(() => {
    const update = () => {
      const next = resolveRoute(location.hash);
      if (route === ROUTES.game && config && next !== ROUTES.game) {
        if (!started) {
          setConfig(null);
          setRoute(next);
          return;
        }
        setPendingRoute(next);
        location.replace("#" + ROUTES.game);
        return;
      }
      setRoute(next);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [route, config, started]);

  useEffect(() => {
    document.querySelector<HTMLElement>("main h1, main[tabindex='-1']")?.focus();
    window.scrollTo?.({ top: 0 });
  }, [route]);

  const exitTo = (destination: AppRoute) => {
    setConfig(null);
    setPendingRoute(null);
    setStarted(false);
    navigate(destination);
  };

  return (
    <div className={styles.app}>
      {route === ROUTES.home && (
        <HomePage
          onPlay={() => navigate(ROUTES.themes)}
          onPerformance={() => navigate(ROUTES.player)}
          onAbout={() => navigate(ROUTES.manual)}
        />
      )}
      {(route === ROUTES.themes || (route === ROUTES.game && !config)) && (
        <ThemeSelection
          onBack={() => navigate(ROUTES.home)}
          onStart={(value) => {
            setConfig(value);
            setStarted(false);
            navigate(ROUTES.game);
          }}
        />
      )}
      {route === ROUTES.game && config && (
        <GamePage
          config={config}
          suspended={pendingRoute !== null}
          onExit={() => exitTo(ROUTES.themes)}
          onPerformance={() => exitTo(ROUTES.player)}
          onThemes={() => exitTo(ROUTES.themes)}
          onStarted={() => setStarted(true)}
        />
      )}
      {route === ROUTES.player && (
        <ProfilePage
          onBack={() => navigate(ROUTES.home)}
          onPlay={() => navigate(ROUTES.themes)}
        />
      )}
      {route === ROUTES.manual && (
        <AboutPage onBack={() => navigate(ROUTES.home)} />
      )}
      {pendingRoute && (
        <Modal title="Sair da partida?" onClose={() => setPendingRoute(null)}>
          <p>
            Seu progresso nesta partida será descartado. Os registros anteriores
            continuam salvos.
          </p>
          <Button fullWidth onClick={() => exitTo(pendingRoute)}>
            Sim, sair
          </Button>
          <Button
            variant="text"
            fullWidth
            onClick={() => setPendingRoute(null)}
          >
            Continuar jogando
          </Button>
        </Modal>
      )}
    </div>
  );
}
