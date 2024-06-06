"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IFaq {
  id: number;
  question: string;
  answer: string;
}

const faqAccordion: IFaq[] = [
  {
    id: 1,
    question: "What is Topup.et?",
    answer:
      "Topup.et is a mobile top-up platform. With Topup, you can buy mobile top-ups for your own phone or send a prepaid mobile recharge online to someone else. You can send a top-up online whether it's in app or online, and you can do it at any time or on any device that suits you.",
  },
  {
    id: 2,
    question: "What is an international top-up?",
    answer:
      "An international top-up is a mobile recharge that is sent to someone in another country. You can send an international top-up to someone in another country by using Topup.et. You can send an international top-up to someone in another country by using Topup.et.",
  },
  {
    id: 3,
    question: "Can I send mobile recharges from abroad?",
    answer:
      "Yes, you can send mobile recharges from abroad. You can send a mobile recharge to someone in another country by using Topup.et. You can send a mobile recharge to someone in another country by using Topup.et.",
  },
  {
    id: 4,
    question: "How to send a top-up online?",
    answer:
      "You can send a top-up online by using Topup.et. You can send a top-up online by using Topup.et. You can send a top-up online by using Topup.et.",
  },
  {
    id: 5,
    question: "Can I also send data?",
    answer:
      "Yes, you can also send data. You can send data to someone in another country by using Topup.et. You can send data to someone in another country by using Topup.et.",
  },
];

export default function FaqAccordion() {
  const [activeDialog, setActiveDialog] = React.useState<IFaq>(faqAccordion[0]);

  const handleActiveDialog = (faq: IFaq) => {
    if (faq) {
      setActiveDialog(faq);
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqAccordion.map((faq) => (
        <>
          <AccordionItem value={`item-${faq.id}`} key={faq.id}>
            <AccordionTrigger className="font-satoshi text-lg font-bold leading-[18.3px] text-black sm:py-7 md:py-9">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="font-satoshi text-sm font-medium leading-[18.4px] text-[#808080]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </>
      ))}
    </Accordion>
  );
}
