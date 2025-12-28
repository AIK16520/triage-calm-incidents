const steps = [
  {
    number: 1,
    title: "Detect",
    description: "Monitors logs from AWS, Vercel, Railway, Render, Modal, Digital Ocean in real-time",
  },
  {
    number: 2,
    title: "Analyze",
    description: "AI examines patterns, recent deploys, and historical incidents with confidence scoring",
  },
  {
    number: 3,
    title: "Decide",
    description: "Auto-resolve high-confidence incidents OR request human review when uncertain",
  },
];

const actions = [
  {
    title: "Rollback",
    description: "Automatically reverts bad deployments to the last known good state",
  },
  {
    title: "Restart",
    description: "Intelligently restarts degraded services with built-in cooldowns",
  },
  {
    title: "Alert Dev",
    description: "Sends comprehensive context to the right engineer when human judgment needed",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-headline mb-6 font-title text-primary">
            AI-Powered Incident Response
          </h2>
          <p className="text-body text-foreground">
            Intelligent automation that knows when to act and when to ask. Your team stays in control.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Vertical Process */}
          <div className="relative mb-20">
            {/* Container for all steps with proper spacing */}
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, index) => {
                return (
                  <div key={step.title} className="flex flex-col items-center">
                    {/* Desktop: Step container with number centered above box */}
                    <div className="hidden md:flex flex-col items-center max-w-md">
                      {/* Numbered circle centered above box */}
                      <div className="mb-6">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-background shadow-xl bg-primary">
                          <span className="text-3xl font-bold text-white">{step.number}</span>
                        </div>
                      </div>
                      
                      {/* Content box below */}
                      <div className="p-6 rounded-2xl bg-white border-2 border-primary/60 hover:shadow-lg transition-all text-center w-full">
                        <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                        <p className="text-sm text-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                    
                    {/* Mobile: Numbered circle and content */}
                    <div className="md:hidden flex items-start gap-4 w-full">
                      <div className="relative z-10 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-background bg-primary shadow-lg">
                          <span className="text-2xl font-bold text-white">{step.number}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="p-5 rounded-xl bg-white border-2 border-primary/60 text-center">
                          <h3 className="text-xl font-bold mb-2 text-foreground">{step.title}</h3>
                          <p className="text-sm text-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions - Rollback, Restart, Alert */}
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2 font-title text-primary">Then <span className="font-oldenberg">Triage</span> Takes Action</h3>
            <p className="text-foreground">Three ways to resolve incidents automatically</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actions.map((action) => (
              <div
                key={action.title}
                className="relative p-8 rounded-2xl border-2 border-primary/20 bg-card hover:border-primary/40 hover:shadow-glow transition-all duration-300 text-center"
              >
                <h4 className="text-2xl md:text-3xl font-bold mb-3 text-primary">{action.title}</h4>
                <p className="text-foreground text-sm">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
