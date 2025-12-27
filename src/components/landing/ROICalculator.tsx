import { useState } from "react";
import { DollarSign, Clock, TrendingUp, ChevronDown, ChevronUp, Check } from "lucide-react";

const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState(10);
  const [incidentsPerWeek, setIncidentsPerWeek] = useState(15);
  const [avgSalary, setAvgSalary] = useState(150000);
  const [showDetails, setShowDetails] = useState(false);

  // Constants
  const avgIncidentTimeManual = 45; // minutes
  const avgIncidentTimeTriage = 1.5; // minutes (90 seconds)
  const weeksPerYear = 52;

  // Calculations
  const monthlyIncidents = Math.round(incidentsPerWeek * 4.33);
  const yearlyIncidents = incidentsPerWeek * weeksPerYear;

  const hoursWastedManual = (yearlyIncidents * avgIncidentTimeManual) / 60;
  const hoursWastedTriage = (yearlyIncidents * avgIncidentTimeTriage) / 60;

  const hoursSaved = Math.round(hoursWastedManual - hoursWastedTriage);
  const hourlyRate = avgSalary / 2080; // 40 hours/week * 52 weeks
  const annualSavings = Math.round(hoursSaved * hourlyRate);

  // Detailed breakdown calculations
  const directTimeSaved = annualSavings;
  const contextSwitchingReduction = Math.round(annualSavings * 0.125);
  const productivityBoost = Math.round(annualSavings * 0.03);
  const revenueProtection = Math.round(annualSavings * 0.31);
  const churnReduction = Math.round(annualSavings * 0.18);
  const featureVelocity = Math.round(annualSavings * 0.72);

  const totalAnnualValue = Math.round(
    directTimeSaved +
    contextSwitchingReduction +
    productivityBoost +
    revenueProtection +
    churnReduction +
    featureVelocity
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(173_58%_39%/0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(160_84%_35%/0.06)_0%,_transparent_50%)]" />

      <div className="container relative z-10 px-6 md:px-8 lg:px-12 max-w-[1600px]">
        {/* Title */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary animate-fade-up">
            Triage
          </h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-10 items-start">
          {/* Left Side - Text Content */}
          <div className="space-y-6 animate-fade-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              AI Agent that handles deployment issues automatically
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              So your devs can focus on shipping new features instead of fixing production fires at 3am.
            </p>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-primary via-primary/90 to-success rounded-2xl p-8 mt-8 shadow-2xl hover:shadow-[0_0_80px_rgba(20,184,166,0.4)] transition-all duration-300 border-2 border-primary/50 animate-pulse-subtle">
              <p className="text-2xl font-bold text-white text-center leading-relaxed">
                Use the calculator to see how much time and money you'll save with Triage
              </p>
            </div>

            {/* Join Waitlist Button */}
            <div className="mt-6">
              <button className="w-full bg-white text-primary font-bold text-xl py-6 px-8 rounded-2xl border-3 border-primary shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                Join Waitlist
              </button>
            </div>
          </div>

          {/* Right Side - Calculator */}
          <div className="glass-card shadow-elevated hover:shadow-[0_0_60px_rgba(20,184,166,0.15)] transition-all duration-500 animate-fade-up stagger-1">
            {/* Input Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Team Size */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">
                  Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 text-base font-semibold bg-white border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Incidents per Week */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">
                  Incidents per Week
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={incidentsPerWeek}
                  onChange={(e) => setIncidentsPerWeek(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 text-base font-semibold bg-white border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Average Engineer Annual Salary */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">
                  Avg Annual Salary
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-semibold text-muted-foreground pointer-events-none">
                    $
                  </div>
                  <input
                    type="number"
                    min="30000"
                    max="500000"
                    step="1000"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Math.max(30000, parseInt(e.target.value) || 30000))}
                    className="w-full pl-7 pr-3 py-2 text-base font-semibold bg-white border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Annual Savings and Hours Reclaimed */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-gradient-to-r from-primary to-success rounded-xl p-4 shadow-lg text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <DollarSign className="w-5 h-5 text-white" />
                  <h2 className="text-sm md:text-base font-bold text-white">ANNUAL SAVINGS</h2>
                </div>
                <p className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {formatCurrency(annualSavings)}
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary to-success rounded-xl p-4 shadow-lg text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Clock className="w-5 h-5 text-white" />
                  <h2 className="text-sm md:text-base font-bold text-white">HOURS RECLAIMED</h2>
                </div>
                <p className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {formatNumber(hoursSaved)}
                </p>
              </div>
            </div>

            {/* Comparison Output */}
            <div className="bg-gradient-to-br from-primary/5 to-success/5 border-2 border-primary/20 rounded-2xl p-4 md:p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* WITHOUT TRIAGE */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
                    WITHOUT TRIAGE
                  </h3>
                  <div className="space-y-2 pl-3 border-l-4 border-destructive/30">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Time per incident</p>
                      <p className="text-xl font-bold text-destructive">45 min</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Monthly incidents</p>
                      <p className="text-xl font-bold text-foreground">{formatNumber(monthlyIncidents)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Time spent on deployment bugs</p>
                      <p className="text-xl font-bold text-destructive">{formatNumber(Math.round(hoursWastedManual))} hrs/year</p>
                    </div>
                  </div>
                </div>

                {/* WITH TRIAGE */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                    WITH TRIAGE
                  </h3>
                  <div className="space-y-2 pl-3 border-l-4 border-success/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Time per incident</p>
                      <p className="text-xl font-bold text-success">90 seconds</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Monthly incidents</p>
                      <p className="text-xl font-bold text-foreground">{formatNumber(monthlyIncidents)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Time spent on deployment bugs</p>
                      <p className="text-xl font-bold text-success">{formatNumber(Math.round(hoursWastedTriage))} hrs/year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="flex items-start gap-2 p-3 bg-success/10 border border-success/30 rounded-lg">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-foreground">95% reduction in manual intervention</p>
              </div>
              <div className="flex items-start gap-2 p-3 bg-success/10 border border-success/30 rounded-lg">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-foreground">Zero 3am wake-ups for auto-fixable issues</p>
              </div>
            </div>

            {/* Expandable Details */}
            <div className="border-t border-border pt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group text-sm"
              >
                <span>See Detailed Breakdown</span>
                {showDetails ? (
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                )}
              </button>

              {showDetails && (
                <div className="mt-4 space-y-4 animate-fade-up">
                  {/* Cost Breakdown */}
                  <div className="bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-xl p-4">
                    <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Cost Breakdown (Annual)
                    </h4>
                    <div className="space-y-2 ml-6">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Engineer Time Saved</p>
                          <p className="text-xs text-muted-foreground">Manual incident response eliminated</p>
                        </div>
                        <p className="text-lg font-bold text-primary">{formatCurrency(directTimeSaved)}</p>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Reduced Context Switching</p>
                          <p className="text-xs text-muted-foreground">Less interruption, better focus</p>
                        </div>
                        <p className="text-lg font-bold text-primary">{formatCurrency(contextSwitchingReduction)}</p>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Better Sleep Productivity</p>
                          <p className="text-xs text-muted-foreground">Well-rested engineers are more productive</p>
                        </div>
                        <p className="text-lg font-bold text-primary">{formatCurrency(productivityBoost)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Business Value */}
                  <div className="bg-gradient-to-br from-success/5 to-transparent border border-success/20 rounded-xl p-4">
                    <h4 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      Additional Business Value
                    </h4>
                    <div className="space-y-2 ml-6">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Faster MTTR (22min → 90sec)</p>
                          <p className="text-xs text-muted-foreground">Revenue protection from reduced downtime</p>
                        </div>
                        <p className="text-lg font-bold text-success">{formatCurrency(revenueProtection)}</p>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Reduced Customer Churn</p>
                          <p className="text-xs text-muted-foreground">Better uptime, happier customers</p>
                        </div>
                        <p className="text-lg font-bold text-success">{formatCurrency(churnReduction)}</p>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Deploy 3x More Often</p>
                          <p className="text-xs text-muted-foreground">Faster feature delivery, competitive advantage</p>
                        </div>
                        <p className="text-lg font-bold text-success">{formatCurrency(featureVelocity)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Total Value */}
                  <div className="bg-gradient-to-r from-primary/10 to-success/10 border-2 border-primary/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-foreground">TOTAL ANNUAL VALUE</h4>
                      <p className="text-3xl font-black gradient-text">{formatCurrency(totalAnnualValue)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;


