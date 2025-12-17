import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const WaitlistSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("You're on the waitlist! We'll be in touch soon.");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="waitlist" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Join the Waitlist</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get <span className="gradient-text">Early Access</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Be among the first to experience AI-powered incident response. We'll notify you when Triage is ready.
            </p>
          </div>
          
          <div className="glass rounded-2xl p-8 border border-primary/20 glow-primary">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input 
                    placeholder="Your name" 
                    required
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company <span className="text-muted-foreground">(optional)</span></label>
                  <Input 
                    placeholder="Company name" 
                    className="bg-secondary/50 border-border"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <Input 
                  type="email" 
                  placeholder="you@company.com" 
                  required
                  className="bg-secondary/50 border-border"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Team Size <span className="text-muted-foreground">(optional)</span></label>
                <Select>
                  <SelectTrigger className="bg-secondary/50 border-border">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 engineers</SelectItem>
                    <SelectItem value="11-50">11-50 engineers</SelectItem>
                    <SelectItem value="51-200">51-200 engineers</SelectItem>
                    <SelectItem value="200+">200+ engineers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Comments <span className="text-muted-foreground">(optional)</span></label>
                <Textarea 
                  placeholder="Tell us about your use case, current on-call challenges, or anything else..."
                  className="bg-secondary/50 border-border min-h-[100px]"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="hero" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Joining..." : "Join the Waitlist"}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Join 500+ engineering teams on the waitlist. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
