import { useState } from 'react';
import { ChevronDown, ChevronUp, Github, Globe } from 'lucide-react';
import { PROFILE, type ProjectCategory } from '../data/profile';
import { SectionBand } from './SectionBand';

type ProjectFilter = 'All' | ProjectCategory;

const FILTERS: ProjectFilter[] = ['All', 'Backend', 'Systems', 'AI / RAG'];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const visibleProjects =
    activeFilter === 'All'
      ? PROFILE.projects
      : PROFILE.projects.filter((p) => p.categories.includes(activeFilter));

  const filterBar = (
    <div className="flex items-center rounded-lg border border-[var(--line)] bg-[var(--chip)] p-0.5">
      {FILTERS.map((filter) => {
        const active = activeFilter === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`cursor-pointer rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
              active
                ? 'bg-[var(--fg)] text-[var(--bg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <SectionBand id="projects" title="Projects" rightSlot={filterBar} />
      <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => {
            const isExpanded = expandedId === project.id;
            return (
              <article
                key={project.id}
                className="group flex h-full flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)] hover:shadow-md"
              >
                <div>
                  {/* Preview Box with Top Badges */}
                  <div className="relative mb-4 flex h-44 w-full flex-col justify-between overflow-hidden rounded-lg border border-[var(--line)] bg-gradient-to-br from-[var(--chip)] via-[var(--card)] to-[var(--bg)]/40 p-3">
                    {project.previewImage ? (
                      <>
                        <img
                          src={project.previewImage}
                          alt={`${project.title} preview`}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/25"
                        />
                      </>
                    ) : (
                      <div className="bg-stripes pointer-events-none absolute inset-0 opacity-20" />
                    )}

                    {/* Top Badges Row (matching reference ProjectCard.tsx) */}
                    <div className="relative z-20 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {project.status === 'IN PROGRESS' ? (
                          <span className="font-mono-tech rounded border border-amber-500/40 bg-amber-500/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-amber-300 uppercase backdrop-blur-md">
                            • In Progress
                          </span>
                        ) : (
                          <span className="font-mono-tech flex items-center gap-1 rounded border border-emerald-500/40 bg-emerald-500/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-emerald-300 uppercase backdrop-blur-md">
                            <span className="relative flex size-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                            </span>
                            Live
                          </span>
                        )}
                      </div>

                      {project.featured && (
                        <span className="font-mono-tech rounded border border-amber-500/30 bg-amber-400/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-amber-500 uppercase backdrop-blur-md">
                          Featured
                        </span>
                      )}
                    </div>

                    {!project.previewImage && (
                      <code className="font-mono-tech relative z-10 self-center rounded-md border border-[var(--line)] bg-[var(--bg)]/85 px-3 py-1.5 text-[11.5px] text-[var(--fg)] shadow-sm">
                        {project.previewCode}
                      </code>
                    )}
                  </div>

                  {/* Project Header Info */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[16px] font-semibold tracking-wide text-[var(--fg)]">
                      {project.title}
                    </h3>
                    <span className="font-mono-tech text-xs text-[var(--soft)]">
                      {project.year}
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                    {project.summary}
                  </p>

                  {/* Collapsible Engineering Details */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="font-mono-tech flex cursor-pointer items-center gap-1 text-[10px] text-[var(--soft)] transition-colors outline-none hover:text-[var(--fg)]"
                    >
                      <span>
                        {isExpanded ? 'Hide engineering details' : 'Show engineering details'}
                      </span>
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 space-y-1.5 rounded-lg border border-[var(--line)]/50 border-l-2 border-l-[var(--soft)] bg-[var(--chip)]/60 p-3 text-[12px] leading-relaxed text-[var(--muted)]">
                        <p className="font-serif-display text-[15px] italic text-[var(--fg)]">
                          “{project.engineeringTagline}”
                        </p>
                        <p>{project.engineeringDetails}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tech Pills & Direct Icon Links */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--line)]/50 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-tech rounded border border-[var(--line)]/30 bg-[var(--chip)] px-2 py-0.5 text-[10.5px] text-[var(--muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex shrink-0 items-center gap-2.5 text-[var(--soft)]">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live site`}
                        title="Open live site"
                        className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
                      >
                        <Globe className="size-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} repository`}
                        title="View source code"
                        className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
                      >
                        <Github className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
