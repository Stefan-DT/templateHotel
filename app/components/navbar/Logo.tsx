"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
   const router = useRouter();

   return (
      <div onClick={() => router.push("/")} className="cursor-pointer flex items-center gap-2.5">
         <span className="text-2xl sm:text-3xl">🌲</span>
         <div className="flex flex-col">
            <span className="font-extrabold text-neutral-900 text-base sm:text-lg leading-tight tracking-tight">
               Pensiunea <span className="text-rose-500">Noastră</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold hidden sm:block">
               Cazare & Tradiție
            </span>
         </div>
      </div>
   );
};

export default Logo;
