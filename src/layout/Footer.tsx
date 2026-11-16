import { Link } from 'react-router';
import { openCookieSettings } from '../consent';
import * as DS from '../components/ds/ds';

export function Footer() {
  return (
    <>
      {/* Premium Footer */}
      <footer className="pt-16 pb-10 section--dark" style={{ background: 'linear-gradient(to bottom, #071318 0%, #0b1e26 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 mb-12">
            {/* Column 1 -- Brand */}
            <div className="space-y-5">
              <Link to="/" className="text-2xl font-black tracking-tighter text-white uppercase block">PLIALU.</Link>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">PME industrielle : solutions métalliques sur-mesure pour l'enveloppe du bâtiment</p>
              <div className="flex items-center gap-4 pt-3">
                <a href="https://www.linkedin.com/company/plialu" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E2FD48] hover:border-[#E2FD48] transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>

            {/* Column 2 -- Products & Services */}
            <div>
              <h3 className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-5">Navigation</h3>
              <ul className="space-y-4">
                {['Expertises'].map((link) => (
                  <li key={link}>
                    <Link
                      to="/expertises"
                      className={`${DS.LINK_DARK} text-left`}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/solutions" className={`${DS.LINK_DARK} text-left`}>Solutions</Link>
                </li>
              </ul>
            </div>

            {/* Column 3 -- Company */}
            <div>
              <h3 className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-5">Société</h3>
              <ul className="space-y-4">
                {['À propos', 'Portfolio', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link
                      to={link === 'À propos' ? '/a-propos' : link === 'Portfolio' ? '/portfolio' : '/contact'}
                      className={`${DS.LINK_DARK} text-left`}
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom -- Legal Links */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-5">
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">© 2025 PLIALU SAS. TOUS DROITS RÉSERVÉS</span>
            <div className="flex gap-6 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] flex-wrap justify-center md:justify-end">
              <Link to="/mentions-legales" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-[#E2FD48] transition-colors duration-150 text-left">Mentions légales</Link>
              <Link to="/politique-confidentialite" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-[#E2FD48] transition-colors duration-150 text-left">Politique de confidentialité</Link>
              <button onClick={openCookieSettings} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-[#E2FD48] transition-colors duration-150 text-left">Gérer les cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
