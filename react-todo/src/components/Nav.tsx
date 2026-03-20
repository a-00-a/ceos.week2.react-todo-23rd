type NavProps = {
  currentDate: string;
  displayDate: string;
  onChangeDate: (days: number) => void;
  onPickDate: (date: string) => void;
};

export default function Nav({ currentDate, displayDate, onChangeDate, onPickDate }: NavProps) {
  return (
    <nav className="mt-4 flex items-center justify-center gap-3 px-4 text-black dark:text-white sm:gap-4">
      <button
        type="button"
        onClick={() => onChangeDate(-1)}
        className="text-lg transition-transform hover:scale-110"
        aria-label="이전 날짜"
      >
        ◀
      </button>

      <span className="min-w-[130px] text-center text-base font-medium sm:min-w-[160px] sm:text-lg">{displayDate}</span>

      <div className="relative h-6 w-6 overflow-hidden rounded-full transition hover:scale-110">
        <input
          type="date"
          value={currentDate}
          onChange={(e) => onPickDate(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-100"
          aria-label="날짜 선택"
        />
      </div>

      <button
        type="button"
        onClick={() => onChangeDate(1)}
        className="text-lg transiton-transform hover:scale-110"
        aria-label="다음 날짜"
      >
        ▶
      </button>
    </nav>
  );
}
