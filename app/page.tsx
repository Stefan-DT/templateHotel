import HeroSection from "./components/pensiune/HeroSection";
import AboutSection from "./components/pensiune/AboutSection";
import RoomsSection from "./components/pensiune/RoomsSection";
import FacilitiesSection from "./components/pensiune/FacilitiesSection";
import DiningSection from "./components/pensiune/DiningSection";
import GallerySection from "./components/pensiune/GallerySection";
import TestimonialsSection from "./components/pensiune/TestimonialsSection";
import ContactSection from "./components/pensiune/ContactSection";
import Footer from "./components/pensiune/Footer";

export default function Home() {
   return (
      <main className="min-h-screen flex flex-col">
         {/* Hero Section */}
         <HeroSection />

         {/* About / Story Section */}
         <AboutSection />

         {/* Rooms & Suites Showcase */}
         <RoomsSection />

         {/* Facilities & Experiences (Ciubar, Sauna, Foisor, etc.) */}
         <FacilitiesSection />

         {/* Traditional Dining & Breakfast */}
         <DiningSection />

         {/* Interactive Photo Gallery with Category Filters */}
         <GallerySection />

         {/* Guest Testimonials & Reviews */}
         <TestimonialsSection />

         {/* Contact, Location & Direct Booking Form */}
         <ContactSection />

         {/* Guesthouse Footer */}
         <Footer />
      </main>
   );
}
