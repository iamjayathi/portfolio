import { useState } from 'react';
// import { useTypewriter } from '../hooks/useTypewriter';

// const roles = ['Software Developer', 'Backend Engineer', 'System Builder', 'Full-Stack Engineer'];

const techFacts = [
  'Git was created by Linus Torvalds in just 10 days ⚡',
  'The first computer bug was a real moth found in a relay 🦗',
  'There are ~700 programming languages in existence 🧠',
  'The first programmer was Ada Lovelace, in 1843 👑',
  'Linux powers 96.4% of the world\'s top 1M servers 🐧',
  'The average developer writes ~10 lines of production code/day 😅',
  'The term "debugging" came from Grace Hopper removing an actual bug 🐛',
];



type State = 'normal' | 'minimized' | 'closed' | 'widened';

function DotButton({
  bg, hoverBg, symbol, label, onClick,
}: {
  bg: string; hoverBg: string; symbol: React.ReactNode; label: string; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
      style={{
        width: 12, height: 12, borderRadius: '50%',
        background: hovered ? hoverBg : bg,
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.15s ease, background 0.15s ease',
        transform: hovered ? 'scale(1.3)' : 'scale(1)',
        flexShrink: 0,
      }}
    >
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.6)',
        opacity: 1, transition: 'opacity 0.15s ease',
        fontFamily: 'monospace', userSelect: 'none', lineHeight: 1,
      }}>
        {symbol}
      </span>
    </button>
  );
}


const CloseIcon = <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3l8 8M3 11l8-8"/></svg>;
const MinimizeIcon = <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10"/></svg>;
const ExpandIcon = <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 5V1h4M13 5V1H9M13 9v4H9M1 9v4h4"/></svg>;

export default function Hero() {
  // const role = useTypewriter(roles, 75, 2000);
  const [state, setState] = useState<State>('normal');
  const [fact] = useState(() => techFacts[Math.floor(Math.random() * techFacts.length)]);

  const toggle = (next: State) => setState(s => s === next ? 'normal' : next);

  const isOpen = state === 'normal' || state === 'widened';

  return (
    <section id="about" className="pt-20 pb-6 px-6 bg-bg">
      <div
        className="mx-auto"
        style={{
          maxWidth: state === 'widened' ? '100%' : '1024px',
          transition: 'max-width 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >

        {/* ── CLOSED: restore bar ── */}
        {state === 'closed' && (
          <div className="border border-border rounded-xl bg-surface px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red" />
              <div className="w-3 h-3 rounded-full bg-yellow" />
              <div className="w-3 h-3 rounded-full bg-green" />
            </div>
            <span className="font-mono text-xs text-ink-muted flex-1">terminal closed — whoami output hidden</span>
            <button
              onClick={() => setState('normal')}
              className="btn font-mono text-xs px-3 py-1.5 border border-border rounded-lg text-ink-muted hover:border-purple hover:text-purple"
            >
              ↩ restore
            </button>
          </div>
        )}

        {/* ── MINIMIZED: tech fact ── */}
        {state === 'minimized' && (
          <div className="border border-border rounded-xl bg-surface overflow-hidden">
            {/* mini title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-raised border-b border-border">
              <DotButton bg="#f85149" hoverBg="#ef4444" symbol={CloseIcon} label="close"    onClick={() => toggle('closed')} />
              <DotButton bg="#d29922" hoverBg="#ca8a04" symbol={MinimizeIcon} label="restore"  onClick={() => toggle('minimized')} />
              <DotButton bg="#3fb950" hoverBg="#16a34a" symbol={ExpandIcon} label="expand"   onClick={() => toggle('widened')} />
              <span className="ml-2 font-mono text-xs text-ink-muted">terminal@jayathimishra:~ — minimized</span>
            </div>
            {/* fact */}
            <div className="flex items-start gap-4 px-5 py-4">
              <span className="text-2xl flex-shrink-0 mt-0.5">💡</span>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-yellow font-semibold mb-1">$ did_you_know --random</p>
                <p className="font-mono text-sm text-ink leading-relaxed">{fact}</p>
              </div>
              <button
                onClick={() => setState('normal')}
                className="btn font-mono text-xs px-3 py-1.5 border border-border rounded-lg text-ink-muted hover:border-purple hover:text-purple flex-shrink-0"
              >
                restore →
              </button>
            </div>
          </div>
        )}

        {/* ── NORMAL / WIDENED: full terminal ── */}
        {isOpen && (
          <div
            className="border border-border rounded-xl bg-surface overflow-hidden"
            style={{ transition: 'all 0.35s ease' }}
          >
            {/* Title bar — exact match to screenshot */}
            <div className="flex items-center justify-between px-4 py-3 bg-raised border-b border-border">
              <div className="flex items-center gap-2">
                <DotButton bg="#f85149" hoverBg="#ef4444" symbol={CloseIcon} label="close"    onClick={() => toggle('closed')} />
                <DotButton bg="#d29922" hoverBg="#ca8a04" symbol={MinimizeIcon} label="minimize" onClick={() => toggle('minimized')} />
                <DotButton bg="#3fb950" hoverBg="#16a34a" symbol={ExpandIcon} label="expand"   onClick={() => toggle('widened')} />
              </div>
              <span className="font-mono text-xs text-ink-muted">terminal@jayathimishra:~</span>
              <span className="font-mono text-sm text-ink-muted">&gt;_</span>
            </div>

            {/* Terminal body */}
            <div className="px-6 py-6">

              {/* $ whoami */}
              <p className="font-mono text-sm text-ink-muted mb-5">
                <span className="text-purple">$</span> whoami
              </p>

              {/* Profile row — avatar + name/bio */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 mb-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src="/profile.png"
                    alt="Jayathi Mishra"
                    className="w-28 h-28 rounded-full border-4 border-border object-cover"
                  />
                </div>

                {/* Name + bio */}
                <div className="flex-1 min-w-0">
                  {/* Name + role on same line like screenshot */}
                  <div className="mb-4">
                    <h1 className="font-mono font-bold text-2xl sm:text-3xl text-purple">
                      Jayathi Mishra
                    </h1>
                    <p className="font-mono text-base sm:text-lg text-ink font-medium">Software Developer</p>
                  </div>

                  {/* Bio */}
                  <p className="font-mono text-sm text-ink-muted leading-relaxed max-w-xl mb-4">
                 I'm a problem solver who builds scalable systems and ships products people actually use — from RAG chatbots to real-time video streaming. I care about clean code and real impact.
                 </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-5" />

              {/* Social links — exactly like screenshot */}
              <div className="flex flex-wrap gap-6">
                {[
                  {
                    label: 'GitHub', href: 'https://github.com/iamjayathi',
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'LinkedIn', href: 'https://linkedin.com/in/jayathi-mishra',
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Email', href: 'mailto:jayathimishra.dev@gmail.com',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: '+91 63920 16606', href: 'tel:+916392016606',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                  },
                  {
                    label: 'Resume', href: '/resume.pdf', download: true,
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                  },
                ].map((item: any) => (
                  <a
                    key={item.label}
                    href={item.href}
                    download={item.download}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="btn flex items-center gap-2 font-mono text-sm text-ink-muted hover:text-purple transition-colors group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Hint text below dots */}
        {isOpen && (
         <p className="font-mono text-[10px] sm:text-xs text-ink-dim mt-3 ml-1 flex flex-wrap gap-y-1 gap-x-4">
          <span className="flex items-center gap-1.5"><span className="text-red-500">●</span> close → hide</span>
          <span className="flex items-center gap-1.5"><span className="text-yellow-500">●</span> minimize → fact</span>
          <span className="flex items-center gap-1.5"><span className="text-green-500">●</span> expand → widen</span>
        </p>
        )}

      </div>
    </section>
  );
}
