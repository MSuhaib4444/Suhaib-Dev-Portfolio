import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { categories, projects, type Project } from "@/data/projects";
import { profile } from "@/data/content";
import { Section, SectionHeading, ease } from "./ui";

// Full project name on the cover: shrink the type as the name gets longer so it always fits.
function titleSize(title: string, big?: boolean) {
  const n = title.length;
  if (big) return n <= 10 ? "text-5xl" : n <= 20 ? "text-4xl" : "text-3xl";
  return n <= 10 ? "text-3xl" : n <= 20 ? "text-xl" : "text-lg";
}

function Cover({ p, big }: { p: Project; big?: boolean }) {
  const [a, b] = p.hue;
  const seed = p.title.length;
  return (
    <div className={`relative overflow-hidden rounded-xl ${big ? "h-52" : "h-36"}`} style={{ background: `linear-gradient(135deg, oklch(0.55 0.2 ${a}), oklch(0.45 0.22 ${b}))` }}>
      <svg aria-hidden viewBox="0 0 400 200" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none">
        <g fill="none" stroke="oklch(1 0 0 / 0.7)" strokeWidth="1">
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M0 ${44 + k * 18} ${Array.from({ length: 9 }, (_, i) => `Q ${i * 50 + 25} ${44 + k * 18 + (i % 2 ? -1 : 1) * (10 + (seed % 9) + k * 4)} ${(i + 1) * 50} ${44 + k * 18}`).join(" ")}`} />
          ))}
          <circle cx={300 - seed * 4} cy="40" r="26" />
          <circle cx={300 - seed * 4} cy="40" r="42" strokeDasharray="4 6" />
        </g>
      </svg>
      {/* Hue-derived scrim: keeps the full project name legible over the linework */}
      <div aria-hidden className="absolute inset-0" style={{ background: `linear-gradient(to top, oklch(0.28 0.11 ${b} / 0.8), oklch(0.28 0.11 ${b} / 0.32) 45%, transparent 72%)` }} />
      <div className={`absolute inset-x-0 bottom-0 line-clamp-2 break-words px-4 pb-3 font-display font-bold leading-tight text-primary-foreground drop-shadow ${titleSize(p.title, big)}`}>{p.title}</div>
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    mx.set(x); my.set(y); setGlow({ x: x * 100, y: y * 100, on: true });
  };
  const leave = () => { mx.set(0.5); my.set(0.5); setGlow((g) => ({ ...g, on: false })); };

  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, ease }}
      onMouseMove={move} onMouseLeave={leave} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`glass gradient-border group relative flex flex-col rounded-2xl p-4 ${p.featured ? "md:col-span-2 lg:col-span-3" : "lg:col-span-2"}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300" style={{ opacity: glow.on ? 1 : 0, background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, color-mix(in oklab, var(--cyan) 18%, transparent), transparent 60%)` }} />
      <Cover p={p} big={!!p.featured} />
      <div className="relative flex flex-1 flex-col p-2 pt-5">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          {p.featured && <span className="rounded-full bg-gradient-signature px-2 py-0.5 font-mono text-[10px] text-primary-foreground">FEATURED</span>}
        </div>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => <span key={t} className="rounded-md border px-2 py-0.5 font-mono text-xs text-muted-foreground">{t}</span>)}
        </div>
        <div className="mt-5 flex gap-2">
          {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm transition hover:text-cyan"><Github className="h-4 w-4" />GitHub</a>}
          {p.featured && p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn-hire inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium"><ExternalLink className="h-4 w-4" />Live Demo</a>}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const list = projects.filter((p) => cat === "All" || p.categories.includes(cat));
  return (
    <Section id="projects">
      <SectionHeading label="// featured_projects" title="Things I've built" sub="From AI data tools to physics simulators, a selection of 12 projects." />
      <div className="mb-10 flex flex-wrap gap-2" role="tablist">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`relative rounded-full border px-4 py-2 font-mono text-sm transition ${cat === c ? "text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}>
            {cat === c && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-gradient-signature" transition={{ type: "spring", damping: 25, stiffness: 300 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {list.map((p) => <ProjectCard key={p.title} p={p} />)}
        </AnimatePresence>
      </motion.div>
      <div className="mt-12 text-center">
        <a href={profile.github} target="_blank" rel="noreferrer" className="gradient-border inline-flex items-center gap-2 rounded-xl bg-card px-6 py-3 font-semibold transition hover:shadow-glow">
          See all repositories on GitHub <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}
