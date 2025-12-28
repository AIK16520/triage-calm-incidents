import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-headline mb-6 font-title">
            Stop Losing Sleep Over <span className="gradient-text">Production Issues</span>
          </h2>
          
          <p className="text-body text-muted-foreground mb-10 max-w-2xl mx-auto">
            Be among the first to get early access.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#waitlist">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
