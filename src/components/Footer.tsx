import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SectionBand } from './SectionBand';

export function Footer() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const quoteTimer = window.setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % PROFILE.quotes.length);
    }, 6500);
    return () => window.clearInterval(quoteTimer);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: PROFILE.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(new Date());
        setLocalTime(formatted);
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };
    updateClock();
    const clockTimer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(clockTimer);
  }, []);

  const quote = PROFILE.quotes[quoteIdx];

  return (
    <footer>
      {/* Hatch Spacer */}
      <div className="w-full border-t border-[var(--line)] bg-stripes">
        <div className="mx-auto h-10 max-w-[760px] border-x border-dashed border-[var(--line)] bg-[var(--bg)]/40" />
      </div>

      <SectionBand title="Scrolled Too Far" />

      <div className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-10 text-center">
        <p className="text-sm text-[var(--muted)]">
          Have an interesting system to build, a role in mind, or just want to talk craft?
        </p>

        <div className="mt-5">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--fg)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            <span>Let's Talk</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Rotating Quote Block */}
        <button
          type="button"
          onClick={() => setQuoteIdx((prev) => (prev + 1) % PROFILE.quotes.length)}
          title="Click for next quote"
          className="mt-9 block w-full cursor-pointer rounded-xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-5 transition-colors hover:bg-[var(--hover)]"
        >
          <blockquote className="font-serif-display text-[22px] leading-snug italic text-[var(--fg)] sm:text-[24px]">
            “{quote.text}”
          </blockquote>
          <div className="font-mono-tech mt-2 text-[11.5px] text-[var(--soft)]">
            — {quote.author}
          </div>
        </button>

        {/* Bottom Colophon */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-dashed border-[var(--line)] pt-6 text-xs text-[var(--muted)] sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span>Designed &amp; Developed by {PROFILE.fullName}</span>
            <span className="font-mono-tech text-[11px] text-[var(--soft)]">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          <div className="font-mono-tech flex items-center gap-2 text-[11.5px] text-[var(--muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>
              {PROFILE.location} · {localTime}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
