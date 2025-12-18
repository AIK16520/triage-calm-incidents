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
    <section className="py-24 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-headline mb-6">
            The <span className="gradient-text">On-Call Nightmare</span>
          </h2>
          <p className="text-body text-muted-foreground">
            Production incidents don't care about your sleep schedule, your vacation, or your sanity.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-10 ${
                index !== problems.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              {/* Icon and title */}
              <div className="flex items-center gap-4 md:w-64 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-xl font-bold">{problem.title}</h3>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground flex-1">{problem.description}</p>
              
              {/* Stat */}
              <div className="md:text-right shrink-0">
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
