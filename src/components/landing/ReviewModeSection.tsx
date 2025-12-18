import { Check, Zap, Eye, FileText, RotateCcw, ArrowRight, Shield, TrendingUp } from "lucide-react";

const ReviewModeSection = () => {
  return (
    <section id="review-mode" className="py-24 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-attention/10 border border-attention/20 mb-6">
            <Eye className="w-4 h-4 text-attention" />
            <span className="text-sm font-medium text-attention">Human-in-the-Loop</span>
          </div>
          <h2 className="text-headline mb-6">
            Full Control <span className="gradient-text">When You Need It</span>
          </h2>
          <p className="text-body text-muted-foreground">
            AI automation with human judgment as the safety net. You decide how much autonomy Triage gets.
          </p>
        </div>

        {/* Mode Toggle Comparison */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Auto Mode */}
            <div className="bg-card border border-border rounded-3xl p-8 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Auto Mode</h3>
                  <span className="text-sm text-muted-foreground">High-confidence incidents</span>
                </div>
                <span className="ml-auto px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  Default
                </span>
              </div>
              
              {/* Flow visualization */}
              <div className="bg-secondary/50 rounded-xl p-5 mb-6 border border-border">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                    </div>
                    <span className="text-xs font-medium">Detected</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                    <span className="text-xs font-medium">Analyzed</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="text-xs font-medium">&gt;75%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-xs font-medium text-success">Resolved</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                For clear-cut incidents with high confidence. AI handles everything automatically.
              </p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="font-bold text-success">78%</span>
                  <span className="text-muted-foreground">of incidents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="font-medium">&lt; 3 min</span>
                  <span className="text-muted-foreground">avg resolution</span>
                </div>
              </div>
            </div>

            {/* Review Mode */}
            <div className="bg-card border border-border rounded-3xl p-8 hover:border-attention/30 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-attention/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-attention/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-attention" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Review Mode</h3>
                    <span className="text-sm text-muted-foreground">Complex scenarios</span>
                  </div>
                  <span className="ml-auto px-3 py-1 text-xs font-medium rounded-full bg-attention/10 text-attention">
                    Human Review
                  </span>
                </div>
                
                {/* Flow visualization */}
                <div className="bg-secondary/50 rounded-xl p-5 mb-6 border border-border">
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                      </div>
                      <span className="text-xs font-medium">Detected</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                      </div>
                      <span className="text-xs font-medium">Analyzed</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-attention/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-attention" />
                      </div>
                      <span className="text-xs font-medium">Report</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-xs font-medium text-success">Approved</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  For complex scenarios requiring human judgment. Full context, one-click approval.
                </p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-attention rounded-full" />
                    <span className="font-bold text-attention">22%</span>
                    <span className="text-muted-foreground">of incidents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="font-medium">8 min</span>
                    <span className="text-muted-foreground">avg resolution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Mode Features */}
        <div className="max-w-5xl mx-auto">
          <p className="text-label text-muted-foreground text-center mb-8">Review Mode Features</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Check, text: "One-Click Approval", desc: "Approve AI recommendation instantly" },
              { icon: FileText, text: "Full Context Reports", desc: "Complete incident analysis" },
              { icon: RotateCcw, text: "Alternative Actions", desc: "AI suggests multiple solutions" },
              { icon: Shield, text: "Audit Trail", desc: "Every decision logged" },
              { icon: TrendingUp, text: "Learning Loop", desc: "Your decisions improve AI" },
            ].map((feature) => (
              <div key={feature.text} className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-elegant transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold text-sm mb-1">{feature.text}</h4>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewModeSection;
