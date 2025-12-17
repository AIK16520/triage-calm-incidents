import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThumbsUp, Check, Send } from "lucide-react";
import { toast } from "sonner";

const supportedIntegrations = [
  { name: "AWS CloudWatch", teams: "2,341", connected: true },
  { name: "Vercel", teams: "1,892", connected: true },
  { name: "Railway", teams: "1,456", connected: true },
  { name: "Render", teams: "1,234", connected: true },
  { name: "Modal", teams: "987", connected: true },
  { name: "Digital Ocean", teams: "876", connected: true },
];

const comingSoonIntegrations = [
  { name: "Heroku", votes: 234 },
  { name: "Fly.io", votes: 189 },
  { name: "Google Cloud Platform", votes: 156 },
  { name: "Azure", votes: 143 },
];

const IntegrationsSection = () => {
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(comingSoonIntegrations.map(i => [i.name, i.votes]))
  );
  const [voted, setVoted] = useState<Record<string, boolean>>({});

  const handleVote = (name: string) => {
    if (!voted[name]) {
      setVotes(prev => ({ ...prev, [name]: prev[name] + 1 }));
      setVoted(prev => ({ ...prev, [name]: true }));
      toast.success(`Voted for ${name}!`);
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Integration request submitted! We'll notify you when it's available.");
  };

  return (
    <section id="integrations" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            One Platform, <span className="gradient-text">Every Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect your entire infrastructure in minutes. No complex setup required.
          </p>
        </div>
        
        {/* Supported integrations */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center">Currently Supported</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {supportedIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="glass rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-lg font-bold text-primary">{integration.name.charAt(0)}</span>
                </div>
                <h4 className="font-medium text-sm mb-1">{integration.name}</h4>
                <div className="flex items-center justify-center gap-1 text-xs text-green-400">
                  <Check className="w-3 h-3" />
                  <span>Connected</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{integration.teams} teams</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Coming soon integrations */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold mb-6 text-center">Coming Soon</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {comingSoonIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="glass rounded-xl p-6 text-center opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-muted flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground">{integration.name.charAt(0)}</span>
                </div>
                <h4 className="font-medium text-sm mb-2">{integration.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">Requested by {votes[integration.name]} teams</p>
                <Button
                  variant={voted[integration.name] ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => handleVote(integration.name)}
                  disabled={voted[integration.name]}
                  className="w-full"
                >
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  {voted[integration.name] ? "Voted!" : "Upvote"}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Request integration form */}
        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-8 border border-primary/20 glow-primary">
            <h3 className="text-2xl font-bold mb-2 text-center">Don't See Your Platform?</h3>
            <p className="text-muted-foreground text-center mb-8">
              Tell us what you need - we prioritize based on demand
            </p>
            
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  placeholder="Platform/Service name" 
                  className="bg-secondary/50 border-border"
                />
                <Input 
                  type="email" 
                  placeholder="Your email (for updates)" 
                  className="bg-secondary/50 border-border"
                />
              </div>
              
              <Textarea 
                placeholder="Why do you need this integration? (optional)"
                className="bg-secondary/50 border-border min-h-[100px]"
              />
              
              <Select>
                <SelectTrigger className="bg-secondary/50 border-border">
                  <SelectValue placeholder="Company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-200">51-200 employees</SelectItem>
                  <SelectItem value="200+">200+ employees</SelectItem>
                </SelectContent>
              </Select>
              
              <Button type="submit" variant="hero" className="w-full" size="lg">
                <Send className="w-4 h-4 mr-2" />
                Request Integration
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Join 847 requests • Most requested integrations ship within 60 days
              </p>
            </form>
          </div>
        </div>
        
        {/* Integration stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: "6", label: "Platforms supported" },
            { value: "12", label: "In development" },
            { value: "2,000+", label: "Integration requests" },
            { value: "45 days", label: "Avg. turnaround" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</span>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
