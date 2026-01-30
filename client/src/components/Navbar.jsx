import { Menu, X } from 'lucide-react';

const Navbar = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen }) => (
  <nav className="fixed top-0 w-full z-50 bg-[#030014]/80 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex-shrink-0 cursor-pointer group" onClick={() => scrollToSection('home')}>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            SA
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`transition-all duration-300 px-3 py-2 text-sm font-medium hover:text-purple-400 ${
                  activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-slate-300'
                }`}
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="shine-button px-6 py-2.5 rounded-full text-sm font-medium text-white transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    <div className={`md:hidden absolute w-full bg-[#030014]/95 border-t border-white/10 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
      <div className="px-4 pt-2 pb-6 space-y-2">
        {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="text-gray-300 hover:text-purple-400 block px-3 py-3 text-base font-medium w-full text-left rounded-lg hover:bg-white/5"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  </nav>
);

export default Navbar;
