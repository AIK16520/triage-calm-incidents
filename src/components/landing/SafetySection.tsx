import { ShieldCheck, Database, FileSearch } from "lucide-react";

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Conservative AI",
    description: "Escalates to humans when uncertain—never takes risky actions. Your production environment is sacred.",
    highlight: "Zero risky actions",
  },
  {
    icon: Database,
    title: "No Data Storage",
    description: "References your logs in real-time, never stores customer data. Complete privacy by design.",
    highlight: "Privacy-first",
  },
  {
    icon: FileSearch,
    title: "Complete Audit Trail",
    description: "Every decision logged with full AI reasoning for compliance and post-incident review.",
    highlight: "Full transparency",
  },
];

const SafetySection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Built for <span className="gradient-text">Safety First</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We take the responsibility of managing your production environment seriously.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-green-400" />
              </div>
              
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 mb-4">
                {feature.highlight}
              </span>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
