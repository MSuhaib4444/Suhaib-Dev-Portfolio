import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;
export const vp = { once: true, margin: "-80px" } as const;

export function SectionHeading({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="mb-14 max-w-2xl">
      <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5, ease }} className="font-mono text-sm text-cyan">
        {label}
      </motion.p>
      <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.7, ease, delay: 0.05 }} className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
        {title}
      </motion.h2>
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={vp} transition={{ duration: 0.9, ease, delay: 0.2 }} className="mt-4 h-1 w-24 origin-left rounded-full bg-gradient-signature" />
      {sub && <p className="mt-5 text-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      {children}
    </section>
  );
}

export function Divider() {
  return (
    <div className="mx-auto h-px max-w-6xl overflow-hidden px-8">
      <motion.div initial={{ x: "-100%" }} whileInView={{ x: "0%" }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} className="h-px w-full bg-gradient-signature opacity-60" />
    </div>
  );
}

export function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setV(to);
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
export const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease } },
};
