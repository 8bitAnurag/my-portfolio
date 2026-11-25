import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Code2,
  Database,
  Layers,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { PROFILE, type SkillCategory } from '../data/profile';
import { useGithubHeatmap } from '../hooks/useGithubHeatmap';
import { SectionBand } from './SectionBand';

type SkillFilter = 'All' | SkillCategory;

const SKILL_TABS: { label: SkillFilter; icon: 'all' | 'lang' | 'fw' | 'db' | 'ops' }[] = [
  { label: 'All', icon: 'all' },
  { label: 'Languages', icon: 'lang' },
  { label: 'Frameworks', icon: 'fw' },
  { label: 'Databases', icon: 'db' },
  { label: 'DevOps & Tools', icon: 'ops' },
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function renderTabIcon(icon: (typeof SKILL_TABS)[number]['icon']) {
  if (icon === 'all') return <Sparkles className="h-3 w-3" />;
  if (icon === 'lang') return <Code2 className="h-3 w-3" />;
  if (icon === 'fw') return <Layers className="h-3 w-3" />;
  if (icon === 'db') return <Database className="h-3 w-3" />;
  return <Wrench className="h-3 w-3" />;
}

interface TechStackWritingActivityProps {
  showAllArticles?: boolean;
  onOpenWritingPage?: () => void;
  onlyWritingPage?: boolean;
}

export function TechStackWritingActivity({
  showAllArticles = false,
  onOpenWritingPage,
  onlyWritingPage = false,
}: TechStackWritingActivityProps) {
  const [skillFilter, setSkillFilter] = useState<SkillFilter>('All');
  const heatmap = useGithubHeatmap(PROFILE.githubHandle);

  const visibleSkills =
    skillFilter === 'All'
      ? PROFILE.skills
      : PROFILE.skills.filter((s) => s.category === skillFilter);

  const countFor = (label: SkillFilter) =>
    label === 'All'
      ? PROFILE.skills.length
      : PROFILE.skills.filter((s) => s.category === label).length;

  const monthLabels = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => MONTH_NAMES[(now.getMonth() + 1 + i) % 12]);
  }, []);

  const articlesToDisplay = showAllArticles
    ? PROFILE.articles
    : PROFILE.articles.slice(0, 4);

  return (
    <>
      {!onlyWritingPage && (
        <>
          <SectionBand
            id="techstack"
            title="Tech Stack"
            rightSlot={
              <span className="font-mono-tech text-[11.5px] text-[var(--soft)]">
                ( select tab to filter )
              </span>
            }
          />
          <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-7">
            <div className="flex flex-wrap gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--chip)] p-1.5">
              {SKILL_TABS.map((tab) => {
                const active = skillFilter === tab.label;
                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setSkillFilter(tab.label)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? 'bg-[var(--fg)] text-[var(--bg)]'
                        : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]'
                    }`}
                  >
                    {renderTabIcon(tab.icon)}
                    <span>{tab.label}</span>
                    <span
                      className={`font-mono-tech text-[10px] ${
                        active ? 'opacity-75' : 'text-[var(--soft)]'
                      }`}
                    >
                      {countFor(tab.label)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {visibleSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-[13px] text-[var(--fg)] transition-colors hover:border-[var(--soft)] hover:bg-[var(--hover)]"
                >
                  <span
                    className="font-mono-tech flex h-5 min-w-5 items-center justify-center rounded px-1 text-[10px] font-semibold"
                    style={{
                      backgroundColor: `${skill.color}20`,
                      color: skill.color,
                    }}
                  >
                    {skill.badge}
                  </span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {articlesToDisplay.length > 0 && (
        <>
          <SectionBand
            id="writing"
            eyebrow={onlyWritingPage ? '03 / ARTICLES & INSIGHTS' : undefined}
            title={onlyWritingPage ? 'Writing & Thoughts' : 'Writing'}
            rightSlot={
              PROFILE.mediumUrl ? (
                <a
                  href={PROFILE.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-tech inline-flex items-center gap-1 text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                >
                  <span>{PROFILE.mediumHandle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : undefined
            }
          />
          <section className="relative mx-auto max-w-[760px] border-x border-dashed border-[var(--line)]">
            <div className="divide-y divide-dashed divide-[var(--line)]">
              {articlesToDisplay.map((article, index) => {
                const shouldFade = !showAllArticles && index === articlesToDisplay.length - 1;
                return (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group grid grid-cols-1 gap-3 px-6 py-5 transition-colors hover:bg-[var(--hover)] sm:grid-cols-[88px_1fr_auto] sm:items-start sm:gap-5 ${
                      shouldFade ? 'pb-10' : ''
                    }`}
                  >
                    <span className="font-mono-tech pt-1 text-[12px] text-[var(--soft)]">
                      {article.date}
                    </span>

                    <div>
                      <h3 className="font-serif-display text-[22px] leading-snug text-[var(--fg)] transition-opacity group-hover:opacity-85">
                        {article.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-[var(--muted)]">
                        {article.excerpt}
                      </p>
                      {onlyWritingPage && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono-tech rounded border border-[var(--line)] bg-[var(--chip)] px-2 py-0.5 text-[10px] text-[var(--muted)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="font-mono-tech inline-flex items-center gap-1 pt-1 text-[11.5px] whitespace-nowrap text-[var(--muted)] group-hover:text-[var(--fg)]">
                      <span>{article.readTime}</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </a>
                );
              })}
            </div>

            {!showAllArticles && onOpenWritingPage && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/85 to-transparent pt-14 pb-4">
                <button
                  type="button"
                  onClick={onOpenWritingPage}
                  className="font-mono-tech pointer-events-auto inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-1.5 text-xs text-[var(--fg)] shadow-sm transition-colors hover:bg-[var(--hover)]"
                >
                  <span>Read all articles</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </section>
        </>
      )}

      {!onlyWritingPage && (
        <>
          <SectionBand
            id="activity"
            title="GitHub Activity"
            rightSlot={
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech inline-flex items-center gap-1 text-[12px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                <span>@{PROFILE.githubHandle}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            }
          />
          <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-7">
            <div className="overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
              <div className="min-w-[640px]">
                <div className="font-mono-tech mb-2 flex justify-between px-1 text-[10.5px] text-[var(--soft)]">
                  {monthLabels.map((m, idx) => (
                    <span key={`${m}-${idx}`}>{m}</span>
                  ))}
                </div>

                <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                  {heatmap.cells.map((cell, idx) =>
                    cell === null ? (
                      <span key={idx} className="h-[10px] w-[10px]" />
                    ) : (
                      <span
                        key={idx}
                        title={
                          cell.date
                            ? `${cell.count} contribution${cell.count === 1 ? '' : 's'} on ${cell.date}`
                            : `${cell.count} contributions`
                        }
                        className="h-[10px] w-[10px] rounded-[2px] transition-transform hover:scale-125"
                        style={{
                          backgroundColor: `var(--heat-${cell.level})`,
                        }}
                      />
                    )
                  )}
                </div>

                <div className="font-mono-tech mt-3 flex items-center justify-between text-[11px] text-[var(--muted)]">
                  <span>
                    {heatmap.live
                      ? `${heatmap.total.toLocaleString()} contributions in the last year`
                      : `${PROFILE.githubContributionsTotal.toLocaleString()}+ contributions in the last year`}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-[var(--soft)]">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((lvl) => (
                      <span
                        key={lvl}
                        className="inline-block h-[10px] w-[10px] rounded-[2px]"
                        style={{ backgroundColor: `var(--heat-${lvl})` }}
                      />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
