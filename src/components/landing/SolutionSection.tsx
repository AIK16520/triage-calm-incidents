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
    color: "accent",
  },
  {
    icon: GitBranch,
    title: "Decide",
    description: "Auto-resolve high-confidence incidents OR request human review when uncertain",
    color: "attention",
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
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            AI-Powered Incident Response with <span className="gradient-text">Human Oversight</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Intelligent automation that knows when to act and when to ask. Your team stays in control.
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
                      step.color === 'primary' ? 'bg-primary/20' : 
                      step.color === 'accent' ? 'bg-accent/20' : 
                      step.color === 'attention' ? 'bg-attention/20' : 'bg-success/20'
                    }`}
                  >
                    <step.icon className={`w-6 h-6 ${
                      step.color === 'primary' ? 'text-primary' : 
                      step.color === 'accent' ? 'text-accent' : 
                      step.color === 'attention' ? 'text-attention' : 'text-success'
                    }`} />
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
          
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;