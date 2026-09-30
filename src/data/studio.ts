export const studio = {
  name: "DRVN", city: "Praha 9", address: "Kolbenova 42, Praha", phone: "+420 777 240 909",
  hours: "Пн–Сб · 08:00–20:00", rating: "4.9", reviews: 184,
  services: [
    { id: "detail", name: "Глубокий детейлинг", note: "Кузов и салон за один визит", price: "от 8 900 Kč", duration: "6–8 ч" },
    { id: "ceramic", name: "Керамическая защита", note: "Блеск и защита до 36 месяцев", price: "от 12 500 Kč", duration: "1–2 дня" },
    { id: "polish", name: "Полировка кузова", note: "Убираем риски и возвращаем глубину", price: "от 6 400 Kč", duration: "5–7 ч" },
    { id: "interior", name: "Химчистка салона", note: "Ткань, кожа, пластик и запахи", price: "от 4 900 Kč", duration: "4–6 ч" }
  ]
} as const;
export type ServiceId = (typeof studio.services)[number]["id"];
