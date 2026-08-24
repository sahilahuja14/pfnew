import { useState, useEffect } from 'react';
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
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
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
