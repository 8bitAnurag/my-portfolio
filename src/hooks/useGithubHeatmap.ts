import { useEffect, useMemo, useState } from 'react';

export interface HeatmapCell {
  level: 0 | 1 | 2 | 3 | 4;
  count: number;
  date?: string;
}

export interface HeatmapData {
  cells: (HeatmapCell | null)[];
  total: number;
  live: boolean;
}

interface ApiContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function buildFallbackHeatmap(seedText: string): HeatmapData {
  let seed = 5381;
  for (let i = 0; i < seedText.length; i += 1) {
    seed = (seed * 33) ^ seedText.charCodeAt(i);
  }
  const cells: (HeatmapCell | null)[] = [];
  let s = seed >>> 0;
  for (let i = 0; i < 53 * 7; i += 1) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const v = s % 100;
    const level: 0 | 1 | 2 | 3 | 4 =
      v < 34 ? 0 : v < 60 ? 1 : v < 80 ? 2 : v < 93 ? 3 : 4;
    cells.push({ level, count: level * 2 });
  }
  const total = cells.reduce((sum, cell) => sum + (cell ? cell.count : 0), 0);
  return { cells, total, live: false };
}

/** Fetches live last-year GitHub contributions for a username (public API, no auth). */
export function useGithubHeatmap(username: string): HeatmapData {
  const fallback = useMemo(() => buildFallbackHeatmap(username), [username]);
  const [heatmap, setHeatmap] = useState<HeatmapData>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load GitHub activity'))))
      .then((data) => {
        const contribs: ApiContribution[] = data?.contributions ?? [];
        if (cancelled || contribs.length === 0) return;

        const firstDow = new Date(`${contribs[0].date}T00:00:00Z`).getUTCDay();
        const cells: (HeatmapCell | null)[] = Array(firstDow)
          .fill(null)
          .concat(
            contribs.map((c) => ({
              level: c.level,
              count: c.count,
              date: c.date,
            }))
          );

        const total =
          data?.total?.lastYear ??
          contribs.reduce((sum, c) => sum + (c.count || 0), 0);

        setHeatmap({ cells, total, live: true });
      })
      .catch(() => {
        // Retain deterministic fallback if offline or rate-limited
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return heatmap;
}
