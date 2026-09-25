"use client";

import Container from "../Container";
import { FaUmbrellaBeach } from "@react-icons/all-files/fa/FaUmbrellaBeach";
import { FaMountain } from "@react-icons/all-files/fa/FaMountain";
import { FaSwimmingPool } from "@react-icons/all-files/fa/FaSwimmingPool";
import { GiBarn } from "@react-icons/all-files/gi/GiBarn";
import { GiBoatFishing } from "@react-icons/all-files/gi/GiBoatFishing";
import { GiCactus } from "@react-icons/all-files/gi/GiCactus";
import { GiCastle } from "@react-icons/all-files/gi/GiCastle";
import { GiCaveEntrance } from "@react-icons/all-files/gi/GiCaveEntrance";
import { GiForestCamp } from "@react-icons/all-files/gi/GiForestCamp";
import { GiIsland } from "@react-icons/all-files/gi/GiIsland";
import { GiWindmill } from "@react-icons/all-files/gi/GiWindmill";
import { FaSkiing } from "@react-icons/all-files/fa/FaSkiing";
import { GiCutDiamond } from "@react-icons/all-files/gi/GiCutDiamond";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaSnowflake } from "@react-icons/all-files/fa/FaSnowflake";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
   {
      label: "Plajă",
      icon: FaUmbrellaBeach,
      description: "Această proprietate este aproape de plajă",
   },
   {
      label: "Mori de vânt",
      icon: GiWindmill,
      description: "Această proprietate are moară de vânt",
   },
   {
      label: "Modern",
      icon: FaHome,
      description: "Această proprietate are un design modern",
   },
   {
      label: "La munte",
      icon: FaMountain,
      description: "Această proprietate se află în zonă montană sau rurală",
   },
   {
      label: "Piscine",
      icon: FaSwimmingPool,
      description: "Această proprietate dispune de piscină",
   },
   {
      label: "Insule",
      icon: GiIsland,
      description: "Această proprietate se află pe o insulă",
   },
   {
      label: "Lac",
      icon: GiBoatFishing,
      description: "Această proprietate este situată lângă un lac",
   },
   {
      label: "Schi",
      icon: FaSkiing,
      description: "Această proprietate oferă acces la pârtii de schi",
   },
   {
      label: "Castele",
      icon: GiCastle,
      description: "Această proprietate se află într-un castel istoric",
   },
   {
      label: "Camping",
      icon: GiForestCamp,
      description: "Această proprietate oferă experiențe de camping",
   },
   {
      label: "Arctic",
      icon: FaSnowflake,
      description: "Această proprietate se află într-o zonă arctică",
   },
   {
      label: "Peșteri",
      icon: GiCaveEntrance,
      description: "Această proprietate oferă tururi și cazare lângă peșteri",
   },
   {
      label: "Deșert",
      icon: GiCactus,
      description: "Această proprietate se află într-o zonă de deșert",
   },
   {
      label: "Cabane",
      icon: GiBarn,
      description: "Această proprietate este amenajată într-o cabană tradițională",
   },
   {
      label: "Lux",
      icon: GiCutDiamond,
      description: "Această proprietate oferă facilități exclusiviste de lux",
   },
];

const Categories = () => {
   const params = useSearchParams();
   const category = params?.get("category");
   const pathName = usePathname();

   const isMainPage = pathName === "/";

   if (!isMainPage) {
      return null;
   }

   return (
      <Container>
         <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => (
               <CategoryBox
                  key={item.label}
                  label={item.label}
                  selected={category === item.label}
                  icon={item.icon}
               />
            ))}
         </div>
      </Container>
   );
};
export default Categories;
