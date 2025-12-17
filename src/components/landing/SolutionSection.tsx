import { Radar, Brain, CheckCircle, Bell, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Radar,
    title: "Detect",
    description: "Monitors logs from AWS, Vercel, Railway, Render, Modal, Digital Ocean in real-time",
    color: "primary",
  },
  {
    icon: Brain,
    title: "Analyze",
    description: "AI examines patterns, recent deploys, and historical incidents to identify root cause",
    color: "accent",
  },
  {
    icon: CheckCircle,
    title: "Resolve",
    description: "Auto-rollback bad deploys or restart services with built-in safety checks",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Escalate",
    description: "Pings on-call engineer with full context when uncertain about the fix",
    color: "accent",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Intelligent Incident Response, <span className="gradient-text">Zero Human Effort</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Triage works autonomously while your team focuses on building, not firefighting.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Flow diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="glass rounded-2xl p-6 h-full hover:scale-105 transition-all duration-300 group">
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                      step.color === 'primary' ? 'bg-primary/20' : 'bg-accent/20'
                    }`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color === 'primary' ? 'text-primary' : 'text-accent'}`} />
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">Step {index + 1}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Visual representation */}
          <div className="mt-16 glass rounded-2xl p-8 glow-primary">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">See it in action</h3>
                <p className="text-muted-foreground mb-6">
                  Watch how Triage detects a database connection spike, identifies a recent deployment as the cause, 
                  and automatically rolls back—all in under 3 minutes.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>45 incidents resolved today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>2 escalated to humans</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 bg-secondary/50 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-red-500/30 rounded-full w-full" />
                    </div>
                    <span className="text-xs text-muted-foreground">00:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-yellow-500/30 rounded-full w-3/4" />
                    </div>
                    <span className="text-xs text-muted-foreground">00:45</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-green-500/30 rounded-full w-full" />
                    </div>
                    <span className="text-xs text-muted-foreground">02:34</span>
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

export default SolutionSection;
