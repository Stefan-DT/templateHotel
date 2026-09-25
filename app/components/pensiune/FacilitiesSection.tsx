"use client";

import Image from "next/image";
import { FaHotTub } from "@react-icons/all-files/fa/FaHotTub";
import { FaFire } from "@react-icons/all-files/fa/FaFire";
import { FaHiking } from "@react-icons/all-files/fa/FaHiking";
import { FaChild } from "@react-icons/all-files/fa/FaChild";
import { FaUtensils } from "@react-icons/all-files/fa/FaUtensils";
import { FaSpa } from "@react-icons/all-files/fa/FaSpa";

interface FacilityItem {
   title: string;
   description: string;
   icon: any;
   imageSrc: string;
}

const facilities: FacilityItem[] = [
   {
      title: "Ciubăr Încălzit cu Hidromasaj",
      description: "Apă caldă la 38°C încălzită cu lemne și hidromasaj, perfectă pentru serile reci de munte sub cerul înstelat.",
      icon: FaHotTub,
      imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
   },
   {
      title: "Saună Uscată Tradițională",
      description: "Construită din lemn natural parfumat de cedru, oferă relaxare musculară și deconectare totală.",
      icon: FaSpa,
      imageSrc: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
   },
   {
      title: "Foișor cu Grătar & Cuptor de Pâine",
      description: "Zonă acoperită generoasă, utilată cu grătar de piatră, sobă, ceaun de tuci și mese lungi din lemn masiv.",
      icon: FaUtensils,
      imageSrc: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
   },
   {
      title: "Foc de Tabără & Zonă de Povești",
      description: "Băncuțe din bușteni în jurul unui focar din piatră de râu, ideal pentru seri cu vin fiert și chitară.",
      icon: FaFire,
      imageSrc: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=800&q=80",
   },
   {
      title: "Drumeții & Trasee în Natură",
      description: "Punct de plecare direct pe trasee marcate prin pădure, spre cascade spectaculoase și puncte de belvedere.",
      icon: FaHiking,
      imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
   },
   {
      title: "Curte Sigură & Loc de Joacă Copii",
      description: "Curte mare îngrădită de 4000 mp, trambulină, leagăne, tobogan și mult spațiu verde pentru alergat.",
      icon: FaChild,
      imageSrc: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80",
   },
];

const FacilitiesSection = () => {
   return (
      <section id="facilitati" className="py-20 md:py-28 bg-neutral-900 text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-500/30">
                  <FaHotTub className="text-xs" /> Facilități & Experiențe
               </div>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  Tot ce ai nevoie pentru o vacanță memorabilă
               </h2>
               <p className="mt-4 text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                  Fiecare detaliu al pensiunii a fost gândit să îți ofere deconectare și bucurie, de la aburii ciubărului până la mirosul grătarului sfârâind în foișor.
               </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {facilities.map((facility, idx) => {
                  const Icon = facility.icon;
                  return (
                     <div
                        key={idx}
                        className="group relative rounded-2xl bg-neutral-800/80 border border-neutral-700/80 overflow-hidden shadow-lg hover:border-rose-500/60 transition-all duration-300 flex flex-col justify-between"
                     >
                        <div className="relative h-48 w-full overflow-hidden">
                           <Image
                              src={facility.imageSrc}
                              alt={facility.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                           <div className="absolute top-4 left-4 p-3 bg-neutral-900/80 backdrop-blur-md rounded-xl text-rose-400 border border-neutral-700">
                              <Icon className="text-xl" />
                           </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 justify-between">
                           <div>
                              <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition">
                                 {facility.title}
                              </h3>
                              <p className="mt-2 text-sm text-neutral-300 leading-relaxed font-light">
                                 {facility.description}
                              </p>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};

export default FacilitiesSection;
