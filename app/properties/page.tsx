import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return (
         <ClientOnly>
            <EmptyState title="Neautorizat" subTitle="Te rugăm să te autentifici" />
         </ClientOnly>
      );
   }
   const listings = await getListings({ userId: currentUser.id });

   if (listings.length === 0) {
      return (
         <ClientOnly>
            <EmptyState
               title="Nu ai nicio proprietate publicată"
               subTitle="Se pare că nu ai adăugat încă nicio proprietate."
            />
         </ClientOnly>
      );
   }

   return (
      <ClientOnly>
         <PropertiesClient listings={listings} currentUser={currentUser} />
      </ClientOnly>
   );
};

export default PropertiesPage;
