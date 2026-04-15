import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

const projects = [
  {
    name: 'Trade Execution System',
    status: 'built',
    stack: ['Python', 'FastAPI', 'Docker', 'Apache Kafka', 'Redis', 'PostgreSQL'],
    tagline: 'Distributed microservices trading platform',
    bullets: [
      'Built a Dockerized API Gateway handling high-concurrency order requests and real-time execution via FastAPI and WebSockets.',
      'Designed an Apache Kafka pipeline to decouple order ingestion, matching, and persistence — enabling high-throughput processing and batched PostgreSQL writes to minimise I/O overhead at peak load.',
      'Implemented an in-memory order matching engine using Redis and priority queues for low-latency buy/sell execution across concurrent trading sessions.',
    ],
    icon: '📈',
    accentColor: 'text-green',
    accentBorder: 'border-green/20',
    accentBg: 'bg-green/5',
  },
  {
    name: 'SmartMeet AI',
    status: 'built',
    stack: ['Next.js', 'React', 'OpenAI', 'Stream SDK', 'Node.js', 'Inngest', 'Better Auth', 'Polar'],
    tagline: 'AI-powered video meeting platform',
    bullets: [
      'Built a full AI-powered video meeting platform with real-time video, chat, and intelligent meeting agents.',
      'Implemented automatic meeting transcription, AI summaries, and searchable transcripts to improve meeting insights.',
      'Integrated secure authentication, subscriptions, and background AI workflows using Better Auth, Polar, and Inngest.',
    ],
    icon: '🤖',
    accentColor: 'text-purple',
    accentBorder: 'border-purple/20',
    accentBg: 'bg-purple/5',
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-hover border border-border rounded-xl bg-surface overflow-hidden">
      {/* Card header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-raised border-b border-border">
        <span className="font-mono text-xs text-ink-muted">
          ~/{project.name.toLowerCase().replace(/\s+/g, '-')}
        </span>
        <button
          onClick={() => setOpen(!open)}
          className="text-ink-muted hover:text-purple transition-colors focus:outline-none flex items-center justify-center p-1"
          title={open ? 'hide details' : 'view details'}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="p-5 sm:p-6">
        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h3 className="font-mono font-bold text-ink text-base">{project.name}</h3>
              <p className="font-mono text-xs text-ink-muted italic mt-0.5">{project.tagline}</p>
            </div>
          </div>
          <span className={`px-2 py-0.5 font-mono text-xs border rounded-full ${project.accentBorder} ${project.accentBg} ${project.accentColor}`}>
            ● shipped
          </span>
        </div>

        {/* Bullets — collapsible */}
        {open && (
          <ul className="space-y-3 mb-4 p-4 sm:p-5 border border-border rounded-xl bg-[rgba(0,0,0,0.2)]">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 font-mono text-sm text-ink leading-relaxed">
                <span className="text-purple flex-shrink-0 mt-0.5">▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="projects" ref={ref} className="reveal py-20 px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-ink-muted mb-2">$ ls -la ./projects</p>
          <h2 className="font-mono font-black text-3xl sm:text-4xl text-purple mb-1">Projects</h2>
          <p className="font-mono text-xs text-ink-muted">2 projects · distributed systems & AI</p>
        </div>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
