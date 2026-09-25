import Link from "next/link";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";

interface NavbarProps {
   currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
   return (
      <header className="fixed w-full bg-white/95 backdrop-blur-md z-30 shadow-sm border-b border-neutral-200/80">
         <div className="py-3.5">
            <Container>
               <div className="flex flex-row items-center justify-between gap-4">
                  <Logo />

                  {/* Desktop Section Links */}
                  <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-700">
                     <a href="#despre" className="hover:text-rose-500 transition">
                        Povestea Noastră
                     </a>
                     <a href="#camere" className="hover:text-rose-500 transition">
                        Camere & Suite
                     </a>
                     <a href="#facilitati" className="hover:text-rose-500 transition">
                        Ciubăr & Facilități
                     </a>
                     <a href="#gastronomie" className="hover:text-rose-500 transition">
                        Gastronomie
                     </a>
                     <a href="#galerie" className="hover:text-rose-500 transition">
                        Galerie
                     </a>
                     <a href="#contact" className="hover:text-rose-500 transition">
                        Contact
                     </a>
                  </nav>

                  {/* Right: Direct Call CTA & User Menu */}
                  <div className="flex items-center gap-3">
                     <a
                        href="tel:+40740123456"
                        className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition border border-rose-200"
                     >
                        <FaPhoneAlt className="text-xs" />
                        <span>0740 123 456</span>
                     </a>

                     <UserMenu currentUser={currentUser} />
                  </div>
               </div>
            </Container>
         </div>
      </header>
   );
};
export default Navbar;
