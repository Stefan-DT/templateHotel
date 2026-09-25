"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaCalendarCheck } from "@react-icons/all-files/fa/FaCalendarCheck";
import { FaMoneyBillWave } from "@react-icons/all-files/fa/FaMoneyBillWave";
import { FaBed } from "@react-icons/all-files/fa/FaBed";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaCog } from "@react-icons/all-files/fa/FaCog";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { defaultRooms } from "../components/pensiune/RoomsSection";
import RoomManagement, { AdminRoom } from "./RoomManagement";

interface Booking {
   id: string;
   guestName: string;
   phone: string;
   email: string;
   roomTitle: string;
   checkIn: string;
   checkOut: string;
   guests: number;
   totalPrice: number;
   status: "Confirmată" | "În așteptare" | "Anulată";
   source: "Site direct" | "Telefon" | "WhatsApp";
}

const initialBookings: Booking[] = [
   {
      id: "REZ-101",
      guestName: "Mihai Ionescu",
      phone: "0745 112 233",
      email: "mihai.ionescu@gmail.com",
      roomTitle: "Suita Panoramică Deluxe",
      checkIn: "2026-09-18",
      checkOut: "2026-09-21",
      guests: 2,
      totalPrice: 1050,
      status: "Confirmată",
      source: "Site direct",
   },
   {
      id: "REZ-102",
      guestName: "Elena Dumitru",
      phone: "0722 998 877",
      email: "elena.d@yahoo.com",
      roomTitle: "Camera Dublă Tradițională",
      checkIn: "2026-09-19",
      checkOut: "2026-09-22",
      guests: 2,
      totalPrice: 780,
      status: "În așteptare",
      source: "Site direct",
   },
   {
      id: "REZ-103",
      guestName: "Radu Stan",
      phone: "0730 445 566",
      email: "radu.stan@outlook.com",
      roomTitle: "Apartament Familial cu 2 Camere",
      checkIn: "2026-09-25",
      checkOut: "2026-09-28",
      guests: 4,
      totalPrice: 1470,
      status: "Confirmată",
      source: "WhatsApp",
   },
   {
      id: "REZ-104",
      guestName: "Alin Vlădescu",
      phone: "0751 332 211",
      email: "alin.v@gmail.com",
      roomTitle: "Căsuța din Lemn (Chalet Separat)",
      checkIn: "2026-10-02",
      checkOut: "2026-10-05",
      guests: 2,
      totalPrice: 1950,
      status: "Confirmată",
      source: "Telefon",
   },
   {
      id: "REZ-105",
      guestName: "Cosmin Popa",
      phone: "0766 887 744",
      email: "cosmin.popa@gmail.com",
      roomTitle: "Suita Panoramică Deluxe",
      checkIn: "2026-09-10",
      checkOut: "2026-09-12",
      guests: 2,
      totalPrice: 700,
      status: "Anulată",
      source: "Site direct",
   },
];

const AdminDashboard = () => {
   const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "rooms" | "settings">("overview");
   const [bookings, setBookings] = useState<Booking[]>(initialBookings);
   const [searchTerm, setSearchTerm] = useState("");
   const [filterStatus, setFilterStatus] = useState<string>("Toate");

   // Rooms state with prices
   const [rooms, setRooms] = useState<AdminRoom[]>(
      defaultRooms.map((r) => ({
         ...r,
         isAvailable: true,
      }))
   );

   // Quick modal for manual booking
   const [showNewBookingModal, setShowNewBookingModal] = useState(false);
   const [newBooking, setNewBooking] = useState({
      guestName: "",
      phone: "",
      roomTitle: defaultRooms[0]?.title || "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      totalPrice: (defaultRooms[0]?.price || 0) * 2,
   });

   // Handle confirm / cancel
   const updateStatus = (id: string, newStatus: "Confirmată" | "Anulată") => {
      setBookings((prev) =>
         prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      toast.success(`Rezervarea ${id} a fost actualizată: ${newStatus}`);
   };

   // Handle add manual booking
   const handleCreateBooking = (e: React.FormEvent) => {
      e.preventDefault();
      const created: Booking = {
         id: `REZ-${Math.floor(100 + Math.random() * 900)}`,
         guestName: newBooking.guestName,
         phone: newBooking.phone,
         email: "contact@manual.ro",
         roomTitle: newBooking.roomTitle,
         checkIn: newBooking.checkIn,
         checkOut: newBooking.checkOut,
         guests: newBooking.guests,
         totalPrice: Number(newBooking.totalPrice),
         status: "Confirmată",
         source: "Telefon",
      };
      setBookings([created, ...bookings]);
      setShowNewBookingModal(false);
      toast.success("Rezervare adăugată cu succes!");
   };

   // Filtered bookings
   const filteredBookings = bookings.filter((b) => {
      const matchesSearch =
         b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         b.phone.includes(searchTerm) ||
         b.roomTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "Toate" || b.status === filterStatus;
      return matchesSearch && matchesStatus;
   });

   // Calculate stats
   const totalRevenue = bookings
      .filter((b) => b.status === "Confirmată")
      .reduce((sum, b) => sum + b.totalPrice, 0);

   const confirmedCount = bookings.filter((b) => b.status === "Confirmată").length;
   const pendingCount = bookings.filter((b) => b.status === "În așteptare").length;

   return (
      <div className="min-h-screen bg-neutral-100 text-neutral-800 flex flex-col">
         {/* Top Admin Navbar */}
         <header className="bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <Link
                     href="/"
                     className="flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-rose-500 transition px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-rose-300"
                  >
                     <FaArrowLeft className="text-xs" />
                     <span>Vezi Site-ul</span>
                  </Link>

                  <div className="flex items-center gap-2">
                     <span className="text-xl">🌲</span>
                     <span className="font-extrabold text-neutral-900 text-base sm:text-lg">
                        Consolă Gestiune Pensiune
                     </span>
                     <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                        Proprietar
                     </span>
                  </div>
               </div>

               {/* Add Manual Booking Button */}
               <button
                  onClick={() => setShowNewBookingModal(true)}
                  className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs sm:text-sm font-semibold py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm transition"
               >
                  <FaPlus className="text-xs" />
                  <span>Adaugă Rezervare</span>
               </button>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 text-sm font-medium border-t border-neutral-100">
               <button
                  onClick={() => setActiveTab("overview")}
                  className={`py-3 border-b-2 font-semibold transition ${
                     activeTab === "overview"
                        ? "border-rose-500 text-rose-600"
                        : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
               >
                  Tablou General
               </button>
               <button
                  onClick={() => setActiveTab("bookings")}
                  className={`py-3 border-b-2 font-semibold transition flex items-center gap-2 ${
                     activeTab === "bookings"
                        ? "border-rose-500 text-rose-600"
                        : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
               >
                  <span>Rezervări</span>
                  {pendingCount > 0 && (
                     <span className="px-2 py-0.2 rounded-full text-xs bg-amber-500 text-white font-bold">
                        {pendingCount}
                     </span>
                  )}
               </button>
               <button
                  onClick={() => setActiveTab("rooms")}
                  className={`py-3 border-b-2 font-semibold transition ${
                     activeTab === "rooms"
                        ? "border-rose-500 text-rose-600"
                        : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
               >
                  Gestiune Camere
               </button>
               <button
                  onClick={() => setActiveTab("settings")}
                  className={`py-3 border-b-2 font-semibold transition ${
                     activeTab === "settings"
                        ? "border-rose-500 text-rose-600"
                        : "border-transparent text-neutral-500 hover:text-neutral-900"
                  }`}
               >
                  Setări & Contact
               </button>
            </div>
         </header>

         {/* Content Area */}
         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
               <div className="space-y-8">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex items-center gap-4">
                        <div className="p-3.5 bg-rose-50 text-rose-500 rounded-xl text-2xl">
                           <FaMoneyBillWave />
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                              Încasări Confirmate
                           </div>
                           <div className="text-2xl font-extrabold text-neutral-900 mt-1">
                              {totalRevenue} lei
                           </div>
                           <div className="text-xs text-emerald-600 font-medium mt-0.5">
                              +18% față de luna trecută
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex items-center gap-4">
                        <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl text-2xl">
                           <FaCalendarCheck />
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                              Rezervări Active
                           </div>
                           <div className="text-2xl font-extrabold text-neutral-900 mt-1">
                              {confirmedCount}
                           </div>
                           <div className="text-xs text-neutral-500 mt-0.5">
                              {pendingCount} în așteptare de confirmare
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex items-center gap-4">
                        <div className="p-3.5 bg-blue-50 text-blue-500 rounded-xl text-2xl">
                           <FaBed />
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                              Grad de Ocupare
                           </div>
                           <div className="text-2xl font-extrabold text-neutral-900 mt-1">
                              82%
                           </div>
                           <div className="text-xs text-blue-600 font-medium mt-0.5">
                              Optim pentru weekend-uri
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex items-center gap-4">
                        <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl text-2xl">
                           <FaUsers />
                        </div>
                        <div>
                           <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                              Oaspeți Găzduiți
                           </div>
                           <div className="text-2xl font-extrabold text-neutral-900 mt-1">
                              24
                           </div>
                           <div className="text-xs text-neutral-500 mt-0.5">
                              Luna curentă
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Recent Bookings Quick Table */}
                  <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
                     <div className="flex items-center justify-between mb-6">
                        <div>
                           <h3 className="text-lg font-bold text-neutral-900">
                              Rezervări Recente
                           </h3>
                           <p className="text-xs text-neutral-500">
                              Ultimele cereri primite de la oaspeți
                           </p>
                        </div>
                        <button
                           onClick={() => setActiveTab("bookings")}
                           className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                        >
                           Vezi toate rezervările →
                        </button>
                     </div>

                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                           <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
                              <tr>
                                 <th className="py-3 px-4">Cod</th>
                                 <th className="py-3 px-4">Oaspete</th>
                                 <th className="py-3 px-4">Cameră</th>
                                 <th className="py-3 px-4">Perioadă</th>
                                 <th className="py-3 px-4">Sumă</th>
                                 <th className="py-3 px-4">Status</th>
                                 <th className="py-3 px-4 text-right">Acțiuni</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-neutral-100">
                              {bookings.slice(0, 4).map((b) => (
                                 <tr key={b.id} className="hover:bg-neutral-50/50">
                                    <td className="py-3.5 px-4 font-mono text-xs font-bold text-neutral-700">
                                       {b.id}
                                    </td>
                                    <td className="py-3.5 px-4 font-semibold text-neutral-900">
                                       {b.guestName}
                                       <span className="block text-xs font-normal text-neutral-500">
                                          {b.phone}
                                       </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-neutral-700">{b.roomTitle}</td>
                                    <td className="py-3.5 px-4 text-neutral-600 text-xs">
                                       {b.checkIn} ➔ {b.checkOut}
                                    </td>
                                    <td className="py-3.5 px-4 font-bold text-neutral-900">
                                       {b.totalPrice} lei
                                    </td>
                                    <td className="py-3.5 px-4">
                                       <span
                                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                             b.status === "Confirmată"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : b.status === "În așteptare"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-neutral-100 text-neutral-600"
                                          }`}
                                       >
                                          {b.status}
                                       </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                       {b.status === "În așteptare" ? (
                                          <button
                                             onClick={() => updateStatus(b.id, "Confirmată")}
                                             className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition"
                                          >
                                             Confirmă
                                          </button>
                                       ) : (
                                          <a
                                             href={`https://wa.me/4${b.phone.replace(/[^0-9]/g, "")}`}
                                             target="_blank"
                                             rel="noreferrer"
                                             className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-xs font-semibold"
                                          >
                                             <FaWhatsapp /> Contact
                                          </a>
                                       )}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            )}

            {/* BOOKINGS TAB */}
            {activeTab === "bookings" && (
               <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                     <div>
                        <h2 className="text-xl font-bold text-neutral-900">
                           Gestiunea Rezervărilor
                        </h2>
                        <p className="text-xs text-neutral-500">
                           Toate rezervările primite online, prin telefon sau WhatsApp
                        </p>
                     </div>

                     {/* Filters */}
                     <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                           <FaSearch className="absolute left-3 top-3 text-neutral-400 text-xs" />
                           <input
                              type="text"
                              placeholder="Caută oaspete, telefon..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-8 pr-4 py-2 border border-neutral-300 rounded-xl text-xs focus:outline-none focus:border-rose-500"
                           />
                        </div>

                        <select
                           value={filterStatus}
                           onChange={(e) => setFilterStatus(e.target.value)}
                           className="px-3 py-2 border border-neutral-300 rounded-xl text-xs bg-white focus:outline-none focus:border-rose-500"
                        >
                           <option value="Toate">Toate statusurile</option>
                           <option value="Confirmată">Confirmate</option>
                           <option value="În așteptare">În așteptare</option>
                           <option value="Anulată">Anulate</option>
                        </select>
                     </div>
                  </div>

                  {/* Full Table */}
                  <div className="overflow-x-auto">
                     <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
                           <tr>
                              <th className="py-3.5 px-4">Cod</th>
                              <th className="py-3.5 px-4">Oaspete & Contact</th>
                              <th className="py-3.5 px-4">Cameră</th>
                              <th className="py-3.5 px-4">Sosire - Plecare</th>
                              <th className="py-3.5 px-4">Pers.</th>
                              <th className="py-3.5 px-4">Total</th>
                              <th className="py-3.5 px-4">Status</th>
                              <th className="py-3.5 px-4 text-right">Schimbă Status</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                           {filteredBookings.map((b) => (
                              <tr key={b.id} className="hover:bg-neutral-50/50">
                                 <td className="py-4 px-4 font-mono text-xs font-bold text-neutral-600">
                                    {b.id}
                                    <span className="block text-[10px] font-normal text-neutral-400">
                                       {b.source}
                                    </span>
                                 </td>
                                 <td className="py-4 px-4">
                                    <div className="font-semibold text-neutral-900">{b.guestName}</div>
                                    <div className="text-xs text-neutral-500 flex items-center gap-2 mt-0.5">
                                       <span>{b.phone}</span>
                                       <a
                                          href={`https://wa.me/4${b.phone.replace(/[^0-9]/g, "")}`}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-emerald-600 hover:text-emerald-700"
                                       >
                                          <FaWhatsapp />
                                       </a>
                                    </div>
                                 </td>
                                 <td className="py-4 px-4 font-medium text-neutral-800">
                                    {b.roomTitle}
                                 </td>
                                 <td className="py-4 px-4 text-xs text-neutral-600">
                                    {b.checkIn} <br /> {b.checkOut}
                                 </td>
                                 <td className="py-4 px-4 text-xs font-semibold">{b.guests}</td>
                                 <td className="py-4 px-4 font-extrabold text-neutral-900">
                                    {b.totalPrice} lei
                                 </td>
                                 <td className="py-4 px-4">
                                    <span
                                       className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                          b.status === "Confirmată"
                                             ? "bg-emerald-100 text-emerald-700"
                                             : b.status === "În așteptare"
                                             ? "bg-amber-100 text-amber-700"
                                             : "bg-neutral-100 text-neutral-600"
                                       }`}
                                    >
                                       {b.status}
                                    </span>
                                 </td>
                                 <td className="py-4 px-4 text-right space-x-1">
                                    {b.status !== "Confirmată" && (
                                       <button
                                          onClick={() => updateStatus(b.id, "Confirmată")}
                                          title="Marchează ca confirmată"
                                          className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs transition"
                                       >
                                          <FaCheck />
                                       </button>
                                    )}
                                    {b.status !== "Anulată" && (
                                       <button
                                          onClick={() => updateStatus(b.id, "Anulată")}
                                          title="Anulează rezervarea"
                                          className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs transition"
                                       >
                                          <FaTimes />
                                       </button>
                                    )}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}

            {/* ROOMS TAB */}
            {activeTab === "rooms" && (
               <RoomManagement rooms={rooms} setRooms={setRooms} bookings={bookings} />
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
               <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 max-w-3xl space-y-6">
                  <div>
                     <h2 className="text-xl font-bold text-neutral-900">Setări Profil Pensiune</h2>
                     <p className="text-xs text-neutral-500">
                        Datele de contact afișate oaspeților pe site-ul de prezentare
                     </p>
                  </div>

                  <div className="space-y-4 pt-2">
                     <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                           Nume Pensiune
                        </label>
                        <input
                           type="text"
                           defaultValue="Pensiunea Noastră"
                           className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                        />
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Telefon Contact
                           </label>
                           <input
                              type="text"
                              defaultValue="+40 740 123 456"
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                           />
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Număr WhatsApp
                           </label>
                           <input
                              type="text"
                              defaultValue="+40 740 123 456"
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                           Adresă Email Rezervări
                        </label>
                        <input
                           type="email"
                           defaultValue="contact@pensiuneanoastra.ro"
                           className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                        />
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                           Adresă Fizică & Indicații
                        </label>
                        <input
                           type="text"
                           defaultValue="Str. Pădurii nr. 14, Zona Montană, România"
                           className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                        />
                     </div>

                     <div className="pt-4">
                        <button
                           onClick={() => toast.success("Setările au fost salvate cu succes!")}
                           className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-semibold py-3 px-6 rounded-xl transition shadow-sm"
                        >
                           Salvează Modificările
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </main>

         {/* Manual Booking Modal */}
         {showNewBookingModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                     <h3 className="text-lg font-bold text-neutral-900">Adaugă Rezervare Manuală</h3>
                     <button
                        onClick={() => setShowNewBookingModal(false)}
                        className="text-neutral-400 hover:text-neutral-700 font-bold"
                     >
                        ✕
                     </button>
                  </div>

                  <form onSubmit={handleCreateBooking} className="mt-4 space-y-4">
                     <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                           Nume Oaspete *
                        </label>
                        <input
                           type="text"
                           required
                           placeholder="ex: Vasile Ionescu"
                           value={newBooking.guestName}
                           onChange={(e) =>
                              setNewBooking({ ...newBooking, guestName: e.target.value })
                           }
                           className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                        />
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                           Telefon *
                        </label>
                        <input
                           type="tel"
                           required
                           placeholder="07xxxxxxxx"
                           value={newBooking.phone}
                           onChange={(e) =>
                              setNewBooking({ ...newBooking, phone: e.target.value })
                           }
                           className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                        />
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                           Cameră Alocată
                        </label>
                        <select
                           value={newBooking.roomTitle}
                           onChange={(e) =>
                              setNewBooking({ ...newBooking, roomTitle: e.target.value })
                           }
                           className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 bg-white"
                        >
                           {rooms.map((r) => (
                              <option key={r.id} value={r.title}>
                                 {r.title} ({r.price} lei/noapte)
                              </option>
                           ))}
                        </select>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Data Sosire
                           </label>
                           <input
                              type="date"
                              required
                              value={newBooking.checkIn}
                              onChange={(e) =>
                                 setNewBooking({ ...newBooking, checkIn: e.target.value })
                              }
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                           />
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Data Plecare
                           </label>
                           <input
                              type="date"
                              required
                              value={newBooking.checkOut}
                              onChange={(e) =>
                                 setNewBooking({ ...newBooking, checkOut: e.target.value })
                              }
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Număr Oaspeți
                           </label>
                           <input
                              type="number"
                              min={1}
                              value={newBooking.guests}
                              onChange={(e) =>
                                 setNewBooking({ ...newBooking, guests: Number(e.target.value) })
                              }
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                           />
                        </div>

                        <div>
                           <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                              Preț Total (lei)
                           </label>
                           <input
                              type="number"
                              required
                              value={newBooking.totalPrice}
                              onChange={(e) =>
                                 setNewBooking({ ...newBooking, totalPrice: Number(e.target.value) })
                              }
                              className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
                           />
                        </div>
                     </div>

                     <div className="pt-2 flex items-center justify-end gap-3">
                        <button
                           type="button"
                           onClick={() => setShowNewBookingModal(false)}
                           className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                        >
                           Renunță
                        </button>
                        <button
                           type="submit"
                           className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition shadow-md"
                        >
                           Salvează Rezervarea
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default AdminDashboard;
