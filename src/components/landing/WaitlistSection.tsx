import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzPvjJRqENR6qAhJqDWl9LKm6XKJvXK1xrXf5r9qYKJKJ3Aw-bYxvZw1qJw9qJ3Kx3A/exec";

const WaitlistSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    teamSize: "",
    comments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyJqTjxcjjEjXQ-8f6K77cKxwqQzLQvXS1rCL0XcXY/dev", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      toast.success("You're on the waitlist! We'll be in touch soon.");
      setFormData({ name: "", company: "", email: "", teamSize: "", comments: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company <span className="text-muted-foreground">(optional)</span></label>
                  <Input 
                    placeholder="Company name" 
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Team Size <span className="text-muted-foreground">(optional)</span></label>
                <Input 
                  placeholder="e.g. 5 engineers" 
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="bg-secondary/50 border-border"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Comments <span className="text-muted-foreground">(optional)</span></label>
                <Textarea 
                  placeholder="Tell us about your use case, current on-call challenges, or anything else..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
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
