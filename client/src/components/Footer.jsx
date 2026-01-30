import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => (
  <footer className="bg-[#020617] border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold text-white mb-2">Sahil Ahuja</h3>
        <p className="text-slate-500 text-sm">Full Stack Developer & UX Designer</p>
      </div>
      
      <div className="flex items-center space-x-6">
        <a href="https://github.com/sahilahuja14" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
        <a href="https://www.linkedin.com/in/sahil-ahuja-b83b05212?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B8gsqg84wTYuLy9QNmRfUCw%3D%3D" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
        <a href="https://twitter.com/sahilahuja" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
        <a href="mailto:sahilahuja194@gmail.com" className="text-slate-500 hover:text-white transition-colors"><Mail size={20} /></a>
      </div>

        <p className="text-slate-600 text-sm mt-6 md:mt-0">&copy; {new Date().getFullYear()} Sahil Ahuja. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
