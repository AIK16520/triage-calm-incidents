import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Clock, Calendar, DollarSign } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('waitlist_submissions')
        .insert({ email, name: email.split('@')[0] });

      if (error) {
        if (error.code === '23505') {
          toast({ title: "You're already on the list!", description: "We'll be in touch soon." });
        } else {
          throw error;
        }
      } else {
        toast({ title: "Welcome aboard!", description: "You've joined the waitlist." });
        setEmail("");
      }
    } catch (error) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const metrics = [
    { icon: Clock, value: "3 min", label: "Avg. response time" },
    { icon: Calendar, value: "2 weeks", label: "Dev time saved" },
    { icon: DollarSign, value: "$20K+", label: "Annual savings" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#0A0A0A]">
      {/* Teal radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(var(--primary)/0.1)_0%,_transparent_50%)]" />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side - 55% */}
          <div className="lg:col-span-7">
            {/* Overline */}
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-6 block">
              Autonomous Incident Response
            </span>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.05] mb-8">
              <span className="gradient-text">Your AI On-Call Engineer</span>
              <br />
              <span className="text-foreground">Sleep Through the Night</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Triage automatically detects, analyzes, and fixes production incidents while your team rests. 
              It reads logs, analyzes and then either rollbacks, restarts or alerts the developer when needed.
            </p>
            
            {/* Inline Waitlist Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[58px] bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground text-base px-6 flex-1"
                required
              />
              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="h-[58px] px-8 shadow-[0_0_30px_hsl(var(--primary)/0.4)] group whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
          
          {/* Right Side - 45% */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="group relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-9 
                           border-l-4 border-l-primary
                           hover:translate-x-[-8px] hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] 
                           transition-all duration-300 ease-out"
              >
                <div className="flex items-center gap-4 mb-3">
                  <metric.icon className="w-12 h-12 text-primary" strokeWidth={1.5} />
                  <span className="text-5xl md:text-[56px] font-bold gradient-text leading-none">
                    {metric.value}
                  </span>
                </div>
                <p className="text-muted-foreground text-lg pl-16">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
