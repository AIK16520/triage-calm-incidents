import { Webhook, LineChart, GitBranch, TrendingUp } from "lucide-react";

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
    description: "Analyzes historical incidents, deploys, and establishes baselines for normal behavior.",
    detail: "Gets smarter with every incident",
  },
  {
    icon: GitBranch,
    title: "Intelligent Response",
    description: "High-confidence incidents resolve automatically. Uncertain ones go to Review Mode for your approval.",
    detail: "78% auto-resolved, 22% human-reviewed",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Learns from every incident and your review decisions. Your system becomes more reliable over time.",
    detail: "Feedback-driven optimization",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-headline mb-6">
            Four Steps to <span className="gradient-text">Intelligent Incident Response</span>
          </h2>
          <p className="text-body text-muted-foreground">
            From integration to full automation in under an hour.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-1/2" />
            
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex items-start gap-8 mb-16 last:mb-0 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Step number circle */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center z-10 md:transform md:-translate-x-1/2 shadow-elegant">
                  <span className="text-xl font-bold text-primary">{index + 1}</span>
                </div>
                
                {/* Content card */}
                <div className={`ml-28 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 1 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-elegant hover:border-primary/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <span className="text-sm text-primary font-semibold">{step.detail}</span>
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
