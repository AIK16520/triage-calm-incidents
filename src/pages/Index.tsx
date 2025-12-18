import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import ReviewModeSection from "@/components/landing/ReviewModeSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <IntegrationsSection />
      <ProblemSection />
      <SolutionSection />
      <ReviewModeSection />
      <WaitlistSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
