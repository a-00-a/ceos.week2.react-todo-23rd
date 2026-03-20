import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return `${year}년 ${month}월 ${day}일`;
};

const getToday = () => formatDateToYYYYMMDD(new Date());

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [currentDate, setCurrentDate] = useState(getToday());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(currentDate) || '[]') as Todo[];
    setTodos(storedTodos);
  }, [currentDate]);

  useEffect(() => {
    localStorage.setItem(currentDate, JSON.stringify(todos));
  }, [todos, currentDate]);

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const changeDate = (days: number) => {
    const [year, month, day] = currentDate.split('-').map(Number);
    const nextDate = new Date(year, month - 1, day);
    nextDate.setDate(nextDate.getDate() + days);
    setCurrentDate(formatDateToYYYYMMDD(nextDate));
  };

  const goToday = () => {
    setCurrentDate(getToday());
  };

  const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const doneCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  return (
    <div className="min-h-screen bg-[#cbdef0] text-black transition-colors duration-300 dark:bg-[#3d3c3c]">
      <Header onOpenSidebar={() => setSidebarOpen(true)} onGoToday={goToday} />
      <Nav
        currentDate={currentDate}
        displayDate={formatDisplayDate(currentDate)}
        onChangeDate={changeDate}
        onPickDate={setCurrentDate}
      />

      <main className="flex min-h-screen flex-col items-center bg-[#cbdef0] px-4 pb-24 pt-10 text-black">
        <h1 className="text-3xl font-semibold">To Do</h1>

        <TodoInput
          input={input}
          count={activeCount}
          doneCount={doneCount}
          onChangeInput={setInput}
          onAddTodo={addTodo}
        />

        <TodoList todos={todos} onRemoveTodo={removeTodo} onToggleTodo={toggleTodo} />
      </main>
    </div>
  );
}

export default App;
