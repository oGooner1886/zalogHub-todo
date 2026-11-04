import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Todo, FilterStatus, TodoCounts } from '../types/todo';
import { getTodayKey } from '../utils/date';

const STORAGE_KEY = 'zaloghub_todos_v1';

const today = getTodayKey();

const INITIAL_TODOS: Todo[] = [
  {
    id: 'initial-1',
    text: 'Ознакомиться с требованиями тестового задания ZalogHub',
    completed: true,
    createdAt: Date.now() - 3600000,
    dateKey: today,
  },
  {
    id: 'initial-2',
    text: 'Проверить добавление, фильтрацию и удаление задач',
    completed: false,
    createdAt: Date.now() - 1800000,
    dateKey: today,
  },
  {
    id: 'initial-3',
    text: 'Отправить ссылку на репозиторий в Telegram @NikSiting',
    completed: false,
    createdAt: Date.now(),
    dateKey: today,
  },
];

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map((item: Partial<Todo>) => ({
            ...item,
            dateKey: item.dateKey || today,
          })) as Todo[];
        }
      }
    } catch (error) {
      console.error('Ошибка чтения задач из localStorage:', error);
    }
    return INITIAL_TODOS;
  });

  const [filter, setFilter] = useState<FilterStatus>('all');
  const [selectedDate, setSelectedDate] = useState<string | null>(today);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Ошибка сохранения задач в localStorage:', error);
    }
  }, [todos]);

  const addTodo = useCallback(
    (text: string): boolean => {
      const trimmed = text.trim();
      if (!trimmed) {
        return false;
      }

      const newTodo: Todo = {
        id: generateId(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
        dateKey: selectedDate || today,
      };

      setTodos((prev) => [newTodo, ...prev]);
      return true;
    },
    [selectedDate]
  );

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) =>
      prev.filter((todo) => {
        if (selectedDate !== null && todo.dateKey !== selectedDate) {
          return true;
        }
        return !todo.completed;
      })
    );
  }, [selectedDate]);

  const dateScopedTodos = useMemo(() => {
    if (!selectedDate) {
      return todos;
    }
    return todos.filter((todo) => todo.dateKey === selectedDate);
  }, [todos, selectedDate]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return dateScopedTodos.filter((t) => !t.completed);
      case 'completed':
        return dateScopedTodos.filter((t) => t.completed);
      case 'all':
      default:
        return dateScopedTodos;
    }
  }, [dateScopedTodos, filter]);

  const counts: TodoCounts = useMemo(() => {
    let completed = 0;
    for (const todo of dateScopedTodos) {
      if (todo.completed) {
        completed++;
      }
    }
    const total = dateScopedTodos.length;
    return {
      total,
      completed,
      active: total - completed,
    };
  }, [dateScopedTodos]);

  const taskCountByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const todo of todos) {
      map[todo.dateKey] = (map[todo.dateKey] || 0) + 1;
    }
    return map;
  }, [todos]);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    selectedDate,
    setSelectedDate,
    counts,
    taskCountByDate,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
