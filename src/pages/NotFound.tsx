import { Link } from 'react-router';
import * as DS from '../components/ds/ds';

export function NotFound() {
  return (
    <div className="animate-fade-up">
      <section className="relative bg-[#071318] pt-32 md:pt-40 pb-24 overflow-hidden min-h-screen flex flex-col justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full">
          <h1 className={`${DS.H1_DETAIL} text-white`}>Page introuvable</h1>
          <p className={`${DS.LEAD_DARK} mt-6`}>Cette adresse ne correspond à aucune page du site.</p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
            <Link to="/" className={DS.BTN_PRIMARY}>Accueil</Link>
            <Link to="/solutions" className={DS.BTN_SECONDARY_DARK}>Solutions</Link>
            <Link to="/contact" className={DS.BTN_SECONDARY_DARK}>Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
