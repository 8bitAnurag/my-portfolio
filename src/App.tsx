import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Copy, Check, Mail } from 'lucide-react';
import { AboutAndContact } from './components/AboutAndContact';
import { CommandPalette } from './components/CommandPalette';
import { ExperienceAndOpenSource } from './components/ExperienceAndOpenSource';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar, type RoutePath } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { SectionBand } from './components/SectionBand';
import { TechStackWritingActivity } from './components/TechStackWritingActivity';
import { PROFILE } from './data/profile';

function normalizePath(pathname: string): RoutePath {
  if (
    pathname === '/projects' ||
    pathname === '/experience' ||
    pathname === '/contact' ||
    pathname === '/writing'
  ) {
    return pathname;
  }
  return '/';
}

export function App() {
  const [path, setPath] = useState<RoutePath>(() =>
    normalizePath(window.location.pathname)
  );
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(next);
      try {
        localStorage.setItem('portfolio-theme', next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  const navigate = useCallback((nextPath: RoutePath, hash?: string) => {
    const targetUrl = hash ? `${nextPath}#${hash}` : nextPath;
    if (window.location.pathname + window.location.hash !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    setPath(nextPath);

    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Navbar
        currentPath={path}
        onNavigate={(p) => navigate(p)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCommandPalette={() => setPaletteOpen(true)}
      />

      <main>
        {path === '/' && (
          <>
            <HeroSection onOpenCommandPalette={() => setPaletteOpen(true)} />
            <AboutAndContact onNavigateContact={() => navigate('/contact')} />
            <ProjectsSection />
            <ExperienceAndOpenSource onNavigate={navigate} />
            <TechStackWritingActivity
              showAllArticles={false}
              onOpenWritingPage={() => navigate('/writing')}
            />
          </>
        )}

        {path === '/projects' && (
          <>
            <div className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="font-mono-tech inline-flex cursor-pointer items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to home</span>
              </button>
            </div>
            <ProjectsSection />
          </>
        )}

        {path === '/experience' && (
          <>
            <div className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="font-mono-tech inline-flex cursor-pointer items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to home</span>
              </button>
            </div>
            <ExperienceAndOpenSource onNavigate={navigate} />
          </>
        )}

        {path === '/writing' && (
          <>
            <div className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="font-mono-tech inline-flex cursor-pointer items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to home</span>
              </button>
            </div>
            <TechStackWritingActivity showAllArticles onlyWritingPage />
          </>
        )}

        {path === '/contact' && (
          <>
            <div className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="font-mono-tech inline-flex cursor-pointer items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--fg)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to home</span>
              </button>
            </div>
            <AboutAndContact showAbout={false} />
            <SectionBand title="Direct Inquiry" />
            <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-8">
              <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-6">
                <h3 className="font-serif-display text-2xl text-[var(--fg)]">
                  Let&apos;s build something durable.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Best reached by email for full-stack roles, backend architecture consulting,
                  or open-source collaborations.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-4 py-2 text-xs font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>{PROFILE.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="font-mono-tech inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3.5 py-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
