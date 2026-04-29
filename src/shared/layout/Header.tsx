import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useFiltersStore } from '@/features/filters/store/useFiltersStore';

export function Header() {
  const resetAll = useFiltersStore((s) => s.resetAll);

  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="mx-auto max-w-[1098px]">
        <div className="px-4 md:px-6">
          <div className="mx-auto flex max-w-[780px] items-center py-[17px] min-[1099px]:max-w-none">
            <Link to="/" aria-label="myauto.ge" className="inline-flex" onClick={resetAll}>
              <Logo />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
