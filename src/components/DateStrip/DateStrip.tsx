import { memo } from 'react';
import { getWeekDays } from '../../utils/date';
import styles from './DateStrip.module.css';

interface DateStripProps {
  selectedDate: string | null;
  onSelectDate: (dateKey: string | null) => void;
  taskCountByDate: Record<string, number>;
}

const WEEK_DAYS = getWeekDays(new Date(), 3);

export const DateStrip = memo(function DateStrip({
  selectedDate,
  onSelectDate,
  taskCountByDate,
}: DateStripProps) {
  return (
    <div className={styles.container} role="region" aria-label="Выбор даты">
      <div className={styles.scrollWrapper}>
        <button
          type="button"
          className={`${styles.dayCard} ${styles.allDaysBtn} ${selectedDate === null ? styles.active : ''}`}
          onClick={() => onSelectDate(null)}
          aria-pressed={selectedDate === null}
        >
          <span className={styles.dayLabel}>Все</span>
          <span className={styles.dayNum}>Дни</span>
        </button>

        <div className={styles.divider} />

        {WEEK_DAYS.map((day) => {
          const isSelected = selectedDate === day.dateKey;
          const count = taskCountByDate[day.dateKey] || 0;

          return (
            <button
              key={day.dateKey}
              type="button"
              className={`${styles.dayCard} ${isSelected ? styles.active : ''} ${day.isToday ? styles.today : ''}`}
              onClick={() => onSelectDate(day.dateKey)}
              aria-pressed={isSelected}
              title={`${day.isToday ? 'Сегодня, ' : ''}${day.dayNumber}`}
            >
              <span className={styles.dayLabel}>
                {day.isToday ? 'СЕЙЧАС' : day.dayNameShort}
              </span>
              <span className={styles.dayNum}>{day.dayNumber}</span>
              {count > 0 && <span className={styles.dotIndicator} />}
            </button>
          );
        })}
      </div>
    </div>
  );
});
