import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = ['About', 'Skills', 'Experience', 'Contact'];

const Navbar = ({ activeSection, scrollToSection, isMenuOpen, setIsMenuOpen, theme, toggleTheme }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        // Show if scrolling up or at the very top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide if scrolling down past a small threshold
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu if it was open
      }

      setLastScrollY(currentScrollY);

      // Show navbar automatically when scrolling stops for 800ms
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, setIsMenuOpen]);

  return (
    <nav
      className={`portfolio-nav fixed left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
    >
      <div className="mx-auto flex w-full max-w-[872px] items-center justify-center px-4 gap-3">
        <div className="nav-glass-shell hidden h-12 w-full items-center justify-around md:flex">
          {navItems.map((item) => {
            const section = item.toLowerCase();
            return (
              <button
                key={item}
                type="button"
                onClick={() => scrollToSection(section)}
                className={`nav-glass-link ${activeSection === section ? 'nav-glass-link--active' : ''}`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <button
          onClick={toggleTheme}
          className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
          aria-label="Toggle Theme"
        >
          {theme === 'red' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="nav-glass-shell flex h-12 w-full items-center justify-between px-4 md:hidden">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="text-base font-semibold text-white"
          >
            Sahil Ahuja
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'red' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-trigger"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-nav-panel mx-4 mt-3 md:hidden transition-all duration-300 ${isMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
          }`}
      >
        {navItems.map((item) => {
          const section = item.toLowerCase();
          return (
            <button
              key={item}
              type="button"
              onClick={() => scrollToSection(section)}
              className={`mobile-nav-link ${activeSection === section ? 'mobile-nav-link--active' : ''}`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
