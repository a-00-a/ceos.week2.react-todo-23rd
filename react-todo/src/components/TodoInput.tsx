import type { KeyboardEvent } from 'react';

type TodoInputProps = {
  input: string;
  count: number;
  doneCount: number;
  onChangeInput: (value: string) => void;
  onAddTodo: () => void;
};

export default function TodoInput({ input, count, doneCount, onChangeInput, onAddTodo }: TodoInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter') {
      onAddTodo();
    }
  };

  return (
    <section className="mt-8 w-full max-w-[20rem] rounded-2xl bg-white px-3 py-3 shadow-[0_3px_10px_rgba(0,0,0,0.08)] transition-colors duration-300 dark:bg-[#2c2c2c]">
      <div className="flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => onChangeInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="오늘의 할 일을 적어주세요!"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 dark:text-white"
        />

        <div className="shrink-0 text-xs text-[#b2b0b0]">
          <span className="mr-1">{count}</span>개
        </div>

        <button
          type="button"
          onClick={onAddTodo}
          className="rounded-md bg-[#ffc933] px-3 py-1.5 text-sm font-medium text-black transition active:scale-95 dark:text-white dark:bg-[#1c1c1c]"
        >
          등록
        </button>
      </div>

      <div className="mt-2 flex justify-end text-xs text-[#9a9898]">done {doneCount}</div>
    </section>
  );
}
