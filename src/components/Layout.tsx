import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { ROUTE_PATHS, WHATSAPP_URL } from '@/lib/index';

const navLinks = [
  { path: ROUTE_PATHS.HOME, label: 'Home', labelAr: 'الرئيسية' },
  { path: ROUTE_PATHS.SERVICES, label: 'Services', labelAr: 'الخدمات' },
  { path: ROUTE_PATHS.TRANSFORMATIONS, label: 'Transformations', labelAr: 'التحولات' },
  { path: ROUTE_PATHS.CLASSES, label: 'Classes', labelAr: 'الكلاسات' },
  { path: ROUTE_PATHS.BOOKING, label: 'Book Now', labelAr: 'احجز دلوقتي' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowFloatingCTA(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(0,0,0,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <NavLink to={ROUTE_PATHS.HOME} className="flex flex-col leading-tight">
            <span
              className="font-bold text-lg md:text-xl tracking-widest uppercase"
              style={{ fontFamily: 'Oswald, sans-serif', color: '#D4AF37', letterSpacing: '0.15em' }}
            >
              DR. ASHRAF EL ABD
            </span>
            <span className="text-xs text-gray-400 tracking-wider">د. أشرف العبد • IFBB Judge • Elite Coach</span>
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 4).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wider uppercase transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
                  }`
                }
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to={ROUTE_PATHS.BOOKING}
              className="px-5 py-2.5 text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: 'Oswald, sans-serif',
                background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                color: '#000',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}
            >
              Book Now / احجز
            </NavLink>
          </nav>

          {/* MOBILE HAMBURGER */}
          <button
            className="lg:hidden p-2 text-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
              style={{ backgroundColor: 'rgba(0,0,0,0.98)', borderTop: '1px solid rgba(212,175,55,0.2)' }}
            >
              <nav className="flex flex-col py-4 px-6 gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-base font-medium tracking-wider uppercase py-2 border-b border-gray-800 ${
                        isActive ? 'text-yellow-400' : 'text-gray-300'
                      }`
                    }
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    <span>{link.label}</span>
                    <span className="ml-3 text-gray-500 text-sm">{link.labelAr}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-0">{children}</main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div
                className="font-bold text-xl mb-2"
                style={{ fontFamily: 'Oswald, sans-serif', color: '#D4AF37' }}
              >
                DR. ASHRAF EL ABD
              </div>
              <div className="text-gray-400 text-sm mb-4">د. أشرف العبد</div>
              <p className="text-gray-500 text-sm leading-relaxed">
                International IFBB Judge · University Professor · Elite Fitness Coach<br />
                500+ Real Transformations Worldwide
              </p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-4 uppercase tracking-wider text-sm"
                style={{ fontFamily: 'Oswald, sans-serif' }}>Quick Links</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                  >
                    {link.label} · {link.labelAr}
                  </NavLink>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-4 uppercase tracking-wider text-sm"
                style={{ fontFamily: 'Oswald, sans-serif' }}>Contact / تواصل</h4>
              <div className="flex flex-col gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm transition-colors"
                >
                  <Phone size={14} />
                  WhatsApp Direct
                </a>
                <div className="text-gray-500 text-xs mt-2 leading-relaxed">
                  Egypt · Saudi Arabia · UAE · International<br />
                  مصر · السعودية · الإمارات · دولي
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-gray-600 text-xs">
              © 2026 Dr. Ashraf El Abd. All Rights Reserved.
            </p>
            <p className="text-gray-600 text-xs">
              جميع الحقوق محفوظة · د. أشرف العبد
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <AnimatePresence>
        {showFloatingCTA && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
          >
            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: '#25D366',
                color: '#fff',
                fontFamily: 'Oswald, sans-serif',
                boxShadow: '0 0 20px rgba(37,211,102,0.4)',
              }}
              title="WhatsApp Dr. Ashraf"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-sm font-bold hidden sm:inline">ابدأ دلوقتي</span>
            </a>

            {/* Pulsing Gold CTA */}
            <NavLink
              to={ROUTE_PATHS.BOOKING}
              className="flex items-center gap-2 px-5 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                color: '#000',
                fontFamily: 'Oswald, sans-serif',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                boxShadow: '0 0 25px rgba(212,175,55,0.5)',
              }}
            >
              Book Now
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
