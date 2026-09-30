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
const dates = [{ day: "Dnes", date: "30. zář" }, { day: "Zítra", date: "1. říj" }, { day: "Pátek", date: "2. říj" }];
const times = ["09:00", "11:30", "14:00", "16:30", "18:00"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState<ServiceId>("detail");
  const [date, setDate] = useState("Zítra");
  const [time, setTime] = useState("11:30");
  const service = useMemo(() => studio.services.find((item) => item.id === serviceId) ?? studio.services[0], [serviceId]);
  const go = (next: Screen) => { setScreen(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const startBooking = (id?: ServiceId) => { if (id) setServiceId(id); setStep(1); setBookingOpen(true); };
  return <div className="app-shell">
    <header className="topbar"><button className="wordmark" onClick={() => go("home")} aria-label="DRVN — domů"><span className="brand-mark"><img src="/drvn-logo.jpg" alt="" aria-hidden="true"/></span><span>DRVN</span></button><nav className="desktop-nav" aria-label="Hlavní navigace"><button className={screen === "home" ? "active" : ""} onClick={() => go("home")}>Domů</button><button className={screen === "services" ? "active" : ""} onClick={() => go("services")}>Služby</button><button className={screen === "booking" ? "active" : ""} onClick={() => go("booking")}>Moje rezervace</button></nav><AstryxButton label="Rezervovat" size="lg" onClick={() => startBooking()} /></header>
    <main>{screen === "home" && <HomeScreen onBook={() => startBooking()} onServices={() => go("services")} />}{screen === "services" && <ServicesScreen onBook={startBooking} />}{screen === "booking" && <BookingScreen onBook={() => startBooking()} />}</main>
    <MobileDock screen={screen} onChange={go} />
    <BookingDialog open={bookingOpen} setOpen={setBookingOpen} step={step} setStep={setStep} serviceId={serviceId} setServiceId={setServiceId} service={service} date={date} setDate={setDate} time={time} setTime={setTime} />
  </div>;
}

function HomeScreen({ onBook, onServices }: { onBook: () => void; onServices: () => void }) {
  return <div className="screen home-screen"><section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><Badge variant="secondary" className="availability-badge"><span className="pulse-dot"/> Nejbližší termín — zítra v 11:30</Badge><h1 id="hero-title">Auto, za kterým<br/>se ohlédnete.</h1><p>Detailing a šetrná péče v Praze. Férová diagnostika, jasná cena a rezervace bez volání.</p></div><div className="hero-media"><img src="/hero-porsche.png" alt="Černé Porsche v detailingovém studiu DRVN"/><div className="media-shade"/></div><button className="press-button hero-cta" onClick={onBook}><span>Rezervovat</span><i><ArrowRight weight="bold" aria-hidden="true"/></i></button><div className="hero-proof"><span><Star weight="fill" aria-hidden="true"/> {studio.rating}</span><span>{studio.reviews} recenzí</span><span>Záruka na práci</span></div></section>
    <section className="mobile-summary" aria-label="O studiu"><h1>DRVN</h1><p>Detailing, který vrací laku hloubku a interiéru čistotu.</p><div className="stat-grid"><article><Wrench weight="fill"/><strong>{studio.services.length}</strong><span>služby v ceníku</span></article><article><CarProfile weight="fill"/><strong>3</strong><span>boxy v provozu</span></article><article className="price-stat"><Tag weight="fill"/><strong>od 3 500 Kč</strong><span>za službu</span></article></div></section>
    <section className="home-booking" aria-labelledby="quick-booking-title"><h2 id="quick-booking-title">Rezervace do studia</h2><div className="home-booking-grid"><article className="glass-panel booking-panel"><div><h3>Svěží vzhled pro váš vůz</h3><p>Vyberte službu a vhodný termín — o zbytek se postaráme.</p></div><button onClick={onBook}>Vybrat termín <ArrowRight/></button></article><article className="glass-panel ai-panel"><div className="ai-icon"><Sparkle weight="fill"/></div><div><h3>Chytrý výběr s AI</h3><p>Doporučí vhodnou péči pro váš vůz a ukáže volné termíny.</p></div><button onClick={onServices}>Vybrat službu <ArrowRight/></button></article></div></section>
    <section className="glass-panel studio-card"><div><MapPin weight="fill"/><span><strong>{studio.address}</strong><small>8 minut z centra</small></span></div><div><Clock weight="fill"/><span><strong>{studio.hours}</strong><small>otevírací doba studia</small></span></div><button onClick={onServices}>Trasa <ArrowRight/></button></section>
    <section className="home-map" aria-labelledby="map-title"><div className="map-frame"><iframe title="Mapa studia DRVN" src="https://www.google.com/maps?q=50.0812,14.4258&z=15&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></div><div className="map-caption"><span className="map-pin"><MapPin weight="fill" aria-hidden="true"/></span><span><small id="map-title">MÍSTO NA MAPĚ</small><strong>Praha · orientační poloha studia</strong></span><span className="map-provider">Google Maps</span></div></section>
  </div>;
}

function ServicesScreen({ onBook }: { onBook: (id: ServiceId) => void }) {
  return <div className="screen services-screen"><section className="screen-head"><p className="eyebrow">SLUŽBY / 04</p><h1>Co dopřejeme<br/>vašemu vozu</h1><p>Konečnou cenu potvrdí technik po prohlídce. Pokud by se měla změnit, nejdříve se s vámi domluvíme.</p></section><section className="service-list" aria-label="Služby studia">{studio.services.map((item, index) => <button className="service-row" key={item.id} onClick={() => onBook(item.id)}><span className="service-number">0{index + 1}</span><span className="service-name"><strong>{item.name}</strong><small>{item.note}</small><b>{item.price}</b></span><ArrowRight className="service-arrow" aria-hidden="true"/></button>)}</section><section className="service-footer-card"><CarProfile weight="duotone"/><div><small>Nevíte, co vybrat?</small><strong>Začněte diagnostikou</strong></div><button onClick={() => onBook("detail")} aria-label="Rezervovat diagnostiku"><ArrowRight/></button></section></div>;
}

function BookingScreen({ onBook }: { onBook: () => void }) {
  return <div className="screen booking-screen"><section className="screen-head"><p className="eyebrow">MOJE REZERVACE</p><h1>Vše pod<br/>kontrolou.</h1><p>Po rezervaci zde uvidíte čas návštěvy, stav zakázky i kontakt na technika.</p></section><section className="empty-booking"><div className="empty-icon"><CalendarBlank weight="duotone"/></div><p className="eyebrow">ZATÍM BEZ REZERVACE</p><h2>Vytvoříme první rezervaci?</h2><p>Vyberte službu a vhodný termín. Zabere to méně než minutu.</p><button className="press-button" onClick={onBook}><span>Vybrat termín</span><i><ArrowRight weight="bold"/></i></button></section><section className="contact-bar"><div><Phone/><span><small>Zavolat</small><strong>{studio.phone}</strong></span></div><div><MapPin/><span><small>Adresa</small><strong>{studio.address}</strong></span></div></section></div>;
}

function MobileDock({ screen, onChange }: { screen: Screen; onChange: (screen: Screen) => void }) {
  const items = [{ id: "home" as const, label: "Domů", icon: House }, { id: "services" as const, label: "Služby", icon: Wrench }, { id: "booking" as const, label: "Rezervace", icon: CalendarBlank }];
  const index = items.findIndex((item) => item.id === screen);
  return <nav className="mobile-dock" style={{ "--active-index": index } as React.CSSProperties} aria-label="Mobilní navigace"><span className="dock-glider"/>{items.map(({ id, label, icon: Icon }) => <button key={id} className={screen === id ? "active" : ""} onClick={() => onChange(id)}><Icon weight={screen === id ? "fill" : "regular"}/><span>{label}</span></button>)}</nav>;
}

type BookingDialogProps = { open: boolean; setOpen: (value: boolean) => void; step: number; setStep: (value: number) => void; serviceId: ServiceId; setServiceId: (id: ServiceId) => void; service: (typeof studio.services)[number]; date: string; setDate: (value: string) => void; time: string; setTime: (value: string) => void };
function BookingDialog({ open, setOpen, step, setStep, serviceId, setServiceId, service, date, setDate, time, setTime }: BookingDialogProps) {
  return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="booking-dialog"><DialogHeader><div className="dialog-progress"><span style={{ width: `${step * 25}%` }}/></div><div className="dialog-meta"><span>KROK {step} / 4</span>{step > 1 && step < 4 && <button onClick={() => setStep(step - 1)}><ArrowLeft/> Zpět</button>}</div><DialogTitle>{step === 4 ? "Rezervace vytvořena" : "Rezervace v DRVN"}</DialogTitle><DialogDescription>{step === 1 && "Vyberte službu, kterou chcete rezervovat."}{step === 2 && "Vyberte den a volný čas."}{step === 3 && "Zanechte nám kontakt — registrace není potřeba."}{step === 4 && `${date}, ${time}`}</DialogDescription></DialogHeader>
    {step === 1 && <div className="dialog-options">{studio.services.map((item) => <button key={item.id} aria-pressed={serviceId === item.id} className={serviceId === item.id ? "option-card selected" : "option-card"} onClick={() => setServiceId(item.id)}><span className="animated-check" aria-hidden="true"><svg viewBox="0 0 64 64"><path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938"/></svg></span><span className="option-copy"><strong>{item.name}</strong><small>{item.duration}</small></span><b>{item.price}</b></button>)}</div>}
    {step === 2 && <div className="date-time-picker"><div className="date-row">{dates.map((item) => <button key={item.day} className={date === item.day ? "selected" : ""} onClick={() => setDate(item.day)}><strong>{item.day}</strong><span>{item.date}</span></button>)}</div><p>Volné časy</p><div className="time-grid">{times.map((item, index) => <button key={item} disabled={index === 0 || index === 3} className={time === item ? "selected" : ""} onClick={() => setTime(item)}>{item}<small>{index === 0 || index === 3 ? "obsazeno" : "volno"}</small></button>)}</div></div>}
    {step === 3 && <FieldGroup><Field><FieldLabel htmlFor="name">Jméno</FieldLabel><Input id="name" placeholder="Jan Novák" autoComplete="name"/></Field><Field><FieldLabel htmlFor="phone">Telefon</FieldLabel><Input id="phone" placeholder="+420 777 000 000" type="tel" autoComplete="tel"/></Field><Field><FieldLabel htmlFor="car">Vůz</FieldLabel><Input id="car" placeholder="BMW 3, černé"/></Field></FieldGroup>}
    {step === 4 && <div className="success-state"><CheckCircle weight="fill"/><div><span>{service.name}</span><strong>{service.price}</strong></div><p><MapPin/> {studio.address}</p><p><Clock/> {date}, {time}</p></div>}
    <DialogFooter><Button className="dialog-next" onClick={() => step < 4 ? setStep(step + 1) : setOpen(false)}>{step === 3 ? "Potvrdit rezervaci" : step === 4 ? "Hotovo" : "Pokračovat"}{step < 4 && <ArrowRight data-icon="inline-end"/>}</Button></DialogFooter></DialogContent></Dialog>;
}
