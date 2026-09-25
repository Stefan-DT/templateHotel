"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
   addMonths,
   eachDayOfInterval,
   endOfMonth,
   endOfWeek,
   format,
   isSameDay,
   isSameMonth,
   isWithinInterval,
   parseISO,
   startOfMonth,
   startOfWeek,
   subMonths,
} from "date-fns";
import { ro } from "date-fns/locale";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import { FaCalendarAlt } from "@react-icons/all-files/fa/FaCalendarAlt";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaCamera } from "@react-icons/all-files/fa/FaCamera";
import { RoomItem } from "../components/pensiune/RoomsSection";
import ImageUpload from "../components/inputs/ImageUpload";

export type AdminRoom = RoomItem & { isAvailable: boolean };

interface BookingLite {
   id: string;
   guestName: string;
   roomTitle: string;
   checkIn: string;
   checkOut: string;
   status: "Confirmată" | "În așteptare" | "Anulată";
}

interface RoomManagementProps {
   rooms: AdminRoom[];
   setRooms: React.Dispatch<React.SetStateAction<AdminRoom[]>>;
   bookings: BookingLite[];
}

const emptyForm = {
   title: "",
   description: "",
   price: 250,
   capacity: "2 Persoane",
   beds: "1 Pat Matrimonial",
   surface: "25 m²",
   imageSrc: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
   badge: "",
   amenitiesText: "Wi-Fi Gratuit, Baie Privată",
};

type RoomFormState = typeof emptyForm;

const RoomManagement: React.FC<RoomManagementProps> = ({ rooms, setRooms, bookings }) => {
   const [showAddModal, setShowAddModal] = useState(false);
   const [editingRoom, setEditingRoom] = useState<AdminRoom | null>(null);
   const [calendarRoom, setCalendarRoom] = useState<AdminRoom | null>(null);
   const [form, setForm] = useState<RoomFormState>(emptyForm);
   const [calendarMonth, setCalendarMonth] = useState(new Date());

   const openAdd = () => {
      setForm(emptyForm);
      setShowAddModal(true);
   };

   const openEdit = (room: AdminRoom) => {
      setForm({
         title: room.title,
         description: room.description,
         price: room.price,
         capacity: room.capacity,
         beds: room.beds,
         surface: room.surface,
         imageSrc: room.imageSrc,
         badge: room.badge || "",
         amenitiesText: room.amenities.join(", "),
      });
      setEditingRoom(room);
   };

   const openCalendar = (room: AdminRoom) => {
      setCalendarRoom(room);
      setCalendarMonth(new Date());
   };

   const parseAmenities = (text: string) =>
      text
         .split(",")
         .map((a) => a.trim())
         .filter(Boolean);

   const handleSaveAdd = (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.title.trim() || !form.imageSrc.trim() || form.price <= 0) {
         toast.error("Completează titlul, poza și un preț valid.");
         return;
      }

      const newRoom: AdminRoom = {
         id: `room-${Date.now()}`,
         title: form.title.trim(),
         description: form.description.trim() || "Cameră nouă adăugată din consolă.",
         price: Number(form.price),
         capacity: form.capacity.trim() || "2 Persoane",
         beds: form.beds.trim() || "1 Pat",
         surface: form.surface.trim() || "20 m²",
         imageSrc: form.imageSrc.trim(),
         badge: form.badge.trim() || undefined,
         amenities: parseAmenities(form.amenitiesText),
         isAvailable: true,
      };

      setRooms((prev) => [...prev, newRoom]);
      setShowAddModal(false);
      toast.success("Camera a fost adăugată!");
   };

   const handleSaveEdit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingRoom) return;
      if (!form.title.trim() || !form.imageSrc.trim() || form.price <= 0) {
         toast.error("Completează titlul, poza și un preț valid.");
         return;
      }

      setRooms((prev) =>
         prev.map((r) =>
            r.id === editingRoom.id
               ? {
                    ...r,
                    title: form.title.trim(),
                    description: form.description.trim(),
                    price: Number(form.price),
                    capacity: form.capacity.trim(),
                    beds: form.beds.trim(),
                    surface: form.surface.trim(),
                    imageSrc: form.imageSrc.trim(),
                    badge: form.badge.trim() || undefined,
                    amenities: parseAmenities(form.amenitiesText),
                 }
               : r
         )
      );
      setEditingRoom(null);
      toast.success("Camera a fost actualizată!");
   };

   const toggleAvailability = (id: string) => {
      setRooms((prev) =>
         prev.map((r) => (r.id === id ? { ...r, isAvailable: !r.isAvailable } : r))
      );
      toast.success("Disponibilitatea camerei a fost actualizată!");
   };

   const deleteRoom = (id: string) => {
      if (!confirm("Ștergi definitiv această cameră din listă?")) return;
      setRooms((prev) => prev.filter((r) => r.id !== id));
      toast.success("Camera a fost ștearsă.");
   };

   const roomBookings = useMemo(() => {
      if (!calendarRoom) return [];
      return bookings.filter(
         (b) =>
            b.roomTitle === calendarRoom.title &&
            b.status !== "Anulată"
      );
   }, [bookings, calendarRoom]);

   const calendarDays = useMemo(() => {
      const start = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 1 });
      const end = endOfWeek(endOfMonth(calendarMonth), { weekStartsOn: 1 });
      return eachDayOfInterval({ start, end });
   }, [calendarMonth]);

   const getBookingsForDay = (day: Date) =>
      roomBookings.filter((b) => {
         try {
            const start = parseISO(b.checkIn);
            const end = parseISO(b.checkOut);
            // checkout day is exclusive for overnight stays
            return isWithinInterval(day, { start, end }) && !isSameDay(day, end);
         } catch {
            return false;
         }
      });

   const RoomFormFields = (
      <div className="space-y-4">
         <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
               Nume Cameră *
            </label>
            <input
               type="text"
               required
               value={form.title}
               onChange={(e) => setForm({ ...form, title: e.target.value })}
               placeholder="ex: Camera Dublă cu Balcon"
               className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
            />
         </div>

         <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
               Descriere
            </label>
            <textarea
               rows={3}
               value={form.description}
               onChange={(e) => setForm({ ...form, description: e.target.value })}
               placeholder="Scurtă descriere a camerei..."
               className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500 resize-none"
            />
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Preț / noapte (lei) *
               </label>
               <input
                  type="number"
                  min={1}
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
               />
            </div>
            <div>
               <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Capacitate
               </label>
               <input
                  type="text"
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
               />
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Paturi
               </label>
               <input
                  type="text"
                  value={form.beds}
                  onChange={(e) => setForm({ ...form, beds: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
               />
            </div>
            <div>
               <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  Suprafață
               </label>
               <input
                  type="text"
                  value={form.surface}
                  onChange={(e) => setForm({ ...form, surface: e.target.value })}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
               />
            </div>
         </div>

         <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
               Badge (opțional)
            </label>
            <input
               type="text"
               value={form.badge}
               onChange={(e) => setForm({ ...form, badge: e.target.value })}
               placeholder="ex: Recomandat pentru cupluri"
               className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
            />
         </div>

         <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
               Facilități (separate prin virgulă)
            </label>
            <input
               type="text"
               value={form.amenitiesText}
               onChange={(e) => setForm({ ...form, amenitiesText: e.target.value })}
               className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
            />
         </div>

         <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 flex items-center gap-2">
               <FaCamera className="text-rose-500" />
               Poză Cameră *
            </label>
            <div className="rounded-xl overflow-hidden border border-neutral-200 mb-3">
               <ImageUpload
                  value={form.imageSrc}
                  onChange={(url) => setForm({ ...form, imageSrc: url })}
               />
            </div>
            <input
               type="url"
               value={form.imageSrc}
               onChange={(e) => setForm({ ...form, imageSrc: e.target.value })}
               placeholder="sau lipește un URL de imagine"
               className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl text-sm focus:outline-none focus:border-rose-500"
            />
         </div>
      </div>
   );

   return (
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 space-y-6">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h2 className="text-xl font-bold text-neutral-900">Gestiune Camere & Tarife</h2>
               <p className="text-xs text-neutral-500">
                  Adaugă camere, modifică poze și prețuri, vezi calendarul pe fiecare cameră
               </p>
            </div>
            <button
               onClick={openAdd}
               className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition shadow-sm"
            >
               <FaPlus className="text-xs" />
               Adaugă Cameră
            </button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
               <div
                  key={room.id}
                  className="border border-neutral-200 rounded-2xl p-5 flex flex-col gap-4 hover:border-neutral-300 transition"
               >
                  <div className="flex gap-4">
                     <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                        <Image
                           src={room.imageSrc}
                           alt={room.title}
                           fill
                           className="object-cover"
                        />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                           <h3 className="font-bold text-neutral-900 text-base leading-snug">
                              {room.title}
                           </h3>
                           <span
                              className={`shrink-0 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                 room.isAvailable
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-rose-100 text-rose-700"
                              }`}
                           >
                              {room.isAvailable ? "Disponibilă" : "Blocată"}
                           </span>
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                           {room.capacity} • {room.beds} • {room.surface}
                        </div>
                        <div className="mt-3 text-lg font-extrabold text-neutral-900">
                           {room.price} lei{" "}
                           <span className="text-xs font-normal text-neutral-500">/ noapte</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-neutral-100">
                     <button
                        onClick={() => openEdit(room)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition"
                     >
                        <FaEdit />
                        Editează
                     </button>
                     <button
                        onClick={() => openCalendar(room)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 transition"
                     >
                        <FaCalendarAlt />
                        Calendar
                     </button>
                     <button
                        onClick={() => toggleAvailability(room.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                           room.isAvailable
                              ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                              : "bg-emerald-500 text-white hover:bg-emerald-600"
                        }`}
                     >
                        {room.isAvailable ? "Blochează" : "Activează"}
                     </button>
                     <button
                        onClick={() => deleteRoom(room.id)}
                        className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                        title="Șterge camera"
                     >
                        <FaTrash />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {rooms.length === 0 && (
            <div className="text-center py-12 text-neutral-500 text-sm">
               Nu există camere. Apasă „Adaugă Cameră” pentru a începe.
            </div>
         )}

         {/* Add Room Modal */}
         {showAddModal && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                     <h3 className="text-lg font-bold text-neutral-900">Adaugă Cameră Nouă</h3>
                     <button
                        onClick={() => setShowAddModal(false)}
                        className="text-neutral-400 hover:text-neutral-700 font-bold"
                     >
                        ✕
                     </button>
                  </div>
                  <form onSubmit={handleSaveAdd} className="mt-4">
                     {RoomFormFields}
                     <div className="pt-5 flex items-center justify-end gap-3">
                        <button
                           type="button"
                           onClick={() => setShowAddModal(false)}
                           className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                        >
                           Renunță
                        </button>
                        <button
                           type="submit"
                           className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition shadow-md"
                        >
                           Salvează Camera
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* Edit Room Modal */}
         {editingRoom && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                     <h3 className="text-lg font-bold text-neutral-900">Editează Camera</h3>
                     <button
                        onClick={() => setEditingRoom(null)}
                        className="text-neutral-400 hover:text-neutral-700 font-bold"
                     >
                        ✕
                     </button>
                  </div>
                  <form onSubmit={handleSaveEdit} className="mt-4">
                     {RoomFormFields}
                     <div className="pt-5 flex items-center justify-end gap-3">
                        <button
                           type="button"
                           onClick={() => setEditingRoom(null)}
                           className="px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50"
                        >
                           Renunță
                        </button>
                        <button
                           type="submit"
                           className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition shadow-md"
                        >
                           Salvează Modificările
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {/* Per-room Calendar Modal */}
         {calendarRoom && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between pb-4 border-b border-neutral-200 gap-3">
                     <div>
                        <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                           <FaCalendarAlt className="text-rose-500" />
                           Calendar — {calendarRoom.title}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">
                           {calendarRoom.price} lei / noapte ·{" "}
                           {roomBookings.length} rezervări active pe această cameră
                        </p>
                     </div>
                     <button
                        onClick={() => setCalendarRoom(null)}
                        className="text-neutral-400 hover:text-neutral-700 font-bold"
                     >
                        ✕
                     </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                     <button
                        type="button"
                        onClick={() => setCalendarMonth((m) => subMonths(m, 1))}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200"
                     >
                        ← Luna ant.
                     </button>
                     <div className="text-sm font-bold text-neutral-900 capitalize">
                        {format(calendarMonth, "LLLL yyyy", { locale: ro })}
                     </div>
                     <button
                        type="button"
                        onClick={() => setCalendarMonth((m) => addMonths(m, 1))}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200"
                     >
                        Luna urm. →
                     </button>
                  </div>

                  <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-neutral-500 uppercase">
                     {["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"].map((d) => (
                        <div key={d} className="py-1">
                           {d}
                        </div>
                     ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 mt-1">
                     {calendarDays.map((day) => {
                        const dayBookings = getBookingsForDay(day);
                        const isBooked = dayBookings.length > 0;
                        const inMonth = isSameMonth(day, calendarMonth);
                        const isToday = isSameDay(day, new Date());
                        const tip = dayBookings
                           .map((b) => `${b.guestName} (${b.checkIn} → ${b.checkOut})`)
                           .join("\n");

                        return (
                           <div
                              key={day.toISOString()}
                              title={tip || undefined}
                              className={`min-h-[52px] rounded-lg p-1.5 text-left border transition ${
                                 !inMonth
                                    ? "bg-neutral-50 border-transparent text-neutral-300"
                                    : isBooked
                                    ? "bg-rose-50 border-rose-200 text-rose-800"
                                    : "bg-emerald-50/60 border-emerald-100 text-neutral-800"
                              } ${isToday ? "ring-2 ring-rose-400" : ""}`}
                           >
                              <div className="text-xs font-bold">{format(day, "d")}</div>
                              {isBooked && inMonth && (
                                 <div className="text-[9px] font-semibold truncate mt-0.5 leading-tight">
                                    {dayBookings[0].guestName}
                                    {dayBookings.length > 1 ? ` +${dayBookings.length - 1}` : ""}
                                 </div>
                              )}
                           </div>
                        );
                     })}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-neutral-600">
                     <span className="inline-flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" />
                        Liberă
                     </span>
                     <span className="inline-flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-rose-100 border border-rose-200" />
                        Rezervată
                     </span>
                     <span className="inline-flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded ring-2 ring-rose-400" />
                        Azi
                     </span>
                  </div>

                  {roomBookings.length > 0 && (
                     <div className="mt-6 border-t border-neutral-100 pt-4">
                        <h4 className="text-xs font-bold text-neutral-700 uppercase mb-3">
                           Rezervări pe această cameră
                        </h4>
                        <ul className="space-y-2">
                           {roomBookings.map((b) => (
                              <li
                                 key={b.id}
                                 className="flex items-center justify-between gap-3 text-sm bg-neutral-50 rounded-xl px-3 py-2"
                              >
                                 <div>
                                    <div className="font-semibold text-neutral-900">
                                       {b.guestName}
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                       {b.checkIn} → {b.checkOut}
                                    </div>
                                 </div>
                                 <span
                                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                       b.status === "Confirmată"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-amber-100 text-amber-700"
                                    }`}
                                 >
                                    {b.status}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}

                  {roomBookings.length === 0 && (
                     <p className="mt-5 text-sm text-neutral-500 text-center">
                        Nicio rezervare activă pe această cameră.
                     </p>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};

export default RoomManagement;
