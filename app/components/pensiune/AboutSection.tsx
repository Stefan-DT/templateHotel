"use client";

import Image from "next/image";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";

const AboutSection = () => {
   return (
      <section id="despre" className="py-20 md:py-28 bg-neutral-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
               
               {/* Left Column: Story & Highlights */}
               <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider w-max">
                     <FaHeart className="text-xs" /> Povestea Noastră
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                     Oază de liniște și ospitalitate caldă, la marginea pădurii
                  </h2>

                  <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
                     Născută din dragostea pentru natură și tradițiile românești autentice, pensiunea noastră este locul unde timpul încetinește. Aici te trezești cu ciripit de păsări, miroase a brad și a pâine caldă coaptă pe vatră, iar serile se petrec la căldura focului sau relaxându-te în ciubăr.
                  </p>

                  <p className="text-neutral-600 leading-relaxed font-light">
                     Am îmbinat arhitectura tradițională din lemn și piatră de râu cu tot confortul modern de care ai nevoie: paturi confortabile cu saltele premium, băi moderne, internet rapid și un salon primitor pentru momente de neprețuit alături de cei dragi.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                     <div className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm border border-neutral-200/70 hover:border-rose-300 transition">
                        <FaCheckCircle className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-semibold text-neutral-900 text-sm">Amplasare de Vis</h4>
                           <p className="text-xs text-neutral-500 mt-1">Înconjurată de munți și păduri de conifere, cu acces facil.</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm border border-neutral-200/70 hover:border-rose-300 transition">
                        <FaCheckCircle className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-semibold text-neutral-900 text-sm">Bucate Curate & Locale</h4>
                           <p className="text-xs text-neutral-500 mt-1">Brânzeturi proaspete, dulcețuri de casă și preparate la ceaun.</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm border border-neutral-200/70 hover:border-rose-300 transition">
                        <FaCheckCircle className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-semibold text-neutral-900 text-sm">Ciubăr & Saună</h4>
                           <p className="text-xs text-neutral-500 mt-1">Relaxare în aer liber, indiferent de anotimp sau ninsoare.</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm border border-neutral-200/70 hover:border-rose-300 transition">
                        <FaCheckCircle className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-semibold text-neutral-900 text-sm">Curte Mare & Foișor</h4>
                           <p className="text-xs text-neutral-500 mt-1">Zonă de grătar, loc de joacă pentru copii și hamace la umbră.</p>
                        </div>
                     </div>
                  </div>

                  {/* Numbers counter row */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200 text-center">
                     <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-rose-500">1050 m</div>
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Altitudine montană</div>
                     </div>
                     <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-rose-500">4.9 ★</div>
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Scor recenzii oaspeți</div>
                     </div>
                     <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-rose-500">100%</div>
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Liniște & Natură</div>
                     </div>
                  </div>
               </div>

               {/* Right Column: Layered Photo Collage */}
               <div className="lg:col-span-5 relative">
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                     {/* Main Big Photo */}
                     <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                           src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80"
                           alt="Curtea pensiunii si peisajul montan"
                           fill
                           className="object-cover"
                        />
                     </div>

                     {/* Overlapping Small Photo */}
                     <div className="absolute -bottom-8 -left-8 w-44 sm:w-56 h-36 sm:h-44 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                        <Image
                           src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                           alt="Interior camera rustic modern"
                           fill
                           className="object-cover"
                        />
                     </div>

                     {/* Floating Badge */}
                     <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-neutral-100 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xl">
                           🌲
                        </div>
                        <div>
                           <div className="font-bold text-neutral-900 text-sm">Destinație de Top</div>
                           <div className="text-xs text-neutral-500">Recomandată pentru familii & cupluri</div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
};

export default AboutSection;
