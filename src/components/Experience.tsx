import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';

type State = 'normal' | 'expanded';

type WorkItem = {
  title: string;
  metric: string;
  description: string;
  tags: string[];
};

type Experience = {
  company: string;
  tagline: string;
  period: string;
  role: string;
  current: boolean;
  impact: string;
  stack: string[];
  workItems: WorkItem[];
};

// ── Data ─────────────────────────────────────────────────────────────────────
const experiences: Experience[] = [
  {
    company: 'One800',
    tagline: "India's first live repair app",
    period: 'Nov 2024 – Present',
    role: 'Software Developer',
    current: true,
    stack: ['Node.js', 'React.js', 'React Native', 'Redis', 'BullMQ', 'RAG', 'LangChain', 'PostgreSQL', 'AWS EC2', 'Vercel', 'Expo'],
    impact: 'Developed and scaled a live repair app to 30K+ users; reduced checkout failures by 22%, cut RAG chatbot response time from hours to under 10 seconds, and increased revenue by 50%.',
    workItems: [
      {
        title: 'AI support chatbot',
        metric: 'Hours → under 10s response',
        description: 'Built a RAG-based chatbot with tool-calling that queries live slot APIs, enabling end-to-end booking and support without human handoff. Replaced a manual support queue that averaged several hours per first response.',
        tags: ['RAG', 'LLM', 'Tool calling', 'Vector DB', 'Slot APIs', 'Quotation engine'],
      },
      {
        title: 'Checkout & payment infrastructure',
        metric: 'No duplicate charges, failures ↓ 20–25%',
        description: 'Built a Redis + BullMQ pricing queue with transactional guarantees, cutting checkout failures by 20–25%. Integrated payment gateways with idempotency keys and signed webhook verification to eliminate duplicate charges entirely.',
        tags: ['Redis', 'BullMQ', 'Idempotency', 'Webhooks', 'Transactions'],
      },
      {
        title: 'Real-time scheduling system',
        metric: '70% polling reduction',
        description: 'Replaced a polling-heavy scheduling approach with an event-driven architecture using WebSockets and background jobs. Delivered real-time slot allocation for time-sensitive bookings with significantly improved responsiveness.',
        tags: ['WebSockets', 'Event-driven', 'BullMQ', 'Background jobs'],
      },
      {
        title: 'Revenue optimisation',
        metric: '50% revenue increase',
        description: 'Engineered a multi-layer caching system with optimised database queries that eliminated slow load times causing drop-offs in the conversion funnel. Directly attributed to a 50% lift in revenue.',
        tags: ['PostgreSQL', 'Multi-layer cache', 'Query optimisation', 'Real-time scheduling'],
      },
      {
        title: 'Customer platform & service centre app',
        metric: '30,000+ users · Web and mobile',
        description: 'Led development of a customer-facing app, SEO-optimised landing pages, and an internal service-centre app with role-based access — all shipped across web and mobile. Also implemented live repair video streaming via RTSP and Bunny.net, improving service transparency.',
        tags: ['Full-stack', 'RBAC', 'SEO', 'Mobile', 'RTSP', 'Bunny.net'],
      },
      {
        title: 'Operations infrastructure',
        metric: 'Automated · Monitored · Deployed',
        description: 'Automated inventory tracking via Zoho API sync with PostgreSQL. Built dashboards monitoring SLAs, revenue, and operations. Deployed all services on AWS EC2 and Vercel with Redis caching and CI/CD pipelines.',
        tags: ['Zoho API', 'PostgreSQL', 'AWS EC2', 'Vercel', 'Redis', 'CI/CD'],
      },
    ],
  },
  {
    company: 'Suggaa',
    tagline: 'Ride hailing app',
    period: 'Apr 2024 – Oct 2024',
    role: 'Software Developer',
    current: false,
    stack: ['Next.js', 'Vercel AI SDK', 'RabbitMQ', 'Zeplo', 'Supabase', 'PostGIS', 'GraphQL'],
    impact: 'Improved performance (2s → 200ms), cut failures by 20–25%, reduced complaints by 20%, and lowered infra costs; built real-time dashboards and event-driven systems.',
    workItems: [
      {
        title: 'AI operations dashboard',
        metric: '60% reduction in reporting effort',
        description: 'Built an admin dashboard with an embedded AI chatbot using the Vercel AI SDK. Automated the generation of operational reports, KPIs, and driver analytics — cutting manual reporting effort by 60%.',
        tags: ['Next.js', 'Vercel AI SDK', 'Admin dashboard', 'AI chatbot'],
      },
      {
        title: 'API architecture overhaul',
        metric: '−40% response time · −50% infra costs · −20% complaints',
        description: 'Refactored core APIs end-to-end — removed redundant layers, optimised query patterns, and rightsized infrastructure. Delivered measurable improvements across response time, infrastructure spend, and user-reported issues simultaneously.',
        tags: ['Node.js', 'REST APIs', 'Performance', 'Infrastructure'],
      },
      {
        title: 'Async workflow engine',
        metric: '2s → 200ms execution time',
        description: 'Redesigned synchronous workflows into async pipelines using Zeplo and RabbitMQ. Removed blocking operations from the critical path, reducing end-to-end execution time by 90% for key booking and notification flows.',
        tags: ['RabbitMQ', 'Zeplo', 'Async', 'Event-driven', 'Background jobs'],
      },
      {
        title: 'Database migration',
        metric: '−70% API response time',
        description: 'Migrated from Hasura GraphQL to Supabase with PostGIS for geospatial queries and pgHTTP for server-side HTTP calls. Eliminated the GraphQL overhead and unlocked native PostgreSQL performance, cutting API response times by 70%.',
        tags: ['Supabase', 'PostGIS', 'GraphQL', 'pgHTTP', 'PostgreSQL'],
      },
    ],
  },
  {
    company: 'The Internet Folks',
    tagline: '#1 Product Hunt · Featured on Shark Tank · 100+ launches',
    period: 'Nov 2023 – Apr 2024',
    role: 'Backend Developer Intern',
    current: false,
    stack: ['Node.js', 'Prisma ORM', 'Chai', 'Mocha', 'SuperTest', 'CSRF'],
    impact: 'Decreased production bugs by 20% and drove a 25% increase in user retention through security hardening and key product feature launches.',
    workItems: [
      {
        title: 'Security hardening & test coverage',
        metric: '−20% production bugs',
        description: 'Added CSRF validation across all state-changing endpoints, migrated to Prisma ORM for type-safe database access, and introduced a full test suite using Chai, Mocha, and SuperTest. Resulted in a 20% reduction in production bugs within the first two months.',
        tags: ['CSRF', 'Prisma ORM', 'Chai', 'Mocha', 'SuperTest', 'Security'],
      },
      {
        title: 'Community features',
        metric: '+25% user engagement & retention',
        description: 'Designed and built a comments and threaded discussion system from scratch — including nested replies, notifications, and moderation hooks. Became one of the most-used features post-launch, directly lifting engagement and 30-day retention by 25%.',
        tags: ['Node.js', 'REST APIs', 'Notifications', 'Moderation'],
      },
      {
        title: 'Lead conversion pipeline',
        metric: '+15% lead conversions',
        description: 'Implemented email and password-based data gating on premium content — requiring sign-up before access. Created a frictionless capture flow that fed directly into the marketing funnel, producing a 15% uplift in qualified lead conversions.',
        tags: ['Auth', 'Email gating', 'Conversion', 'Marketing pipeline'],
      },
    ],
  },
];

// ── WorkItemCard ─────────────────────────────────────────────────────────────
function WorkItemCard({ item }: { item: WorkItem }) {
  return (
    <div className="group rounded-xl border border-border bg-surface hover:border-purple/30 transition-colors duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h4 className="font-sans text-base font-semibold text-ink">{item.title}</h4>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-raised border border-purple/30 text-purple-light text-xs font-semibold sm:whitespace-nowrap">
            {item.metric}
          </span>
        </div>
        <p className="font-sans text-sm text-ink-muted leading-relaxed mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-raised border border-border text-ink-muted text-xs font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ExperienceCard ───────────────────────────────────────────────────────────
function ExperienceCard({ exp }: { exp: Experience }) {
  const [state, setState] = useState<State>('normal');

  const toggle = (next: State) => setState(s => s === next ? 'normal' : next);

  return (
    <div className="border border-raised rounded-xl bg-surface overflow-hidden">
      <div>
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-raised border-b border-black">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <div className="w-3 h-3 rounded-full bg-purple/20 border border-purple/30" />
              <div className="w-3 h-3 rounded-full bg-purple/10 border border-purple/20" />
              <div className="w-3 h-3 rounded-full bg-purple/5 border border-purple/10" />
            </div>
            <span className="font-mono text-xs text-ink-muted">~/{exp.company.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
          <button
            onClick={() => toggle('expanded')}
            className="flex items-center gap-1.5 font-mono text-xs text-ink-muted hover:text-purple transition-colors focus:outline-none"
            title={state === 'expanded' ? 'collapse' : 'view work'}
          >
            <span>{state === 'expanded' ? 'collapse' : 'view work'}</span>
            <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${state === 'expanded' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Company header */}
        <div className="px-5 sm:px-6 pt-5 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-mono font-bold text-ink text-lg">{exp.company}</h3>
                {exp.current && (
                  <span className="px-2 py-0.5 font-mono text-xs bg-green-500/10 text-green-500 border border-green-500/20 rounded-full animate-pulse">
                    ● current
                  </span>
                )}
              </div>
              <p className="font-mono text-purple text-sm font-semibold">{exp.role}</p>
              <p className="font-mono text-ink-dim text-xs italic mt-0.5">{exp.tagline}</p>
            </div>
            <span className="font-mono text-ink-muted text-xs flex items-center gap-1.5 flex-shrink-0">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {exp.period}
            </span>
          </div>

          {/* Impact line */}
          <p className="font-mono text-sm text-ink leading-relaxed mt-4">
            <strong className="text-purple font-semibold"></strong> {exp.impact}
          </p>

          {/* Stack tags — always visible */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {exp.stack.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>

        {/* ── Work items grid — only when expanded ── */}
        {state === 'expanded' && (
          <div className="px-5 sm:px-6 pb-6">
            <div className="border-t border-border pt-5">
              <div className="flex flex-col gap-3">
                {exp.workItems.map((item, i) => (
                  <WorkItemCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="reveal py-20 px-6 bg-bg">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs text-ink-muted mb-2">$ ls -la ./experience</p>
          <h2 className="font-mono font-black text-3xl sm:text-4xl text-purple mb-1">Work Experience</h2>
          <p className="font-mono text-xs text-ink-muted">2+ years of experience shipping production-grade systems</p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

