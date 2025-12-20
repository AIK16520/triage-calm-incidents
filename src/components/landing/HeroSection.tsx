import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Bell, Moon, CheckCircle2 } from "lucide-react";

const BeforePhone = () => {
  const [showAlarm, setShowAlarm] = useState(false);
  const [showWake, setShowWake] = useState(false);

  useEffect(() => {
    const alarmInterval = setInterval(() => {
      setShowAlarm(true);
      setTimeout(() => setShowWake(true), 1000);
      setTimeout(() => {
        setShowAlarm(false);
        setShowWake(false);
      }, 3000);
    }, 5000);

    return () => clearInterval(alarmInterval);
  }, []);

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-20 flex items-center justify-between px-6 pt-2">
            <span className="text-white text-xs font-medium">2:47 AM</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/30 rounded-sm">
                <div className="w-full h-full bg-white/80 rounded-sm" />
              </div>
              <div className="w-1 h-1 bg-white/80 rounded-full" />
            </div>
          </div>

          {/* Lock Screen Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            {/* Moon icon for night */}
            <Moon className="w-12 h-12 text-white/40 mb-8" />
            
            {/* Alarm Notification */}
            <div className={`w-full transition-all duration-500 ${showAlarm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-red-500/20 backdrop-blur-xl rounded-2xl p-4 border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse-glow">
                <div className="flex items-center gap-3 mb-2">
                  <Bell className="w-6 h-6 text-red-400 animate-pulse" />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-red-400">🚨 PAGERDUTY ALERT</h3>
                    <p className="text-xs text-white/70 mt-1">INFRA DOWN - API Gateway</p>
                  </div>
                </div>
                <p className="text-xs text-white/60">Error rate: 8% → Normal: 1%</p>
              </div>
            </div>

            {/* Wake up indicator */}
            {showWake && (
              <div className="mt-4 text-center animate-fade-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                  <span className="text-xs text-yellow-400 font-medium">😴 Dev wakes up</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
};

const AfterPhone = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "alert",
      title: "🚨 INFRA DOWN - API Gateway",
      subtitle: "Error rate: 8% → Normal: 1%",
      time: "2:47 AM",
    },
    {
      type: "analyzing",
      title: "Analyzing incident...",
      subtitle: "Deploy detected 3 min ago",
      time: "2:47 AM",
    },
    {
      type: "resolved",
      title: "✅ RESOLVED - Rolled back to deploy-xyz788",
      subtitle: "Incident duration: 47 seconds",
      time: "2:48 AM",
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
        <div className="relative bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-20 flex items-center justify-between px-6 pt-2">
            <span className="text-white text-xs font-medium">2:47 AM</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/30 rounded-sm">
                <div className="w-full h-full bg-white/80 rounded-sm" />
              </div>
              <div className="w-1 h-1 bg-white/80 rounded-full" />
            </div>
          </div>

          {/* Lock Screen Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="text-white/60 text-xs mb-4">Triage</div>
            
            {/* Notification Container */}
            <div className="w-full relative min-h-[180px] flex items-center">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-x-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 translate-x-0 translate-y-0 scale-100 z-10"
                      : index < currentSlide
                      ? "opacity-0 -translate-x-8 translate-y-0 scale-95 pointer-events-none z-0"
                      : "opacity-0 translate-x-8 translate-y-0 scale-95 pointer-events-none z-0"
                  }`}
                >
                  <div
                    className={`bg-white/10 backdrop-blur-xl rounded-2xl p-4 border w-full ${
                      slide.type === "alert"
                        ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                        : slide.type === "resolved"
                        ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                        : "border-white/20"
                    }`}
                  >
                    {/* App Icon & Time */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                          <span className="text-white text-xs font-bold">T</span>
                        </div>
                        <span className="text-white/90 text-xs font-medium">Triage</span>
                      </div>
                      <span className="text-white/50 text-xs">{slide.time}</span>
                    </div>

                    {/* Notification Content */}
                    <div className="mt-2">
                      <h3
                        className={`text-sm font-semibold mb-1 ${
                          slide.type === "alert"
                            ? "text-red-400"
                            : slide.type === "resolved"
                            ? "text-green-400"
                            : "text-white"
                        }`}
                      >
                        {slide.title}
                      </h3>
                      <p className="text-white/70 text-xs leading-relaxed">
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* Analyzing Animation */}
                    {slide.type === "analyzing" && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
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
                      <div className="mt-3 flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="w-4 h-4 animate-scale-in" />
                        <span className="text-xs font-medium">Auto-resolved</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sleep indicator */}
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                <span className="text-xs text-green-400 font-medium">😴 Dev sleeps peacefully</span>
              </div>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
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
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground mb-3">
            Triage
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            <span className="gradient-text bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
              Your On-Call Engineer
            </span>
          </h2>
        </div>

        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto mb-12">
          {/* Before - Left Side */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
                <span className="text-sm font-semibold text-red-600">Before</span>
              </span>
            </div>
            <div className="phone-float">
              <BeforePhone />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center max-w-xs">
              Devs get woken up by alerts at 2 AM
            </p>
          </div>

          {/* After - Right Side */}
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                <span className="text-sm font-semibold text-green-600">After</span>
              </span>
            </div>
            <div className="phone-float">
              <AfterPhone />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center max-w-xs">
              Triage auto-resolves incidents while you sleep
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="h-14 px-8 text-base shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]"
            onClick={scrollToWaitlist}
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
