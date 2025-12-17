import { Moon, Clock, HelpCircle } from "lucide-react";

const problems = [
  {
    icon: Moon,
    title: "Alert Fatigue",
    description: "Woken up at 3 AM for issues that could wait until morning. Your team is exhausted.",
    stat: "67%",
    statLabel: "of engineers report burnout from on-call",
  },
  {
    icon: Clock,
    title: "Slow Response",
    description: "Manual incident response takes 15-45 minutes. Every second of downtime costs money.",
    stat: "23 min",
    statLabel: "average time to first response",
  },
  {
    icon: HelpCircle,
    title: "Junior Dev Burden",
    description: "New engineers struggle with complex production issues and fear making things worse.",
    stat: "3x",
    statLabel: "longer resolution time for junior devs",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The <span className="gradient-text">On-Call Nightmare</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Production incidents don't care about your sleep schedule, your vacation, or your sanity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <problem.icon className="w-7 h-7 text-destructive" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground mb-6">{problem.description}</p>
              
              <div className="pt-6 border-t border-border">
                <span className="text-3xl font-bold text-destructive">{problem.stat}</span>
                <p className="text-sm text-muted-foreground mt-1">{problem.statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
