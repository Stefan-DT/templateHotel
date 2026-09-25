"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaCompass } from "@react-icons/all-files/fa/FaCompass";

const ContactSection = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      checkIn: "",
      checkOut: "",
      guests: "2",
      message: "",
   });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      setTimeout(() => {
         setIsSubmitting(false);
         toast.success("Solicitarea ta a fost trimisă cu succes! Te vom contacta în cel mai scurt timp.");
         setFormData({
            name: "",
            phone: "",
            email: "",
            checkIn: "",
            checkOut: "",
            guests: "2",
            message: "",
         });
      }, 600);
   };

   return (
      <section id="contact" className="py-20 md:py-28 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
               
               {/* Left Column: Direct Info & Attractions */}
               <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider w-max">
                     <FaCompass className="text-xs" /> Contact & Localizare
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                     Suntem aici pentru tine. Rezervă sejurul tău direct!
                  </h2>

                  <p className="text-neutral-600 font-light leading-relaxed">
                     Ai întrebări sau dorești o ofertă personalizată pentru un grup sau eveniment? Sună-ne sau trimite-ne un mesaj pe WhatsApp pentru răspuns rapid.
                  </p>

                  {/* Direct Contact Cards */}
                  <div className="space-y-3 pt-2">
                     <a
                        href="tel:+40740123456"
                        className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-rose-50/50 border border-neutral-200 transition group"
                     >
                        <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center text-lg flex-shrink-0">
                           <FaPhoneAlt />
                        </div>
                        <div>
                           <div className="text-xs text-neutral-500 font-medium">Telefon Rezervări</div>
                           <div className="text-base font-bold text-neutral-900 group-hover:text-rose-500 transition">
                              +40 740 123 456
                           </div>
                        </div>
                     </a>

                     <a
                        href="https://wa.me/40740123456"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 border border-emerald-200 transition group"
                     >
                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl flex-shrink-0">
                           <FaWhatsapp />
                        </div>
                        <div>
                           <div className="text-xs text-emerald-700 font-medium">Scrie-ne pe WhatsApp</div>
                           <div className="text-base font-bold text-emerald-950">
                              Chat direct WhatsApp (Răspuns rapid)
                           </div>
                        </div>
                     </a>

                     <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                        <div className="w-12 h-12 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-lg flex-shrink-0">
                           <FaMapMarkerAlt />
                        </div>
                        <div>
                           <div className="text-xs text-neutral-500 font-medium">Adresă Pensiune</div>
                           <div className="text-sm font-semibold text-neutral-900">
                              Str. Pădurii nr. 14, Zona Montană, România
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                        <div className="w-12 h-12 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-lg flex-shrink-0">
                           <FaClock />
                        </div>
                        <div>
                           <div className="text-xs text-neutral-500 font-medium">Ore Check-in / Check-out</div>
                           <div className="text-sm font-semibold text-neutral-900">
                              Check-in: de la 14:00 • Check-out: până la 11:00
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Nearby Attractions */}
                  <div className="mt-4 p-5 rounded-2xl bg-rose-50/50 border border-rose-100">
                     <h4 className="font-bold text-neutral-900 text-sm mb-3">Obiective turistice în apropiere:</h4>
                     <ul className="text-xs text-neutral-600 space-y-2">
                        <li className="flex items-center gap-2">
                           <span className="text-rose-500 font-bold">•</span> Cheile și Peștera din zonă (10 min cu mașina)
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-rose-500 font-bold">•</span> Castelul / Cetatea medievală (20 min)
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-rose-500 font-bold">•</span> Trasee marcate montane (plecare direct din curte)
                        </li>
                        <li className="flex items-center gap-2">
                           <span className="text-rose-500 font-bold">•</span> Pârtie de schi și săniuș (25 min)
                        </li>
                     </ul>
                  </div>
               </div>

               {/* Right Column: Direct Booking / Inquiry Form */}
               <div className="lg:col-span-7">
                  <div className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm">
                     <h3 className="text-2xl font-bold text-neutral-900">
                        Trimite o solicitare de rezervare directă
                     </h3>
                     <p className="mt-2 text-sm text-neutral-600 font-light">
                        Fără comisioane intermediare. Verificăm disponibilitatea și te contactăm telefonic sau pe email în maxim 2 ore.
                     </p>

                     <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div>
                              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                                 Nume și Prenume *
                              </label>
                              <input
                                 type="text"
                                 required
                                 placeholder="ex: Ion Popescu"
                                 value={formData.name}
                                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                 className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition"
                              />
                           </div>

                           <div>
                              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                                 Număr de Telefon *
                              </label>
                              <input
                                 type="tel"
                                 required
                                 placeholder="07xxxxxxxx"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                 className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition"
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                           <div>
                              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                                 Data Sosire (Check-in)
                              </label>
                              <input
                                 type="date"
                                 value={formData.checkIn}
                                 onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                 className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition"
                              />
                           </div>

                           <div>
                              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                                 Data Plecare (Check-out)
                              </label>
                              <input
                                 type="date"
                                 value={formData.checkOut}
                                 onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                 className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition"
                              />
                           </div>

                           <div>
                              <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                                 Număr Persoane
                              </label>
                              <select
                                 value={formData.guests}
                                 onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                 className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition"
                              >
                                 <option value="1">1 Oaspete</option>
                                 <option value="2">2 Oaspeți</option>
                                 <option value="3">3 Oaspeți</option>
                                 <option value="4">4 Oaspeți</option>
                                 <option value="5+">5+ Oaspeți (Grup)</option>
                              </select>
                           </div>
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Adresă de Email
                           </label>
                           <input
                              type="email"
                              placeholder="adresa.ta@email.ro"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition"
                           />
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Mesaj sau Preferințe speciale (opțional)
                           </label>
                           <textarea
                              id="contact-message"
                              rows={4}
                              placeholder="Specificați dacă doriți ciubărul încălzit, pat suplimentar pentru copil sau mic dejun inclus..."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition resize-none"
                           />
                        </div>

                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="w-full bg-rose-500 hover:bg-rose-600 active:scale-98 text-white font-bold py-4 px-8 rounded-xl transition shadow-lg hover:shadow-rose-500/30 text-base"
                        >
                           {isSubmitting ? "Se trimite solicitarea..." : "Trimite Solicitarea de Rezervare Directă"}
                        </button>
                     </form>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
};

export default ContactSection;
