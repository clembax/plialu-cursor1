import { Link } from 'react-router';
import React from 'react';
import * as DS from '../components/ds/ds';

export function PolitiqueConfidentialitePage() {
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
              <h1 className={`${DS.H1_DETAIL} text-white`}>Politique de confidentialité</h1>
              <div className="prose prose-invert max-w-none text-white/[0.78] leading-[1.65]">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4 text-balance">1. Responsable du traitement</h2>
                <p>Le responsable du traitement des données à caractère personnel collectées sur ce site est la société PLIALU, représentée par Jean-Pierre Bax.</p>

                <h2 id="cookies" className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4 scroll-mt-28 text-balance">2. Données collectées et méthodes de collecte</h2>
                <p>Dans le cadre de notre relation B2B, nous collectons de manière loyale et transparente les données suivantes :</p>
                <p><strong>Données d'identification professionnelles :</strong> Nom, prénom, fonction, entreprise, adresse e-mail professionnelle, numéro de téléphone. Ces données sont collectées via le formulaire de contact.</p>
                <p><strong>Données techniques de navigation :</strong> Adresses IP, logs de connexion, statistiques de visite (via Google Analytics), teaser vidéo et images (via Cloudinary), vidéo longue thermolaquage (via Vimeo).</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4 text-balance">3. Finalités du traitement et base légale</h2>
                <p>La collecte de ces données s'appuie sur deux bases légales principales (Art. 6 du RGPD) :</p>
                <p><strong>L'exécution de mesures précontractuelles :</strong> Traitement de vos demandes de devis, analyse de plans techniques (fichiers joints), et réponses à vos interrogations commerciales ou industrielles.</p>
                <p><strong>L'intérêt légitime de PLIALU :</strong> Prospection B2B, suivi commercial, et amélioration de la sécurité et de la performance de notre infrastructure web.</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4 text-balance">4. Destinataires des données et Sous-traitants</h2>
                <p>Les données collectées sont strictement destinées au personnel habilité de PLIALU (direction, équipe commerciale, bureau d'études). Pour assurer le fonctionnement technique du site, nous nous appuyons sur des sous-traitants reconnus, en conformité avec le RGPD :</p>
                <p><strong>FormSubmit (formsubmit.co) :</strong> transmission des messages envoyés par les formulaires vers notre boîte de réception.</p>
                <p><strong>Cloudinary :</strong> Teaser vidéo et images.</p>
                <p><strong>Vimeo :</strong> Vidéo longue thermolaquage.</p>
                <p><strong>Google Analytics :</strong> Statistiques de visite.</p>
                <p><strong>Hostinger :</strong> Hébergement du site.</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4 text-balance">Transferts hors Union européenne</h2>
                <p>Les messages envoyés depuis nos formulaires transitent par le service FormSubmit, qui est exploité depuis les États-Unis, avant de nous être transmis par e-mail. Ce transfert est limité à ce qui est nécessaire pour vous répondre : les informations saisies dans le formulaire et, le cas échéant, la pièce jointe. FormSubmit n'est pas un lieu de stockage prévu pour conserver vos messages. Pour toute question sur ce transfert ou pour exercer vos droits, écrivez-nous à commercial@plialu.fr.</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4 text-balance">5. Durée de conservation</h2>
                <p>Conformément à la réglementation applicable en milieu B2B :</p>
                <p><strong>Données de prospects :</strong> Conservées 3 ans à compter de leur collecte ou du dernier contact émanant du prospect (ex: demande de devis non aboutie).</p>
                <p><strong>Données de clients :</strong> Conservées pendant toute la durée de la relation commerciale, puis archivées pendant 10 ans pour répondre à nos obligations comptables et légales.</p>
                <p>Ces durées s'appliquent aux messages reçus par e-mail.</p>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white mt-8 mb-4 text-balance">6. Vos droits (RGPD)</h2>
                <p>Vous disposez d'un contrôle total sur vos données personnelles. Vous pouvez exercer à tout moment :</p>
                <p>Un droit d'accès et de rectification.</p>
                <p>Un droit à l'effacement (droit à l'oubli).</p>
                <p>Un droit à la limitation du traitement et à la portabilité.</p>
                <p>Un droit d'opposition à la prospection commerciale.</p>
                <p>Pour exercer ces droits, adressez votre demande à commercial@plialu.fr. Une réponse vous sera apportée dans un délai maximal de 30 jours. En cas de litige, vous conservez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente (la CNIL en France, sur <a href="https://www.cnil.fr" className="text-[#E2FD48] hover:underline">www.cnil.fr</a>).</p>
              </div>
            </div>
          </section>
        </div>
  );
}
