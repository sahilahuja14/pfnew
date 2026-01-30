import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Experience = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const experiences = [
    {
      title: "Data Analyst Intern",
      company: "Blupi Consulting Pvt. Ltd",
      location: "Gurugram",
      period: "Nov 2025 - Jan 2026",
      responsibilities: [
        "Analyzed complex datasets and created actionable insights for stakeholder decision-making",
        "Developed interactive dashboards and reports using data visualization tools",
        "Conducted data quality assessments and implemented data cleaning processes",
        "Collaborated with cross-functional teams to identify business KPIs and metrics",
        "Prepared comprehensive presentations of findings and recommendations to leadership"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />

      <div ref={ref} className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-slide-up' : 'opacity-0 translate-y-20'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
          <p className="text-slate-400">My professional journey and key achievements</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`relative bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 transform ${
                isVisible ? 'animate-slide-from-left' : ''
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Left Purple Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 to-purple-600 rounded-l-2xl" />

              {/* Content */}
              <div className="pl-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-slate-300">
                      <span className="font-semibold text-purple-400">{exp.company}</span>
                      <span className="text-slate-500"> | {exp.location}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-semibold">{exp.period}</p>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start text-slate-300">
                      <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-2 mr-4 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
