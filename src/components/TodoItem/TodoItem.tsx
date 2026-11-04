import { memo } from 'react';
import type { Todo } from '../../types/todo';
import { CheckIcon, TrashIcon } from '../icons/Icons';
import { formatShortDate } from '../../utils/date';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  showDateBadge?: boolean;
}

export const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
  showDateBadge = false,
}: TodoItemProps) {
  const handleToggle = () => onToggle(todo.id);
  const handleDelete = () => onDelete(todo.id);

  return (
    <li
      className={`${styles.item} ${todo.completed ? styles.completed : ''}`}
      data-testid="todo-item"
    >
      <label className={styles.clickableArea}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className={styles.nativeCheckbox}
          aria-label={
            todo.completed
              ? 'Пометить как невыполненную'
              : 'Пометить как выполненную'
          }
        />
        <span className={styles.customCheckbox}>
          {todo.completed && <CheckIcon className={styles.checkIcon} />}
        </span>

        <span className={styles.text} title={todo.text}>
          {todo.text}
        </span>

        {showDateBadge && (
          <span
            className={styles.dateBadge}
            title={`Назначено на: ${formatShortDate(todo.dateKey)}`}
          >
            {formatShortDate(todo.dateKey)}
          </span>
        )}
      </label>

      <button
        type="button"
        className={styles.deleteBtn}
        onClick={handleDelete}
        aria-label={`Удалить задачу: ${todo.text}`}
        title="Удалить задачу"
      >
        <TrashIcon />
      </button>
    </li>
  );
});
