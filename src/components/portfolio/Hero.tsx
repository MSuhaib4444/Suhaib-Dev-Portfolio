import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile, roles } from "@/data/content";
import { ease } from "./ui";

// PROFILE PHOTO: add src/assets/profile.jpg, then import it and set PROFILE_SRC to it.
// e.g. import photo from "@/assets/profile.jpg"; const PROFILE_SRC = photo;
const PROFILE_SRC: string | null = null;

function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -999, y: -999 };
    const color = () => getComputedStyle(document.documentElement).getPropertyValue("--cyan").trim();
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize();
    const n = Math.min(70, Math.floor(w / 18));
    const pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const col = color();
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { p.x += dx / d; p.y += dy / d; }
      }
      ctx.fillStyle = col; ctx.strokeStyle = col;
      pts.forEach((a, i) => {
        ctx.globalAlpha = 0.6;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.4, 0, 7); ctx.fill();
        for (const b of pts.slice(i + 1)) {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) { ctx.globalAlpha = (1 - d / 130) * 0.25; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      });
      if (reduce) return;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    const mm = (e: MouseEvent) => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mm);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", mm); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}

function useTypewriter(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length] ?? "";
    const t = setTimeout(() => {
      if (!del && text === word) return setDel(true);
      if (del && text === "") { setDel(false); return setI(i + 1); }
      setText(word.slice(0, text.length + (del ? -1 : 1)));
    }, !del && text === word ? 1600 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

const code = `const developer = {
  name: "Muhammad Suhaib Raza",
  role: "Software Engineer",
  location: "Karachi, PK",
  stack: ["React", "Next.js", "TanStack",
          "React Native", "Flutter"],
  superpower: "AI-powered workflow",
  available: true,
};`;

function Terminal() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= code.length) return;
    const t = setTimeout(() => setN(n + 2), 18);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div className="glass gradient-border overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-magenta" />
        <span className="h-3 w-3 rounded-full bg-violet" />
        <span className="h-3 w-3 rounded-full bg-cyan" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">developer.ts</span>
      </div>
      <pre className="min-h-[250px] overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-foreground/90">
        <code>{code.slice(0, n)}</code><span className="animate-blink text-cyan">▋</span>
      </pre>
    </div>
  );
}

export function Hero() {
  const role = useTypewriter(roles);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 200]);
  const y2 = useTransform(scrollY, [0, 800], [0, -120]);

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-grid pt-28 pb-16">
      <Particles />
      <motion.div style={{ y: y1 }} aria-hidden className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet opacity-[var(--orb-opacity)] blur-[120px]" />
      <motion.div style={{ y: y2 }} aria-hidden className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-magenta opacity-[var(--orb-opacity)] blur-[120px]" />
      {/* Atom / orbit motif */}
      <motion.svg style={{ y: y2 }} aria-hidden viewBox="0 0 200 200" className="absolute right-[8%] top-24 hidden h-56 w-56 animate-spin-slow opacity-30 lg:block">
        <g fill="none" stroke="var(--cyan)" strokeWidth="0.6">
          <ellipse cx="100" cy="100" rx="90" ry="30" />
          <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="90" ry="30" transform="rotate(120 100 100)" />
        </g>
        <circle cx="100" cy="100" r="5" fill="var(--magenta)" />
      </motion.svg>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="font-mono text-sm text-cyan">{"> hello_world.init()"}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.45 }} className="glitch-hover mt-4 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Muhammad Suhaib Raza</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="mt-5 h-9 font-mono text-xl md:text-2xl">
            <span className="text-muted-foreground">I am a </span>
            <span className="text-foreground">{role}</span>
            <span className="animate-blink text-magenta">|</span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 1.8 }} className="mt-6 max-w-xl text-lg text-muted-foreground">
            I build fast, polished web and mobile apps for clients, and I integrate AI tools into real products to ship better, faster.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 1.9 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-hire rounded-xl px-7 py-3.5 font-semibold">Hire Me</a>
            <a href="#projects" className="gradient-border rounded-xl bg-card px-7 py-3.5 font-semibold transition hover:shadow-glow">View Projects</a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.05 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{profile.location}</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative h-2.5 w-2.5 rounded-full bg-success" /></span>
              Available for freelance projects
            </span>
            <span className="flex gap-2">
              {[{ h: profile.github, i: Github, l: "GitHub" }, { h: `mailto:${profile.email}`, i: Mail, l: "Email" }, { h: profile.phoneHref, i: Phone, l: "Phone" }].map(({ h, i: I, l }) => (
                <a key={l} href={h} aria-label={l} target={l === "GitHub" ? "_blank" : undefined} rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg border bg-card transition hover:text-cyan hover:shadow-glow"><I className="h-4 w-4" /></a>
              ))}
            </span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 1.6 }} className="relative">
          <div className="absolute -top-10 right-4 z-10">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-signature p-[3px]" />
              <div className="absolute inset-[3px] grid place-items-center overflow-hidden rounded-full bg-background">
                {PROFILE_SRC ? <img src={PROFILE_SRC} alt="Muhammad Suhaib Raza" className="h-full w-full object-cover" /> : <span className="font-display text-2xl font-bold text-gradient">MSR</span>}
              </div>
            </div>
          </div>
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
