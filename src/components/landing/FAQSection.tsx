import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Triage decide between auto-resolve and review?",
    answer: "Triage uses confidence scoring based on pattern matching, historical data, and risk assessment. Incidents with >75% confidence are auto-resolved. Those between 50-75% go to Review Mode for human approval. Anything below 50% triggers an immediate alert. You can customize these thresholds.",
  },
  {
    question: "What happens in Review Mode?",
    answer: "In Review Mode, you receive a comprehensive incident report with AI analysis, confidence score, root cause assessment, and recommended actions. You can approve the AI's recommendation with one click, choose an alternative action, or reject and handle manually. Every review helps the AI learn.",
  },
  {
    question: "Can I customize confidence thresholds?",
    answer: "Yes! You can set custom thresholds for auto-resolution vs review based on your team's risk tolerance. You can also configure certain action types (like database operations) to always require review, regardless of confidence.",
  },
  {
    question: "What if the AI makes a mistake?",
    answer: "Triage is designed with safety as the top priority. High-risk actions always go through Review Mode. Built-in cooldowns prevent action storms. If an auto-resolved incident wasn't handled correctly, mark it for review—the AI learns from this feedback and adjusts its confidence for similar situations.",
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
    question: "How does the AI learn from my review decisions?",
    answer: "Every time you approve, reject, or modify an AI recommendation, Triage learns. Approved actions reinforce the AI's confidence. Rejections or modifications help it understand edge cases. Over time, your system auto-resolves more incidents accurately.",
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