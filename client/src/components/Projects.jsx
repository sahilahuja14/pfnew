import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCardReveal } from '../hooks/useCardReveal';
import { useElementReveal } from '../hooks/useElementReveal';
import { useState } from 'react';

const ProjectCard = ({ project, idx, cardDelay }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      data-card-reveal
      className="project-glass-card group"
      style={{ animationDelay: `${cardDelay}ms` }}
    >
      {/* Index badge + Period */}
      <div className="project-card-meta flex items-baseline justify-between mb-5">
        <span className="project-index">{String(idx + 1).padStart(2, '0')}</span>
        <span className="text-white/50 text-sm font-medium">{project.period}</span>
      </div>

      {/* Title */}
      <h3 className="project-card-title text-2xl md:text-3xl font-semibold text-white mb-4">{project.title}</h3>

      {/* Description */}
      <p className="project-card-desc text-white/80 text-lg mb-4 leading-relaxed">{project.desc}</p>

      {/* Expandable highlights */}
      <div className={`project-highlights space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <ul className="project-highlight-list space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="project-highlight-item flex items-start text-white/70 text-base">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40 mt-2 mr-3 flex-shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="project-read-more md:hidden flex items-center gap-1 text-white/60 text-sm font-medium mb-4 mt-2 hover:text-white transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>Show Less <ChevronUp size={16} /></>
        ) : (
          <>Read More <ChevronDown size={16} /></>
        )}
      </button>

      {/* Tags */}
      <div className="project-tags flex flex-wrap gap-2 mb-5 mt-auto">
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      {/* Links */}
      <div className="project-links flex flex-wrap gap-4">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link group/btn"
          >
            <Github size={18} className="mr-2" />
            <span>{link.label}</span>
            <ExternalLink size={14} className="ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const cardContainerRef = useCardReveal();
  const pillRef = useElementReveal({ inClass: 'pill-in', selector: '[data-pill-reveal]' });

  const projects = [
    {
      title: "Customer Credit Risk Prediction",
      period: "June 2026",
      desc: "End-to-end credit-risk scoring pipeline with XGBoost model deployment, FastAPI scoring, and dashboard-ready risk categorization.",
      highlights: [
        "Processed 500,000+ live customer records with automated risk categories.",
        "Improved model AUC to 0.911+ using WOE and IV-driven feature engineering."
      ],
      tags: ["Python", "XGBoost", "Scikit-learn", "FastAPI", "ML"],
      links: [
        { label: "Model Repo", url: "https://github.com/sahilahuja14/house-price-prediction.git" },
        { label: "Backend", url: "https://github.com/abhishhhek/Dashboard-backend.git" },
      ],
    },
    {
      title: "Drone Detection App",
      period: "June 2025",
      desc: "Real-time perimeter-security system using YOLOv8 and OpenCV to detect drones, localize intrusions, and trigger instant alerts.",
      highlights: [
        "Added live bounding-box visualization with confidence scoring for operator review.",
        "Shipped a globally accessible web interface for multi-site monitoring."
      ],
      tags: ["Python", "YOLOv8", "OpenCV", "Django", "Computer Vision"],
      links: [
        { label: "View Code", url: "https://github.com/sahilahuja14/Drone-Detect-app.git" },
      ],
    },
    {
      title: "Global Duty & FTA Trade Intelligence Pipeline",
      period: "2026",
      desc: "RAG-driven trade data platform for structured customs duty, tariff, FTA, PTA, CEPA, CECA, and MFN rate lookups.",
      highlights: [
        "Designed lookups across 45,000+ HS/tariff codes spanning multiple countries.",
        "Automated ETL for 25+ heterogeneous customs sources into API-ready datasets."
      ],
      tags: ["Python", "RAG/LLM", "Playwright", "ETL", "Vector DB"],
      links: [
        { label: "View Code", url: "https://github.com/sahilahuja14/global-duty-fta-rag" },
      ],
    },
  ];

  return (
    <section id="projects" className="glass-theme-section py-24">
      <div ref={ref} className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative scroll-reveal ${isVisible ? 'is-visible' : ''}`}>

        {/* Section Title — Glass pill (same as Experience/Skills) */}
        <div className="flex justify-center mb-16" ref={pillRef}>
          <div className="projects-title-pill" data-pill-reveal>
            <span className="projects-title-text">Projects</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8" ref={cardContainerRef}>
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} cardDelay={idx * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
