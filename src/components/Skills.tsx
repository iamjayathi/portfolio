import { useReveal } from '../hooks/useReveal';

const allSkills = [
  'JavaScript','TypeScript','Python','SQL','Node.js',
  'LangChain','OpenAI API','RAG Pipelines','Tool-calling Agents','Vercel AI SDK',
  'REST APIs','WebSockets','BullMQ','RabbitMQ','Prisma ORM','GraphQL','FastAPI',
  'React.js','Next.js','React Native','Expo','Tailwind CSS',
  'PostgreSQL','Redis','MongoDB','Supabase','AWS EC2','AWS S3','Vercel','CI/CD',
];

const categories = [
  { icon: '⚡', name: 'Languages & Runtime',
    skills: ['JavaScript','TypeScript','Python','SQL','Node.js'] },
  { icon: '🤖', name: 'AI / LLM',
    skills: ['LangChain','OpenAI API','RAG Pipelines','Tool-calling Agents','Vercel AI SDK'] },
  { icon: '🔧', name: 'Backend & Queues',
    skills: ['REST APIs','WebSockets','BullMQ','RabbitMQ','Prisma ORM','GraphQL','FastAPI'] },
  { icon: '📱', name: 'Frontend / Mobile',
    skills: ['React.js','Next.js','React Native','Expo','Tailwind CSS'] },
  { icon: '☁️', name: 'Databases & Cloud',
    skills: ['PostgreSQL','Redis','MongoDB','Supabase','AWS EC2','AWS S3','Vercel','CI/CD'] },
];

export default function Skills() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="skills" ref={ref} className="reveal py-20 overflow-hidden bg-surface">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <p className="font-mono text-xs text-ink-muted mb-2">$ grep -r "skills" --include="*.json" .</p>
        <h2 className="font-mono font-black text-3xl sm:text-4xl text-purple mb-1">
          Technical Skills
        </h2>
        <p className="font-mono text-xs text-ink-muted">5 categories · 30+ tools</p>
      </div>

      {/* Marquee */}
      <div className="border-y border-border py-2.5 mb-10 overflow-hidden bg-bg">
        <div className="marquee-track">
          {[...allSkills, ...allSkills].map((s, i) => (
            <span key={i} className="flex-shrink-0 font-mono text-xs text-ink-dim flex items-center gap-3 px-4">
              <span className="text-purple/40">◆</span>{s}
            </span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {categories.map(cat => (
            <div key={cat.name} className="card-hover border border-border rounded-xl bg-bg p-5 group">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{cat.icon}</span>
                <h3 className="font-mono font-semibold text-ink text-sm group-hover:text-purple transition-colors">{cat.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
