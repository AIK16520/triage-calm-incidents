import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SafetySection from "@/components/landing/SafetySection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <IntegrationsSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <HowItWorksSection />
      <SafetySection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
