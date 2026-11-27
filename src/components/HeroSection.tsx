import { useEffect, useState } from 'react';
import { Eye, MapPin, RotateCw, Search } from 'lucide-react';
import { PROFILE } from '../data/profile';

interface HeroSectionProps {
  onOpenCommandPalette: () => void;
}

export function HeroSection({ onOpenCommandPalette }: HeroSectionProps) {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fallbackLocalViews = () => {
      try {
        const stored = Number(localStorage.getItem('portfolio-views') || '0');
        const next = stored > 0 ? stored + 1 : PROFILE.baseViewCount + 1;
        localStorage.setItem('portfolio-views', String(next));
        if (!cancelled) setViews(next);
      } catch {
        if (!cancelled) setViews(PROFILE.baseViewCount);
      }
    };

    const syncGlobalViews = async () => {
      try {
        const alreadyViewed = sessionStorage.getItem('portfolio-viewed') === '1';
        const res = await fetch('/api/views', {
          method: alreadyViewed ? 'GET' : 'POST',
        });
        if (!res.ok) throw new Error('API unavailable');
        const data = await res.json();
        if (data?.live && typeof data.views === 'number') {
          if (!alreadyViewed) {
            sessionStorage.setItem('portfolio-viewed', '1');
          }
          if (!cancelled) setViews(data.views);
          return;
        }
        fallbackLocalViews();
      } catch {
        fallbackLocalViews();
      }
    };

    syncGlobalViews();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE.roles.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  const cycleAvatar = () => {
    setAvatarIndex((prev) => (prev + 1) % PROFILE.avatars.length);
  };

  return (
    <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 pt-5 pb-7">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)]">
        <img
          src={PROFILE.bannerImage}
          alt="Starry landscape header artwork"
          className="h-[155px] w-full object-cover sm:h-[210px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
        />
      </div>

      {/* Profile Identity Row */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)]">
            <img
              src={PROFILE.avatars[avatarIndex]}
              alt={`${PROFILE.fullName} avatar`}
              onClick={cycleAvatar}
              className="h-full w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
            />
            <div aria-hidden="true" className="crt-scanlines pointer-events-none absolute inset-0" />
            <div
              aria-hidden="true"
              className="animate-scanbar pointer-events-none absolute right-0 left-0 h-3 bg-white/10 blur-[1px]"
            />
            <button
              type="button"
              onClick={cycleAvatar}
              title="Switch profile image"
              aria-label="Switch profile image"
              className="absolute top-1.5 right-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-transform hover:rotate-90"
            >
              <RotateCw className="h-2.5 w-2.5" />
            </button>
          </div>

          <div>
            <h1 className="font-serif-display text-glitch text-3xl leading-none tracking-tight text-[var(--fg)] sm:text-[38px]">
              {PROFILE.fullName}
            </h1>
            <p className="font-mono-tech mt-1.5 flex items-center text-[13px] text-[var(--muted)]">
              <span>{PROFILE.roles[roleIndex]}</span>
              <span className="animate-caret ml-1 inline-block h-3.5 w-[1.5px] bg-[var(--muted)]" />
            </p>
            <div className="font-mono-tech mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-[var(--soft)]">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {PROFILE.location}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {views !== null ? `${views.toLocaleString()} views` : '... views'}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="font-mono-tech inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 text-[11px] text-[var(--muted)] shadow-sm transition-colors hover:border-[var(--soft)] hover:text-[var(--fg)]"
        >
          <Search className="h-3.5 w-3.5" />
          <span>⌘K</span>
        </button>
      </div>
    </section>
  );
}
