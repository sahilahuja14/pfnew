import { Code2, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="relative">
    <div className="glass-theme-section footer-glass-panel py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">Sahil Ahuja</h3>
          <p className="text-white/60 text-sm">Data Scientist & ML Systems Builder</p>
        </div>
        
        <div className="flex items-center gap-4">
          <a aria-label="GitHub" href="https://github.com/sahilahuja14" target="_blank" rel="noopener noreferrer" className="footer-social-link"><Github size={18} /></a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/in/sahil-ahuja-b83b05212/" target="_blank" rel="noopener noreferrer" className="footer-social-link"><Linkedin size={18} /></a>
          <a aria-label="Codeforces" href="https://codeforces.com/profile/sahilahuja14" target="_blank" rel="noopener noreferrer" className="footer-social-link"><Code2 size={18} /></a>
          <a aria-label="Email" href="mailto:sahilahuja194@gmail.com" className="footer-social-link"><Mail size={18} /></a>
        </div>

        <p className="text-white/40 text-sm md:text-right">&copy; {new Date().getFullYear()} Sahil Ahuja.<br className="hidden md:block" /> All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
