import { useState, memo, type FormEvent, type ChangeEvent } from 'react';
import { PlusIcon } from '../icons/Icons';
import styles from './TodoForm.module.css';

interface TodoFormProps {
  onAddTodo: (text: string) => boolean;
}

export const TodoForm = memo(function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Задача не может быть пустой или состоять только из пробелов');
      return;
    }

    const success = onAddTodo(text);
    if (success) {
      setText('');
      setError(null);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) {
      setError(null);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          placeholder="Что нужно сделать?..."
          value={text}
          onChange={handleChange}
          aria-label="Новая задача"
          maxLength={200}
        />
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!text.trim()}
          title="Добавить задачу"
        >
          <PlusIcon />
          <span>Добавить</span>
        </button>
      </div>
      {error && (
        <p className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </form>
  );
});
