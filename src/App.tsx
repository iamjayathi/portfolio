import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-bg font-mono">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Chatbot />
      <footer className="border-t border-border py-5 px-6 bg-surface">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-ink-muted">
            <span className="text-purple">~/</span> jayathi.dev · © 2025
          </p>
          <p className="font-mono text-xs text-ink-dim">
            React · TypeScript · Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
