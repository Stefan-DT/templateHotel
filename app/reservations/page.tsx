import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return (
         <ClientOnly>
            <EmptyState title="Neautorizat" subTitle="Te rugăm să te autentifici" />
         </ClientOnly>
      );
   }

   const reservations = await getReservations({
      authorId: currentUser?.id,
   });

   if (reservations.length === 0) {
      return (
         <ClientOnly>
            <EmptyState
               title="Nicio rezervare găsită"
               subTitle="Se pare că nu ai primit încă nicio rezervare pentru proprietățile tale."
            />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
         <ReservationsClient reservations={reservations} currentUser={currentUser} />
      </ClientOnly>
   );
};

export default ReservationsPage;
