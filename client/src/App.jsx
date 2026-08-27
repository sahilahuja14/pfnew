import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tickingRef = useRef(false);

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'red';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'red' ? 'mono' : 'red';
      localStorage.setItem('portfolio-theme', newTheme);
      return newTheme;
    });
  };

  // Sync theme with HTML tag
  useEffect(() => {
    if (theme === 'mono') {
      document.documentElement.classList.add('theme-mono');
    } else {
      document.documentElement.classList.remove('theme-mono');
    }
  }, [theme]);

  // Handle scroll spy
  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection((current) => (current === section ? current : section));
          return;
        }
      }
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        tickingRef.current = false;
        updateActiveSection();
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Prime content-visibility sections well BEFORE they're actually
  // visible, instead of exactly when they cross into the viewport.
  // content-visibility: auto skips render work for off-screen sections,
  // which is great for scroll cost, but it also means the browser doesn't
  // promote each section's backdrop-filter layers to the compositor until
  // the section is already entering view — so all of that expensive blur
  // work lands in the same frame the user is looking at it, which reads
  // as "the blur pops in after the text." rootMargin here means the
  // observer fires ~600px before a section reaches the viewport, so by
  // the time you actually scroll to it, the compositor has had a
  // second or more of off-screen time to finish the blur quietly.
  useEffect(() => {
    const sections = document.querySelectorAll('#experience, #skills, #projects, #contact');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cv-primed');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '600px 0px 600px 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen bg-[#050303] text-slate-200 selection:bg-red-500/35 selection:text-white relative isolate ${theme === 'mono' ? 'theme-mono' : ''}`}>
      {/* GLOBAL SEAMLESS BACKGROUND (Eliminates horizontal section seams) */}
      <div className="global-canvas-bg" aria-hidden="true" />
      <div className="global-canvas-bars" aria-hidden="true" />
      <div className="global-canvas-glow" aria-hidden="true" />
      <div className="global-canvas-grain" aria-hidden="true" />

      {/* CONTENT (Relative to sit above background) */}
      <div className="relative">
        <Navbar
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default App;
