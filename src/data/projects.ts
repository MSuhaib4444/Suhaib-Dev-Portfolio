// Edit project content here. Replace `github` with exact repo URLs and `live` with demo URLs.
// To use a real screenshot, add `image: someImport` and render it in ProjectCard.
export type Category = "Web" | "Mobile" | "AI" | "Education" | "Tools";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  categories: Category[];
  featured?: boolean;
  github?: string; // exact repository URL; omit when there is no public repo
  live?: string; // TODO: add live demo URL
  hue: [number, number]; // cover gradient hues
}

const GH = "https://github.com/MSuhaib4444";

export const projects: Project[] = [
  { title: "Axiom", featured: true, description: "AI-powered Excel/CSV visualization with automated statistical insights, 15+ interactive charts, anomaly detection and natural-language data queries.", tags: ["TypeScript", "AI", "Data Viz"], categories: ["Web", "AI", "Tools"], github: `${GH}/axiom`, live: "https://axiom-rose-three.vercel.app", hue: [200, 290] },
  { title: "Nutrition Analyzer", featured: true, description: "Upload a food image and get calories, fat and full nutrition info instantly. Glassmorphism dark UI.", tags: ["TypeScript", "AI", "Vision"], categories: ["Web", "AI"], github: `${GH}/nutrition-analyzer`, live: "https://nutrianalys-6ttswqc5.manus.space", hue: [150, 200] },
  { title: "Quantum Leap", featured: true, description: "Interactive physics eLearning platform with real-time simulations: vectors, circuits, relativity, quantum mechanics, plus gamified progress.", tags: ["React", "Supabase", "Physics"], categories: ["Web", "Education"], github: `${GH}/quantum-leap`, live: "https://quantum-leap-lovat.vercel.app", hue: [270, 330] },
  { title: "StegoVault", featured: true, description: "Privacy-first, 100% client-side steganography. Hide messages in images (LSB) or in text via zero-width Unicode.", tags: ["TypeScript", "Crypto", "Privacy"], categories: ["Web", "Tools"], github: `${GH}/stegovault`, live: "https://stegovault-six.vercel.app/", hue: [320, 20] },
  { title: "Asset Share Hub", featured: true, description: "Secure file sharing with drag-and-drop uploads, password-locked assets, media previewer and real-time download tracking.", tags: ["React", "Supabase"], categories: ["Web", "Tools"], github: `${GH}/asset-share-hub`, live: "https://asset-share-hub.vercel.app", hue: [190, 240] },
  { title: "Open Road", description: "Driving simulator with real vehicle dynamics (tires, weight transfer, drag, downforce) on an endless six-lane road.", tags: ["TypeScript", "Physics", "3D"], categories: ["Web", "Education"], github: `${GH}/Open-Road`, hue: [30, 330] },
  { title: "Folio", description: "Premium full-stack bookstore app with offline persistence, Riverpod state, admin dashboard and warm literary design.", tags: ["Flutter", "Firebase", "Riverpod"], categories: ["Mobile"], github: `${GH}/folio`, hue: [40, 10] },
  { title: "Zakat Calculator", description: "English/Urdu Zakat calculator mobile app.", tags: ["React Native", "TypeScript"], categories: ["Mobile", "Tools"], github: `${GH}/ZakatCalculator`, hue: [140, 190] },
  { title: "7Spice Restaurant", description: "Website for a buffet restaurant in Karachi.", tags: ["TypeScript", "Web"], categories: ["Web"], github: `${GH}/7SpiceRestaurant`, hue: [20, 350] },
  { title: "Flutter Firebase CRUD Todo", description: "Todo app with Firebase auth, state management and full CRUD.", tags: ["Flutter", "Firebase"], categories: ["Mobile"], github: `${GH}/flutter-firebase-crud-todo-App`, hue: [210, 260] },
  { title: "Nexora Landing Page", description: "Agency landing page.", tags: ["HTML", "CSS"], categories: ["Web"], github: `${GH}/nexora-landing-page`, hue: [250, 300] },
  { title: "DarunNoor Library & Darulftah An Noor", description: "Freelance client projects: an Islamic album library and a fatwa website.", tags: ["Freelance", "Web"], categories: ["Web"], hue: [160, 220] },
];

export const categories = ["All", "Web", "Mobile", "AI", "Education", "Tools"] as const;
