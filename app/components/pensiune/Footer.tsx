"use client";

import Link from "next/link";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaShieldAlt } from "@react-icons/all-files/fa/FaShieldAlt";

const Footer = () => {
   return (
      <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
               
               {/* Col 1: About */}
               <div>
                  <div className="flex items-center gap-2">
                     <span className="text-2xl">🌲</span>
                     <span className="text-xl font-extrabold text-white tracking-tight">
                        Pensiunea <span className="text-rose-500">Noastră</span>
                     </span>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                     Refugiul tău montan cu ciubăr încălzit, bucate tradiționale și ospitalitate caldă. Un loc creat pentru liniște, aer curat și amintiri prețioase.
                  </p>
               </div>

               {/* Col 2: Navigation Links */}
               <div>
                  <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Navigare Rapidă</h4>
                  <ul className="space-y-2 text-xs sm:text-sm">
                     <li>
                        <a href="#despre" className="hover:text-rose-400 transition">Povestea Noastră</a>
                     </li>
                     <li>
                        <a href="#camere" className="hover:text-rose-400 transition">Camere & Suite</a>
                     </li>
                     <li>
                        <a href="#facilitati" className="hover:text-rose-400 transition">Ciubăr & Facilități</a>
                     </li>
                     <li>
                        <a href="#gastronomie" className="hover:text-rose-400 transition">Gastronomie Tradițională</a>
                     </li>
                     <li>
                        <a href="#galerie" className="hover:text-rose-400 transition">Galerie Foto</a>
                     </li>
                     <li>
                        <a href="#contact" className="hover:text-rose-400 transition">Contact & Rezervări</a>
                     </li>
                  </ul>
               </div>

               {/* Col 3: Contact */}
               <div>
                  <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contact Direct</h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
                     <li className="flex items-center gap-2.5">
                        <FaPhoneAlt className="text-rose-500 flex-shrink-0" />
                        <a href="tel:+40740123456" className="hover:text-white transition">
                           +40 740 123 456
                        </a>
                     </li>
                     <li className="flex items-center gap-2.5">
                        <FaEnvelope className="text-rose-500 flex-shrink-0" />
                        <a href="mailto:contact@pensiuneanoastra.ro" className="hover:text-white transition">
                           contact@pensiuneanoastra.ro
                        </a>
                     </li>
                     <li className="flex items-start gap-2.5">
                        <FaMapMarkerAlt className="text-rose-500 flex-shrink-0 mt-1" />
                        <span>Str. Pădurii nr. 14, Județul Brașov / Argeș, România</span>
                     </li>
                  </ul>
               </div>

               {/* Col 4: Owner Area / Admin */}
               <div>
                  <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Administrare</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-4">
                     Dorești să gestionezi rezervările primite, camerele sau tarifele pensiunii?
                  </p>
                  <Link
                     href="/admin"
                     className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-rose-500 text-white text-xs font-semibold transition border border-neutral-700 hover:border-rose-500 shadow-sm"
                  >
                     <FaShieldAlt className="text-sm" />
                     <span>Consolă Administrator</span>
                  </Link>
               </div>

            </div>

            <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
               <div>
                  © {new Date().getFullYear()} Pensiunea Noastră. Toate drepturile rezervate.
               </div>
               <div className="flex items-center gap-6">
                  <a href="#despre" className="hover:text-neutral-400 transition">Termeni & Condiții</a>
                  <a href="#despre" className="hover:text-neutral-400 transition">Politică de Confidențialitate</a>
                  <Link href="/admin" className="text-neutral-400 hover:text-rose-400 transition">Panou Proprietar</Link>
               </div>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
