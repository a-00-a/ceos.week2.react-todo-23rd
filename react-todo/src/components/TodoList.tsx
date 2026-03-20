import type { Todo } from '../App';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onRemoveTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
};

export default function TodoList({ todos, onRemoveTodo, onToggleTodo }: TodoListProps) {
  return (
    <section className="mt-4 flex w-full max-w-[20rem] flex-col items-end gap-3">
      {todos.length === 0 ? (
        <div className="w-full rounded-2xl border border-dashed border-white/60 px-4 py-8 text-center text-sm text-gray-600 dark:border-white/20 dark:text-gray-300">
          아직 등록된 할 일이 없어요.
        </div>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
        ))
      )}
    </section>
  );
}
