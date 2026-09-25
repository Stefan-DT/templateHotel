"use client";

import { useState } from "react";
import Image from "next/image";
import { FaImages } from "@react-icons/all-files/fa/FaImages";

interface GalleryImage {
   id: number;
   title: string;
   category: "camere" | "curte" | "gastronomie" | "natura";
   src: string;
   aspect?: string;
}

const galleryImages: GalleryImage[] = [
   {
      id: 1,
      title: "Ciubăr încălzit sub cerul liber",
      category: "curte",
      src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 2,
      title: "Suita Panoramică Deluxe",
      category: "camere",
      src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 3,
      title: "Peisajul montan din fața pensiunii",
      category: "natura",
      src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 4,
      title: "Mic dejun tradițional bogat",
      category: "gastronomie",
      src: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 5,
      title: "Foișor din lemn masiv și zonă de grătar",
      category: "curte",
      src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 6,
      title: "Camera Dublă Tradițională",
      category: "camere",
      src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 7,
      title: "Bucate locale coapte pe vatră",
      category: "gastronomie",
      src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 8,
      title: "Foc de tabără sub cerul înstelat",
      category: "curte",
      src: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?auto=format&fit=crop&w=1200&q=80",
   },
   {
      id: 9,
      title: "Pădure de conifere și trasee de drumeție",
      category: "natura",
      src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
   },
];

const GallerySection = () => {
   const [activeTab, setActiveTab] = useState<"toate" | "camere" | "curte" | "gastronomie" | "natura">("toate");
   const [activeModalImage, setActiveModalImage] = useState<GalleryImage | null>(null);

   const filteredImages =
      activeTab === "toate"
         ? galleryImages
         : galleryImages.filter((img) => img.category === activeTab);

   return (
      <section id="galerie" className="py-20 md:py-28 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
               <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <FaImages className="text-xs" /> Galerie Foto
               </div>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight">
                  Descoperă atmosfera pensiunii în imagini
               </h2>
               <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                  O privire în detaliu asupra camerelor noastre, a curții generoase și a peisajelor montane ce ne înconjoară.
               </p>

               {/* Category Filter Tabs */}
               <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {[
                     { key: "toate", label: "Toate fotografiile" },
                     { key: "camere", label: "Camere & Suite" },
                     { key: "curte", label: "Curte & Ciubăr" },
                     { key: "gastronomie", label: "Gastronomie" },
                     { key: "natura", label: "Natură & Peisaje" },
                  ].map((tab) => (
                     <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key as any)}
                        className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
                           activeTab === tab.key
                              ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                     >
                        {tab.label}
                     </button>
                  ))}
               </div>
            </div>

            {/* Gallery Grid */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredImages.map((image) => (
                  <div
                     key={image.id}
                     onClick={() => setActiveModalImage(image)}
                     className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                     <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-semibold text-base drop-shadow-md">
                           {image.title}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Lightbox Modal */}
         {activeModalImage && (
            <div
               onClick={() => setActiveModalImage(null)}
               className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fade-in"
            >
               <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-5xl w-full h-[75vh] rounded-2xl overflow-hidden shadow-2xl"
               >
                  <Image
                     src={activeModalImage.src}
                     alt={activeModalImage.title}
                     fill
                     className="object-contain"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-center text-white bg-black/50 backdrop-blur-sm py-2 px-4 rounded-lg text-sm font-medium">
                     {activeModalImage.title}
                  </div>
                  <button
                     onClick={() => setActiveModalImage(null)}
                     className="absolute top-4 right-4 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg hover:bg-rose-500 transition"
                  >
                     ✕
                  </button>
               </div>
            </div>
         )}
      </section>
   );
};

export default GallerySection;
