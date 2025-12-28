import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

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
              <div className="px-5 py-2.5 bg-white/5 rounded-full border border-white/10">
                <span className="text-sm text-white/60 font-medium">Dev sleeping</span>
              </div>
            </div>
            
            {/* Middle: PagerDuty Alert Notification - iPhone style */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-[240px] mx-auto px-2">
                {/* iPhone Lock Screen Notification */}
                <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                  {/* PagerDuty App Header */}
                  <div className="bg-[#06AC38] px-4 py-2.5 flex items-center justify-between">
                    <span className="text-white text-xs font-semibold">PagerDuty</span>
                    <span className="text-white/90 text-xs font-mono">now</span>
                  </div>
                  
                  {/* Alert Content */}
                  <div className="px-4 py-3 bg-red-50 border-l-4 border-red-500">
                    <div className="flex items-start gap-2 mb-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 animate-pulse flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Critical</span>
                          <span className="text-[10px] text-red-500">•</span>
                          <span className="text-[10px] text-red-500">Service: API Gateway</span>
                        </div>
                        <h3 className="text-sm font-bold text-red-700 mb-1">INFRA DOWN</h3>
                        <p className="text-xs text-red-600 leading-relaxed">
                          Error rate: 8% → Normal: 1%
                        </p>
                        <p className="text-[10px] text-red-500 mt-1.5">Incident #INC-12345</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="px-4 py-2.5 bg-white/50 border-t border-gray-200/50 flex gap-2">
                    <button className="flex-1 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg">
                      Acknowledge
                    </button>
                    <button className="flex-1 py-2 bg-gray-100 text-foreground text-xs font-semibold rounded-lg">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Wake up indicator - Fixed position */}
            <div className="h-[60px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500/30 rounded-full border-2 border-yellow-500/60 shadow-lg">
                  <span className="text-sm text-yellow-300 font-bold">Dev wakes up</span>
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
              <div className="px-5 py-2.5 bg-white/5 rounded-full border border-white/10">
                <span className="text-sm text-white/60 font-medium">Dev sleeping</span>
              </div>
            </div>
            
            {/* Middle: Triage Active Notifications - Centered */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-[240px] mx-auto relative min-h-[140px]">
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
                    {/* iPhone Lock Screen Notification Style */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/20 w-full min-h-[140px]">
                      {/* App Header */}
                      <div className={`px-4 py-2.5 flex items-center justify-between ${
                        slide.type === "alert"
                          ? "bg-red-500"
                          : slide.type === "resolved"
                          ? "bg-primary"
                          : "bg-primary"
                      }`}>
                        <span className="text-white text-xs font-semibold font-oldenberg">
                          Triage
                        </span>
                        <span className="text-white/90 text-xs font-mono">{slide.time}</span>
                      </div>
                      
                      {/* Notification Content */}
                      <div className={`px-4 py-3 ${
                        slide.type === "alert"
                          ? "bg-red-50 border-l-4 border-red-500"
                          : slide.type === "resolved"
                          ? "bg-green-50 border-l-4 border-green-500"
                          : "bg-primary/5 border-l-4 border-primary"
                      }`}>
                        <div className="flex items-start gap-2 mb-1">
                          {slide.type === "alert" && (
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 animate-pulse flex-shrink-0" />
                          )}
                          {slide.type === "analyzing" && (
                            <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            {slide.type === "alert" && (
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Critical</span>
                                <span className="text-[10px] text-red-500">•</span>
                                <span className="text-[10px] text-red-500">Service: API Gateway</span>
                              </div>
                            )}
                            <h3 className={`text-sm font-bold mb-1 break-words ${
                              slide.type === "alert"
                                ? "text-red-700"
                                : slide.type === "resolved"
                                ? "text-green-700"
                                : "text-foreground"
                            }`}>
                              {slide.title}
                            </h3>
                            <p className={`text-xs leading-relaxed break-words ${
                              slide.type === "alert"
                                ? "text-red-600"
                                : slide.type === "resolved"
                                ? "text-green-600"
                                : "text-foreground"
                            }`}>
                              {slide.subtitle}
                            </p>
                            {slide.type === "resolved" && (
                              <p className="text-[10px] text-green-500 mt-1.5">Auto-resolved by <span className="font-oldenberg">Triage</span></p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Analyzing Animation */}
                      {slide.type === "analyzing" && (
                        <div className="px-4 py-2.5 bg-white/50 border-t border-gray-200/50">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-75" />
                              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-150" />
                            </div>
                            <span className="text-foreground text-xs">Analyzing incident...</span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons for Alert */}
                      {slide.type === "alert" && (
                        <div className="px-4 py-2.5 bg-white/50 border-t border-gray-200/50 flex gap-2">
                          <button className="flex-1 py-2 bg-red-500 text-white text-xs font-semibold rounded-lg">
                            Acknowledge
                          </button>
                          <button className="flex-1 py-2 bg-gray-100 text-foreground text-xs font-semibold rounded-lg">
                            View
                          </button>
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
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/30 rounded-full border-2 border-green-500/60 shadow-lg">
                  <span className="text-sm text-green-300 font-bold">Dev sleeps easily</span>
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
      {/* Background */}
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="container relative z-10 px-4">
        {/* Centered Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-primary mb-4 animate-fade-up font-title">
            Never Wake Up for Production Incidents Again
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 animate-fade-up stagger-1 font-title">
            <span className="text-foreground">
              Your AI Engineer Handles Incidents While You Sleep
            </span>
          </h2>
        </div>

        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto mb-12 relative">
          {/* Metrics Cards - Between Before and After (Desktop) - Vertical Stack */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex-col gap-3 items-center">
            {[
              { value: "90 sec", label: "Avg. response time" },
              { value: "2 weeks", label: "Dev time saved" },
              { value: "$20K+", label: "Annual savings" },
            ].map((metric, index) => (
              <div
                key={index}
                className="bg-card border-2 border-primary/30 rounded-xl p-4 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all hover:-translate-y-1 w-[160px] backdrop-blur-sm"
              >
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-primary leading-none">
                    {metric.value}
                  </span>
                  <p className="text-xs text-foreground font-medium leading-tight mt-0.5 break-words">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Before - Left Side */}
          <div className="flex flex-col items-center relative z-0">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 border-2 border-red-500 rounded-full shadow-md">
                <span className="text-base font-bold text-red-700">Before</span>
              </span>
            </div>
            <p className="mb-6 text-base font-semibold text-foreground text-center max-w-xs leading-relaxed min-h-[3.5rem] flex items-center">
              Devs get woken up by alerts at 2 AM
            </p>
            <div className="w-full flex justify-center">
              <BeforePhone />
            </div>
          </div>
          
          {/* After - Right Side */}
          <div className="flex flex-col items-center relative z-0">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border-2 border-green-500 rounded-full shadow-md">
                <span className="text-base font-bold text-green-700">After</span>
              </span>
            </div>
            <p className="mb-6 text-base font-semibold text-foreground text-center max-w-xs leading-relaxed min-h-[3.5rem] flex items-center">
              <span className="font-oldenberg">Triage</span>
              <span> auto-resolves incidents while you sleep</span>
            </p>
            <div className="w-full flex justify-center">
              <AfterPhone />
            </div>
          </div>
        </div>

        {/* Metrics Cards - Mobile Version */}
        <div className="md:hidden grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {[
            { value: "90 sec", label: "Avg. response time" },
            { value: "2 weeks", label: "Dev time saved" },
            { value: "$20K+", label: "Annual savings" },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-card border-2 border-primary/30 rounded-xl p-4 shadow-lg text-center"
            >
              <span className="text-xl font-bold text-primary block mb-1">
                {metric.value}
              </span>
              <p className="text-xs text-foreground font-medium leading-tight">
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
          <p className="text-sm text-foreground">
            Be among the first to experience autonomous incident response
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
