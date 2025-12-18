import { Radar, Brain, GitBranch, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Radar,
    title: "Detect",
    description: "Monitors logs from AWS, Vercel, Railway, Render, Modal, Digital Ocean in real-time",
  },
  {
    icon: Brain,
    title: "Analyze",
    description: "AI examines patterns, recent deploys, and historical incidents with confidence scoring",
  },
  {
    icon: GitBranch,
    title: "Decide",
    description: "Auto-resolve high-confidence incidents OR request human review when uncertain",
  },
  {
    icon: CheckCircle,
    title: "Execute",
    description: "Auto-rollback, restart services, or send comprehensive reports for engineer approval",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-headline mb-6">
            AI-Powered Incident Response with <span className="gradient-text">Human Oversight</span>
          </h2>
          <p className="text-body text-muted-foreground">
            Intelligent automation that knows when to act and when to ask. Your team stays in control.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Flow timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-success hidden md:block" />
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-success md:hidden" />
            
            <div className="space-y-8 md:space-y-0">
              {steps.map((step, index) => (
                <div 
                  key={step.title} 
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Mobile: Icon on left */}
                  <div className="relative z-10 md:hidden">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-background ${
                      index === steps.length - 1 ? 'bg-success' : 'bg-primary'
                    }`}>
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>
                  
                  {/* Desktop: Content left or right */}
                  <div className={`hidden md:flex md:w-1/2 ${index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                    <div className={`max-w-sm p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-all ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <span className="text-label text-primary mb-2 block">Step {index + 1}</span>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Desktop: Center icon */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-background shadow-lg ${
                      index === steps.length - 1 ? 'bg-success' : 'bg-primary'
                    }`}>
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>
                  
                  {/* Desktop: Empty space for opposite side */}
                  <div className="hidden md:block md:w-1/2" />
                  
                  {/* Mobile: Content */}
                  <div className="md:hidden flex-1 pb-8">
                    <span className="text-label text-primary mb-1 block">Step {index + 1}</span>
                    <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
