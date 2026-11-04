import { memo } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  total: number;
  completed: number;
}

export const ProgressBar = memo(function ProgressBar({
  total,
  completed,
}: ProgressBarProps) {
  if (total === 0) {
    return null;
  }

  const percentage = Math.round((completed / total) * 100);
  const isAllDone = percentage === 100;

  return (
    <section className={styles.wrapper} aria-label="Прогресс выполнения">
      <div className={styles.labelRow}>
        <span className={styles.statusText}>
          {isAllDone ? (
            <span className={styles.allDoneText}>Все задачи выполнены!</span>
          ) : (
            <>
              Выполнено <strong>{completed}</strong> из <strong>{total}</strong>
            </>
          )}
        </span>
        <span className={`${styles.percent} ${isAllDone ? styles.percentSuccess : ''}`}>
          {percentage}%
        </span>
      </div>

      <div className={styles.track}>
        <div
          className={`${styles.fill} ${isAllDone ? styles.fillSuccess : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
});
