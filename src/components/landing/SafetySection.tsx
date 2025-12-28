import { ShieldCheck, Database, FileSearch, Users } from "lucide-react";

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Conservative AI",
    description: "Escalates to humans when uncertain—never takes risky actions blindly. Your production environment is sacred.",
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
  {
    icon: Users,
    title: "Human-in-the-Loop",
    description: "You're always in control. Review and approve complex decisions. The AI assists, you decide.",
    highlight: "You're in control",
  },
];

const SafetySection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-title text-primary">
            Built for <span className="gradient-text">Safety First</span>
          </h2>
          <p className="text-lg text-foreground">
            We take the responsibility of managing your production environment seriously.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-success" />
              </div>
              
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-success/10 text-success mb-4">
                {feature.highlight}
              </span>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;