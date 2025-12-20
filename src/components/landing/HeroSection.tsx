import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Bell, Moon, CheckCircle2, ArrowRight, Zap, Clock, Calendar, DollarSign } from "lucide-react";

const BeforePhone = () => {
  // No state needed - everything stays visible with pulsing borders

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-[#1A1B3D] rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5', minHeight: '500px' }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#1A1B3D]/80 to-transparent z-20 flex items-center justify-between px-6 pt-2">
            <span className="text-white text-xs font-medium">3:47 AM</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/30 rounded-sm">
                <div className="w-full h-full bg-white/80 rounded-sm" />
              </div>
              <div className="w-1 h-1 bg-white/80 rounded-full" />
            </div>
          </div>

          {/* Lock Screen Content */}
          <div className="absolute inset-0 flex flex-col p-6 pt-16 pb-20">
            {/* Top: Sleeping Dev Indicator */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full border border-white/10">
                <Moon className="w-5 h-5 text-white/40" />
                <span className="text-sm text-white/60 font-medium">Dev sleeping</span>
              </div>
            </div>
            
            {/* Middle: Alarm Notification - Fixed height, centered */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full">
                <div className="bg-red-500/20 backdrop-blur-xl rounded-2xl p-4 border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse-glow min-h-[140px] flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <Bell className="w-6 h-6 text-red-400 animate-pulse" />
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-red-400">PAGERDUTY ALERT</h3>
                      <p className="text-xs text-white/70 mt-1">INFRA DOWN - API Gateway</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/60">Error rate: 8% → Normal: 1%</p>
                </div>
              </div>
            </div>

            {/* Bottom: Wake up indicator - Fixed position */}
            <div className="h-[60px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border-2 border-yellow-500/40 animate-pulse">
                  <span className="text-xs text-yellow-400 font-medium">😴 Dev wakes up</span>
                </div>
              </div>
            </div>
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-20" />
        </div>
      </div>
    </div>
  );
};

const AfterPhone = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "alert",
      title: "INFRA DOWN - API Gateway",
      subtitle: "Error rate: 8% → Normal: 1%",
      time: "3:47 AM",
    },
    {
      type: "analyzing",
      title: "Analyzing incident...",
      subtitle: "Deploy detected 3 min ago",
      time: "3:47 AM",
    },
    {
      type: "resolved",
      title: "RESOLVED - Rolled back to deploy-xyz788",
      subtitle: "Incident duration: 47 seconds",
      time: "3:48 AM",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-[#1A1B3D] rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5', minHeight: '500px' }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#1A1B3D]/80 to-transparent z-20 flex items-center justify-between px-6 pt-2">
            <span className="text-white text-xs font-medium">3:47 AM</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/30 rounded-sm">
                <div className="w-full h-full bg-white/80 rounded-sm" />
              </div>
              <div className="w-1 h-1 bg-white/80 rounded-full" />
            </div>
          </div>

          {/* Lock Screen Content - Split View */}
          <div className="absolute inset-0 flex flex-col p-6 pt-16 pb-20">
            {/* Top: Sleeping Dev Indicator - Same size as Before */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full border border-white/10">
                <Moon className="w-5 h-5 text-white/40" />
                <span className="text-sm text-white/60 font-medium">Dev sleeping</span>
              </div>
            </div>
            
            {/* Middle: Triage Active Notifications - Centered */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full relative min-h-[140px]">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-x-0 top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? "opacity-100 translate-x-0 scale-100 z-10"
                        : index < currentSlide
                        ? "opacity-0 -translate-x-8 scale-95 pointer-events-none z-0"
                        : "opacity-0 translate-x-8 scale-95 pointer-events-none z-0"
                    }`}
                  >
                    <div
                      className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 border w-full min-h-[140px] flex flex-col justify-center overflow-hidden ${
                        slide.type === "alert"
                          ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : slide.type === "resolved"
                          ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                          : "border-white/20"
                      }`}
                    >
                      {/* App Icon & Time */}
                      <div className="flex items-center justify-between mb-2 flex-shrink-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">T</span>
                          </div>
                          <span className="text-white/90 text-xs font-medium truncate">Triage</span>
                        </div>
                        <span className="text-white/50 text-xs font-mono flex-shrink-0 ml-2">{slide.time}</span>
                      </div>

                      {/* Notification Content */}
                      <div className="mt-2 flex-1 min-h-0">
                        <h3
                          className={`text-sm font-semibold mb-1 break-words ${
                            slide.type === "alert"
                              ? "text-red-400"
                              : slide.type === "resolved"
                              ? "text-green-400"
                              : "text-white"
                          }`}
                        >
                          {slide.type === "resolved" && "✅ "}
                          {slide.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed break-words">
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Analyzing Animation */}
                      {slide.type === "analyzing" && (
                        <div className="mt-2 pt-2 border-t border-white/10 flex-shrink-0">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-75" />
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-150" />
                            </div>
                            <span className="text-white/60 text-xs">Processing logs...</span>
                          </div>
                        </div>
                      )}

                      {/* Success Checkmark */}
                      {slide.type === "resolved" && (
                        <div className="mt-2 flex items-center gap-2 text-green-400 flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 animate-scale-in flex-shrink-0" />
                          <span className="text-xs font-medium">Auto-resolved</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Sleep indicator - Fixed position to match Before */}
            <div className="h-[60px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                  <span className="text-xs text-green-400 font-medium">😴 Dev sleeps peacefully</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-20" />
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(173_58%_39%/0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(160_84%_35%/0.06)_0%,_transparent_50%)]" />
      
      <div className="container relative z-10 px-4">
        {/* Centered Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground mb-4 animate-fade-up">
            Never Wake Up for Production Incidents Again
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 animate-fade-up stagger-1">
            <span className="gradient-text bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Your AI Engineer Handles Incidents While You Sleep
            </span>
          </h2>
        </div>

        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto mb-12 relative">
          {/* Metrics Cards - Between Before and After (Desktop) - Vertical Stack */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col gap-3 items-center">
            {[
              { icon: Clock, value: "3 min", label: "Avg. response time" },
              { icon: Calendar, value: "2 weeks", label: "Dev time saved" },
              { icon: DollarSign, value: "$20K+", label: "Annual savings" },
            ].map((metric, index) => (
              <div
                key={index}
                className="bg-card border-2 border-primary/30 rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all hover:-translate-y-1 w-[160px] backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <metric.icon className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-2xl font-bold gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-none">
                    {metric.value}
                  </span>
                    <p className="text-xs text-muted-foreground font-medium leading-tight mt-0.5 break-words">
                      {metric.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Before - Left Side */}
          <div className="flex flex-col items-center relative z-0">
            <div className="mb-4 -translate-x-4">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 border-2 border-red-500 rounded-full shadow-md">
                <span className="text-base font-bold text-red-700">Before</span>
              </span>
            </div>
            <p className="mb-6 text-base font-semibold text-foreground text-center max-w-xs leading-relaxed min-h-[3.5rem] flex items-center">
              Devs get woken up by alerts at 2 AM
            </p>
            <div className="phone-float w-full flex justify-center">
              <BeforePhone />
            </div>
          </div>
          
          {/* After - Right Side */}
          <div className="flex flex-col items-center relative z-0">
            <div className="mb-4 translate-x-4">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border-2 border-green-500 rounded-full shadow-md">
                <span className="text-base font-bold text-green-700">After</span>
              </span>
            </div>
            <p className="mb-6 text-base font-semibold text-foreground text-center max-w-xs leading-relaxed min-h-[3.5rem] flex items-center">
              Triage auto-resolves incidents while you sleep
            </p>
            <div className="phone-float w-full flex justify-center">
              <AfterPhone />
            </div>
          </div>
        </div>

        {/* Metrics Cards - Mobile Version */}
        <div className="md:hidden grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {[
            { icon: Clock, value: "3 min", label: "Avg. response time" },
            { icon: Calendar, value: "2 weeks", label: "Dev time saved" },
            { icon: DollarSign, value: "$20K+", label: "Annual savings" },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-card border-2 border-primary/30 rounded-xl p-4 shadow-lg text-center"
            >
              <metric.icon className="w-5 h-5 text-primary mx-auto mb-2" strokeWidth={2} />
              <span className="text-xl font-bold gradient-text bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent block mb-1">
                {metric.value}
              </span>
              <p className="text-xs text-muted-foreground font-medium leading-tight">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center gap-4">
          <Button 
            variant="hero" 
            size="lg" 
            className="h-14 px-10 text-base shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] group"
            onClick={scrollToWaitlist}
          >
            Join Waitlist
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Be among the first to experience autonomous incident response
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
