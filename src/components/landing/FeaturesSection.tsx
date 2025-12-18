import { RotateCcw, RefreshCw, FileText, Cloud, Eye, TrendingUp } from "lucide-react";

const features = [
  {
    icon: RotateCcw,
    title: "Smart Rollbacks",
    description: "Automatically reverts bad deployments within minutes of detection. No manual intervention required.",
    highlight: "< 3 min response",
    color: "primary",
  },
  {
    icon: RefreshCw,
    title: "Service Restarts",
    description: "Intelligently restarts degraded services with built-in cooldowns to prevent restart loops.",
    highlight: "Built-in safeguards",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Context-Aware Analysis",
    description: "AI provides comprehensive reports with root cause analysis and recommended actions.",
    highlight: "Full context",
    color: "accent",
  },
  {
    icon: Cloud,
    title: "Multi-Cloud Support",
    description: "Works across all your infrastructure providers. No vendor lock-in, complete flexibility.",
    highlight: "6+ platforms",
    color: "primary",
  },
  {
    icon: Eye,
    title: "Review Mode",
    description: "Human oversight for complex scenarios requiring judgment. One-click approval workflow.",
    highlight: "Human-in-loop",
    color: "attention",
  },
  {
    icon: TrendingUp,
    title: "Learning System",
    description: "Gets smarter with every incident. Your review decisions improve AI confidence over time.",
    highlight: "Continuous learning",
    color: "success",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-headline mb-6">
            Built for <span className="gradient-text">Modern DevOps Teams</span>
          </h2>
          <p className="text-body text-muted-foreground">
            Every feature designed to reduce toil and let your team focus on what matters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-3xl p-8 hover:shadow-elevated hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                  feature.color === 'primary' ? 'bg-primary/10' : 
                  feature.color === 'accent' ? 'bg-accent/10' : 
                  feature.color === 'attention' ? 'bg-attention/10' : 'bg-success/10'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.color === 'primary' ? 'text-primary' : 
                    feature.color === 'accent' ? 'text-accent' : 
                    feature.color === 'attention' ? 'text-attention' : 'text-success'
                  }`} />
                </div>
                <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  feature.color === 'primary' ? 'bg-primary/10 text-primary' : 
                  feature.color === 'accent' ? 'bg-accent/10 text-accent' : 
                  feature.color === 'attention' ? 'bg-attention/10 text-attention' : 'bg-success/10 text-success'
                }`}>
                  {feature.highlight}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
