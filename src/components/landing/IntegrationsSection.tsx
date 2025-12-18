
const supportedIntegrations = [
  { 
    name: "AWS CloudWatch", 
    logo: (
      <svg viewBox="0 0 64 64" className="w-12 h-12">
        <path fill="#FF9900" d="M32 4L4 18v28l28 14 28-14V18L32 4z"/>
        <path fill="#252F3E" d="M32 18L12 28v16l20 10 20-10V28L32 18z"/>
        <path fill="#FF9900" d="M32 28l-12 6v8l12 6 12-6v-8l-12-6z"/>
      </svg>
    )
  },
  { 
    name: "Vercel", 
    logo: (
      <svg viewBox="0 0 76 65" className="w-12 h-12">
        <path fill="currentColor" d="M37.5274 0L75.0548 65H0L37.5274 0Z"/>
      </svg>
    )
  },
  { 
    name: "Railway", 
    logo: (
      <svg viewBox="0 0 32 32" className="w-12 h-12">
        <path fill="currentColor" d="M6.5 4h19a2.5 2.5 0 0 1 2.5 2.5v19a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 4 25.5v-19A2.5 2.5 0 0 1 6.5 4zm2.5 6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H9z"/>
      </svg>
    )
  },
  { 
    name: "Render", 
    logo: (
      <svg viewBox="0 0 40 52" className="w-12 h-12">
        <path fill="#46E3B7" d="M0 0h14.12v14.12H0V0zm25.88 0H40v14.12H25.88V0zM0 12.94h14.12v14.12H0V12.94zm0 12.94h14.12V40H0V25.88zm0 12.94h14.12V52H0V38.82zm25.88-12.94H40V40H25.88V25.88zM12.94 25.88h14.12V40H12.94V25.88z"/>
      </svg>
    )
  },
  { 
    name: "Modal", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <path fill="#00D26A" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  { 
    name: "Digital Ocean", 
    logo: (
      <svg viewBox="0 0 32 32" className="w-12 h-12">
        <path fill="#0080FF" d="M16 32v-6.1c5.5 0 9.4-5.7 7-10.9-1-2.2-2.8-4-5-5-5.2-2.4-10.9 1.5-10.9 7H1c0-8.3 8-14.6 16.3-12.1C22 6.2 25.8 10 27.1 14.7c2.5 8.3-3.8 16.3-12.1 16.3h1z"/>
        <path fill="#0080FF" d="M16 25.9h-6.1v6.1H16v-6.1zm-6.1 0H4.8v5.1h5.1v-5.1zm0-6.1H4.8v5.1h5.1v-5.1z"/>
      </svg>
    )
  },
];

const comingSoonPlatforms = ["Azure", "Google Cloud", "Heroku"];

const IntegrationsSection = () => {
  return (
    <section id="integrations" className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-headline mb-6">
            One Platform, <span className="gradient-text">Every Stack</span>
          </h2>
          <p className="text-body text-muted-foreground">
            Connect your entire infrastructure in minutes. No complex setup required.
          </p>
        </div>
        
        {/* Supported integrations */}
        <div className="mb-16">
          <p className="text-label text-muted-foreground text-center mb-8">Supported Platforms</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {supportedIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elegant hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
                  {integration.logo}
                </div>
                <h4 className="font-medium text-sm">{integration.name}</h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* Coming soon - simple text */}
        <div className="text-center">
          <p className="text-muted-foreground">
            <span className="text-label text-muted-foreground mr-2">Coming Soon:</span>
            {comingSoonPlatforms.join(", ")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
