"use client";

import { FaStar } from "@react-icons/all-files/fa/FaStar";
import { FaQuoteLeft } from "@react-icons/all-files/fa/FaQuoteLeft";

const reviews = [
   {
      name: "Andreea & Mihai Radu",
      location: "București",
      date: "August 2024",
      stay: "Sejur de weekend în cuplu",
      text: "Un loc absolut minunat! Ciubărul seara, cu vedere spre stele și pădure, a fost experiența anului pentru noi. Gazdele sunt de o căldură rară, iar micul dejun este delicios, cu produse curate de țară. Ne vom întoarce cu siguranță la iarnă!",
      rating: 5,
   },
   {
      name: "Cristian Popescu",
      location: "Cluj-Napoca",
      date: "Iulie 2024",
      stay: "Vacanță cu familia (4 persoane)",
      text: "Am închiriat apartamentul cu 2 camere. Copiii au fost extrem de încântați de curtea mare și de trambulină. Foișorul are tot ce-ți trebuie pentru grătar și ceaun. Camerele sunt impecabil de curate, iar liniștea din zonă este ireală.",
      rating: 5,
   },
   {
      name: "Elena Munteanu",
      location: "Timișoara",
      date: "Iunie 2024",
      stay: "Team building & relaxare",
      text: "Am închiriat întreaga pensiune pentru un retreat de echipă. Totul a fost organizat exemplar. Mâncarea pregătită la ceaun și plăcintele calde au fost apreciate de toată lumea. Recomand cu toată inima oricui caută autenticitate!",
      rating: 5,
   },
];

const TestimonialsSection = () => {
   return (
      <section className="py-20 md:py-28 bg-neutral-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <FaStar className="text-xs" /> Recenzii & Păreri
               </div>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
                  Ce spun oaspeții noștri
               </h2>
               <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                  Peste 98% dintre oaspeți ne recomandă cu drag prietenilor și familiei. Iată câteva din impresiile lor:
               </p>
            </div>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
               {reviews.map((review, idx) => (
                  <div
                     key={idx}
                     className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/80 flex flex-col justify-between hover:shadow-lg transition duration-300"
                  >
                     <div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(review.rating)].map((_, i) => (
                                 <FaStar key={i} className="text-sm" />
                              ))}
                           </div>
                           <FaQuoteLeft className="text-rose-200 text-2xl" />
                        </div>

                        <p className="mt-6 text-neutral-600 text-sm sm:text-base leading-relaxed font-light italic">
                           „{review.text}”
                        </p>
                     </div>

                     <div className="mt-8 pt-6 border-t border-neutral-100">
                        <h4 className="font-bold text-neutral-900 text-base">{review.name}</h4>
                        <div className="text-xs text-neutral-500 mt-0.5">
                           {review.location} • <span className="text-rose-500 font-medium">{review.stay}</span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default TestimonialsSection;
