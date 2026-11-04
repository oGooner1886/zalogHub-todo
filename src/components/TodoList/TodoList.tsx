import { memo } from "react";
import type { Todo, FilterStatus } from "../../types/todo";
import { TodoItem } from "../TodoItem/TodoItem";
import { ClipboardCheckIcon } from "../icons/Icons";
import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  filter: FilterStatus;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  showDateBadge?: boolean;
}

const EMPTY_MESSAGES: Record<FilterStatus, { title: string; subtext: string }> =
  {
    all: {
      title: "Список задач пуст",
      subtext: "Добавьте первую задачу с помощью формы выше",
    },
    active: {
      title: "Все задачи выполнены!",
      subtext: "Отличная работа, активных задач не осталось ",
    },
    completed: {
      title: "Нет выполненных задач",
      subtext: "Выполните хотя бы одну задачу, чтобы увидеть её здесь",
    },
  };

export const TodoList = memo(function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
  showDateBadge = false,
}: TodoListProps) {
  if (todos.length === 0) {
    const { title, subtext } = EMPTY_MESSAGES[filter];

    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <ClipboardCheckIcon />
        </div>
        <p className={styles.emptyMessage}>{title}</p>
        <p className={styles.emptySubtext}>{subtext}</p>
      </div>
    );
  }

  return (
    <ul className={styles.list} aria-label="Список задач">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          showDateBadge={showDateBadge}
        />
      ))}
    </ul>
  );
});
