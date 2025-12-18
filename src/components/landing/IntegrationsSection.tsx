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

const comingSoonIntegrations = [
  { 
    name: "Azure", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#0089D6" d="M13.05 4.24l-4.71 4.39L3 18.57h6.32l3.73-14.33zm.88 1.49l2.03 6.22-3.72 4.41-4.66.84h8.27L21 18.57H9.9l4.03-12.84z"/>
      </svg>
    )
  },
  { 
    name: "Google Cloud", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#EA4335" d="M12.5 7.5v2h4.5c-.2 1-.8 1.8-1.6 2.3l1.6 1.2c1.1-.9 1.8-2.3 1.8-3.9 0-.4 0-.7-.1-1h-6.2z"/>
        <path fill="#4285F4" d="M12.5 19.5c2.4 0 4.4-.8 5.9-2.2l-1.6-1.2c-.6.4-1.4.7-2.3.8v-2.4h-2v5z"/>
        <path fill="#FBBC05" d="M6.6 14.3c-.3-.6-.5-1.3-.5-2s.2-1.4.5-2l-1.6-1.2c-.6 1-.9 2.1-.9 3.2s.3 2.2.9 3.2l1.6-1.2z"/>
        <path fill="#34A853" d="M12.5 4.5c1.3 0 2.5.5 3.4 1.3l1.4-1.4c-1.3-1.2-3-1.9-4.8-1.9-2.7 0-5 1.4-6.4 3.6l1.6 1.2c.9-1.5 2.6-2.8 4.8-2.8z"/>
      </svg>
    )
  },
  { 
    name: "Heroku", 
    logo: (
      <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#6762A6" d="M20.61 0H3.39C2.62 0 2 .62 2 1.39v21.22c0 .77.62 1.39 1.39 1.39h17.22c.77 0 1.39-.62 1.39-1.39V1.39c0-.77-.62-1.39-1.39-1.39zM14.5 20h-3v-6l-3 3V6h3v6l3-3v11zm1.5-9.5h-2.5V6H16c0 1.5-.5 3-1.5 4.5h1.5z"/>
      </svg>
    )
  },
];

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
        
        {/* Coming soon with logos */}
        <div className="text-center">
          <p className="text-label text-muted-foreground mb-6">Coming Soon</p>
          <div className="flex items-center justify-center gap-8">
            {comingSoonIntegrations.map((integration) => (
              <div 
                key={integration.name}
                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center">
                  {integration.logo}
                </div>
                <span className="text-xs text-muted-foreground">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
