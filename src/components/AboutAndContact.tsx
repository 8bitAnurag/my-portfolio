import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE, type SocialLink } from '../data/profile';
import { SectionBand } from './SectionBand';

function ContactIcon({ type }: { type: SocialLink['icon'] }) {
  if (type === 'github') return <Github className="h-4 w-4" />;
  if (type === 'linkedin') return <Linkedin className="h-4 w-4" />;
  if (type === 'mail') return <Mail className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
}

interface AboutAndContactProps {
  showAbout?: boolean;
  onNavigateContact?: () => void;
}

export function AboutAndContact({ showAbout = true, onNavigateContact }: AboutAndContactProps) {
  return (
    <>
      {showAbout && (
        <>
          <SectionBand id="about" title="About" />
          <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)] px-6 py-7">
            <ul className="space-y-4 text-[14.5px] leading-relaxed text-[var(--muted)]">
              {PROFILE.aboutBullets.map((paragraph, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--soft)]" />
                  <span>{paragraph}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
              <div className="font-mono-tech mb-3.5 text-[11px] font-medium tracking-[0.14em] text-[var(--soft)] uppercase">
                Developer Snapshot
              </div>
              <div className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {PROFILE.snapshot.map((item) => (
                  <div
                    key={item}
                    className="font-mono-tech flex items-center gap-2.5 text-[12.5px] text-[var(--muted)]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <SectionBand id="contact" title="Contact" />
      <section className="mx-auto max-w-[760px] border-x border-dashed border-[var(--line)]">
        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--line)] sm:grid-cols-4 sm:divide-y-0">
          {PROFILE.contactLinks.map((link) => {
            const isInternalContact = link.href.startsWith('#');
            const isPdf = link.href.endsWith('.pdf');
            return (
              <a
                key={link.label}
                href={link.href}
                target={isInternalContact || link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={isInternalContact || link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                onClick={(e) => {
                  if (isInternalContact && onNavigateContact && !isPdf) {
                    e.preventDefault();
                    onNavigateContact();
                  }
                }}
                className="group flex items-center justify-between px-4 py-4 transition-colors hover:bg-[var(--hover)]"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--chip)] text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                    <ContactIcon type={link.icon} />
                  </span>
                  <span className="text-[13.5px] font-medium text-[var(--fg)]">
                    {link.label}
                  </span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[var(--soft)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--fg)]" />
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
