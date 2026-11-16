import { Link } from 'react-router';
import React from 'react';
import * as DS from '../components/ds/ds';

export function MentionsLegalesPage() {
  return (
        <div className="animate-fade-up">
          <section className="relative bg-[#071318] pt-32 md:pt-40 pb-24 overflow-hidden min-h-screen flex flex-col justify-center">
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0e2a33]/40 to-[#071318]"></div>
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 w-full">
              <Link to="/"
                
                className={`${DS.ACTION_DARK} mb-14`}
              >
                &larr; RETOUR À L'ACCUEIL
              </Link>
              <h1 className={`${DS.H1_DETAIL} text-white`}>Mentions légales</h1>
              <div className="prose prose-invert max-w-none text-white/[0.78] leading-[1.65]">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4">1. Éditeur du site</h2>
                <p>Le site www.plialu.fr est édité par la société PLIALU, spécialisée dans le façonnage métallique industriel.</p>
                <p><strong>Forme juridique :</strong> Société par Actions Simplifiée Unipersonnelle (S.A.S.U.)</p>
                <p><strong>Capital social :</strong> 50 000 €</p>
                <p><strong>SIRET :</strong> 498 363 001 00039</p>
                <p><strong>Siège social :</strong> Technoparc Saône Vallée Ouest, 150, Route Copernic, 01390 Civrieux, France</p>
                <p><strong>Contact :</strong> commercial@plialu.fr | 04 78 08 93 70</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4">2. Directeur de la publication</h2>
                <p>Le Directeur de la publication est Jean-Pierre Bax, en sa qualité de dirigeant de la société PLIALU.</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4">3. Hébergement</h2>
                <p>L'hébergement du site est assuré par Hostinger.</p>
                <p><strong>Adresse de l'hébergeur :</strong> Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Chypre.</p>
                <p><strong>Contact de l'hébergeur :</strong> <a href="https://www.hostinger.fr/contact" className="text-[#E2FD48] hover:underline">https://www.hostinger.fr/contact</a></p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4">4. Propriété intellectuelle</h2>
                <p>L'ensemble des éléments constituant ce site (textes, graphismes, logiciels, photographies, vidéos hébergées via Vimeo, images diffusées via Cloudinary, logos, marques) constitue une œuvre de l'esprit protégée par les dispositions du Code de la Propriété Intellectuelle. Toute représentation, reproduction, modification ou exploitation commerciale, totale ou partielle, sans l'autorisation expresse et préalable de PLIALU, est strictement interdite et s'apparente à un délit de contrefaçon.</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4">5. Limitation de responsabilité</h2>
                <p>PLIALU s'efforce de fournir des informations fiables et actualisées sur ses capacités industrielles et techniques. Toutefois, l'entreprise ne saurait garantir l'exactitude absolue ni l'exhaustivité des données publiées. Dans un contexte B2B, il appartient à l'utilisateur (architecte, bureau d'études, acheteur technique) de valider la faisabilité technique de son projet en contactant directement nos équipes. PLIALU décline toute responsabilité quant aux dommages directs ou indirects pouvant résulter de l'accès au site ou de l'utilisation des informations qui y figurent.</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4">6. Liens hypertextes</h2>
                <p>Le site peut contenir des liens vers des sites partenaires ou des ressources externes. PLIALU n'exerçant aucun contrôle sur ces plateformes tierces, l'entreprise décline toute responsabilité quant à leur contenu, leur disponibilité ou leurs pratiques en matière de protection des données.</p>
              </div>
            </div>
          </section>
        </div>
  );
}
