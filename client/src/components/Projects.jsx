import { Github, ExternalLink } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Projects = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const projects = [
    {
      title: "Drone Detect",
      desc: "An AI application that utilizes computer vision and YOLOV8 model to detect and track drones in real-time using webcam input with special safety console and alert system.",
      tags: ["React", "OpenCV", "Django", "Rest API"],
      image: "/assets/drone.png",
      codeUrl: "https://github.com/sahilahuja14/Drone-Detect-app.git",
    },
    {
      title: "Employee Management System",
      desc: "Full-stack application for managing employee data, including CRUD operations, role management, and department organization with real-time updates.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      image: "/assets/emse.png",
      codeUrl: "https://github.com/sahilahuja14",
    },
    {
      title: "Interview Creation Portal",
      desc: "A web-based platform that allows users to create, manage, and take technical interviews with coding challenges and real-time code execution features.",
      tags: ["React", "HTML5", "CSS3", "PostgeSQL"],
      image: "/assets/int.png",
      codeUrl: "https://github.com/sahilahuja14/interview-portal.git",
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#030014]">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 animate-slide-up' : 'opacity-0 translate-y-20'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-slate-400">A selection of my recent work and personal projects</p>
        </div>

        <div className="grid gap-10">
          {projects.map((project, idx) => (
            <div key={idx} className="group relative bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row h-full">
                {/* Image Section */}
                <div className="lg:w-2/5 relative overflow-hidden h-64 lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1E] to-transparent z-10 lg:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] to-transparent z-10 lg:hidden" />
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                  />
                  {/* Overlay for large screens */}
                  <div className="hidden lg:block absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 px-3 py-1 rounded-full text-sm text-slate-300 font-medium hover:border-purple-500/50 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-medium hover:text-purple-400 transition-colors w-fit group/btn">
                    <Github size={20} className="mr-2" />
                    View Code
                    <ExternalLink size={16} className="ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
