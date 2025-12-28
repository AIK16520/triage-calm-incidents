const problems = [
  {
    title: "Alert Fatigue",
    description: "Woken up at 3 AM for issues that could wait until morning. Your team is exhausted.",
    stat: "67%",
    statLabel: "of engineers report burnout from on-call",
  },
  {
    title: "Slow Response",
    description: "Manual incident response takes 15-45 minutes. Every second of downtime costs money.",
    stat: "23 min",
    statLabel: "average time to first response",
  },
  {
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
          <h2 className="text-headline mb-6 font-title text-primary">
            The <span className="gradient-text">On-Call Nightmare</span>
          </h2>
          <p className="text-body text-foreground">
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
              {/* Title */}
              <div className="md:w-64 shrink-0">
                <h3 className="text-2xl md:text-3xl font-bold text-destructive">{problem.title}</h3>
              </div>
              
              {/* Description */}
              <p className="text-foreground flex-1">{problem.description}</p>
              
              {/* Stat */}
              <div className="md:text-right shrink-0">
                <span className="text-3xl font-bold text-destructive">{problem.stat}</span>
                <p className="text-sm text-foreground mt-1">{problem.statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
