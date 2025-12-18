import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main headline */}
          <h1 className="text-display mb-8 animate-fade-up">
            Your AI On-Call Engineer
            <br />
            <span className="gradient-text">Sleep Through the Night</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-subheadline text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-up stagger-2 text-balance">
            Triage automatically detects, analyzes, and fixes production incidents while your team rests. 
            It reads logs, analyze and then either rollbacks, restarts or alert the developer when needed.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-up stagger-3">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#waitlist">
                Join Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          
          {/* Stats row - simple inline style */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 animate-fade-up stagger-4">
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary block">3 min</span>
              <p className="text-sm text-muted-foreground mt-1">Avg. response time</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary block">2 weeks</span>
              <p className="text-sm text-muted-foreground mt-1">Dev time saved</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="text-center">
              <span className="text-4xl md:text-5xl font-bold text-primary block">$20K+</span>
              <p className="text-sm text-muted-foreground mt-1">Annual savings</p>
            </div>
          </div>
        </div>
        
        {/* Dashboard preview */}
        <div className="mt-24 max-w-5xl mx-auto animate-fade-up stagger-5">
          <div className="relative bg-card rounded-3xl border border-border shadow-elevated overflow-hidden">
            {/* Mock dashboard header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-border bg-secondary/30">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-attention/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-sm text-muted-foreground font-medium">Triage Dashboard</span>
              </div>
            </div>
            {/* Dashboard content */}
            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">Incident Detected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">API Latency Spike - 450ms avg</p>
                  <p className="text-xs text-muted-foreground mt-2">2 seconds ago</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">AI Analyzing</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Confidence: 82%</p>
                  <p className="text-xs text-muted-foreground mt-2">Correlating with metrics</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 bg-success rounded-full" />
                    <span className="text-sm font-semibold">Auto-Resolution</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Rollback to v2.4.1 initiated</p>
                  <p className="text-xs text-muted-foreground mt-2">ETA: 45 seconds</p>
                </div>
              </div>
              {/* Timeline visualization */}
              <div className="bg-secondary/30 rounded-xl p-5 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">Incident Timeline</span>
                  <span className="text-sm text-success font-medium">Resolving...</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-3/4 gradient-bg rounded-full" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
