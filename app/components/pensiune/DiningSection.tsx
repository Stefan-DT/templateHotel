"use client";

import Image from "next/image";
import { FaUtensils } from "@react-icons/all-files/fa/FaUtensils";
import { FaEgg } from "@react-icons/all-files/fa/FaEgg";
import { FaCoffee } from "@react-icons/all-files/fa/FaCoffee";
import { FaBreadSlice } from "@react-icons/all-files/fa/FaBreadSlice";

const DiningSection = () => {
   return (
      <section id="gastronomie" className="py-20 md:py-28 bg-amber-50/40">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
               
               {/* Left Column: Visual Collage */}
               <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg mt-8">
                     <Image
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                        alt="Bucate traditionale romanesti"
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
                     <Image
                        src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
                        alt="Mic dejun bogat din produse locale"
                        fill
                        className="object-cover"
                     />
                  </div>
                  <div className="relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-lg col-span-2">
                     <Image
                        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                        alt="Masa traditionala in foisor"
                        fill
                        className="object-cover"
                     />
                  </div>
               </div>

               {/* Right Column: Culinary Details */}
               <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider w-max">
                     <FaUtensils className="text-xs" /> Gastronomie Tradițională
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
                     Bucate curate, gătite ca la mama acasă
                  </h2>

                  <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                     Credem cu tărie că o vacanță autentică la munte este desăvârșită de gustul bucatelor proaspete. Toate preparatele noastre sunt realizate din ingrediente curate, procurate direct de la fermierii și producătorii locali din zonă.
                  </p>

                  <div className="space-y-4 pt-2">
                     <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                        <div className="p-3 bg-amber-50 rounded-lg text-amber-700">
                           <FaEgg className="text-lg" />
                        </div>
                        <div>
                           <h4 className="font-bold text-neutral-900 text-sm">Mic Dejun Boieresc Inclus</h4>
                           <p className="text-xs text-neutral-500 mt-1">Ouă de țară, telemea de vacă și oaie, zacuscă de casă, unt curat, miere de fâneață și dulceață de afine culese din pădure.</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                        <div className="p-3 bg-amber-50 rounded-lg text-amber-700">
                           <FaBreadSlice className="text-lg" />
                        </div>
                        <div>
                           <h4 className="font-bold text-neutral-900 text-sm">Pâine Caldă & Plăcinte pe Vatră</h4>
                           <p className="text-xs text-neutral-500 mt-1">Pâine coaptă zilnic în cuptorul cu lemne și plăcinte calde „poale-n brâu” sau papanași pufoși cu smântână grasă.</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-amber-100">
                        <div className="p-3 bg-amber-50 rounded-lg text-amber-700">
                           <FaCoffee className="text-lg" />
                        </div>
                        <div>
                           <h4 className="font-bold text-neutral-900 text-sm">Cine Festive la Cerere & Ceauș</h4>
                           <p className="text-xs text-neutral-500 mt-1">La cererea grupurilor, pregătim tocăniță la ceaun pe pirostrii, bulz ciobănesc copt pe jar și afinată naturală de bun venit.</p>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
};

export default DiningSection;
