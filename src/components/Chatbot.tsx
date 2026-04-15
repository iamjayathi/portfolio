import { useState, useRef, useEffect } from 'react';

// ── Knowledge base ─────────────────────────────────────────────────────────
const KB: { patterns: RegExp[]; answer: string }[] = [
  {
    patterns: [/who is jayathi/i, /who are you/i, /about (jayathi|you|her)/i, /introduce/i, /tell me about/i, /background/i, /overview/i, /summary/i],
    answer: `Great question! Jayathi Mishra is a **Software Developer** who's been shipping production systems for 1.5 years across 3 companies.

She's the kind of engineer who doesn't just write code — she thinks in systems. Whether it's building a RAG chatbot that responds in under 10 seconds, designing a Kafka pipeline that decouples order ingestion at scale, or integrating payment gateways with zero duplicate charges — she delivers work that has **real, measurable impact**.

A few things that set her apart:
  ▸ She's shipped products to **30K+ real users**
  ▸ She bridges **AI/LLM work with backend engineering** — a rare combo
  ▸ She writes code that handles failure gracefully (idempotency, retries, transactional queues)
  ▸ She moves fast without breaking things — proven by a 20% reduction in production bugs

Currently building at **One800**, open to exciting new opportunities. 🚀`,
  },
  {
    patterns: [/current(ly| job| role| work)/i, /where.*work/i, /one.?800/i, /latest.*job/i, /present/i],
    answer: `She is currently a **Software Developer at One800** (Nov 2024 – Present) — India's first live repair app.
Key work:
  ▸ Led the customer-facing app for 30K+ users on web & mobile with role-based access control.
  ▸ Built a RAG-based support chatbot with tool-calling — cut response time from hours to <10 seconds.
  ▸ Redis + BullMQ pricing system reduced checkout failures by 20–25%.
  ▸ Integrated payment gateways with idempotency keys & signed webhooks → zero duplicate charges.
  ▸ Implemented live RTSP video streaming via Bunny.net, improving transparency by 50%.
  ▸ Automated inventory via Zoho API sync; deployed on AWS EC2 + Vercel with CI/CD.`,
  },
  {
    patterns: [/suggaa/i, /ride.?hail/i, /second.*(job|company|role)/i],
    answer: `At **Suggaa** (Apr 2024 – Oct 2024), a ride-hailing app, Jayathi:
  ▸ Built an admin dashboard + AI chatbot that cut operational reporting effort by 60%.
  ▸ Refactored APIs → −40% response time, −50% infra costs, −20% user complaints.
  ▸ Async workflows with Zeplo + RabbitMQ: execution time from 2s → 200ms.
  ▸ Migrated Hasura GraphQL → Supabase with PostGIS/pgHTTP → −70% API response time.
  Stack: Next.js, Vercel AI SDK, RabbitMQ, Zeplo, Supabase, PostGIS, GraphQL.`,
  },
  {
    patterns: [/internet folks/i, /intern/i, /first.*(job|company|role)/i],
    answer: `At **The Internet Folks** (Nov 2023 – Apr 2024) — #1 Product Hunt, featured on Shark Tank, 100+ launches:
  ▸ CSRF validation + Prisma ORM migration + Chai/Mocha/SuperTest coverage → −20% production bugs.
  ▸ Built comments & discussion feature: +25% user engagement and retention.
  ▸ Email/password data gating: +15% uplift in lead conversions.
  Stack: Node.js, Prisma ORM, Chai, Mocha, SuperTest, CSRF.`,
  },
  {
    patterns: [/experience/i, /work history/i, /companies/i, /career/i, /where.*worked/i],
    answer: `Jayathi has 2+ years of experience across 3 product companies:
  1. **One800** · Software Developer · Nov 2024 – Present
  2. **Suggaa** · Software Developer · Apr 2024 – Oct 2024
  3. **The Internet Folks** · Backend Developer Intern · Nov 2023 – Apr 2024

She's shipped production systems used by 30K+ users, cut checkout failures, built AI chatbots, and optimised APIs.`,
  },
  {
    patterns: [/skill|tech(nolog|nical|stack)|stack|language|framework|tool/i],
    answer: `Jayathi's core tech stack:
  **Languages**: JavaScript, TypeScript, Python, SQL
  **AI / LLM**: LangChain, OpenAI API, RAG pipelines, Tool-calling agents, Vercel AI SDK
  **Backend**: Node.js, FastAPI, REST APIs, WebSockets, BullMQ, RabbitMQ, Prisma ORM, GraphQL
  **Frontend / Mobile**: React.js, Next.js, React Native, Expo, Tailwind CSS
  **Databases & Cloud**: PostgreSQL, Redis, MongoDB, Supabase, AWS (EC2, S3), Vercel, CI/CD`,
  },
  {
    patterns: [/node\.?js/i, /backend/i],
    answer: `Node.js is Jayathi's primary backend runtime. She's used it at both One800 and The Internet Folks — building REST APIs, background job systems (BullMQ), payment integrations, and webhook handlers at production scale.`,
  },
  {
    patterns: [/ai|rag|chatbot|llm|langchain|gpt|openai/i],
    answer: `Jayathi has hands-on AI/ML experience:
  ▸ Built a **RAG-based support chatbot** at One800 using LangChain with tool-calling (slot APIs). Response time reduced from hours to <10 seconds.
  ▸ Built an **AI chatbot** at Suggaa using the Vercel AI SDK for operational reporting, cutting effort by 60%.
  ▸ Built **SmartMeet AI** — an AI-powered video meeting platform with automatic transcription, AI summaries, and searchable transcripts using OpenAI.
  She understands retrieval pipelines, embedding, prompt engineering, and production latency constraints.`,
  },
  {
    patterns: [/redis|bullmq|queue|job/i],
    answer: `Jayathi built a Redis + BullMQ-powered pricing and job queue system at One800. It handles transactional guarantees, retries, and idempotency — resulting in a 20–25% reduction in checkout failures. She also used RabbitMQ + Zeplo at Suggaa, cutting async workflow execution time from 2s to 200ms. Her Trade Execution System also uses Redis for an in-memory order matching engine.`,
  },
  {
    patterns: [/payment|stripe|webhook|gateway/i],
    answer: `At One800, Jayathi integrated payment gateways with **idempotency keys and signed webhooks**, achieving zero duplicate charges in production. She understands webhook security, retry logic, and financial transaction integrity.`,
  },
  {
    patterns: [/postgres|supabase|database|sql|postgis/i],
    answer: `Jayathi works extensively with PostgreSQL. At Suggaa she migrated from Hasura GraphQL to Supabase with PostGIS and pgHTTP, achieving a 70% reduction in API response time. She's also used Prisma ORM at The Internet Folks for type-safe DB access, and built batched PostgreSQL writes in her Trade Execution System to minimise I/O at peak load.`,
  },
  {
    patterns: [/aws|ec2|vercel|deploy|devops|ci.?cd|cloud/i],
    answer: `Jayathi deploys on **AWS EC2** and **Vercel**, with CI/CD pipelines in place at One800. She's comfortable with infrastructure setup, environment management, and shipping to production reliably.`,
  },
  {
    patterns: [/react.?native|mobile|app/i],
    answer: `Yes — Jayathi works in React Native for the One800 mobile app, alongside the web app. She led both platforms with role-based access control for 30K+ users.`,
  },
  {
    patterns: [/trade|kafka|trading|microservice|distributed/i],
    answer: `Jayathi built a **Trade Execution System** — a distributed microservices trading platform:
  ▸ Dockerized API Gateway handling high-concurrency order requests via FastAPI and WebSockets.
  ▸ Apache Kafka pipeline to decouple order ingestion, matching, and persistence — enabling high-throughput processing.
  ▸ Batched PostgreSQL writes to minimise I/O overhead at peak load.
  ▸ In-memory order matching engine using Redis and priority queues for low-latency buy/sell execution.
  Stack: Python, FastAPI, Docker, Apache Kafka, Redis, PostgreSQL.`,
  },
  {
    patterns: [/smartmeet|meeting|video|transcri|inngest|stream sdk/i],
    answer: `Jayathi built **SmartMeet AI** — an AI-powered video meeting platform:
  ▸ Real-time video, chat, and intelligent meeting agents.
  ▸ Automatic meeting transcription, AI summaries, and searchable transcripts using OpenAI.
  ▸ Secure authentication + subscriptions via Better Auth and Polar.
  ▸ Background AI workflows powered by Inngest.
  Stack: Next.js (App Router), React, OpenAI, Stream SDK, Node.js, Inngest, Better Auth, Polar.`,
  },
  {
    patterns: [/project|side project|build|portfolio/i],
    answer: `Jayathi has shipped two notable projects:
  ▸ **Trade Execution System** — distributed microservices trading platform with Kafka, Redis, FastAPI & PostgreSQL.
  ▸ **SmartMeet AI** — AI-powered video meetings with real-time transcription and AI summaries using OpenAI.
  Plus 1.5 years of production engineering across 3 companies. Ask me about any of them!`,
  },
  {
    patterns: [/education|college|university|degree|b\.?tech|cgpa|gpa|grade/i],
    answer: `Jayathi holds a **B.Tech in Computer Science** from the Dehradun Institute of Technology (Aug 2020 – May 2024) with a CGPA of **8.05 / 10**. Key subjects: Operating Systems, DBMS, Distributed Systems, and Data Structures & Algorithms.`,
  },
  {
    patterns: [/contact|email|reach|phone|hire|linkedin|github/i],
    answer: `You can reach Jayathi here:
  📧 jayathimishra.dev@gmail.com
  📞 +91 63920 16606
  💼 linkedin.com/in/jayathi-mishra
  🐙 github.com/jayathi-mishra`,
  },
  {
    patterns: [/available|open to|looking for|job|opportunit|hire|joining/i],
    answer: `Jayathi is open to **full-time Software Developer / Backend Engineer** roles — ideally at companies building real products where scale and reliability matter. She thrives in fast-paced environments and ramps up quickly.`,
  },
  {
    patterns: [/technical.*(strong|strength|point|skill|ability)/i, /strong.*technical/i, /technically.*good/i, /what.*good at/i, /what.*best at/i, /technical.*superpower/i],
    answer: `Jayathi's technical strong points — the things she genuinely excels at:

**1. Backend Systems Architecture**
She doesn't just build APIs — she designs systems. Kafka for event streaming, BullMQ for job queues, idempotency patterns for financial transactions. She thinks about what happens when things fail before they fail.

**2. AI / LLM Integration**
She's shipped RAG pipelines and tool-calling agents in production — not just tutorials. Her chatbot at One800 went from concept to <10 second response times serving real customers.

**3. Database Performance**
She's cut API response times by 70% through smart migrations (PostGIS/pgHTTP), batched writes, and query optimisation. She knows when to denormalise, when to cache, and when Redis is the right call.

**4. Async & Event-Driven Design**
RabbitMQ, BullMQ, Zeplo, Kafka — she's used them all in production. She reduced execution time from 2s to 200ms at Suggaa purely through async workflow redesign.

**5. Full-Stack Delivery**
She ships end-to-end — backend, mobile (React Native), and web — with proper access control, auth, and webhooks. Recruiters love a developer who can own a feature from DB schema to UI.`,
  },
  {
    patterns: [/strength|strong point|good at|best at|excel|superpower|stand out|differ/i],
    answer: `What makes Jayathi stand out as a developer:

**She ships things that actually work at scale.**
30K+ users on One800. Zero duplicate payment charges. Checkout failures reduced by 22%. These aren't side projects — they're production numbers.

**She combines backend depth with AI fluency.**
Most backend engineers haven't shipped RAG pipelines. Most AI engineers don't know how to build transactional queue systems. Jayathi does both — and that's genuinely rare.

**She's impact-driven, not task-driven.**
She doesn't just close tickets. She cut operational reporting effort by 60% at Suggaa, slashed API costs by 50%, and reduced production bugs by 20% at The Internet Folks. Every engagement left the codebase better.

**She ramps up fast.**
Across 3 very different companies (repair app, ride-hailing, SaaS), she's consistently gone from onboarding to shipping critical features in production.

In short — she's someone you hire when you want things **done right and done fast**. 🎯`,
  },
  {
    patterns: [/impact|achieve|accomplish|metric|number/i],
    answer: `Measurable impact Jayathi has delivered:
  ▸ Scaled an app to **30K+ users**
  ▸ Reduced checkout failures by **22%**
  ▸ RAG chatbot: hours → **<10 seconds** response
  ▸ Async workflows: 2s → **200ms** (−90%)
  ▸ API response time: **−40%** + infra costs **−50%**
  ▸ Production bugs: **−20%**
  ▸ User engagement: **+25%**`,
  },
  {
    patterns: [/python|fastapi/i],
    answer: `Jayathi uses Python + FastAPI for high-performance backend work. Her Trade Execution System is built on FastAPI with WebSockets for real-time order execution, Docker for containerisation, and Apache Kafka for event streaming.`,
  },
  {
    patterns: [/salary|expect|ctc|compensation|pay/i],
    answer: `For compensation details, it's best to reach out to Jayathi directly:
  📧 jayathimishra.dev@gmail.com
  📞 +91 63920 16606`,
  },
  {
    patterns: [/location|city|where.*live|remote|onsite|hybrid/i],
    answer: `Jayathi is open to **remote, hybrid, or onsite** opportunities. Best to confirm location preferences directly via email or LinkedIn.`,
  },
  {
    patterns: [/resume|cv/i],
    answer: `You can download Jayathi's resume directly from the portfolio — look for the **Resume** link in the hero section, or reach out at jayathimishra.dev@gmail.com for a copy.`,
  },
  {
    patterns: [/hello|hi|hey|howdy|greet/i],
    answer: `Hey there! 👋 I'm Jayathi's AI assistant. Ask me anything about her skills, experience, projects, or how to get in touch. I'm here to help recruiters get the full picture fast!`,
  },
  {
    patterns: [/thank|thanks|appreciate|great|awesome|cool/i],
    answer: `Happy to help! If you'd like to get in touch with Jayathi directly:
  📧 jayathimishra.dev@gmail.com
  💼 linkedin.com/in/jayathi-mishra`,
  },
];

const SUGGESTIONS = [
  'Who is Jayathi?',
  'What are her technical strengths?',
  'What impact has she made?',
  'Tell me about her projects',
  'What is her tech stack?',
  'How to contact her?',
];

const FALLBACKS = [
  `Hmm, I don't have a specific answer for that one! But here's what I *can* tell you — try asking:
  ▸ "What are her technical strengths?"
  ▸ "Who is Jayathi?"
  ▸ "What projects has she built?"
  ▸ "How to contact her?"

Or reach out directly → 📧 jayathimishra.dev@gmail.com`,

  `That one's outside what I know! I'm most helpful when asked about Jayathi's skills, experience, projects, or background.

Some good starting points:
  ▸ "What is her tech stack?"
  ▸ "What impact has she made?"
  ▸ "Tell me about her AI experience"

Direct contact → 💼 linkedin.com/in/jayathi-mishra`,

  `I'm not sure about that — but don't let that stop you! Jayathi is very responsive:
  📧 jayathimishra.dev@gmail.com
  📞 +91 63920 16606

Meanwhile, I know a lot about her technical strengths, past work, and projects. Ask away! 🚀`,
];

let fallbackIdx = 0;

function getAnswer(q: string): string {
  const normalised = q.trim();
  for (const { patterns, answer } of KB) {
    if (patterns.some(r => r.test(normalised))) return answer;
  }
  const response = FALLBACKS[fallbackIdx % FALLBACKS.length];
  fallbackIdx++;
  return response;
}

// ── Markdown-lite renderer (bold + line breaks + bullet ▸) ──────────────────
function renderText(text: string) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} className="text-purple font-semibold">{part}</strong>
            : <span key={j}>{part}</span>
        )}
        <br />
      </span>
    );
  });
}

// ── Types ───────────────────────────────────────────────────────────────────
type Msg = { from: 'user' | 'bot'; text: string; typing?: boolean };

const CloseIcon = (
  <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l8 8M3 11l8-8"/>
  </svg>
);
const MinimizeIcon = (
  <svg width="8" height="8" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 7h10"/>
  </svg>
);

function DotBtn({ bg, hoverBg, symbol, label, onClick }: {
  bg: string; hoverBg: string; symbol: React.ReactNode; label: string; onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick} title={label}
      onMouseDown={e => e.stopPropagation()}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 12, height: 12, borderRadius: '50%',
        background: hov ? hoverBg : bg,
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.15s, background 0.15s',
        transform: hov ? 'scale(1.3)' : 'scale(1)', flexShrink: 0,
      }}
    >
      <span style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(0,0,0,0.6)', fontFamily:'monospace', userSelect:'none', lineHeight:1 }}>
        {symbol}
      </span>
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: 'bot', text: `Hey! 👋 I'm Jayathi's AI assistant. Ask me anything — her skills, experience, projects, impact metrics, or how to reach her. I'm built to help recruiters get answers fast!` },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  // Floating position state
  // null means "use default CSS positioning" (bottom-6 right-6)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; buttonX: number; buttonY: number; moved: boolean } | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, isTyping]);

  useEffect(() => {
    if (open && !minimised) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open, minimised]);

  // ── Dragging logic ────────────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = (e.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      buttonX: rect.left,
      buttonY: rect.top,
      moved: false,
    };
    setIsDragging(true);
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const el = (e.currentTarget as HTMLElement);
    const rect = el.getBoundingClientRect();
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      buttonX: rect.left,
      buttonY: rect.top,
      moved: false,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - dragRef.current.startX;
      const dy = clientY - dragRef.current.startY;
      
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragRef.current.moved = true;
      }
      
      const newX = Math.max(10, Math.min(window.innerWidth - 60, dragRef.current.buttonX + dx));
      const newY = Math.max(10, Math.min(window.innerHeight - 60, dragRef.current.buttonY + dy));
      
      setPos({ x: newX, y: newY });
    };

    const onEnd = () => {
      setIsDragging(false);
      setTimeout(() => { dragRef.current = null; }, 50);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging]);

  const toggleOpen = () => {
    if (dragRef.current?.moved) return;
    setOpen(true);
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setShowSuggestions(false);
    setInput('');
    setMsgs(m => [...m, { from: 'user', text: q }]);
    setIsTyping(true);
    setTimeout(() => {
      const answer = getAnswer(q);
      setIsTyping(false);
      setMsgs(m => [...m, { from: 'bot', text: answer }]);
    }, 600 + Math.random() * 400);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const posStyle: React.CSSProperties = pos 
    ? { left: pos.x, top: pos.y, bottom: 'auto', right: 'auto' }
    : { bottom: '1.5rem', right: '1.5rem' };

  // ── Toggle button (bottom-right) ──────────────────────────────────────────
  if (!open) {
    return (
      <button
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onClick={toggleOpen}
        className={`fixed z-50 flex items-center gap-2 px-4 py-3 bg-surface border border-purple/40 rounded-xl font-mono text-sm text-purple shadow-lg hover:border-purple hover:shadow-purple/20 hover:shadow-xl transition-all duration-200 group ${isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'}`}
        style={{ 
          ...posStyle,
          boxShadow: '0 0 0 1px rgba(188,140,255,0.1), 0 8px 32px rgba(0,0,0,0.5)',
          transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Drag handle hint - hidden on small screens */}
        <div className="hidden sm:flex flex-col items-center justify-center border-r border-purple/20 pr-2 mr-1 py-1 select-none pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[7px] font-black text-purple/50 uppercase tracking-widest mb-1" style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>drag</span>
          <div className="flex flex-col gap-0.5">
            {[1,2,3].map(i => <div key={i} className="w-0.5 h-0.5 rounded-full bg-purple/40" />)}
          </div>
        </div>

        <span className="relative flex h-2.5 w-2.5 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple opacity-50"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple"></span>
        </span>
        <span className="group-hover:text-purple-light transition-colors pointer-events-none">Ask anything about me</span>
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
      </button>
    );
  }

  // ── Minimised ─────────────────────────────────────────────────────────────
  if (minimised) {
    return (
      <div 
        onMouseDown={onMouseDown}
        className={`fixed z-50 w-80 border border-border rounded-xl bg-surface overflow-hidden shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ 
          ...posStyle,
          boxShadow: '0 0 0 1px rgba(188,140,255,0.1), 0 24px 64px rgba(0,0,0,0.7)',
          transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex items-center gap-2 px-4 py-2.5 bg-raised border-b border-border pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <DotBtn bg="#f85149" hoverBg="#ef4444" symbol={CloseIcon} label="close" onClick={() => { setOpen(false); setMinimised(false); }} />
            <DotBtn bg="#d29922" hoverBg="#ca8a04" symbol={MinimizeIcon} label="restore" onClick={() => setMinimised(false)} />
          </div>
          <span className="ml-1 font-mono text-xs text-ink-muted flex-1">~/ask-jayathi — minimised</span>
          <button onMouseDown={e => e.stopPropagation()} onClick={() => setMinimised(false)} className="pointer-events-auto font-mono text-xs text-purple hover:text-purple-light transition-colors">restore →</button>
        </div>
      </div>
    );
  }

  // ── Full chat window ──────────────────────────────────────────────────────
  return (
    <div
      className={`fixed z-50 flex flex-col border border-border rounded-xl bg-surface overflow-hidden shadow-2xl ${isDragging ? 'ring-1 ring-purple/30' : ''}`}
      style={{
        ...posStyle,
        width: 'min(420px, calc(100vw - 24px))',
        height: 'min(560px, calc(100vh - 100px))',
        boxShadow: '0 0 0 1px rgba(188,140,255,0.15), 0 24px 64px rgba(0,0,0,0.75)',
        transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Title bar (Draggable area) */}
      <div 
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className={`flex items-center gap-2 px-4 py-2.5 bg-raised border-b border-border flex-shrink-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div className="flex items-center gap-2" onMouseDown={e => e.stopPropagation()}>
          <DotBtn bg="#f85149" hoverBg="#ef4444" symbol={CloseIcon} label="close" onClick={() => setOpen(false)} />
          <DotBtn bg="#d29922" hoverBg="#ca8a04" symbol={MinimizeIcon} label="minimise" onClick={() => setMinimised(true)} />
        </div>
        <div className="w-3 h-3 rounded-full bg-[#3fb950] flex-shrink-0" />
        <span className="ml-1 font-mono text-xs text-ink-muted flex-1 select-none">~/ask-jayathi</span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-green select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse inline-block" />
          online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.from === 'bot' && (
              <div className="w-6 h-6 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 text-xs">J</div>
            )}
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-xl font-mono text-xs leading-relaxed ${
                m.from === 'user'
                  ? 'bg-purple/15 border border-purple/25 text-ink'
                  : 'bg-raised border border-border text-ink'
              }`}
            >
              {m.from === 'bot' ? renderText(m.text) : m.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5 text-xs">J</div>
            <div className="px-3.5 py-3 rounded-xl bg-raised border border-border">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-purple/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-purple/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && msgs.length === 1 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="px-2.5 py-1.5 font-mono text-xs border border-purple/25 rounded-lg text-purple/80 bg-purple/5 hover:bg-purple/15 hover:border-purple/50 hover:text-purple transition-all duration-150"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-border bg-raised px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-purple flex-shrink-0">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about skills, experience, contact..."
            className="flex-1 bg-transparent font-mono text-xs text-ink placeholder-ink-dim outline-none border-none"
            disabled={isTyping}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isTyping}
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-purple/10 border border-purple/20 text-purple hover:bg-purple/20 hover:border-purple/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

