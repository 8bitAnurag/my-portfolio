import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Copy,
  FileText,
  FolderGit2,
  Mail,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import { PROFILE } from '../data/profile';
import type { RoutePath } from './Navbar';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: RoutePath, hash?: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

interface PaletteItem {
  id: string;
  group: 'NAVIGATION' | 'PROJECTS' | 'ACTIONS';
  label: string;
  hint?: string;
  icon: 'nav' | 'project' | 'theme' | 'mail' | 'external';
  run: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onNavigate,
  theme,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: PaletteItem[] = useMemo(() => {
    const navItems: PaletteItem[] = [
      {
        id: 'nav-home',
        group: 'NAVIGATION',
        label: 'Home',
        hint: '/',
        icon: 'nav',
        run: () => {
          onNavigate('/');
          onClose();
        },
      },
      {
        id: 'nav-projects',
        group: 'NAVIGATION',
        label: 'Projects',
        hint: '/projects',
        icon: 'nav',
        run: () => {
          onNavigate('/projects');
          onClose();
        },
      },
      {
        id: 'nav-experience',
        group: 'NAVIGATION',
        label: 'Experience & Education',
        hint: '/experience',
        icon: 'nav',
        run: () => {
          onNavigate('/experience');
          onClose();
        },
      },
      {
        id: 'nav-contact',
        group: 'NAVIGATION',
        label: 'Contact',
        hint: '/contact',
        icon: 'nav',
        run: () => {
          onNavigate('/contact');
          onClose();
        },
      },
      {
        id: 'nav-stack',
        group: 'NAVIGATION',
        label: 'Tech Stack',
        hint: '#techstack',
        icon: 'nav',
        run: () => {
          onNavigate('/', 'techstack');
          onClose();
        },
      },
    ];

    const projectItems: PaletteItem[] = PROFILE.projects.map((p) => ({
      id: `proj-${p.id}`,
      group: 'PROJECTS',
      label: p.title,
      hint: p.categories.join(' · '),
      icon: 'project',
      run: () => {
        onNavigate('/projects');
        onClose();
      },
    }));

    const actionItems: PaletteItem[] = [
      {
        id: 'act-theme',
        group: 'ACTIONS',
        label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
        hint: 'Toggle mode',
        icon: 'theme',
        run: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: 'act-copy-email',
        group: 'ACTIONS',
        label: copiedEmail ? 'Email Copied!' : 'Copy Email Address',
        hint: PROFILE.email,
        icon: 'mail',
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email);
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            onClose();
          }, 700);
        },
      },
      {
        id: 'act-github',
        group: 'ACTIONS',
        label: 'Open GitHub Profile',
        hint: `@${PROFILE.githubHandle}`,
        icon: 'external',
        run: () => {
          window.open(PROFILE.githubUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'act-resume',
        group: 'ACTIONS',
        label: 'Open Resume PDF',
        hint: 'Anurag_Gautam_CV.pdf',
        icon: 'external',
        run: () => {
          window.open('/Anurag_Gautam_CV.pdf', '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
    ];

    return [...navItems, ...projectItems, ...actionItems];
  }, [copiedEmail, onClose, onNavigate, onToggleTheme, theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.hint && item.hint.toLowerCase().includes(q)) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].run();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filtered, onClose, open, selectedIndex]);

  if (!open) return null;

  const groups: ('NAVIGATION' | 'PROJECTS' | 'ACTIONS')[] = [
    'NAVIGATION',
    'PROJECTS',
    'ACTIONS',
  ];

  const renderIcon = (item: PaletteItem) => {
    if (item.icon === 'nav') return <Compass className="h-3.5 w-3.5 text-[var(--muted)]" />;
    if (item.icon === 'project') return <FolderGit2 className="h-3.5 w-3.5 text-[var(--muted)]" />;
    if (item.icon === 'theme') {
      return theme === 'dark' ? (
        <Sun className="h-3.5 w-3.5 text-[var(--muted)]" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-[var(--muted)]" />
      );
    }
    if (item.icon === 'mail') {
      return copiedEmail ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-[var(--muted)]" />
      );
    }
    return <ArrowUpRight className="h-3.5 w-3.5 text-[var(--muted)]" />;
  };

  let runningIndex = -1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[540px] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[var(--muted)]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, or actions..."
            className="w-full bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--soft)] focus:outline-none"
          />
          <kbd className="font-mono-tech rounded border border-[var(--line)] bg-[var(--chip)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
            ESC
          </kbd>
        </div>

        <div className="max-h-[340px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Code2 className="mb-2 h-5 w-5 text-[var(--soft)]" />
              <p className="text-xs text-[var(--muted)]">No matching commands found.</p>
            </div>
          ) : (
            groups.map((groupName) => {
              const groupItems = filtered.filter((i) => i.group === groupName);
              if (groupItems.length === 0) return null;
              return (
                <div key={groupName} className="mb-2 last:mb-0">
                  <div className="font-mono-tech px-2.5 py-1.5 text-[10px] tracking-widest text-[var(--soft)]">
                    {groupName}
                  </div>
                  {groupItems.map((item) => {
                    runningIndex += 1;
                    const idx = runningIndex;
                    const active = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={item.run}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                          active
                            ? 'bg-[var(--hover)] text-[var(--fg)]'
                            : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          {renderIcon(item)}
                          <span>{item.label}</span>
                        </span>
                        {item.hint && (
                          <span className="font-mono-tech text-[11px] text-[var(--soft)]">
                            {item.hint}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="font-mono-tech flex items-center justify-between border-t border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-[11px] text-[var(--soft)]">
          <span>↑↓ navigate · Enter select · ESC close</span>
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <Mail className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
