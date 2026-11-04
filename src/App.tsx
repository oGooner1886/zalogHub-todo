import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoStats } from './components/TodoStats/TodoStats';
import { DateStrip } from './components/DateStrip/DateStrip';
import { ProgressBar } from './components/ProgressBar/ProgressBar';
import { SunIcon, LeafIcon } from './components/icons/Icons';
import { getReadableHeaderDate, getTodayKey } from './utils/date';
import './App.css';

export function App() {
  const { theme, toggleTheme } = useTheme();

  const {
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
  } = useTodos();

  const todayKey = getTodayKey();
  const isToday = selectedDate === todayKey;

  const dateHeading = selectedDate
    ? isToday
      ? `Сегодня, ${getReadableHeaderDate(selectedDate).split(', ')[1]}`
      : getReadableHeaderDate(selectedDate)
    : 'Все дни';

  const themeTitle =
    theme === 'light'
      ? 'Включить осенний вайб 🍂'
      : 'Включить стандартную тему ☀️';

  return (
    <main className="appContainer">
      <div className="ambientGlow glow1" aria-hidden="true" />
      <div className="ambientGlow glow2" aria-hidden="true" />

      <div className="card">
        <header className="header">
          <div className="headerTop">
            <div>
              <span className="dateBadge">{dateHeading}</span>
              <h1 className="title">Список задач</h1>
            </div>
            <button
              type="button"
              className={`themeToggle ${theme === 'autumn' ? 'themeAutumn' : ''}`}
              onClick={toggleTheme}
              aria-label={themeTitle}
              title={themeTitle}
            >
              {theme === 'light' ? <SunIcon /> : <LeafIcon className="themeAutumn" />}
            </button>
          </div>
        </header>

        <DateStrip
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          taskCountByDate={taskCountByDate}
        />

        <ProgressBar
          total={counts.total}
          completed={counts.completed}
        />

        <TodoForm onAddTodo={addTodo} />

        <TodoFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />

        <TodoList
          todos={filteredTodos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          showDateBadge={selectedDate === null}
        />

        <TodoStats
          activeCount={counts.active}
          completedCount={counts.completed}
          onClearCompleted={clearCompleted}
        />
      </div>
    </main>
  );
}

export default App;
