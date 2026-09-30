import { useMemo, useState } from "react";
import { Button as AstryxButton } from "@astryxdesign/core/Button";
import { ArrowLeft } from "@phosphor-icons/react/ArrowLeft";
import { ArrowRight } from "@phosphor-icons/react/ArrowRight";
import { CalendarBlank } from "@phosphor-icons/react/CalendarBlank";
import { CarProfile } from "@phosphor-icons/react/CarProfile";
import { CheckCircle } from "@phosphor-icons/react/CheckCircle";
import { Clock } from "@phosphor-icons/react/Clock";
import { House } from "@phosphor-icons/react/House";
import { MapPin } from "@phosphor-icons/react/MapPin";
import { Phone } from "@phosphor-icons/react/Phone";
import { ShieldCheck } from "@phosphor-icons/react/ShieldCheck";
import { Sparkle } from "@phosphor-icons/react/Sparkle";
import { Star } from "@phosphor-icons/react/Star";
import { Wrench } from "@phosphor-icons/react/Wrench";
import { Tag } from "@phosphor-icons/react/Tag";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { studio, type ServiceId } from "@/data/studio";

type Screen = "home" | "services" | "booking";
const dates = [{ day: "Сегодня", date: "30 сен" }, { day: "Завтра", date: "1 окт" }, { day: "Пятница", date: "2 окт" }];
const times = ["09:00", "11:30", "14:00", "16:30", "18:00"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState<ServiceId>("detail");
  const [date, setDate] = useState("Завтра");
  const [time, setTime] = useState("11:30");
  const service = useMemo(() => studio.services.find((item) => item.id === serviceId) ?? studio.services[0], [serviceId]);
  const go = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const startBooking = (id?: ServiceId) => { if (id) setServiceId(id); setStep(1); setBookingOpen(true); };
  return <div className="app-shell">
    <header className="topbar"><button className="wordmark" onClick={() => go("home")} aria-label="DRVN — на главную"><span className="brand-mark"><img src="/drvn-logo.jpg" alt="" aria-hidden="true"/></span><span>DRVN</span></button><nav className="desktop-nav" aria-label="Основная навигация"><button className={screen === "home" ? "active" : ""} onClick={() => go("home")}>Главная</button><button className={screen === "services" ? "active" : ""} onClick={() => go("services")}>Услуги</button><button className={screen === "booking" ? "active" : ""} onClick={() => go("booking")}>Моя запись</button></nav><AstryxButton label="Записаться" size="lg" onClick={() => startBooking()} /></header>
    <main>{screen === "home" && <HomeScreen onBook={() => startBooking()} onServices={() => go("services")} />}{screen === "services" && <ServicesScreen onBook={startBooking} />}{screen === "booking" && <BookingScreen onBook={() => startBooking()} />}</main>
    <MobileDock screen={screen} onChange={go} />
    <BookingDialog open={bookingOpen} setOpen={setBookingOpen} step={step} setStep={setStep} serviceId={serviceId} setServiceId={setServiceId} service={service} date={date} setDate={setDate} time={time} setTime={setTime} />
  </div>;
}

function HomeScreen({ onBook, onServices }: { onBook: () => void; onServices: () => void }) {
  return <div className="screen home-screen"><section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><Badge variant="secondary" className="availability-badge"><span className="pulse-dot"/> Ближайшее окно — завтра в 11:30</Badge><h1 id="hero-title">Машина, к которой<br/>хочется обернуться.</h1><p>Детейлинг и бережный сервис в Праге. Честная диагностика, понятная цена и запись без звонков.</p></div><div className="hero-media"><img src="/hero-porsche.png" alt="Чёрный Porsche в детейлинг-студии DRVN"/><div className="media-shade"/></div><button className="press-button hero-cta" onClick={onBook}><span>Записаться</span><i><ArrowRight weight="bold" aria-hidden="true"/></i></button><div className="hero-proof"><span><Star weight="fill" aria-hidden="true"/> {studio.rating}</span><span>{studio.reviews} отзывов</span><span>Гарантия на работы</span></div></section>
    <section className="mobile-summary" aria-label="О студии"><h1>DRVN</h1><p>Детейлинг, который возвращает кузову глубину, а салону — чистоту.</p><div className="stat-grid"><article><Wrench weight="fill"/><strong>{studio.services.length}</strong><span>услуги в прайсе</span></article><article><CarProfile weight="fill"/><strong>3</strong><span>бокса в работе</span></article><article className="price-stat"><Tag weight="fill"/><strong>от 3 500 Kč</strong><span>за услугу</span></article></div></section>
    <section className="home-booking" aria-labelledby="quick-booking-title"><h2 id="quick-booking-title">Запись в студию</h2><div className="home-booking-grid"><article className="glass-panel booking-panel"><div><h3>Свежий вид для вашего авто</h3><p>Выберите услугу и удобное время — остальное возьмём на себя.</p></div><button onClick={onBook}>Выбрать время <ArrowRight/></button></article><article className="glass-panel ai-panel"><div className="ai-icon"><Sparkle weight="fill"/></div><div><h3>Запись с AI</h3><p>Подберёт услугу для автомобиля и покажет актуальное время.</p></div><button onClick={onServices}>Подобрать услугу <ArrowRight/></button></article></div></section>
    <section className="glass-panel studio-card"><div><MapPin weight="fill"/><span><strong>{studio.address}</strong><small>8 минут от центра</small></span></div><div><Clock weight="fill"/><span><strong>{studio.hours}</strong><small>по времени студии</small></span></div><button onClick={onServices}>Маршрут <ArrowRight/></button></section>
    <section className="home-map" aria-labelledby="map-title"><div className="map-frame"><iframe title="Карта расположения DRVN" src="https://www.google.com/maps?q=50.0812,14.4258&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div><div className="map-caption"><span className="map-pin"><MapPin weight="fill" aria-hidden="true"/></span><span><small id="map-title">ТОЧКА НА КАРТЕ</small><strong>Прага · ориентир студии</strong></span><span className="map-provider">Google Maps</span></div></section>
  </div>;
}

function ServicesScreen({ onBook }: { onBook: (id: ServiceId) => void }) {
  return <div className="screen services-screen"><section className="screen-head"><p className="eyebrow">УСЛУГИ / 04</p><h1>Что сделаем<br/>с машиной</h1><p>Финальную стоимость мастер подтвердит после осмотра. Если цена изменится — сначала согласуем с вами.</p></section><section className="service-list" aria-label="Услуги студии">{studio.services.map((item, index) => <button className="service-row" key={item.id} onClick={() => onBook(item.id)}><span className="service-number">0{index + 1}</span><span className="service-name"><strong>{item.name}</strong><small>{item.note}</small><b>{item.price}</b></span><ArrowRight className="service-arrow" aria-hidden="true"/></button>)}</section><section className="service-footer-card"><CarProfile weight="duotone"/><div><small>Не уверены, что выбрать?</small><strong>Начните с диагностики</strong></div><button onClick={() => onBook("detail")} aria-label="Записаться на диагностику"><ArrowRight/></button></section></div>;
}

function BookingScreen({ onBook }: { onBook: () => void }) {
  return <div className="screen booking-screen"><section className="screen-head"><p className="eyebrow">МОЯ ЗАПИСЬ</p><h1>Всё под<br/>контролем.</h1><p>После записи здесь появятся время визита, статус работ и контакты мастера.</p></section><section className="empty-booking"><div className="empty-icon"><CalendarBlank weight="duotone"/></div><p className="eyebrow">ПЛАНОВ НЕТ</p><h2>Создадим первую запись?</h2><p>Выберите услугу и удобное окно. Это займёт меньше минуты.</p><button className="press-button" onClick={onBook}><span>Выбрать время</span><i><ArrowRight weight="bold"/></i></button></section><section className="contact-bar"><div><Phone/><span><small>Позвонить</small><strong>{studio.phone}</strong></span></div><div><MapPin/><span><small>Адрес</small><strong>{studio.address}</strong></span></div></section></div>;
}

function MobileDock({ screen, onChange }: { screen: Screen; onChange: (screen: Screen) => void }) {
  const items = [{ id: "home" as const, label: "Главная", icon: House }, { id: "services" as const, label: "Услуги", icon: Wrench }, { id: "booking" as const, label: "Моя запись", icon: CalendarBlank }];
  const index = items.findIndex((item) => item.id === screen);
  return <nav className="mobile-dock" style={{ "--active-index": index } as React.CSSProperties} aria-label="Мобильная навигация"><span className="dock-glider"/>{items.map(({ id, label, icon: Icon }) => <button key={id} className={screen === id ? "active" : ""} onClick={() => onChange(id)}><Icon weight={screen === id ? "fill" : "regular"}/><span>{label}</span></button>)}</nav>;
}

type BookingDialogProps = { open: boolean; setOpen: (value: boolean) => void; step: number; setStep: (value: number) => void; serviceId: ServiceId; setServiceId: (id: ServiceId) => void; service: (typeof studio.services)[number]; date: string; setDate: (value: string) => void; time: string; setTime: (value: string) => void };
function BookingDialog({ open, setOpen, step, setStep, serviceId, setServiceId, service, date, setDate, time, setTime }: BookingDialogProps) {
  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="booking-dialog"><DialogHeader><div className="dialog-progress"><span style={{ width: `${step * 25}%` }}/></div><div className="dialog-meta"><span>ШАГ {step} / 4</span>{step > 1 && step < 4 && <button onClick={() => setStep(step - 1)}><ArrowLeft/> Назад</button>}</div><DialogTitle>{step === 4 ? "Запись создана" : "Запись в DRVN"}</DialogTitle><DialogDescription>{step === 1 && "Выберите услугу, с которой хотите начать."}{step === 2 && "Выберите день и свободное время."}{step === 3 && "Оставьте контакты — регистрация не нужна."}{step === 4 && `${date}, ${time}`}</DialogDescription></DialogHeader>
    {step === 1 && <div className="dialog-options">{studio.services.map((item) => <button key={item.id} aria-pressed={serviceId === item.id} className={serviceId === item.id ? "option-card selected" : "option-card"} onClick={() => setServiceId(item.id)}><span className="animated-check" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938"/></svg></span><span className="option-copy"><strong>{item.name}</strong><small>{item.duration}</small></span><b>{item.price}</b></button>)}</div>}
    {step === 2 && <div className="date-time-picker"><div className="date-row">{dates.map((item) => <button key={item.day} className={date === item.day ? "selected" : ""} onClick={() => setDate(item.day)}><strong>{item.day}</strong><span>{item.date}</span></button>)}</div><p>Свободное время</p><div className="time-grid">{times.map((item, index) => <button key={item} disabled={index === 0 || index === 3} className={time === item ? "selected" : ""} onClick={() => setTime(item)}>{item}<small>{index === 0 || index === 3 ? "занято" : "свободно"}</small></button>)}</div></div>}
    {step === 3 && <FieldGroup><Field><FieldLabel htmlFor="name">Имя</FieldLabel><Input id="name" placeholder="Алексей" autoComplete="name"/></Field><Field><FieldLabel htmlFor="phone">Телефон</FieldLabel><Input id="phone" placeholder="+420 777 000 000" type="tel" autoComplete="tel"/></Field><Field><FieldLabel htmlFor="car">Автомобиль</FieldLabel><Input id="car" placeholder="BMW 3, чёрный"/></Field></FieldGroup>}
    {step === 4 && <div className="success-state"><CheckCircle weight="fill"/><div><span>{service.name}</span><strong>{service.price}</strong></div><p><MapPin/> {studio.address}</p><p><Clock/> {date}, {time}</p></div>}
    <DialogFooter><Button className="dialog-next" onClick={() => step < 4 ? setStep(step + 1) : setOpen(false)}>{step === 3 ? "Подтвердить запись" : step === 4 ? "Готово" : "Продолжить"}{step < 4 && <ArrowRight data-icon="inline-end"/>}</Button></DialogFooter></DialogContent></Dialog>;
}
