import { useReveal } from '../hooks/useReveal';

const links = [
  { label: 'email',    value: 'jayathimishra.dev@gmail.com',    href: 'mailto:jayathimishra.dev@gmail.com', ext: false },
  { label: 'phone',    value: '+91 63920 16606',                href: 'tel:+916392016606',                  ext: false },
  { label: 'linkedin', value: 'linkedin.com/in/jayathi-mishra', href: 'https://linkedin.com/in/jayathi-mishra', ext: true },
];

export default function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="contact" ref={ref} className="reveal py-20 px-6 bg-bg border-t border-border">
      <div className="max-w-5xl mx-auto">

        <p className="font-mono text-xs text-ink-muted mb-2">
          $ echo "Hello, let's connect!" | mail -s "Contact" jayathimishra.dev@gmail.com
        </p>

        <h2 className="font-mono font-black text-4xl sm:text-5xl text-ink tracking-tight leading-none mb-3">
          Let's build<br />
          <span className="text-purple">something.</span>
        </h2>

        <p className="font-mono text-sm text-ink-muted mb-14 max-w-md leading-relaxed">
          Open to full-time SDE roles and interesting problems. Fast replies, no ghosting.
        </p>

        {/* Contact rows */}
        <div className="border-t border-border">
          {links.map((link, idx) => (
            <div key={link.label}>
              <a
                href={link.href}
                target={link.ext ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="btn group flex items-center justify-between py-5 hover:pl-3 transition-all duration-200"
              >
                <div className="flex items-center gap-6 sm:gap-10">
                  <span className="font-mono text-xs text-ink-dim uppercase tracking-widest w-14 flex-shrink-0">
                    {link.label}
                  </span>
                  <span className="font-mono text-sm sm:text-base text-ink font-medium group-hover:text-purple transition-colors duration-200">
                    {link.value}
                  </span>
                </div>
                <span className="text-ink-dim group-hover:text-purple group-hover:translate-x-1 transition-all duration-200">
                  →
                </span>
              </a>
              {idx < links.length - 1 && <div className="h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-purple dot-pulse flex-shrink-0" />
          <p className="font-mono text-xs text-ink-muted">
            Based in India · open to remote and relocation
          </p>
        </div>

      </div>
    </section>
  );
}
