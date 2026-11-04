import { memo } from 'react';
import styles from './TodoStats.module.css';

interface TodoStatsProps {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

function getPluralTasks(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) {
    return `${count} задач`;
  }
  if (mod10 === 1) {
    return `${count} задача`;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} задачи`;
  }
  return `${count} задач`;
}

export const TodoStats = memo(function TodoStats({
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoStatsProps) {
  return (
    <footer className={styles.footer}>
      <span className={styles.remaining}>
        Осталось сделать: <strong>{getPluralTasks(activeCount)}</strong>
      </span>
      {completedCount > 0 && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={onClearCompleted}
        >
          Очистить выполненные ({completedCount})
        </button>
      )}
    </footer>
  );
});
