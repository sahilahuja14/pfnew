import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import sahilPortrait from '../assets/hero-portrait.webp';

const heroBadges = [
  { label: 'Data Science', target: 'skills', className: 'hero-badge--science' },
  { label: 'Machine Learning', target: 'projects', className: 'hero-badge--ml' },
  { label: 'Data Analytics', target: 'experience', className: 'hero-badge--analytics' },
];

const Hero = ({ scrollToSection }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="home" className="sahil-hero relative md:min-h-screen overflow-hidden">

      <div
        ref={ref}
        className="hero-stage relative mx-auto flex w-full max-w-[1440px] items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="hero-typography">
          <span className="hero-hola">Hola!</span>
          <span className="hero-iam">I am</span>
          <h1 className="hero-title">Sahil Ahuja</h1>
        </div>
        <p className="hero-build"> & I build Intelligence</p>

        <div className="hero-portrait-wrapper">
          <img
            src={sahilPortrait}
            alt="Illustrated portrait of Sahil Ahuja"
            className="hero-portrait"
            width={1672}
            height={941}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="hero-badges-wrap">
          {heroBadges.map((badge) => (
            <button
              key={badge.label}
              type="button"
              onClick={() => scrollToSection(badge.target)}
              className={`hero-badge ${badge.className}`}
            >
              {badge.label}
            </button>
          ))}
        </div>

        {/* Center Social Icons (at bottom of character) */}
        <div className="hero-center-socials">
          <a href="https://github.com/sahilahuja14" target="_blank" rel="noreferrer" className="hero-social-link">
            <Github size={24} />
          </a>
          <a href="https://leetcode.com/u/sahilahuja194/" target="_blank" rel="noreferrer" className="hero-social-link">
            <Code2 size={24} />
          </a>
          <a href="https://www.linkedin.com/in/sahil-ahuja-b83b05212" target="_blank" rel="noreferrer" className="hero-social-link">
            <Linkedin size={24} />
          </a>
          <a href="mailto:sahilahuja14@gmail.com" className="hero-social-link">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
