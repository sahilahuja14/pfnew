import { BarChart3, Brain, Database, ExternalLink, Trophy, Table, Zap, Network, Link, Github, Code2, BarChart, Terminal } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCardReveal } from '../hooks/useCardReveal';
import { useElementReveal } from '../hooks/useElementReveal';

const Skills = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const strengthsRef = useCardReveal();
  const pillRef = useElementReveal({ inClass: 'pill-in', selector: '[data-pill-reveal]' });
  const tilesRef = useElementReveal({ inClass: 'tile-in', selector: '[data-tile-reveal]', staggerMs: 60 });
  const profilesRef = useElementReveal({ inClass: 'slide-in', selector: '[data-slide-left]', staggerMs: 80 });

  const coreTech = [
    { name: "Python", icon: <i className="devicon-python-plain"></i> },
    { name: "SQL", icon: <i className="devicon-mysql-plain"></i> },
    { name: "C++", icon: <i className="devicon-cplusplus-plain"></i> },
    { name: "C", icon: <i className="devicon-c-plain"></i> },
    { name: "HTML5", icon: <i className="devicon-html5-plain"></i> },
    { name: "CSS3", icon: <i className="devicon-css3-plain"></i> },
    { name: "FastAPI", icon: <i className="devicon-fastapi-plain"></i> },
    { name: "MongoDB", icon: <i className="devicon-mongodb-plain"></i> },
    { name: "AWS", icon: <i className="devicon-amazonwebservices-plain-wordmark"></i> },
    { name: "MS Excel", icon: <Table size={36} /> },
    { name: "PySpark", icon: <Zap size={36} /> },
    { name: "LangChain", icon: <Link size={36} /> },
    { name: "LangGraph", icon: <Network size={36} /> },
  ];

  const profiles = [
    { name: "GitHub", handle: "@sahilahuja14", icon: <Github size={20} />, url: "https://github.com/sahilahuja14" },
    { name: "LeetCode", handle: "@sahilahuja194", icon: <Code2 size={20} />, url: "https://leetcode.com/u/sahilahuja194/" },
    { name: "Codeforces", handle: "@sahilahuja14", icon: <BarChart size={20} />, url: "https://codeforces.com/profile/sahilahuja14" },
    { name: "GeeksforGeeks", handle: "@sahilahl2vx", icon: <Terminal size={20} />, url: "https://www.geeksforgeeks.org/user/sahilahl2vx/" },
  ];

  return (
    <section id="skills" className="glass-theme-section py-24 relative">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative scroll-reveal ${isVisible ? 'is-visible' : ''}`}>

        {/* Section Title — Glass pill */}
        <div className="flex justify-center mb-16" ref={pillRef}>
          <div className="skills-title-pill" data-pill-reveal>
            <span className="skills-title-text">Skills</span>
          </div>
        </div>

        {/* Main Grid: Tech + Profiles */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 mb-8">

          {/* Core Technologies Bento */}
          <div className="skills-glass-card">
            <h3 className="skills-card-heading">
              <span className="skills-heading-dot" />
              Core Technologies
            </h3>
            <div className="skills-tech-grid grid grid-cols-3 md:grid-cols-5 gap-4" ref={tilesRef}>
              {coreTech.map((tech, idx) => (
                <div
                  key={tech.name}
                  data-tile-reveal
                  className="skills-tech-tile"
                  title={tech.name}
                  style={{ animationDelay: `${idx * 55}ms` }}
                >
                  <div className="skills-tech-icon text-4xl text-white/90">{tech.icon}</div>
                  <span className="skills-tech-name text-sm font-medium text-white/70 mt-3">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coding Profiles Bento */}
          <div className="skills-glass-card">
            <h3 className="skills-card-heading">
              <span className="skills-heading-dot" />
              Coding Profiles
            </h3>
            <div className="flex flex-row flex-wrap justify-between md:flex-col gap-3 sm:gap-4 md:gap-0 md:space-y-3" ref={profilesRef}>
              {profiles.map((profile, idx) => (
                <a
                  key={profile.name}
                  data-slide-left
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="skills-profile-row group flex-1 md:flex-none justify-center md:justify-start"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div className="skills-profile-icon">{profile.icon}</div>
                  <div className="hidden md:block flex-1 ml-3">
                    <h4 className="text-white font-medium text-lg">{profile.name}</h4>
                    <p className="text-white/60 text-base">{profile.handle}</p>
                  </div>
                  <ExternalLink size={16} className="hidden md:block text-white/30 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
