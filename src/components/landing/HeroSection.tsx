import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar, DollarSign } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Now accepting early access requests</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-up stagger-1">
            Your AI On-Call Engineer
            <br />
            <span className="gradient-text">Sleep Through the Night</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up stagger-2 text-balance">
            Triage automatically detects, analyzes, and fixes production incidents while your team rests. 
            It reads logs, analyze and then either rollbacks, restarts or alert the developer when needed.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up stagger-3">
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#waitlist">
                Join Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
          
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-up stagger-4">
            <div className="glass rounded-xl p-5 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">3 min</span>
              </div>
              <p className="text-xs text-muted-foreground">Avg. response time</p>
            </div>
            <div className="glass rounded-xl p-5 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-success" />
                <span className="text-2xl font-bold text-foreground">2 weeks</span>
              </div>
              <p className="text-xs text-muted-foreground">Dev time saved</p>
            </div>
            <div className="glass rounded-xl p-5 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">$20K+</span>
              </div>
              <p className="text-xs text-muted-foreground">Annual savings</p>
            </div>
          </div>
        </div>
        
        {/* Dashboard preview */}
        <div className="mt-20 max-w-6xl mx-auto animate-fade-up stagger-5">
          <div className="relative glass rounded-2xl p-1 glow-primary">
            <div className="bg-card rounded-xl overflow-hidden">
              {/* Mock dashboard header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-attention/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-muted-foreground">Triage Dashboard</span>
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Incident Detected</span>
                    </div>
                    <p className="text-xs text-muted-foreground">API Latency Spike - 450ms avg</p>
                    <p className="text-xs text-muted-foreground mt-1">2 seconds ago</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      <span className="text-sm font-medium">AI Analyzing</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Confidence: 82%</p>
                    <p className="text-xs text-muted-foreground mt-1">Correlating with metrics</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-sm font-medium">Auto-Resolution</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Rollback to v2.4.1 initiated</p>
                    <p className="text-xs text-muted-foreground mt-1">ETA: 45 seconds</p>
                  </div>
                </div>
                {/* Timeline visualization */}
                <div className="bg-secondary/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Incident Timeline</span>
                    <span className="text-xs text-success">Resolving...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-3/4 gradient-bg rounded-full animate-gradient" />
                    </div>
                    <span className="text-xs text-muted-foreground">75%</span>
                  </div>
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