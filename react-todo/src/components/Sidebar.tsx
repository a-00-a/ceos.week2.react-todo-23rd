type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  onChangeWeek: (days: number) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function Sidebar({ isOpen, onClose, onChangeWeek, darkMode, onToggleDarkMode }: SidebarProps) {
  return (
    <aside
      data-sidebar
      className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-[#fbf0d6] px-2 py-3 shadow-xl transition-transform duration-300 dark:bg-white ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        className="mb-4 w-fit text-xl transition-transform hover:scale-110"
        aria-label="사이드바 닫기"
      >
        ◀
      </button>

      <button
        type="button"
        onClick={() => {
          onChangeWeek(-7);
          onClose();
        }}
        className="mb-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-black transition hover:bg-black/5"
      >
        이전 주
      </button>

      <button
        type="button"
        onClick={() => {
          onChangeWeek(7);
          onClose();
        }}
        className="mb-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-black transition hover:bg-black/5"
      >
        다음 주
      </button>

      <button
        type="button"
        onClick={onToggleDarkMode}
        className="rounded-lg px-4 py-3 text-left text-sm font-medium text-black transition hover:bg-black/5"
      >
        {darkMode ? '☀️다크모드 해제' : '다크모드 설정🌙'}
      </button>
    </aside>
  );
}
