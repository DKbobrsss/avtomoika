export const studio = {
  name: "DRVN", city: "Praha 9", address: "Kolbenova 42, Praha", phone: "+420 777 240 909",
  hours: "Po–So · 08:00–20:00", rating: "4.9", reviews: 184,
  services: [
    { id: "detail", name: "Kompletní detailing", note: "Karoserie i interiér během jedné návštěvy", price: "od 8 900 Kč", duration: "6–8 h" },
    { id: "ceramic", name: "Keramická ochrana", note: "Lesk a ochrana až na 36 měsíců", price: "od 12 500 Kč", duration: "1–2 dny" },
    { id: "polish", name: "Leštění laku", note: "Odstraníme škrábance a vrátíme laku hloubku", price: "od 6 400 Kč", duration: "5–7 h" },
    { id: "interior", name: "Čištění interiéru", note: "Textil, kůže, plasty i nežádoucí pachy", price: "od 4 900 Kč", duration: "4–6 h" }
  ]
} as const;
export type ServiceId = (typeof studio.services)[number]["id"];
