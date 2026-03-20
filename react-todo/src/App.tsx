import { useEffect, useMemo, useState } from 'react';
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

const getToday = () => formatDateToYYYYMMDD(new Date());

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [currentDate, setCurrentDate] = useState(getToday());

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

  const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const doneCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#cbdef0] px-4 pb-24 pt-10 text-black">
      <h1 className="text-3xl font-semibold">To Do</h1>
      <p className="mt-2 text-sm">{currentDate}</p>

      <TodoInput input={input} count={activeCount} doneCount={doneCount} onChangeInput={setInput} onAddTodo={addTodo} />

      <TodoList todos={todos} onRemoveTodo={removeTodo} onToggleTodo={toggleTodo} />
    </main>
  );
}

export default App;
