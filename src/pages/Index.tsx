import Navbar from "@/components/landing/Navbar";
import ROICalculator from "@/components/landing/ROICalculator";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import ReviewModeSection from "@/components/landing/ReviewModeSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import WaitlistSection from "@/components/landing/WaitlistSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ROICalculator />
      <HeroSection />
      <IntegrationsSection />
      <ProblemSection />
      <SolutionSection />
      <ReviewModeSection />
      <WaitlistSection />
    </main>
  );
};

export default Index;
