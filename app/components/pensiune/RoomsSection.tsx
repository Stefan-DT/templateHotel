"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaBed } from "@react-icons/all-files/fa/FaBed";
import { FaWifi } from "@react-icons/all-files/fa/FaWifi";
import { FaBath } from "@react-icons/all-files/fa/FaBath";
import { FaTv } from "@react-icons/all-files/fa/FaTv";
import { FaCoffee } from "@react-icons/all-files/fa/FaCoffee";

export interface RoomItem {
   id: string;
   title: string;
   badge?: string;
   description: string;
   price: number;
   capacity: string;
   beds: string;
   surface: string;
   imageSrc: string;
   amenities: string[];
}

export const defaultRooms: RoomItem[] = [
   {
      id: "suita-panoramica",
      title: "Suita Panoramică Deluxe",
      badge: "Recomandat pentru cupluri",
      description: "Vedere spectaculoasă asupra crestelor montane, balcon privat, finisaje din lemn natural și baie spațioasă cu cadă.",
      price: 350,
      capacity: "2 Adulți",
      beds: "1 Pat King Size",
      surface: "38 m²",
      imageSrc: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      amenities: ["Vedere la Munte", "Balcon Privat", "Wi-Fi Gratuit", "Mic Dejun Inclus", "Smart TV"],
   },
   {
      id: "camera-dubla-rustica",
      title: "Camera Dublă Tradițională",
      badge: "Cea mai populară",
      description: "Atmosferă caldă cu accente rustice românești reinterpretate, pat matrimonial extrem de confortabil și baie proprie.",
      price: 260,
      capacity: "2 Persoane",
      beds: "1 Pat Matrimonial",
      surface: "26 m²",
      imageSrc: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      amenities: ["Baie Privată", "Wi-Fi Gratuit", "Izolare Fonică", "Încălzire Centrală"],
   },
   {
      id: "apartament-familial",
      title: "Apartament Familial cu 2 Camere",
      badge: "Pentru Familii",
      description: "Două dormitoare separate, living generos, terasă și spațiu de relaxare ideal pentru familii cu copii sau grupuri de prieteni.",
      price: 490,
      capacity: "4 - 5 Persoane",
      beds: "2 Paturi Matrimoniale + Canapea",
      surface: "65 m²",
      imageSrc: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      amenities: ["2 Dormitoare", "Terasă Privată", "Living Spațios", "Mic Dejun Inclus"],
   },
   {
      id: "casuta-chalet",
      title: "Căsuța din Lemn (Chalet Separat)",
      badge: "Exclusivist & Intim",
      description: "Căsuță individuală din bârne rotunde de lemn, cu ciubăr privat pe terasă, șemineu pe lemne și intimitate totală.",
      price: 650,
      capacity: "2 - 4 Persoane",
      beds: "1 Pat King + Mansardă",
      surface: "55 m²",
      imageSrc: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      amenities: ["Ciubăr Privat", "Șemineu pe Lemne", "Curte Proprie", "Punct Panoramic"],
   },
];

interface RoomsSectionProps {
   onSelectRoom?: (room: RoomItem) => void;
}

const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoom }) => {
   const [selectedFilter, setSelectedFilter] = useState("all");

   const scrollToContact = (roomTitle: string) => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
         contactEl.scrollIntoView({ behavior: "smooth" });
         // Prepopulate or focus
         const messageInput = document.getElementById("contact-message") as HTMLTextAreaElement;
         if (messageInput) {
            messageInput.value = `Bună ziua! Aș dori să verific disponibilitatea pentru "${roomTitle}".`;
         }
      }
   };

   return (
      <section id="camere" className="py-20 md:py-28 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <FaBed className="text-xs" /> Camere & Apartamente
               </div>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
                  Spații calde pentru un somn odihnitor
               </h2>
               <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                  Fiecare cameră este decorată individual cu atenție la detalii, lenjerii de bumbac fin, miros de lemn curat și ferestre mari spre culmile munților.
               </p>
            </div>

            {/* Rooms Grid */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
               {defaultRooms.map((room) => (
                  <div
                     key={room.id}
                     className="group rounded-2xl bg-white border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                     <div>
                        {/* Image Container */}
                        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                           <Image
                              src={room.imageSrc}
                              alt={room.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                           {/* Badge */}
                           {room.badge && (
                              <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                                 {room.badge}
                              </div>
                           )}

                           {/* Surface badge */}
                           <div className="absolute bottom-3 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-medium">
                              {room.surface}
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-7">
                           <div className="flex items-center justify-between gap-2">
                              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-rose-500 transition">
                                 {room.title}
                              </h3>
                           </div>

                           <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed font-light">
                              {room.description}
                           </p>

                           {/* Capacity & Beds Details */}
                           <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4 text-xs text-neutral-600">
                              <div className="flex items-center gap-1.5">
                                 <FaUserFriends className="text-rose-500" />
                                 <span>{room.capacity}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <FaBed className="text-rose-500" />
                                 <span>{room.beds}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                 <FaBath className="text-rose-500" />
                                 <span>Baie Privată</span>
                              </div>
                           </div>

                           {/* Amenities Pills */}
                           <div className="mt-4 flex flex-wrap gap-1.5">
                              {room.amenities.map((amenity, idx) => (
                                 <span
                                    key={idx}
                                    className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium"
                                 >
                                    {amenity}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Price & Action Row */}
                     <div className="p-6 sm:p-7 pt-0 border-t border-neutral-100 flex items-center justify-between gap-4 mt-4">
                        <div>
                           <span className="text-xs text-neutral-500 font-medium block">Tarif de la</span>
                           <div className="flex items-baseline gap-1">
                              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                                 {room.price} lei
                              </span>
                              <span className="text-xs text-neutral-500">/ noapte</span>
                           </div>
                        </div>

                        <button
                           onClick={() => scrollToContact(room.title)}
                           className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-semibold py-3 px-6 rounded-full transition shadow-md hover:shadow-rose-500/20"
                        >
                           Rezervă Camera
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default RoomsSection;
