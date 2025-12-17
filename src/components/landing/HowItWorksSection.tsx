import { Webhook, LineChart, CheckSquare, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Webhook,
    title: "Connect Your Services",
    description: "Simple webhook integration with your CI/CD pipeline. Setup takes less than 5 minutes.",
    detail: "One-click integrations for all major platforms",
  },
  {
    icon: LineChart,
    title: "AI Learns Your Patterns",
    description: "Analyzes historical incidents and establishes baselines for normal behavior.",
    detail: "Gets smarter with every incident",
  },
  {
    icon: CheckSquare,
    title: "Automatic Response",
    description: "Handles 80% of incidents without human intervention. You sleep, we work.",
    detail: "24/7 autonomous monitoring",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Learns from every incident for better decisions. Your system gets more reliable over time.",
    detail: "ML-powered optimization",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Three Steps to <span className="gradient-text">Zero-Touch Incident Response</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From integration to full automation in under an hour.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/50 md:transform md:-translate-x-1/2" />
            
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step number circle */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 rounded-full glass flex items-center justify-center z-10 md:transform md:-translate-x-1/2 border-2 border-primary/50">
                  <span className="text-xl font-bold gradient-text">{index + 1}</span>
                </div>
                
                {/* Content card */}
                <div className={`ml-28 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 1 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    <span className="text-sm text-primary font-medium">{step.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
