import type { Todo } from '../App';

type TodoItemProps = {
  todo: Todo;
  onRemoveTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
};

export default function TodoItem({ todo, onRemoveTodo, onToggleTodo }: TodoItemProps) {
  return (
    <article className="flex w-full items-center gap-3 rounded-2xl bg-[#f9c254] px-3 py-3 text-sm font-medium text-black shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition hover:-translate-y-[1px] dark:bg-[#d6d7d8]">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        className="h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-[5px] border-2 border-[#f9f9f9] bg-[#f9f9f9] transition-all checked:relative checked:bg-[#f9f9f9] checked:after:absolute checked:after:left-[3px] checked:after:top-[-2px] checked:after:text-sm checked:after:text-[#ff4d4d] checked:after:content-['✓']"
      />

      <span className={`flex-1 break-all text-left text-sm ${todo.completed ? 'text-[#747373] line-through' : ''}`}>
        {todo.text}
      </span>

      <button
        type="button"
        onClick={() => onRemoveTodo(todo.id)}
        className="shrink-0 rounded-md bg-[#f3f4f6] px-3 py-1.5 text-sm text-black transition hover:bg-[#e5e7eb]"
      >
        삭제
      </button>
    </article>
  );
}
