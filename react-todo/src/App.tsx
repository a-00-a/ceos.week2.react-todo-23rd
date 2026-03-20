import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
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
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragIndex, setDragIndex] = useState(-1);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(currentDate) || '[]') as Todo[];
    setTodos(storedTodos);
  }, [currentDate]);

  useEffect(() => {
    localStorage.setItem(currentDate, JSON.stringify(todos));
  }, [todos, currentDate]);

  useEffect(() => {
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode') || 'false') as boolean;
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('[data-sidebar]') || target.closest('[data-hamburger]')) {
        return;
      }
      setSidebarOpen(false);
    };

    if (sidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sidebarOpen]);

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

  const handleDrop = (dropIndex: number) => {
    if (dragIndex === -1 || dragIndex === dropIndex) return;

    const newTodos = [...todos];
    const draggedTodo = newTodos[dragIndex];

    newTodos.splice(dragIndex, 1);
    newTodos.splice(dropIndex, 0, draggedTodo);

    setTodos(newTodos);
    setDragIndex(-1);
  };

  const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const doneCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);

  return (
    <div className="min-h-screen bg-[#cbdef0] text-black transition-colors duration-300 dark:bg-[#3d3c3c]">
      <Header onOpenSidebar={() => setSidebarOpen(true)} onGoToday={goToday} />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onChangeWeek={changeDate}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <Nav
        currentDate={currentDate}
        displayDate={formatDisplayDate(currentDate)}
        onChangeDate={changeDate}
        onPickDate={setCurrentDate}
      />

      <main className="flex flex-col items-center px-4 pb-24">
        <TodoInput
          input={input}
          count={activeCount}
          doneCount={doneCount}
          onChangeInput={setInput}
          onAddTodo={addTodo}
        />

        <TodoList
          todos={todos}
          setDragIndex={setDragIndex}
          handleDrop={handleDrop}
          onRemoveTodo={removeTodo}
          onToggleTodo={toggleTodo}
        />
      </main>
    </div>
  );
}

export default App;
