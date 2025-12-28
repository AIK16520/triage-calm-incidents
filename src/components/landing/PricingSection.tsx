import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 services",
      "1,000 events/day",
      "Email support",
      "All integrations included",
      "Basic analytics",
    ],
    cta: "Join Waitlist",
    popular: false,
  },
  {
    name: "Professional",
    price: "$299",
    description: "For growing teams that need more power",
    features: [
      "Unlimited services",
      "10,000 events/day",
      "Slack integration",
      "Priority support",
      "All integrations included",
      "Advanced analytics",
      "Custom escalation rules",
    ],
    cta: "Join Waitlist",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with complex needs",
    features: [
      "Custom event limits",
      "Dedicated support",
      "SLA guarantees",
      "Custom integrations",
      "SSO/SAML",
      "Audit logs",
      "Dedicated instance",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-title text-primary">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-foreground">
            No hidden fees. No surprises. Just reliable incident response.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative glass rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 ${
                plan.popular ? 'border-2 border-primary glow-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full gradient-bg text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-foreground">/month</span>}
                </div>
                <p className="text-sm text-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                className="w-full"
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
