import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Triage make decisions?",
    answer: "Triage uses a multi-agent AI system that analyzes your logs, metrics, and deployment history. It looks for patterns, correlates events, and makes decisions based on historical data and configured rules. When confidence is low, it always escalates to a human.",
  },
  {
    question: "What if the AI makes a mistake?",
    answer: "Triage is designed with safety as the top priority. It only takes actions it's highly confident about (>95% confidence) and uses conservative thresholds. For anything uncertain, it escalates to your on-call engineer with full context. You can also configure custom approval workflows for critical actions.",
  },
  {
    question: "Do you store our logs?",
    answer: "No. Triage processes your logs in real-time but never stores customer data. We only retain anonymized metrics and incident patterns for improving our AI models. Your sensitive data stays in your infrastructure.",
  },
  {
    question: "How long does setup take?",
    answer: "Most teams are up and running in under 30 minutes. Our integration uses standard webhooks and APIs—no complex infrastructure changes required. We provide detailed guides for each supported platform.",
  },
  {
    question: "When will Triage be available?",
    answer: "We're currently in private beta with select teams. Join the waitlist to get early access—we're onboarding new teams every week. Early access members get priority support and influence our roadmap.",
  },
  {
    question: "What happens after I join the waitlist?",
    answer: "You'll receive a confirmation email with your waitlist position. We'll reach out when it's your turn for onboarding. Waitlist members also get exclusive updates on new features and integrations.",
  },
  {
    question: "Can I request custom integrations?",
    answer: "Absolutely! We prioritize integrations based on demand. Use the integration request form to tell us what platforms you need. Popular requests are fast-tracked—most ship within 60 days of reaching 100 votes.",
  },
  {
    question: "How do you prioritize integration requests?",
    answer: "We use a combination of vote count, company size, and strategic fit. Enterprise customers can also request dedicated integrations as part of their package. Transparency is key—you can see vote counts for all requested integrations.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 relative">
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about Triage.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
