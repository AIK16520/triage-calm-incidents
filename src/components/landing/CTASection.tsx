import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-headline mb-6">
            Stop Losing Sleep Over <span className="gradient-text">Production Issues</span>
          </h2>
          
          <p className="text-body text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 500+ engineering teams on the waitlist. Be among the first 1,000 to get early access.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#waitlist">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#integrations">Request an Integration</a>
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm">500+ teams already on the waitlist</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
