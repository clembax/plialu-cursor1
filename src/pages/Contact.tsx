import React from 'react';
import { Link } from 'react-router';
import { Clock, Copy, Mail, MapPin, Phone } from 'lucide-react';
import * as DS from '../components/ds/ds';
import ConsentEmbed from '../components/ConsentEmbed';
import { FORMSUBMIT_URL } from '../config/forms';

export function ContactPage(props: {
  goContactForm: () => void;
  handleCopy: (text: string, key: string) => void;
  copiedKey: string | null;
  contactPrefill: { intention?: string; domaine?: string };
  contactIntention: string;
  setContactIntention: React.Dispatch<React.SetStateAction<string>>;
  isCandidature: boolean;
  contactSending: boolean;
  onContactSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  attachmentTooLarge: boolean;
  setAttachmentTooLarge: React.Dispatch<React.SetStateAction<boolean>>;
  filesTooLarge: (files: FileList | null | undefined) => boolean;
}) {
  const { goContactForm, handleCopy, copiedKey, contactPrefill, contactIntention, setContactIntention, isCandidature, contactSending, onContactSubmit, attachmentTooLarge, setAttachmentTooLarge, filesTooLarge } = props;
  return (
        <div className="animate-fade-up">
          {/* Hero Contact (White background, Dark header logic) */}
          <section className={`bg-white ${DS.HERO_TOP} pb-20`}>
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-4xl">
                <div className="mb-16">
                <span className={`block mb-4 ${DS.EYEBROW_LIGHT}`}>
                  ÉCHANGER SUR VOTRE PROJET
                </span>
                <h1 className={`${DS.H1} text-[#0E2A33]`}>
                  Contact
                </h1>
                <p className={`${DS.LEAD_LIGHT} mt-6`}>
                  Pour une étude technique, un chiffrage ou une demande de faisabilité, nos équipes vous répondent rapidement avec une approche orientée contraintes chantier (plans DXF/DWG, métrés, finitions, délais).
                </p>
                </div>
                <button type="button" onClick={goContactForm} className={DS.BTN_SECONDARY_LIGHT}>Envoyer une demande</button>
              </div>
            </div>
          </section>

          {/* Formulaire */}
          <section id="contact-form" className="bg-[#F3F6F7] py-24 md:py-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="mb-12 text-center">
                <span className={`block mb-4 ${DS.EYEBROW_LIGHT}`}>CONTACT</span>
                <h2 className={`${DS.H2} text-[#0E2A33]`}>Votre demande</h2>
                <p className={`${DS.LEAD_LIGHT} mt-6 mx-auto`}>Devis, question technique ou candidature&nbsp;: nos équipes vous répondent sous 48 h.</p>
              </div>
              <div className="bg-white rounded-[20px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-[#0E2A33]/[0.12]">
                  <form
                    action={FORMSUBMIT_URL}
                    method="POST"
                    encType="multipart/form-data"
                    acceptCharset="UTF-8"
                    className="space-y-6"
                    onSubmit={onContactSubmit}
                  >
                    <input type="hidden" name="_next" value="https://plialu.fr/merci" />
                    <input type="hidden" name="_subject" value="Nouvelle demande de contact plialu.fr" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />

                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">Intention de contact <span className="text-red-500">*</span></label>
                      <select
                        name="intention"
                        value={contactIntention}
                        onChange={(e) => setContactIntention(e.target.value)}
                        required
                        className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                      >
                        <option value="">Sélectionner une intention</option>
                        <option value="Demander un devis">Demander un devis</option>
                        <option value="Question / Info produit">Question / Info produit</option>
                        <option value="Postuler chez PLIALU">Postuler chez PLIALU</option>
                      </select>
                    </div>

                    {!isCandidature && (
                    <div>
                      <label htmlFor="contact-domaine" className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">Domaine concerné</label>
                      <select
                        id="contact-domaine"
                        key={`domaine-${contactPrefill.domaine ?? ''}`}
                        name="domaine"
                        defaultValue={contactPrefill.domaine ?? ''}
                        className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                      >
                        <option value="">Non précisé</option>
                        <option value="Enduit mince sur isolant">Enduit mince sur isolant</option>
                        <option value="Bardage, cassettes & clins">Bardage, cassettes &amp; clins</option>
                        <option value="Ravalement de façade">Ravalement de façade</option>
                        <option value="Précadres, portes ou fenêtres">Précadres, portes ou fenêtres</option>
                        <option value="Étanchéité">Étanchéité</option>
                        <option value="MOB, FOB & murs-rideaux">MOB, FOB &amp; murs-rideaux</option>
                        <option value="Tôles prélaquées">Tôles prélaquées</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                    )}

                    {/* Ligne 1 : Prénom / Nom */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">Prénom <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="firstname"
                          required
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="Jean"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">Nom <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          name="lastname"
                          required
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="Dupont"
                        />
                      </div>
                    </div>

                    {/* Ligne 2 : Email / Téléphone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">Email professionnel <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="contact@entreprise.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                          placeholder="06 00 00 00 00"
                        />
                      </div>
                    </div>

                    {/* Entreprise */}
                    {!isCandidature && (
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">Entreprise / Cabinet</label>
                      <input
                        type="text"
                        name="company"
                        className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33]"
                        placeholder="Nom de votre société"
                      />
                    </div>
                    )}

                    {/* Description du projet */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[#0E2A33]/[0.62]">{isCandidature ? 'Votre candidature' : 'Description du projet'}</label>
                      <textarea
                        name="message"
                        rows={4}
                        className="w-full p-3 bg-[#F3F6F7] border border-[#0E2A33]/20 rounded-xl focus:border-[#0E2A33] focus:ring-2 focus:ring-[#0E2A33]/40 outline-none text-[#0E2A33] resize-none"
                        placeholder={isCandidature ? 'Présentez votre profil et le poste qui vous intéresse…' : 'Détaillez vos besoins techniques...'}
                      ></textarea>
                    </div>

                    <div className="p-4 border-2 border-dashed border-[#0E2A33]/20 rounded-xl bg-[#F3F6F7]">
                      <label htmlFor="contact-attachment" className="block text-sm font-bold mb-2 text-[#0E2A33]">
                        <span className="text-[#0E2A33]">Joindre vos documents</span> (PDF, DWG, DXF, JPG, etc.) 10 Mo maximum
                      </label>
                      <input
                        id="contact-attachment"
                        type="file"
                        name="attachment"
                        multiple
                        accept=".pdf,.dwg,.dxf,.jpg,.jpeg"
                        onChange={(e) => setAttachmentTooLarge(filesTooLarge(e.target.files))}
                        className="block w-full text-sm text-[#0E2A33]/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E2FD48] file:text-[#0E2A33] hover:file:bg-[#d4ed3f] cursor-pointer"
                      />
                      {attachmentTooLarge && (
                        <p role="alert" className="mt-2 text-sm text-red-600">
                          Fichier trop lourd (10 Mo maximum). Envoyez vos plans à commercial@plialu.fr.
                        </p>
                      )}
                    </div>

                    {/* Bouton submit */}
                    <button
                      type="submit"
                      disabled={contactSending}
                      className={`${DS.BTN_PRIMARY} w-full disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0`}
                    >
                      {contactSending ? 'Envoi en cours…' : 'Envoyer ma demande'}
                    </button>
                    <p className="text-xs leading-relaxed text-[#0E2A33]/[0.62]">
                      Vos informations servent uniquement à traiter votre demande. Elles sont transmises par e-mail via notre prestataire FormSubmit et ne sont jamais cédées. Pour en savoir plus et exercer vos droits, consultez notre{' '}
                      <Link
                        to="/politique-confidentialite"
                        className="underline underline-offset-2 text-[#0E2A33]/75 hover:text-[#0E2A33]"
                      >
                        politique de confidentialité
                      </Link>
                      .
                    </p>
                  </form>
              </div>
            </div>
          </section>

          {/* Coordonnées & localisation */}
          <section className="bg-white py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-16">
                <span className={`block mb-4 ${DS.EYEBROW_LIGHT}`}>COORDONNÉES</span>
                <h2 className={`${DS.H2} text-[#0E2A33]`}>Où nous trouver&nbsp;?</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
                <div className="space-y-8">
                    {/* Phone */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#0E2A33]/[0.12] flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <Phone aria-hidden="true" size={20} />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-[#0E2A33]/[0.62] uppercase tracking-widest mb-1">Téléphone</span>
                        <div className="flex items-center gap-3">
                          <a href="tel:0478089370" className="text-lg font-bold text-[#0E2A33]">04 78 08 93 70</a>
                          <button onClick={() => handleCopy("04 78 08 93 70", "tel")} className="p-1.5 rounded-md hover:bg-black/5 transition-colors relative">
                            <Copy aria-hidden="true" size={16} className="text-[#0E2A33]/[0.62]" />
                            {copiedKey === 'tel' && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#0E2A33] text-white px-2 py-1 rounded shadow-sm">Copié</span>}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#0E2A33]/[0.12] flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <Mail aria-hidden="true" size={20} />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-[#0E2A33]/[0.62] uppercase tracking-widest mb-1">E-mail</span>
                        <div className="flex items-center gap-3">
                          <a href="mailto:commercial@plialu.fr" className="text-lg font-bold text-[#0E2A33]">commercial@plialu.fr</a>
                          <button onClick={() => handleCopy("commercial@plialu.fr", "mail")} className="p-1.5 rounded-md hover:bg-black/5 transition-colors relative">
                            <Copy aria-hidden="true" size={16} className="text-[#0E2A33]/[0.62]" />
                            {copiedKey === 'mail' && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#0E2A33] text-white px-2 py-1 rounded shadow-sm">Copié</span>}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#0E2A33]/[0.12] flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <MapPin aria-hidden="true" size={20} />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-[#0E2A33]/[0.62] uppercase tracking-widest mb-1">Siège & Atelier</span>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <p className="text-lg font-bold text-[#0E2A33] leading-tight max-w-xs">Technoparc Saône Vallée Ouest, 150 rue Copernic, 01390 Civrieux</p>
                          <button onClick={() => handleCopy("Technoparc Saône Vallée Ouest, 150 rue Copernic, 01390 Civrieux", "addr")} className="p-1.5 rounded-md hover:bg-black/5 transition-colors relative">
                            <Copy aria-hidden="true" size={16} className="text-[#0E2A33]/[0.62]" />
                            {copiedKey === 'addr' && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#0E2A33] text-white px-2 py-1 rounded shadow-sm">Copié</span>}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Horaires */}
                    <div className="flex items-center gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#0E2A33]/[0.12] flex items-center justify-center text-[#0E2A33]/40 group-hover:text-[#0E2A33] group-hover:border-[#0E2A33]/20 transition-all">
                        <Clock aria-hidden="true" size={20} />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] font-bold text-[#0E2A33]/[0.62] uppercase tracking-widest mb-1">Horaires d'ouverture</span>
                        <p className="text-lg font-bold text-[#0E2A33] leading-tight max-w-xs">Du lundi au jeudi de 7h30 à 16h30, le vendredi de 7h30 à 12h.</p>
                      </div>
                    </div>
                </div>
                <div className="relative w-full h-[320px] md:h-[440px] rounded-[20px] overflow-hidden border border-[#0E2A33]/[0.12] shadow-sm bg-white">
                  <ConsentEmbed kind="maps" tone="light">
                      <iframe
                        src="https://www.google.com/maps?q=Plialu%2C%20Technoparc%20Sa%C3%B4ne%20Vall%C3%A9e%2C%20150%20Route%20de%20Copernic%2C%2001390%20Civrieux&z=9&output=embed"
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      ></iframe>
                  </ConsentEmbed>
                </div>
              </div>
            </div>
          </section>
        </div>
  );
}
