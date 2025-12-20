import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";

const PhoneMockup = () => {
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
    }, 4500); // Change slide every 4.5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl border border-white/10">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-[#0a0a0a] rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-20 flex items-center justify-between px-6 pt-2">
            <span className="text-white text-xs font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white/30 rounded-sm">
                <div className="w-full h-full bg-white/80 rounded-sm" />
              </div>
              <div className="w-1 h-1 bg-white/80 rounded-full" />
            </div>
          </div>

          {/* Lock Screen Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-white/60 text-sm mb-4">Triage</div>
            
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
                        ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-pulse-glow"
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

                    {/* Expanding Animation for Slide 2 */}
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

                    {/* Success Checkmark Animation */}
                    {slide.type === "resolved" && (
                      <div className="mt-3 flex items-center gap-2 text-green-400">
                        <svg
                          className="w-4 h-4 animate-scale-in"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-xs font-medium">Auto-resolved</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(173_58%_39%/0.1)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_hsl(160_84%_35%/0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(173_58%_39%/0.05)_0%,_transparent_70%)]" />
      
      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column - 60% (3/5) */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-white">
              Autonomous Incident Response
            </h1>
            
            {/* Subheading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
              <span className="gradient-text bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Your AI On-Call Engineer
              </span>
            </h2>
            
            {/* Body Text */}
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              Triage automatically detects, analyzes, and fixes production incidents while your team rests. 
              It reads logs, analyzes root causes, then either rolls back, restarts, or alerts developers when needed.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="h-14 px-8 text-base shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] group"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="heroOutline" 
                size="lg" 
                className="h-14 px-8 text-base group"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
          </div>
          
          {/* Right Column - 40% (2/5) */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="phone-float w-full">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
