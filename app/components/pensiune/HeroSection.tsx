"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaHotTub } from "@react-icons/all-files/fa/FaHotTub";
import { FaUtensils } from "@react-icons/all-files/fa/FaUtensils";
import { FaMountain } from "@react-icons/all-files/fa/FaMountain";
import { FaWifi } from "@react-icons/all-files/fa/FaWifi";

interface HeroSectionProps {
   onCheckAvailability?: (data: { checkIn: string; checkOut: string; guests: number }) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCheckAvailability }) => {
   const [checkIn, setCheckIn] = useState("");
   const [checkOut, setCheckOut] = useState("");
   const [guests, setGuests] = useState(2);

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (onCheckAvailability) {
         onCheckAvailability({ checkIn, checkOut, guests });
      }
      const roomsEl = document.getElementById("camere");
      if (roomsEl) {
         roomsEl.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden">
         {/* Background Image with Dark & Gradient Overlay */}
         <div className="absolute inset-0 -z-10">
            <Image
               src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
               alt="Pensiunea noastra in inima naturii"
               fill
               priority
               className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />
         </div>

         <div className="max-w-6xl mx-auto w-full text-center text-white flex flex-col items-center">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium tracking-wide uppercase text-rose-200 mb-6 animate-fade-in shadow-sm">
               <span>🌲</span> Cazare de poveste în inima naturii
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight drop-shadow-md">
               Refugiul tău de liniște & <span className="text-rose-400">ospitalitate caldă</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg md:text-xl text-neutral-200 max-w-2xl font-light leading-relaxed drop-shadow">
               Bucură-te de aer curat de munte, ciubăr încălzit sub cerul înstelat, bucate tradiționale pregătite cu drag și odihnă deplină.
            </p>

            {/* Quick Action Booking Bar */}
            <form
               onSubmit={handleSearch}
               className="mt-10 w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full p-3 md:p-2 text-neutral-800 shadow-2xl border border-white/40 grid grid-cols-1 md:grid-cols-4 gap-2 items-center"
            >
               {/* Check-in */}
               <div className="flex items-center gap-3 px-4 py-2 text-left hover:bg-neutral-50 rounded-xl transition">
                  <FaCalendarAlt className="text-rose-500 text-lg flex-shrink-0" />
                  <div className="w-full">
                     <label className="block text-xs font-bold uppercase text-neutral-500">Check-in</label>
                     <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
                     />
                  </div>
               </div>

               {/* Check-out */}
               <div className="flex items-center gap-3 px-4 py-2 text-left hover:bg-neutral-50 rounded-xl transition md:border-l border-neutral-200">
                  <FaCalendarAlt className="text-rose-500 text-lg flex-shrink-0" />
                  <div className="w-full">
                     <label className="block text-xs font-bold uppercase text-neutral-500">Check-out</label>
                     <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
                     />
                  </div>
               </div>

               {/* Guests */}
               <div className="flex items-center gap-3 px-4 py-2 text-left hover:bg-neutral-50 rounded-xl transition md:border-l border-neutral-200">
                  <FaUserFriends className="text-rose-500 text-lg flex-shrink-0" />
                  <div className="w-full">
                     <label className="block text-xs font-bold uppercase text-neutral-500">Oaspeți</label>
                     <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
                     >
                        <option value={1}>1 Oaspete</option>
                        <option value={2}>2 Oaspeți</option>
                        <option value={3}>3 Oaspeți</option>
                        <option value={4}>4 Oaspeți</option>
                        <option value={5}>5+ Oaspeți</option>
                     </select>
                  </div>
               </div>

               {/* Submit Button */}
               <div className="p-1">
                  <button
                     type="submit"
                     className="w-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold py-3.5 px-6 rounded-xl md:rounded-full flex items-center justify-center gap-2 transition shadow-lg hover:shadow-rose-500/30 text-sm"
                  >
                     <FaSearch className="text-sm" />
                     <span>Verifică Disponibilitatea</span>
                  </button>
               </div>
            </form>

            {/* Quick Feature Highlights */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-200">
               <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                  <FaHotTub className="text-rose-400" />
                  <span>Ciubăr & Saună</span>
               </div>
               <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                  <FaUtensils className="text-rose-400" />
                  <span>Bucate Tradiționale</span>
               </div>
               <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                  <FaMountain className="text-rose-400" />
                  <span>Vedere la Munte</span>
               </div>
               <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                  <FaWifi className="text-rose-400" />
                  <span>Wi-Fi Gratuit</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeroSection;
