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

        {/* Confidence Threshold Visualization */}
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Smart Escalation Logic</h3>
            
            <div className="space-y-4">
              {/* High confidence */}
              <div className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-medium">&gt; 75%</div>
                <div className="flex-1 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center px-4">
                  <Zap className="w-5 h-5 text-primary mr-3" />
                  <span className="font-medium">Auto-execute</span>
                  <span className="ml-auto text-sm text-muted-foreground">Safe, confident action</span>
                </div>
              </div>
              
              {/* Medium confidence */}
              <div className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-medium">50-75%</div>
                <div className="flex-1 h-12 rounded-lg bg-attention/20 border border-attention/30 flex items-center px-4">
                  <Eye className="w-5 h-5 text-attention mr-3" />
                  <span className="font-medium">Review Mode</span>
                  <span className="ml-auto text-sm text-muted-foreground">Human approval required</span>
                </div>
              </div>
              
              {/* Low confidence */}
              <div className="flex items-center gap-4">
                <div className="w-24 text-right text-sm font-medium">&lt; 50%</div>
                <div className="flex-1 h-12 rounded-lg bg-destructive/20 border border-destructive/30 flex items-center px-4">
                  <Shield className="w-5 h-5 text-destructive mr-3" />
                  <span className="font-medium">Immediate Alert</span>
                  <span className="ml-auto text-sm text-muted-foreground">Escalate to on-call</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>High confidence path</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-attention" />
                  <span>Review required path</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span>Alert path</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Review Interface */}
        <div className="max-w-4xl mx-auto mt-16">
          <h3 className="text-xl font-bold mb-6 text-center">Review Interface Preview</h3>
          <div className="glass rounded-2xl overflow-hidden border border-attention/20">
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-attention/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-sm text-muted-foreground">Incident Review</span>
              </div>
              <span className="px-2 py-0.5 text-xs font-medium bg-attention/20 text-attention rounded">
                Awaiting Review
              </span>
            </div>
            
            <div className="p-6">
              {/* Incident summary */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">API Response Time Degradation</h4>
                  <p className="text-sm text-muted-foreground">Detected 3 minutes ago • Production environment</p>
                </div>
                {/* Confidence gauge */}
                <div className="text-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-secondary" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" 
                        className="text-attention" strokeDasharray="176" strokeDashoffset="44" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-attention">68%</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">Confidence</span>
                </div>
              </div>
              
              {/* Analysis */}
              <div className="bg-secondary/30 rounded-xl p-4 mb-6">
                <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  AI Analysis
                </h5>
                <p className="text-sm text-muted-foreground">
                  Latency spike correlated with deployment v2.5.3 (deployed 8 minutes ago). 
                  Database query optimization in the new version may be causing N+1 queries on the /api/users endpoint. 
                  Rollback recommended but not high confidence due to concurrent infrastructure change.
                </p>
              </div>
              
              {/* Recommended action */}
              <div className="border border-attention/30 rounded-xl p-4 mb-4">
                <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-attention" />
                  Recommended: Rollback to v2.5.2
                </h5>
                <p className="text-xs text-muted-foreground mb-3">
                  This will revert to the previous stable deployment. ETA: 45 seconds.
                </p>
                <div className="flex gap-2">
                  <Button variant="hero" size="sm" className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Approve Rollback
                  </Button>
                  <Button variant="outline" size="sm">
                    Reject
                  </Button>
                </div>
              </div>
              
              {/* Alternative actions */}
              <div className="text-sm">
                <span className="text-muted-foreground">Alternative actions: </span>
                <span className="text-primary cursor-pointer hover:underline">Restart service</span>
                <span className="text-muted-foreground"> • </span>
                <span className="text-primary cursor-pointer hover:underline">Scale up instances</span>
                <span className="text-muted-foreground"> • </span>
                <span className="text-primary cursor-pointer hover:underline">Mark as false positive</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewModeSection;