import { RotateCcw, RefreshCw, FileText, Cloud } from "lucide-react";

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
    title: "Context-Aware Escalation",
    description: "When unsure, sends comprehensive reports to on-call engineers with full incident context.",
    highlight: "Zero false positives",
  },
  {
    icon: Cloud,
    title: "Multi-Cloud Support",
    description: "Works across all your infrastructure providers. No vendor lock-in, complete flexibility.",
    highlight: "6+ platforms",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Built for <span className="gradient-text">Modern DevOps Teams</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every feature designed to reduce toil and let your team focus on what matters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {feature.highlight}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
