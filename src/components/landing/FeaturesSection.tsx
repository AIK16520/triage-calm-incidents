import { RotateCcw, RefreshCw, FileText, Cloud, Eye, TrendingUp } from "lucide-react";

const features = [
  {
    icon: RotateCcw,
    title: "Smart Rollbacks",
    description: "Automatically reverts bad deployments within minutes of detection. No manual intervention required.",
    highlight: "< 3 min response",
  },
  {
    icon: RefreshCw,
    title: "Service Restarts",
    description: "Intelligently restarts degraded services with built-in cooldowns to prevent restart loops.",
    highlight: "Built-in safeguards",
  },
  {
    icon: FileText,
    title: "Context-Aware Analysis",
    description: "AI provides comprehensive reports with root cause analysis and recommended actions.",
    highlight: "Full context",
  },
  {
    icon: Cloud,
    title: "Multi-Cloud Support",
    description: "Works across all your infrastructure providers. No vendor lock-in, complete flexibility.",
    highlight: "6+ platforms",
  },
  {
    icon: Eye,
    title: "Review Mode",
    description: "Human oversight for complex scenarios requiring judgment. One-click approval workflow.",
    highlight: "Human-in-loop",
  },
  {
    icon: TrendingUp,
    title: "Learning System",
    description: "Gets smarter with every incident. Your review decisions improve AI confidence over time.",
    highlight: "Continuous learning",
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
        
        <div className="max-w-5xl mx-auto space-y-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/20 transition-all duration-300 group ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              
              {/* Content */}
              <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                <div className={`flex items-center gap-3 mb-2 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {feature.highlight}
                  </span>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              
              {/* Decorative line */}
              <div className={`hidden md:block w-24 h-px bg-gradient-to-r ${
                index % 2 === 1 ? 'from-primary/30 to-transparent' : 'from-transparent to-primary/30'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
