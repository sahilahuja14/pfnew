import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCardReveal } from '../hooks/useCardReveal';
import { useElementReveal } from '../hooks/useElementReveal';

const Experience = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const cardContainerRef = useCardReveal();
  const pillRef = useElementReveal({ inClass: 'pill-in', selector: '[data-pill-reveal]' });

  const experiences = [
    {
      title: "Data Scientist",
      company: "AAA2 Innovate Pvt Ltd",
      dateStart: "FEB 26 -",
      dateEnd: "AUG 26",
      responsibilities: [
        "Built a multi-country customs duty warehouse covering 250+ country duty data across 12,500+ HSN codes.",
        "Developed a confidence-scored entity-resolution pipeline cross-referencing 218,000+ companies against MCA/ ROC and GST records.",
        "Built XGBoost models for credit-risk scoring with 0.911+ AUC and freight-rate prediction for real-time and bulk decisions.",
        "a thread-safe caching and snapshot engine with cursor pagination, background refresh, feature validation, and model registry versioning.",
      ],
      mobileSummary: [
        "Duty warehouse: 250+ countries, 12.5K HSN codes",
        "Entity resolution across 218K+ company records",
        "XGBoost credit-risk and freight prediction models",
        "Caching, pagination, validation, and model registry",
      ]
    },
    {
      title: "Data Analysis Intern",
      company: "BluePi Consulting Pvt Ltd",
      dateStart: "NOV 25 -",
      dateEnd: "JAN 26",
      responsibilities: [
        "Analyzed complex datasets and created actionable insights for stakeholder decision-making",
        "Developed interactive dashboards and reports using data visualization tools",
        "Conducted data quality assessments and implemented data cleaning processes",
        "Collaborated with cross-functional teams to identify business KPIs and metrics",
      ],
      mobileSummary: [
        "Analyzed datasets for stakeholder decisions",
        "Built interactive dashboards and reports",
        "Cleaned data and tracked business KPIs",
      ]
    }
  ];

  return (
    <section id="experience" className="glass-theme-section py-24 relative">

      <div ref={ref} className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative scroll-reveal ${isVisible ? 'is-visible' : ''}`}>

        {/* Section Title — Glass pill */}
        <div className="flex justify-center mb-16" ref={pillRef}>
          <div className="experience-title-pill" data-pill-reveal>
            <span className="experience-title-text">Work</span>
            <span className="experience-title-text"> X<sup>p</sup></span>
          </div>
        </div>

        {/* Two-column experience cards */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch" ref={cardContainerRef}>
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              data-card-reveal
              className="experience-glass-card flex flex-col h-full"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Card Header */}
              <div className="experience-card-header">
                <h3 className="experience-role">{exp.title}</h3>
              </div>

              <div className="experience-card-meta">
                <span className="experience-company">{exp.company}</span>
                <span className="experience-dates">{exp.dateStart}   {exp.dateEnd}</span>
              </div>

              {/* Responsibilities */}
              <div className="experience-card-body experience-card-body--desktop">
                {exp.responsibilities.map((resp, i) => (
                  <p key={i} className="experience-responsibility">
                    {resp}
                  </p>
                ))}
              </div>

              <ul className="experience-mobile-points">
                {exp.mobileSummary.map((point, i) => (
                  <li key={i} className="experience-mobile-point">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
