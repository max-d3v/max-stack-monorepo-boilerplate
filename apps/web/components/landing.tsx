import { CTA } from "./landing/cta";
import { Features } from "./landing/features";
import { Footer } from "./landing/footer";
import { Hero } from "./landing/hero";
import { Showcase } from "./landing/showcase";
import { TechStack } from "./landing/tech-stack";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white text-foreground dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-950 dark:to-black">
      <Hero />
      <Showcase />
      <TechStack />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
