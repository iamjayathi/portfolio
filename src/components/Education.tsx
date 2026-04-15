import { useReveal } from '../hooks/useReveal';

export default function Education() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="education" ref={ref} className="reveal py-20 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-ink-muted mb-2">$ cat ./education.json</p>
        <h2 className="font-mono font-black text-3xl sm:text-4xl text-purple mb-10">Education</h2>

        <div className="card-hover border border-border rounded-xl bg-bg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-xl flex-shrink-0">🎓</div>
            <div>
              <h3 className="font-mono font-bold text-ink text-base">Dehradun Institute of Technology</h3>
              <p className="font-mono text-purple text-sm font-semibold">B.Tech Computer Science</p>
              <p className="font-mono text-ink-muted text-xs mt-0.5">Aug 2020 – May 2024</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {['Operating Systems', 'DBMS', 'Distributed Systems', 'DSA'].map(c => (
                  <span key={c} className="tag">{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 border border-purple/20 bg-purple/5 rounded-xl px-4 py-2.5 text-center min-w-[80px]">
            <p className="font-mono text-[10px] text-purple/70 uppercase tracking-widest mb-0.5">CGPA</p>
            <p className="font-mono font-black text-xl text-ink">8.05</p>
            <p className="font-mono text-ink-muted text-[10px] mt-0.5">/ 10.0</p>
          </div>
        </div>
      </div>
    </section>
  );
}
