import { Check, Zap, Eye, FileText, RotateCcw, ArrowRight, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReviewModeSection = () => {
  return (
    <section id="review-mode" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-attention/5 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 border border-attention/30">
            <Eye className="w-4 h-4 text-attention" />
            <span className="text-sm font-medium">Human-in-the-Loop</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Full Control <span className="gradient-text">When You Need It</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AI automation with human judgment as the safety net. You decide how much autonomy Triage gets.
          </p>
        </div>

        {/* Mode Toggle Comparison */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Auto Mode */}
            <div className="glass rounded-2xl p-8 border border-primary/30 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Auto Mode</h3>
                  <span className="text-sm text-muted-foreground">High-confidence incidents</span>
                </div>
                <span className="ml-auto px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary">
                  Default
                </span>
              </div>
              
              {/* Flow visualization */}
              <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-destructive rounded-full" />
                    </div>
                    <span>Detected</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                    <span>Analyzed</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span>&gt;75%</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-success font-medium">Resolved</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                For clear-cut incidents with high confidence. AI handles everything automatically.
              </p>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-success font-semibold">78%</span>
                  <span className="text-muted-foreground">of incidents</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>&lt; 3 min</span>
                  <span className="text-muted-foreground">avg resolution</span>
                </div>
              </div>
            </div>

            {/* Review Mode */}
            <div className="glass rounded-2xl p-8 border border-attention/30 hover:border-attention/50 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-attention/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-attention/20 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-attention" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Review Mode</h3>
                    <span className="text-sm text-muted-foreground">Complex scenarios</span>
                  </div>
                  <span className="ml-auto px-3 py-1 text-xs font-medium rounded-full bg-attention/20 text-attention">
                    Human Review
                  </span>
                </div>
                
                {/* Flow visualization */}
                <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                      </div>
                      <span>Detected</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                      </div>
                      <span>Analyzed</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-attention/20 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-attention" />
                      </div>
                      <span>Report</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-success font-medium">Approved</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  For complex scenarios requiring human judgment. Full context, one-click approval.
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-attention rounded-full" />
                    <span className="text-attention font-semibold">22%</span>
                    <span className="text-muted-foreground">of incidents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>8 min</span>
                    <span className="text-muted-foreground">avg resolution</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Mode Features */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Review Mode Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Check, text: "One-Click Approval", desc: "Approve AI recommendation instantly" },
              { icon: FileText, text: "Full Context Reports", desc: "Complete incident analysis" },
              { icon: RotateCcw, text: "Alternative Actions", desc: "AI suggests multiple solutions" },
              { icon: Shield, text: "Audit Trail", desc: "Every decision logged" },
              { icon: TrendingUp, text: "Learning Loop", desc: "Your decisions improve AI" },
            ].map((feature) => (
              <div key={feature.text} className="glass rounded-xl p-4 text-center hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
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