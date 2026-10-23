import { motion, useScroll } from "framer-motion";
import { Atom, Award, Bot, Briefcase, Code2, Database, GraduationCap, Layers, Monitor, Palette, Rocket, Smartphone, Sparkles, Trophy, Zap, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { achievements, education, experience, skills, stats, whyHire } from "@/data/content";
import { Counter, Section, SectionHeading, ease, fadeUp, stagger, vp } from "./ui";

export function Stats() {
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="glass gradient-border grid grid-cols-2 gap-6 rounded-2xl p-8 md:grid-cols-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} className={`text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
            <div className="font-display text-4xl font-bold text-gradient md:text-5xl"><Counter to={s.value} suffix={s.suffix} /></div>
            <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

const bring = [
  { i: Rocket, t: "Fast Delivery", d: "Lean workflow from brief to shipped product." },
  { i: Palette, t: "Clean Modern UI", d: "Interfaces that look premium and feel effortless." },
  { i: Bot, t: "AI-Powered Workflow", d: "AI tools integrated into building and into products." },
  { i: Layers, t: "Cross-Platform", d: "Web, mobile and desktop from one developer." },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading label="// about_me" title="Engineer by craft, physicist at heart" />
      <div className="grid gap-12 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.7, ease }} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>I'm Suhaib, a student and software engineer based in <span className="text-foreground">Karachi, Pakistan</span>, with <span className="text-foreground">2+ years of experience</span> and <span className="text-foreground">10+ projects</span> built across web, mobile and desktop.</p>
          <p>I freelance, building web and mobile apps tailored exactly to what my clients need. I'm always chasing new learning, especially AI tools and techniques, and I have excellent experience bringing AI into real, working products.</p>
          <p>Outside of code, I'm deeply into physics and engineering. I study the natural sciences in extreme detail as a hobby, and that same curiosity drives how carefully I engineer software.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid gap-4 sm:grid-cols-2">
          {bring.map(({ i: I, t, d }) => (
            <motion.div key={t} variants={fadeUp} whileHover={{ y: -4 }} className="glass rounded-2xl p-6 transition-shadow hover:shadow-glow">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-signature text-primary-foreground"><I className="h-5 w-5" /></div>
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

const skillIcons = [Code2, Smartphone, Monitor, Database, Sparkles];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading label="// tech_stack" title="Tools I build with" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, gi) => {
          const I = skillIcons[gi] ?? Code2;
          return (
            <motion.div key={g.group} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.6, ease, delay: gi * 0.08 }} className={`glass gradient-border rounded-2xl p-6 ${gi === 0 ? "lg:col-span-2" : ""}`}>
              <div className="mb-5 flex items-center gap-3"><I className="h-5 w-5 text-cyan" /><h3 className="font-mono text-sm uppercase tracking-wider">{g.group}</h3></div>
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <motion.span key={s} variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } } }} className="rounded-lg border bg-muted px-3 py-1.5 font-mono text-sm transition hover:border-cyan hover:text-cyan hover:shadow-glow">
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  return (
    <Section id="experience">
      <SectionHeading label="// experience" title="Where I've shipped" />
      <div ref={ref} className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-signature md:left-1/2" />
        <div className="space-y-12">
          {experience.map((e, i) => (
            <motion.div key={e.role} initial={{ opacity: 0, x: i % 2 ? 50 : -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.7, ease }} className={`relative pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}>
              <span className={`absolute top-6 left-[9px] grid h-4 w-4 place-items-center rounded-full bg-gradient-signature shadow-glow ${i % 2 ? "md:-left-2" : "md:left-auto md:-right-2"}`} />
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan"><Briefcase className="h-3.5 w-3.5" />{e.org}</div>
                <h3 className="mt-2 text-xl font-semibold">{e.role}</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground">
                  {e.points.map((p) => <li key={p} className="flex gap-2"><span className="text-magenta">▸</span>{p}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education">
      <SectionHeading label="// education" title="Learning, rigorously" />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid gap-5 md:grid-cols-3">
        {education.map((e) => (
          <motion.div key={e.title} variants={fadeUp} whileHover={{ y: -6 }} className="glass gradient-border rounded-2xl p-7">
            <GraduationCap className="h-8 w-8 text-violet" />
            <span className="mt-5 inline-block rounded-full border px-3 py-1 font-mono text-xs text-cyan">{e.tag}</span>
            <h3 className="mt-3 text-lg font-semibold">{e.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{e.detail}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading label="// achievements" title="Milestones" />
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {achievements.map((a, i) => (
          <motion.div key={a} variants={fadeUp} whileHover={{ scale: 1.03 }} className="glass group rounded-2xl p-6 text-center transition-shadow hover:shadow-glow">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-signature text-primary-foreground shadow-glow">
              {i < 2 ? <Trophy className="h-6 w-6" /> : <Award className="h-6 w-6" />}
            </div>
            <p className="mt-4 text-sm font-medium">{a}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

const whyIcons = [Rocket, Zap, Layers, Briefcase, Atom];

export function WhyHire() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16 md:px-8">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={vp} transition={{ duration: 0.8, ease }} className="glass gradient-border relative overflow-hidden rounded-3xl p-8 shadow-glow md:p-14">
        <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-magenta opacity-[var(--orb-opacity)] blur-[100px]" />
        <div aria-hidden className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan opacity-[var(--orb-opacity)] blur-[100px]" />
        <p className="relative font-mono text-sm text-cyan">// why_hire_me</p>
        <h2 className="relative mt-3 text-4xl font-bold md:text-5xl">Why clients pick <span className="text-gradient">Suhaib</span></h2>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {whyHire.map((w, i) => {
            const I = whyIcons[i] ?? Rocket;
            return (
              <motion.div key={w.title} variants={fadeUp}>
                <I className="h-6 w-6 text-magenta" />
                <h3 className="mt-3 font-semibold">{w.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
        <a href="#contact" className="btn-hire relative mt-12 inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-lg font-semibold">
          Let's build your project <ArrowRight className="h-5 w-5" />
        </a>
      </motion.div>
    </section>
  );
}
