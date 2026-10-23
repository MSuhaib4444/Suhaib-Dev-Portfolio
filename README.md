# Muhammad Suhaib Raza

**Software Engineer · React & Next.js · React Native · AI-Powered Web Builder**

Karachi, Pakistan — building fast, polished web, mobile and desktop products, with AI woven into how I work.

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-full--stack-FFBF00?logo=tanstack&logoColor=black)](https://tanstack.com/start)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-animations-0055FF)](https://framer.com/motion)

---

## About me

I'm a software engineer with 2+ years of hands-on experience and 10+ projects shipped across web, mobile and desktop. I take a product from an idea to something real people use — interface, logic, data and deployment — and I use AI tools throughout the build so I can deliver more, faster.

I've delivered two freelance projects for real clients, interned as a web developer at NovaStack Hub, and showcased my work at Aptech Vision Event 2025 and 2026.

**Currently:** 5th semester of Aptech ACCP (Artificial Intelligence), 85% average across the first three semesters. 95% in AKUEB Matriculation. Completed a mobile app development course at NED University, Karachi.

## Quick facts

| | |
| --- | --- |
| **Email** | [muhammadsuhaib4444@gmail.com](mailto:muhammadsuhaib4444@gmail.com) |
| **Phone / WhatsApp** | [+92 3369778224](https://wa.me/923369778224) |
| **GitHub** | [github.com/MSuhaib4444](https://github.com/MSuhaib4444) |
| **Location** | Karachi, Pakistan |
| **Experience** | 2+ years · 10+ projects built · 2 freelance projects delivered |
| **Resume** | Attached to the portfolio — "Download Resume" button |

## The portfolio

This repository is my single-page portfolio: one scrolling page, every section in place, animated as you move down it.

| Section | What's in it |
| --- | --- |
| **Hero** | Gradient name, rotating roles typed out, a terminal card, a particle canvas that reacts to your cursor |
| **Stats** | Counters that count up when they scroll into view |
| **About** | Who I am, plus four value cards |
| **Skills** | Grouped by Web, Mobile, Desktop, Backend/Services and AI & Tools |
| **Experience** | A timeline that draws itself as you scroll |
| **Projects** | Filterable grid of 12 projects with real repo and demo links |
| **Education** | Aptech ACCP, NED University course, AKUEB Matriculation |
| **Achievements** | Vision Event showcases, scores, delivery record |
| **Why Hire Me** | Five reasons, in plain terms |
| **Contact** | Copy-to-clipboard cards, WhatsApp, a validated message form, resume download |

Two looks, switchable from the navbar and remembered between visits:

- **Quantum Cyberpunk** (dark) — ink navy, cyan/violet/magenta gradients, grid, orbs, glass cards, scanlines.
- **Holographic Daylight** (light) — off-white pastel mesh, frosted cards.

Typefaces: Space Grotesk for display, Inter for body, JetBrains Mono for labels.

## Featured projects

| Project | What it does | Code | Live |
| --- | --- | --- | --- |
| **Axiom** | AI-powered Excel/CSV visualization — automated statistical insights, 15+ interactive charts, anomaly detection, natural-language queries | [repo](https://github.com/MSuhaib4444/axiom) | [demo](https://axiom-rose-three.vercel.app) |
| **Nutrition Analyzer** | Upload a food image, get calories, fat and full nutrition info instantly | [repo](https://github.com/MSuhaib4444/nutrition-analyzer) | [demo](https://nutrianalys-6ttswqc5.manus.space) |
| **Quantum Leap** | Interactive physics eLearning — real-time simulations of vectors, circuits, relativity and quantum mechanics, with gamified progress | [repo](https://github.com/MSuhaib4444/quantum-leap) | [demo](https://quantum-leap-lovat.vercel.app) |
| **StegoVault** | Privacy-first, 100% client-side steganography — hide messages in images (LSB) or in text via zero-width Unicode | [repo](https://github.com/MSuhaib4444/stegovault) | [demo](https://stegovault-six.vercel.app/) |
| **Asset Share Hub** | Secure file sharing — drag-and-drop uploads, password-locked assets, media previewer, download tracking | [repo](https://github.com/MSuhaib4444/asset-share-hub) | [demo](https://asset-share-hub.vercel.app) |

## More projects

| Project | Stack | Code |
| --- | --- | --- |
| **Open Road** — driving simulator with real vehicle dynamics on an endless six-lane road | TypeScript, Physics, 3D | [repo](https://github.com/MSuhaib4444/Open-Road) |
| **Folio** — full-stack bookstore app with offline persistence, admin dashboard | Flutter, Firebase, Riverpod | [repo](https://github.com/MSuhaib4444/folio) |
| **Zakat Calculator** — English/Urdu Zakat calculator mobile app | React Native, TypeScript | [repo](https://github.com/MSuhaib4444/ZakatCalculator) |
| **7Spice Restaurant** — website for a buffet restaurant in Karachi | TypeScript, Web | [repo](https://github.com/MSuhaib4444/7SpiceRestaurant) |
| **Flutter Firebase CRUD Todo** — todo app with Firebase auth and full CRUD | Flutter, Firebase | [repo](https://github.com/MSuhaib4444/flutter-firebase-crud-todo-App) |
| **Nexora Landing Page** — agency landing page | HTML, CSS | [repo](https://github.com/MSuhaib4444/nexora-landing-page) |
| **DarunNoor Library & Darulftah An Noor** — freelance client work: an Islamic album library and a fatwa website | Web | client projects |

## Tech & tools

- **Web** — React.js, Next.js, TanStack, TypeScript, HTML/CSS, Tailwind
- **Mobile** — React Native, Expo, Flutter, Dart
- **Desktop** — Electron
- **Backend / services** — Firebase, Supabase
- **AI** — AI tool integration, AI-assisted workflows

## How the site is built

- **Framework** — TanStack Start (React 19, Vite), file-based routing
- **Styling** — Tailwind CSS v4 with a semantic design-token layer in `src/styles.css`; both themes are token sets, so no colour is hardcoded in components
- **Animation** — Framer Motion, with `prefers-reduced-motion` respected
- **Icons** — lucide-react
- **Contact form** — no database. `src/lib/contact.ts` posts the message to a Google Apps Script web app, so the backend can be swapped by editing that one file. Spam guard: a hidden honeypot field plus a 30-second client-side rate limit
- **Resume** — served from CDN storage via a pointer at `src/assets/resume.pdf.asset.json`
- **Extras** — scroll progress bar, scrollspy navbar, back-to-top, cursor glow, name-reveal intro, SEO/Open Graph metadata, copy-to-clipboard contact cards

## Run it locally

You need Node.js and npm (or [bun](https://bun.sh)).

```sh
git clone <this-repository-url>
cd portfolio
npm install
npm run dev
```

Then open the URL the dev server prints.

| Command | Does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build locally |
| `npm run test` | Run the test suite |
| `npm run lint` | Lint the codebase |
| `npm run format` | Format the codebase with Prettier |

### Environment variable

Create a `.env` at the project root:

```sh
VITE_CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/<your-script-id>/exec
```

That's the Apps Script web app that receives contact messages as JSON. It must be deployed as accessible to "Anyone", and it should ignore any message where the hidden `website` field is filled in.

## Project structure

```text
src/
├── assets/          # CDN pointer for the downloadable resume
├── components/
│   └── portfolio/   # Chrome (nav, intro, progress), Hero, Sections, Projects, Contact, ui
├── data/            # content.ts (profile, skills, experience…) and projects.ts
├── lib/             # contact.ts — the one file to edit to change the message backend
├── routes/          # __root.tsx (fonts, theme init, toaster) and index.tsx (the page)
└── styles.css       # design tokens for both themes, custom utilities, keyframes
```

## Deploy

`npm run build` produces the site. It runs as a TanStack Start app, so it deploys to any host that supports it.

## Get in touch

Have a project in mind? [Email me](mailto:muhammadsuhaib4444@gmail.com), [message me on WhatsApp](https://wa.me/923369778224), or open the contact form on the site — I reply quickly.

---

© 2026 Muhammad Suhaib Raza — built with React, passion and caffeine.
