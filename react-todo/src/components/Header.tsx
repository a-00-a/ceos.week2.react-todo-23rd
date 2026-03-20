type HeaderProps = {
  onOpenSidebar: () => void;
  onGoToday: () => void;
};

export default function Header({ onOpenSidebar, onGoToday }: HeaderProps) {
  return (
    <header className="relative flex h-16 items-center justify-center px-4 text-black dark:text-white">
      <button
        type="button"
        data-hamburger
        onClick={onOpenSidebar}
        className="absolute left-4 text-3xl transition-transform hover:scale-110"
        aria-label="사이드바 열기"
      >
        ☰
      </button>
      <h2 onClick={onGoToday} className="cursor-pointer text-2xl font-semibold tracking-tight">
        To do
      </h2>
    </header>
  );
}
