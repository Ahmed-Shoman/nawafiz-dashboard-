import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blogs } from "@/components/sections/Blogs";
import { Contact } from "@/components/sections/Contact";
import { Stats } from "@/components/sections/Stats";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Projects />
        <Testimonials />
        <Blogs />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
