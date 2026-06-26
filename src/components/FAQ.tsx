import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = { q: string; a: string };

interface FAQProps {
  items: FaqItem[];
  heading?: string;
  emitSchema?: boolean;
}

const FAQ = ({ items, heading = "Common questions", emitSchema = true }: FAQProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  return (
    <section className="py-24 px-6 border-t border-border">
      {emitSchema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl tracking-tight mb-12">{heading}</h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-base md:text-lg py-6 hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/60 text-base leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;