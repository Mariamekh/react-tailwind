import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';

export function Header() {
  const resetAll = useFiltersStore((s) => s.resetAll);

  return (
    <header className="sticky top-0 z-30 border-b border-surface-border bg-white">
      <div className="mx-auto flex max-w-[1098px] items-center px-4 py-[17px] md:px-6">
        <Link
          to="/"
          aria-label="myauto.ge"
          className="inline-flex"
          onClick={resetAll}
        >
          <Logo />
        </Link>
      </div>
    </header>
  );
}
