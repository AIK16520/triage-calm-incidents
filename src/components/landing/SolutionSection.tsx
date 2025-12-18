import { Radar, Brain, GitBranch, CheckCircle, ArrowRight } from "lucide-react";

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
    description: "AI examines patterns, recent deploys, and historical incidents with confidence scoring",
    color: "primary",
  },
  {
    icon: GitBranch,
    title: "Decide",
    description: "Auto-resolve high-confidence incidents OR request human review when uncertain",
    color: "primary",
  },
  {
    icon: CheckCircle,
    title: "Execute",
    description: "Auto-rollback, restart services, or send comprehensive reports for engineer approval",
    color: "success",
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
          {/* Flow diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-card border border-border rounded-2xl p-6 h-full hover:shadow-elegant hover:border-primary/20 transition-all duration-300 group">
                  <div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform ${
                      step.color === 'primary' ? 'bg-primary/10' : 'bg-success/10'
                    }`}
                  >
                    <step.icon className={`w-6 h-6 ${
                      step.color === 'primary' ? 'text-primary' : 'text-success'
                    }`} />
                  </div>
                  
                  <p className="text-label text-muted-foreground mb-2">Step {index + 1}</p>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
