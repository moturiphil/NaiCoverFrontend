import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this insurance aggregator service free to use?",
    answer:
      "Yes, our insurance aggregator platform is completely free to use. You can compare and explore different policies without any cost.",
    value: "item-1",
  },
  {
    question: "How do I use the insurance comparison tool?",
    answer:
      "Simply enter your details, such as coverage needs and preferences, and our platform will show you a range of insurance options tailored to your needs from multiple providers.",
    value: "item-2",
  },
  {
    question: "Will I be charged extra when I purchase through the aggregator?",
    answer:
      "No, there are no hidden fees. You pay the same amount as you would directly with the insurance provider. We only help you find the best options available.",
    value: "item-3",
  },
  {
    question: "Can I get a personalized quote?",
    answer:
      "Yes! Our tool generates personalized quotes based on your preferences and needs, helping you find the best coverage at the most competitive rates.",
    value: "item-4",
  },
  {
    question: "How do I know which insurance plan is right for me?",
    answer:
      "Our platform provides detailed information about each plan’s benefits, exclusions, and premiums, so you can make an informed decision. If you're unsure, our customer support team is happy to assist.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
