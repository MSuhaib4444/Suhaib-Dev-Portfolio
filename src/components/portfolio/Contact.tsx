import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy, Download, Github, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { navLinks, profile } from "@/data/content";
import { submitContact } from "@/lib/contact";
import { Section, SectionHeading, fadeUp, stagger, vp } from "./ui";

const cards = [
  { i: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { i: Phone, label: "Phone / WhatsApp", value: profile.phone, href: profile.phoneHref, extra: profile.whatsapp },
  { i: Github, label: "GitHub", value: "github.com/MSuhaib4444", href: profile.github },
  { i: MapPin, label: "Location", value: profile.location },
];

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button aria-label={`Copy ${text}`} onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 1500); }} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border bg-card transition hover:text-cyan">
      {ok ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

const types = ["Web App", "Mobile App", "Desktop App", "AI Integration", "Landing Page", "Other"];

function TypeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="gradient-border flex w-full items-center justify-between gap-3 rounded-xl bg-card/80 px-4 py-3 text-left font-mono text-sm transition hover:bg-card focus-visible:shadow-glow">
        <span>{value}</span>
        <ChevronDown aria-hidden className={`h-4 w-4 shrink-0 text-cyan transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul role="listbox" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.18 }} className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border bg-card/95 shadow-glow backdrop-blur-xl">
            {types.map((t) => (
              <li key={t} role="option" aria-selected={t === value}>
                <button type="button" onClick={() => { onChange(t); setOpen(false); }} className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-mono text-sm transition hover:bg-cyan/10 ${t === value ? "text-cyan" : "text-muted-foreground"}`}>
                  {t}
                  {t === value && <Check className="h-3.5 w-3.5" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const RATE_KEY = "contact:lastSubmit";
const RATE_MS = 30_000;
const emptyForm = { name: "", email: "", type: "Web App", message: "", website: "" };

export function Contact() {
  const [f, setF] = useState(emptyForm);
  const [err, setErr] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const er: { name?: string; email?: string; message?: string } = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) er.email = "Please enter a valid email.";
    if (f.message.trim().length < 10) er.message = "Tell me a bit more (10+ characters).";
    setErr(er);
    if (Object.keys(er).length) return;
    const last = Number(localStorage.getItem(RATE_KEY) || 0);
    const wait = RATE_MS - (Date.now() - last);
    if (wait > 0) {
      toast.error(`Please wait ${Math.ceil(wait / 1000)}s before sending another message.`);
      return;
    }
    setSending(true);
    try {
      await submitContact({ name: f.name.trim(), email: f.email.trim(), projectType: f.type, message: f.message.trim(), website: f.website });
      localStorage.setItem(RATE_KEY, String(Date.now()));
      setF(emptyForm);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error("Couldn't send your message.", { description: `Please try again, or email me directly at ${profile.email}` });
    } finally {
      setSending(false);
    }
  };

  const input = "w-full rounded-xl border bg-muted/60 px-4 py-3 outline-none transition focus:border-cyan focus:shadow-glow";

  return (
    <Section id="contact">
      <SectionHeading label="// contact" title="Let's Work Together" sub="Have a project in mind? Reach out and I'll get back to you quickly." />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="space-y-4">
          {cards.map(({ i: I, label, value, href, extra }) => (
            <motion.div key={label} variants={fadeUp} className="glass flex items-center gap-4 rounded-2xl p-5">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-signature text-primary-foreground"><I className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-xs text-muted-foreground">{label}</div>
                {href ? <a href={href} target={label === "GitHub" ? "_blank" : undefined} rel="noreferrer" className="block truncate font-medium hover:text-cyan">{value}</a> : <div className="font-medium">{value}</div>}
              </div>
              {extra && <a href={extra} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border bg-card text-success"><MessageCircle className="h-4 w-4" /></a>}
              <CopyBtn text={value} />
            </motion.div>
          ))}
          <motion.a
            variants={fadeUp}
            href={profile.resume}
            download={profile.resumeFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-border flex items-center justify-center gap-2 rounded-2xl bg-card p-4 font-semibold transition hover:shadow-glow"
          >
            <Download className="h-5 w-5" /> Download Resume
          </motion.a>
        </motion.div>

        <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={vp} transition={{ duration: 0.7 }} onSubmit={submit} noValidate className="glass gradient-border relative min-w-0 space-y-4 rounded-2xl p-5 sm:p-6 md:p-8">
          <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
            <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-1.5 block text-sm">Name</span><input className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} maxLength={100} />{err.name && <span className="mt-1 block text-xs text-destructive">{err.name}</span>}</label>
            <label className="block"><span className="mb-1.5 block text-sm">Email</span><input type="email" className={input} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} maxLength={255} />{err.email && <span className="mt-1 block text-xs text-destructive">{err.email}</span>}</label>
          </div>
          <div className="block"><span className="mb-1.5 block text-sm">Project type</span>
            <TypeSelect value={f.type} onChange={(t) => setF({ ...f, type: t })} />
          </div>
          <label className="block"><span className="mb-1.5 block text-sm">Message</span><textarea rows={5} className={input} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} maxLength={2000} />{err.message && <span className="mt-1 block text-xs text-destructive">{err.message}</span>}</label>
          <button type="submit" disabled={sending} aria-busy={sending} className="btn-hire inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold disabled:cursor-not-allowed disabled:opacity-70">
            <AnimatePresence mode="wait" initial={false}>
              {sending ? <motion.span key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Loader2 className="h-5 w-5 animate-spin" />Sending…</motion.span>
                : sent ? <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2"><Check className="h-5 w-5" />Message sent!</motion.span>
                : <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2"><Send className="h-5 w-5" />Send Message</motion.span>}
            </AnimatePresence>
          </button>
        </motion.form>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <div className="font-display text-xl font-bold">Muhammad Suhaib <span className="text-gradient">Raza</span></div>
          <p className="mt-1 text-sm text-muted-foreground">Software engineer building web, mobile and AI-powered products.</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground" aria-label="Footer">
          {navLinks.map((l) => <a key={l.id} href={`#${l.id}`} className="hover:text-foreground">{l.label}</a>)}
        </nav>
        <div className="flex gap-2">
          {[{ h: profile.github, i: Github, l: "GitHub" }, { h: `mailto:${profile.email}`, i: Mail, l: "Email" }, { h: profile.phoneHref, i: Phone, l: "Phone" }].map(({ h, i: I, l }) => (
            <a key={l} href={h} aria-label={l} className="grid h-9 w-9 place-items-center rounded-lg border bg-card hover:text-cyan"><I className="h-4 w-4" /></a>
          ))}
        </div>
      </div>
      <div className="border-t py-5 text-center">
        <p className="text-sm text-muted-foreground">© 2026 Muhammad Suhaib Raza</p>
        <p className="mt-1 font-mono text-xs text-cyan">Built with React, passion and caffeine.</p>
      </div>
    </footer>
  );
}
