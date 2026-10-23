import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return { dark, toggle };
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-signature" />;
}

export function Navbar() {
  const { dark, toggle } = useTheme();
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass" : ""}`} aria-label="Main">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          Suhaib<span className="text-gradient">.dev</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${active === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {l.label}
                {active === l.id && <motion.span layoutId="nav-dot" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-signature" />}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle color theme" className="grid h-10 w-10 place-items-center rounded-xl border bg-card transition hover:shadow-glow">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={dark ? "m" : "s"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                {dark ? <Moon className="h-4 w-4 text-cyan" /> : <Sun className="h-4 w-4 text-magenta" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <a href="#contact" className="btn-hire hidden rounded-xl px-4 py-2.5 text-sm font-semibold sm:inline-block">Hire Me</a>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-xl border bg-card md:hidden"><Menu className="h-5 w-5" /></button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md md:hidden" onClick={() => setOpen(false)}>
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28 }} className="glass ml-auto flex h-full w-72 flex-col gap-2 p-6" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="mb-4 self-end"><X /></button>
              {navLinks.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 font-display text-lg hover:bg-muted">{l.label}</a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-hire mt-4 rounded-xl px-4 py-3 text-center font-semibold">Hire Me</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 800);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a href="#top" aria-label="Back to top" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="btn-hire fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full">
          <ArrowUp className="h-5 w-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const f = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", f);
    return () => window.removeEventListener("mousemove", f);
  }, []);
  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet opacity-[0.08] blur-[100px]" style={{ left: pos.x, top: pos.y }} />
  );
}

export function Intro() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1300); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div exit={{ opacity: 0, transition: { duration: 0.4 } }} className="fixed inset-0 z-[80] grid place-items-center bg-background">
          <motion.div initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.15em" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="font-display text-4xl font-bold text-gradient">
            MSR
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
