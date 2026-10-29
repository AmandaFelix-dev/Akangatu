import { PROFILE_LABELS } from "../../data/texts";
import {
  formatBestAttempts,
  formatBestTime,
} from "../../utils/performanceSummary";
import type { ModePerformance } from "../../utils/performanceSummary";
import styles from "./PerformanceTable.module.css";

export function PerformanceTable({
  modes,
  empty,
}: {
  modes: ModePerformance[];
  empty: boolean;
}) {
  const { columns } = PROFILE_LABELS;
  return (
    <div className={empty ? styles.emptyWrap : styles.wrap}>
      <table className={styles.table} aria-label={PROFILE_LABELS.table}>
        <thead>
          <tr>
            <th scope="col">{columns.mode}</th>
            <th scope="col">{columns.played}</th>
            <th scope="col">{columns.bestTime}</th>
            <th scope="col">{columns.bestAttempts}</th>
          </tr>
        </thead>
        <tbody>
          {empty ? (
            <tr>
              <td className={styles.empty} colSpan={4}>
                {PROFILE_LABELS.empty}
              </td>
            </tr>
          ) : (
            modes.map((row) => (
              <tr key={row.mode}>
                <th scope="row">{PROFILE_LABELS.modes[row.mode]}</th>
                <td>{row.played}</td>
                <td>{formatBestTime(row.bestTime)}</td>
                <td>{formatBestAttempts(row.bestAttempts)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
