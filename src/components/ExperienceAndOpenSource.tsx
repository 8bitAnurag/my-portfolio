import { ArrowUpRight, Check, GitMerge, Github, GraduationCap } from 'lucide-react';
import { PROFILE } from '../data/profile';
import type { RoutePath } from './Navbar';
import { SectionBand } from './SectionBand';

interface ExperienceAndOpenSourceProps {
  onNavigate?: (path: RoutePath, hash?: string) => void;
  showExperience?: boolean;
  showOpenSource?: boolean;
}

export function ExperienceAndOpenSource({
  onNavigate,
  showExperience = true,
  showOpenSource = true,
}: ExperienceAndOpenSourceProps) {
  const { experience, education, openSource } = PROFILE;

  return (
    <>
      {showExperience && (
        <>
          <SectionBand id="experience" title="Experience & Education" />
          <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-[16.5px] font-semibold tracking-tight text-[var(--fg)]">
                  {experience.role}
                </h3>
                <p className="mt-0.5 text-[13px] text-[var(--muted)]">{experience.company}</p>
              </div>
              <span className="font-mono-tech rounded-full border border-[var(--line)] bg-[var(--chip)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]">
                {experience.period}
              </span>
            </div>

            <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">
              {experience.summary}
            </p>

            {/* 4-Column Stat Bar */}
            <div className="mt-6 grid grid-cols-2 divide-x divide-y divide-[var(--line)] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] sm:grid-cols-4 sm:divide-y-0">
              {experience.stats.map((stat) => (
                <a
                  key={stat.label}
                  href={stat.href || '#'}
                  onClick={(e) => {
                    if (stat.href?.startsWith('#') && onNavigate) {
                      e.preventDefault();
                      onNavigate('/', stat.href.slice(1));
                    }
                  }}
                  className="group block px-4 py-3.5 transition-colors hover:bg-[var(--hover)]"
                >
                  <div className="font-serif-display text-[26px] leading-none text-[var(--fg)]">
                    {stat.value}
                  </div>
                  <div className="font-mono-tech mt-1.5 text-[11px] text-[var(--muted)] group-hover:text-[var(--fg)]">
                    {stat.label}
                  </div>
                </a>
              ))}
            </div>

            {/* Education Cards */}
            <div id="education" className="mt-7 scroll-mt-20">
              <div className="font-mono-tech mb-3 flex items-center gap-2 text-[11px] tracking-[0.14em] text-[var(--soft)] uppercase">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Education</span>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div
                    key={edu.institution}
                    className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--soft)]"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <h4 className="text-[15px] font-semibold text-[var(--fg)]">
                          {edu.institution}
                        </h4>
                        <p className="mt-0.5 text-[13px] text-[var(--muted)]">{edu.degree}</p>
                      </div>
                      <span className="font-mono-tech text-[11px] text-[var(--soft)]">
                        {edu.period} · {edu.location}
                      </span>
                    </div>

                    {edu.highlights && (
                      <p className="font-mono-tech mt-2 text-[11.5px] text-emerald-400">
                        {edu.highlights}
                      </p>
                    )}

                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="font-mono-tech rounded-md border border-[var(--line)] bg-[var(--chip)] px-2 py-0.5 text-[10.5px] text-[var(--muted)]"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {showOpenSource && openSource.length > 0 && (
        <>
          <SectionBand
            id="opensource"
            title="Open Source"
            rightSlot={
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--chip)] px-3 py-1 text-[11.5px] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
              >
                <Github className="h-3.5 w-3.5" />
                <span>{openSource.length} Merged PRs</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            }
          />
          <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)]">
            <div className="divide-y divide-dashed divide-[var(--line)]">
              {openSource.map((pr) => (
                <article
                  key={`${pr.repo}-${pr.prNumber}`}
                  className="px-6 py-5 transition-colors hover:bg-[var(--hover)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <GitMerge className="h-4 w-4 text-purple-400" />
                      <span className="font-mono-tech text-[12px] text-[var(--muted)]">
                        {pr.repo}
                      </span>
                      <span className="font-mono-tech text-[12px] text-[var(--soft)]">
                        {pr.prNumber}
                      </span>
                      <span className="font-mono-tech inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 text-[10.5px] text-purple-300">
                        <Check className="h-2.5 w-2.5" />
                        Merged
                      </span>
                    </div>

                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-tech inline-flex items-center gap-1 text-[11.5px] text-[var(--muted)] hover:text-[var(--fg)]"
                    >
                      <span>View PR</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>

                  <h3 className="mt-2.5 text-[14.5px] font-semibold text-[var(--fg)]">
                    {pr.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">
                    {pr.summary}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pr.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-tech rounded-md border border-[var(--line)] bg-[var(--chip)] px-2 py-0.5 text-[10.5px] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
