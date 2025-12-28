import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Github, Send } from "lucide-react";
import { toast } from "sonner";

const footerLinks = {
  Product: ["Features", "Integrations", "Security", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press Kit"],
  Resources: ["Documentation", "API Reference", "Status Page", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Security Policy"],
};

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Subscribed to product updates!");
  };

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-oldenberg">Triage</h3>
            <p className="text-foreground text-sm mb-6">
              Your AI on-call engineer. Automatic incident detection, analysis, and resolution.
            </p>
            
            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Get product updates" 
                className="bg-card border-border text-sm h-10 rounded-lg"
              />
              <Button type="submit" size="icon" variant="outline" className="h-10 w-10 rounded-lg">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
          
          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground">
            © 2025 <span className="font-oldenberg">Triage</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
