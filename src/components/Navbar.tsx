import { Moon, Search, Sun } from 'lucide-react';
import { PROFILE } from '../data/profile';

export type RoutePath = '/' | '/projects' | '/experience' | '/contact' | '/writing';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS: { label: string; path: RoutePath }[] = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar({
  currentPath,
  onNavigate,
  theme,
  onToggleTheme,
  onOpenCommandPalette,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[53px] max-w-[760px] items-center justify-between border-x border-dashed border-[var(--line)] px-6">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="font-serif-display cursor-pointer text-[23px] leading-none tracking-tight text-[var(--fg)] transition-opacity hover:opacity-80"
        >
          {PROFILE.brandName}
        </button>

        <div className="flex items-center gap-5">
          <nav aria-label="Primary" className="hidden items-center gap-5 sm:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => onNavigate(item.path)}
                  className={`group relative cursor-pointer py-1 text-[13.5px] transition-colors ${
                    isActive
                      ? 'font-medium text-[var(--fg)]'
                      : 'text-[var(--muted)] hover:text-[var(--fg)]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute right-0 -bottom-[1px] left-0 h-[1.5px] bg-[var(--fg)] transition-transform duration-200 ${
                      isActive
                        ? 'scale-x-100'
                        : 'origin-left scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command palette"
              title="Search & commands (⌘K)"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)]"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] transition-colors hover:bg-[var(--hover)] hover:text-[var(--fg)]"
            >
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Compact mobile nav bar */}
      <nav
        aria-label="Mobile Navigation"
        className="mx-auto flex max-w-[760px] items-center justify-around border-x border-t border-dashed border-[var(--line)] px-4 py-1.5 sm:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={`cursor-pointer px-2 py-0.5 text-xs transition-colors ${
                isActive ? 'font-medium text-[var(--fg)] underline underline-offset-4' : 'text-[var(--muted)]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
