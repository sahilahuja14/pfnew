import { ChevronDown, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    className="bg-white/10 border border-white/20 p-3 rounded-full hover:bg-purple-500/30 hover:scale-110 transition-all duration-300"
  >
    {icon}
  </a>
);

const Hero = ({ scrollToSection }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-[#030014]">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div ref={ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium text-sm mb-6 animate-fade-in">
          Hi, I'm
        </span>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
          Sahil <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F7AEA] via-[#A78BFA] to-[#6366F1]">Ahuja</span>
        </h1>
        <h2 className="text-2xl md:text-4xl text-slate-400 mb-8 font-light">
          Full Stack Developer <span className="text-slate-600 px-2">&</span> <span className="text-[#A78BFA]">UX Designer</span>
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-12 leading-relaxed">
          I craft beautiful digital experiences that combine clean code with intuitive design. 
          Passionate about building products that make a difference.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <button 
            onClick={() => scrollToSection('projects')}
            className="shine-button px-8 py-4 text-white rounded-full font-medium w-full sm:w-auto transform hover:-translate-y-1 shadow-lg shadow-purple-500/30"
          >
            View My Work
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 px-8 py-4 text-white rounded-full font-medium transition-all duration-300 w-full sm:w-auto border border-white/10"
          >
            Get In Touch
          </button>
        </div>

        <div className="mt-16 flex justify-center space-x-6">
          <SocialLink href="https://github.com/sahilahuja14" icon={<Github size={22} />} />
          <SocialLink href="https://www.linkedin.com/in/sahil-ahuja-b83b05212?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B8gsqg84wTYuLy9QNmRfUCw%3D%3D" icon={<Linkedin size={22} />} />
          <SocialLink href="https://twitter.com/_sahilahujaa_" icon={<Twitter size={22} />} />
          <SocialLink href="mailto:sahilahuja194@gmail.com" icon={<Mail size={22} />} />
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => scrollToSection('about')}>
          <ChevronDown className="text-white" size={30} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
