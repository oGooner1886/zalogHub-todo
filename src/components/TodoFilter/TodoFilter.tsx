import { memo } from 'react';
import type { FilterStatus, TodoCounts } from '../../types/todo';
import styles from './TodoFilter.module.css';

interface TodoFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: TodoCounts;
}

const FILTER_ITEMS: { key: FilterStatus; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'completed', label: 'Выполненные' },
];

export const TodoFilter = memo(function TodoFilter({
  currentFilter,
  onFilterChange,
  counts,
}: TodoFilterProps) {
  const getCount = (key: FilterStatus): number => {
    if (key === 'active') return counts.active;
    if (key === 'completed') return counts.completed;
    return counts.total;
  };

  return (
    <nav className={styles.filterNav} aria-label="Фильтры задач">
      {FILTER_ITEMS.map(({ key, label }) => {
        const count = getCount(key);
        const isActive = currentFilter === key;

        return (
          <button
            key={key}
            type="button"
            className={`${styles.filterBtn} ${isActive ? styles.active : ''}`}
            onClick={() => onFilterChange(key)}
            aria-pressed={isActive}
          >
            <span>{label}</span>
            <span className={styles.countBadge}>{count}</span>
          </button>
        );
      })}
    </nav>
  );
});
