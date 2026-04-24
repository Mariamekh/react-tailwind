import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="border-b border-surface-border bg-white">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center px-4 md:px-6">
        <Link to="/" aria-label="myauto.ge" className="inline-flex">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
