import type { ReactNode } from 'react';

interface SectionBandProps {
  id?: string;
  title: string;
  rightSlot?: ReactNode;
  eyebrow?: string;
}

/**
 * Full-bleed horizontal section header band:
 * - Outer gutters show the 315deg diagonal hatch pattern (`bg-stripes`)
 * - Inner 760px box keeps solid `--bg` fill, dashed vertical borders,
 *   and 3px corner crosshair squares matching the editorial grid.
 */
export function SectionBand({ id, title, rightSlot, eyebrow }: SectionBandProps) {
  return (
    <div id={id} className="w-full border-y border-[var(--line)] bg-stripes scroll-mt-16">
      <div className="relative mx-auto flex max-w-[760px] flex-wrap items-center justify-between gap-3 border-x border-dashed border-[var(--line)] bg-[var(--bg)] px-6 py-3.5">
        {/* Corner crosshair intersection markers */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[2px] -left-[2px] h-[3px] w-[3px] bg-[var(--fg)] opacity-40"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[2px] -right-[2px] h-[3px] w-[3px] bg-[var(--fg)] opacity-40"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[2px] -left-[2px] h-[3px] w-[3px] bg-[var(--fg)] opacity-40"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[2px] -bottom-[2px] h-[3px] w-[3px] bg-[var(--fg)] opacity-40"
        />

        <div>
          {eyebrow && (
            <div className="font-mono-tech mb-1 text-[11px] tracking-wider text-emerald-500 uppercase">
              {eyebrow}
            </div>
          )}
          <h2 className="font-serif-display text-2xl tracking-wide text-[var(--fg)]">
            {title}
          </h2>
        </div>

        {rightSlot && <div className="flex flex-wrap items-center gap-2">{rightSlot}</div>}
      </div>
    </div>
  );
}
