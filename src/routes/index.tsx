import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, CursorGlow, Intro, Navbar, ScrollProgress } from "@/components/portfolio/Chrome";
import { Hero } from "@/components/portfolio/Hero";
import { About, Achievements, Education, Experience, Skills, Stats, WhyHire } from "@/components/portfolio/Sections";
import { Projects } from "@/components/portfolio/Projects";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { Divider } from "@/components/portfolio/ui";

const title = "Muhammad Suhaib Raza | Software Engineer & Freelance Developer";
const description = "Karachi-based software engineer building fast, polished web and mobile apps with React, Next.js, React Native and Flutter, powered by AI. Available for freelance.";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Muhammad Suhaib Raza",
          jobTitle: "Software Engineer",
          email: "mailto:muhammadsuhaib4444@gmail.com",
          telephone: "+923369778224",
          address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
          url: "/",
          sameAs: ["https://github.com/MSuhaib4444"],
          knowsAbout: ["React", "Next.js", "React Native", "Flutter", "TypeScript", "AI Integration"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="scanlines relative overflow-x-hidden">
      <Intro />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Education />
        <Achievements />
        <WhyHire />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
