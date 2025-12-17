import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Shield, Zap, Clock } from "lucide-react";

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
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
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
            Intelligent rollbacks, restarts, and escalations using advanced AI.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up stagger-3">
            <Button variant="hero" size="xl" className="group">
              Join Waitlist
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="group">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-up stagger-4">
            <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">3 min</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg. response time</p>
            </div>
            <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">80%</span>
              </div>
              <p className="text-sm text-muted-foreground">Auto-resolved incidents</p>
            </div>
            <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">$50K+</span>
              </div>
              <p className="text-sm text-muted-foreground">Annual savings/engineer</p>
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
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
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
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Incident Detected</span>
                    </div>
                    <p className="text-xs text-muted-foreground">API Latency Spike - 450ms avg</p>
                    <p className="text-xs text-muted-foreground mt-1">2 seconds ago</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">AI Analyzing</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Checking recent deploys...</p>
                    <p className="text-xs text-muted-foreground mt-1">Correlating with metrics</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
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
                    <span className="text-xs text-green-400">Resolving...</span>
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
