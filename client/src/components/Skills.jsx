import { Code2, Terminal, ExternalLink, Palette, Pen, BookOpen, Calendar } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const TechLogo = ({ name, icon, color }) => (
  <div className="flex flex-col items-center justify-center gap-3 p-6 hover:scale-110 transition-all duration-300 group cursor-pointer">
    <div className={`text-6xl drop-shadow-lg ${color}`}>{icon}</div>
    <span className="text-xs font-semibold text-slate-300 text-center opacity-70 group-hover:opacity-100">{name}</span>
  </div>
);

const Skills = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const coreTech = [
    { name: "React", icon: <i className="devicon-react-original colored"></i>, color: "text-blue-400" },
    { name: "JavaScript", icon: <i className="devicon-javascript-plain colored"></i>, color: "text-yellow-400" },
    { name: "HTML5", icon: <i className="devicon-html5-plain colored"></i>, color: "text-orange-500" },
    { name: "CSS3", icon: <i className="devicon-css3-plain colored"></i>, color: "text-blue-500" },
    { name: "Node.js", icon: <i className="devicon-nodejs-plain colored"></i>, color: "text-green-500" },
    { name: "Express", icon: <i className="devicon-express-original"></i>, color: "text-slate-300" },
    { name: "MongoDB", icon: <i className="devicon-mongodb-plain colored"></i>, color: "text-green-600" },
    { name: "Firebase", icon: <i className="devicon-firebase-plain colored"></i>, color: "text-orange-400" },
    { name: "MySQL", icon: <i className="devicon-mysql-plain colored"></i>, color: "text-blue-400" },
  ];

  const profiles = [
    { name: "GitHub", handle: "@sahilahuja14", icon: <i className="devicon-github-original colored text-2xl"></i>, url: "https://github.com/sahilahuja14" },
    { name: "LeetCode", handle: "@sahilahuja194", icon: <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/leetcode/leetcode-original.svg" alt="LeetCode" className="w-8 h-8" />, url: "https://leetcode.com/u/sahilahuja194/" },
    { name: "HackerRank", handle: "@sahilahuja", icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.5 11.5h-3.5v3.5h-3v-3.5h-3.5v-3h3.5v-3.5h3v3.5h3.5v3z" style={{fill: '#00EA64'}}/></svg>, url: "https://www.hackerrank.com/sahilahuja" },
  ];

  const additionalSkills = [
    { title: "UX Design", exp: "1+ year", desc: "Creating intuitive user experiences with a focus on usability and aesthetics", icon: <Palette size={32} className="text-pink-400" /> },
    { title: "Graphic Designing", exp: "1+ year", desc: "Designing visual content for digital and print media", icon: <Pen size={32} className="text-cyan-400" /> },
    { title: "Content Writing", exp: "4+ years", desc: "Crafting compelling copy for websites, blogs, and marketing", icon: <BookOpen size={32} className="text-blue-400" /> },
    { title: "Event Management", exp: "2+ years", desc: "Organizing and coordinating successful events and workshops", icon: <Calendar size={32} className="text-orange-400" /> },
  ];

  return (
    <section id="skills" className="py-24 bg-[#020617] relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />

      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-slide-up' : 'opacity-0 translate-y-20'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Skills & Expertise</h2>
          <p className="text-slate-400">Technologies I work with and areas where I excel</p>
        </div>

        <div className={`grid lg:grid-cols-3 gap-8 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-slide-up' : 'opacity-0 translate-y-20'}`}>
          {/* Core Technologies */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-3xl p-12 hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-10 flex items-center">
              <span className="w-3 h-3 rounded-full bg-purple-500 mr-3"></span>
              Core Technologies
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
              {coreTech.map((tech) => (
                <TechLogo key={tech.name} icon={tech.icon} color={tech.color} />
              ))}
            </div>
          </div>

          {/* Coding Profiles */}
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-3"></span>
              Coding Profiles
            </h3>
            <div className="space-y-4">
              {profiles.map((profile) => (
                <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center p-5 rounded-xl hover:border-blue-400/70 hover:bg-blue-500/30 transition-all duration-300 cursor-pointer group block">
                  <div className="text-2xl">{profile.icon}</div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-white font-medium">{profile.name}</h4>
                    <p className="text-sm text-slate-500">{profile.handle}</p>
                  </div>
                  <ExternalLink size={16} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Skills */}
        <div className={`bg-gradient-to-br from-slate-900/50 to-purple-900/20 border-2 border-slate-500/30 rounded-3xl p-10 hover:border-purple-500/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-slide-up' : 'opacity-0 translate-y-20'}`}>
          <h3 className="text-2xl font-bold text-white mb-10 flex items-center">
            <span className="w-3 h-3 rounded-full bg-purple-500 mr-3"></span>
            Additional Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalSkills.map((skill, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 border border-slate-500/40 p-7 rounded-2xl hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-white/10 to-white/5">{skill.icon}</div>
                <h4 className="text-lg font-bold text-white mb-1">{skill.title}</h4>
                <p className="text-sm text-purple-400 font-medium mb-3">{skill.exp}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
