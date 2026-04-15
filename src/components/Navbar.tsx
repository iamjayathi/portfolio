import { useState, useEffect } from 'react';

const links = [
  {
    label: 'about', href: '#about',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    label: 'experience', href: '#experience',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    label: 'projects', href: '#projects',
    icon: <span className="font-mono text-xs">&lt;/&gt;</span>,
  },
  {
    label: 'skills', href: '#skills',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  },
  {
    label: 'contact', href: '#contact',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  },
];

export default function Navbar() {
  const [active, setActive] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const ids = links.map(l => l.href.slice(1));
    const handler = () => {
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) {
          setActive(id);
          return;
        }
      }
      setActive('about');
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">

        {/* cd / logo */}
        <a
          href="#"
          onClick={() => setActive('about')}
          className="btn flex items-center gap-1 font-mono text-sm text-purple hover:text-purple-light flex-shrink-0"
        >
          <span className="text-ink-muted">&gt;_</span>
          <span className="font-semibold"> cd /</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {links.map(({ label, href, icon }) => {
            const isActive = active === label;
            return (
              <a
                key={label}
                href={href}
                onClick={() => setActive(label)}
                className={`btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200
                  ${isActive
                    ? 'bg-raised text-purple border border-border shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-raised/50'
                  }`}
              >
                {icon}
                {label}
                {isActive && <span className="text-ink-dim text-xs ml-0.5">•••</span>}
              </a>
            );
          })}
        </div>

        {/* Hire me button */}
        <a
          href="#contact"
          className="btn hidden md:flex ml-auto px-4 py-1.5 bg-purple text-bg font-mono font-semibold text-xs rounded-lg hover:bg-purple-light hover:shadow-lg hover:shadow-purple/20 flex-shrink-0"
        >
          hire me →
        </a>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <a href="#contact"
            className="btn px-3 py-1 bg-purple text-bg font-mono font-semibold text-xs rounded-lg">
            hire me
          </a>
          <button onClick={() => setMobileOpen(v => !v)}
            className="p-1.5 text-ink-muted hover:text-ink transition-colors">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-1">
          {links.map(({ label, href, icon }) => (
            <a key={label} href={href}
              onClick={() => { setActive(label); setMobileOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-sm transition-colors
                ${active === label ? 'text-purple bg-raised' : 'text-ink-muted hover:text-ink'}`}>
              {icon}{label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
