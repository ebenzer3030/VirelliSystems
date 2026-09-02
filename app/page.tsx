import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import DemoSection from "@/components/DemoSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Industries from "@/components/Industries";
import MidCTA from "@/components/MidCTA";
import LeadFormSection from "@/components/LeadFormSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <DemoSection />
        <HowItWorks />
        <Features />
        <Industries />
        <MidCTA />
        <LeadFormSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
