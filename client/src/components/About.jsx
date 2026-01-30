import { Code2, Server, Globe } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const stats = [
    { icon: <Code2 size={24} />, value: "3+", label: "Years of Coding", color: "text-blue-400" },
    { icon: <Server size={24} />, value: "10+", label: "Projects Built", color: "text-purple-400" },
    { icon: <Globe size={24} />, value: "4+", label: "Technologies", color: "text-pink-400" },
  ];

  return (
    <section id="about" className="py-24 bg-[#030014] relative">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-slide-up' : 'opacity-0 translate-y-20'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A passionate developer dedicated to creating exceptional digital experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              I'm a Full Stack Developer and UX Designer with a passion for building beautiful, functional, and user-centered digital experiences. With expertise in modern web technologies, I bring ideas to life through clean code and intuitive design.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              My journey in tech started with a curiosity for how things work, which evolved into a deep love for crafting solutions that make a real impact. I believe in continuous learning and staying updated with the latest industry trends.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              When I'm not coding, you'll find me exploring new design trends, contributing to open source, or writing about web development.
            </p>
          </div>

          <div className="grid gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-6 rounded-2xl flex items-center space-x-6 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 group">
                <div className={`p-4 rounded-xl bg-white/5 group-hover:bg-white/10 ${stat.color} transition-colors`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
                  <p className="text-slate-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
