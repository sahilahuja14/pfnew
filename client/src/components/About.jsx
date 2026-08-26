import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useElementReveal } from '../hooks/useElementReveal';
import { Brain, Database, BarChart3, Trophy, Globe } from 'lucide-react';
import sahilImg from '../assets/ChatGPT Image Aug 24, 2026, 02_42_17 AM.png';

/* ── Asymmetric Floating Bentos ── */
const leftBentos = [
  { id: 'data', title: "Data Engineering", sub: "ETL, scraping, warehouses", icon: Database, offsetClass: "mt-0 ml-0 lg:-ml-4" },
  { id: 'auc', title: "0.911+ AUC", sub: "Credit-risk XGBoost models", icon: Brain, offsetClass: "mt-8 lg:mt-16 ml-0 lg:ml-12" },
  { id: 'leadership', title: "Leadership", sub: "Debate, TEDx, SEO", icon: Trophy, offsetClass: "mt-8 lg:mt-24 ml-0 lg:-ml-2" },
];

const rightBentos = [
  { id: 'ml', title: "Machine Learning", sub: "XGBoost, CV, features", icon: Brain, offsetClass: "mt-0 lg:mt-12 mr-0 lg:-mr-4" },
  { id: 'analytics', title: "Analytics", sub: "Power BI, Tableau, KPIs", icon: BarChart3, offsetClass: "mt-8 lg:mt-48 mr-0 lg:mr-10" },
];

/* ── Scroll-reveal word component ── */
const RevealWord = ({ word, progress, isHighlight }) => {
  const opacity = Math.max(0.25, Math.min(1, progress));
  const color = isHighlight
    ? `rgba(255, 207, 138, ${opacity})`
    : `rgba(255, 244, 229, ${opacity})`;
  return (
    <span
      className={`about-reveal-word${isHighlight ? ' about-reveal-highlight' : ''}`}
      style={{ color, transition: 'color 0.18s ease' }}
    >
      {word}{' '}
    </span>
  );
};

/* Highlighted phrases that represent "jack of all trades" features */
const HIGHLIGHTS = [
  'machine learning',
  'credit-risk scoring',
  'computer vision',
  'data engineering',
  'competitive programming',
  'national-level debating',
  'TEDx',
  'dashboards',
  'entity resolution',
  'customs duty',
  'Model United Nations',
  'SEO articles',
  'XGBoost',
  'freight-rate prediction',
];

const isWordHighlighted = (word, wordIdx, allWords) => {
  const cleanWord = word.replace(/[.,;:!?()]/g, '').toLowerCase();
  for (const phrase of HIGHLIGHTS) {
    const phraseWords = phrase.toLowerCase().split(' ');
    for (let pLen = phraseWords.length; pLen >= 1; pLen--) {
      for (let startOffset = 0; startOffset < pLen; startOffset++) {
        const checkIdx = wordIdx - startOffset;
        if (checkIdx < 0) continue;
        const candidateSlice = allWords
          .slice(checkIdx, checkIdx + pLen)
          .map(w => w.replace(/[.,;:!?()]/g, '').toLowerCase());
        if (candidateSlice.join(' ') === phrase && wordIdx >= checkIdx && wordIdx < checkIdx + pLen) {
          return true;
        }
      }
    }
  }
  return false;
};

const About = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const tickingRef = useRef(false);
  const lastProgressRef = useRef(0);
  const pillRef = useElementReveal({ inClass: 'pill-in', selector: '[data-pill-reveal]' });
  const leftDomainRef = useElementReveal({ inClass: 'slide-in-right', selector: '[data-domain-left]', staggerMs: 150 });
  const rightDomainRef = useElementReveal({ inClass: 'slide-in-left', selector: '[data-domain-right]', staggerMs: 150 });

  useEffect(() => {
    const prefersStaticMotion = window.matchMedia('(max-width: 900px), (prefers-reduced-motion: reduce)').matches;
    if (prefersStaticMotion) {
      setScrollProgress(1);
      return;
    }

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalTravel = rect.height + windowHeight;
        const traveled = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, traveled / totalTravel));

        if (Math.abs(progress - lastProgressRef.current) < 0.01) return;
        lastProgressRef.current = progress;
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Desktop continuous paragraph text */
  const desktopText =
    `I'm Sahil, a Data Science enthusiast from Delhi, India, building machine learning systems and data pipelines that solve real business problems. ` +
    `My niches: credit-risk scoring (XGBoost, 0.911+ AUC), freight-rate prediction, customs duty across 250+ countries, ` +
    `entity resolution against 218K+ company records, and YOLOv8 computer vision for drone detection. ` +
    `Beyond code, competitive programming keeps my problem-solving sharp while national-level debating and TEDx coordination ` +
    `make sure I can explain the work as clearly as I build it.`;

  /* Mobile text focusing on niches and brevity */
  const mobileText =
    `I'm Sahil, an engineer focused on specialized niches: from XGBoost credit-risk scoring and entity resolution, to YOLOv8 computer vision. ` +
    `I build data engineering pipelines and dashboards that solve complex problems. ` +
    `Beyond competitive programming, my background in national-level debating and TEDx ensures I communicate these highly technical solutions just as effectively as I build them.`;

  const desktopWords = desktopText.split(' ');
  const mobileWords = mobileText.split(' ');

  const renderWords = (wordsArray) => {
    const total = wordsArray.length;
    return wordsArray.map((word, i) => {
      const wordThreshold = i / total;
      const wordProgress = Math.max(0, (scrollProgress - wordThreshold) * total * 0.6);
      const highlighted = isWordHighlighted(word, i, wordsArray);
      return (
        <RevealWord
          key={i}
          word={word}
          progress={wordProgress}
          isHighlight={highlighted}
        />
      );
    });
  };

  return (
    <section id="about" className="glass-theme-section py-24 relative" ref={sectionRef}>
      <div ref={ref} className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative scroll-reveal ${isVisible ? 'is-visible' : ''}`}>

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center" ref={pillRef}>
          <div className="about-title-pill mb-6" data-pill-reveal>
            <span className="about-title-text">About</span>
          </div>
          <p className="about-subtitle max-w-2xl mx-auto">
            I turn messy information into models, dashboards, and decisions that can survive real operational pressure.
          </p>
        </div>

        {/* ── Amalgamated Asymmetric Layout ── */}
        <div className="about-content-layout flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-6 mt-12">
          
          {/* Left Floating Bentos */}
          <div className="about-bento-rail w-full lg:w-[24%] flex flex-col mt-0 lg:mt-12" ref={leftDomainRef}>
            {leftBentos.map((b) => (
              <div key={b.id} className={`about-floating-bento ${b.offsetClass}`} data-domain-left>
                <div className="about-bento-icon"><b.icon size={26} strokeWidth={1.5} /></div>
                <h4 className="about-bento-title">{b.title}</h4>
                <p className="about-bento-sub">{b.sub}</p>
              </div>
            ))}
          </div>

          {/* Center Silhouette Wrap */}
          <div className="w-full lg:w-[50%] about-silhouette-container mt-0 z-10">
            <img
              src={sahilImg}
              alt="Sahil Ahuja"
              className="about-silhouette-image"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              style={{
                float: 'left',
                shapeOutside: `url("${sahilImg}")`,
                shapeImageThreshold: 0.1,
                shapeMargin: '30px',
              }}
            />
            <p className="about-silhouette-text hidden md:block">
              {renderWords(desktopWords)}
            </p>
            <p className="about-silhouette-text block md:hidden">
              {renderWords(mobileWords)}
            </p>
            <div style={{ clear: 'both' }} />
          </div>

          {/* Right Floating Bentos */}
          <div className="about-bento-rail w-full lg:w-[24%] flex flex-col mt-0 lg:mt-24" ref={rightDomainRef}>
            {rightBentos.map((b) => (
              <div key={b.id} className={`about-floating-bento ${b.offsetClass}`} data-domain-right>
                <div className="about-bento-icon"><b.icon size={26} strokeWidth={1.5} /></div>
                <h4 className="about-bento-title">{b.title}</h4>
                <p className="about-bento-sub">{b.sub}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
