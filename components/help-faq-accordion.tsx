"use client";
import React from "react";
import Image from "next/image";
import Textt from "./text";
import Card from "./card";
import Container from "./container";

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
  {
    id: 6,
    question: "Can I also send data?",
    answer:
      "Yes, you can also send data. You can send data to someone in another country by using Topup.et. You can send data to someone in another country by using Topup.et.",
  },
];

function HelpFaqAccordion() {
  const [activeDialog, setActiveDialog] = React.useState<IFaq>(faqAccordion[0]);

  const handleActiveDialog = (faq: IFaq) => {
    if (faq) {
      setActiveDialog(faq);
    }
  };

  function groupItems<T>(items: T[], groupSize: number) {
    const groupedItems: T[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      groupedItems.push(items.slice(i, i + groupSize));
    }
    return groupedItems;
  }
  const groupedFaqs = groupItems<IFaq>(faqAccordion, 2);
  return (
    <section className="grid-rows grid grid-cols-3 justify-center gap-4 ">
      {groupedFaqs.map((faqGroup) => (
        <div key={faqGroup[0].id} className="grid-cols-2 space-y-3">
          {faqGroup.map((faq) => (
            <Card key={faq.id} className="w-full max-w-[400px]">
              <button
                className="flex h-14 w-full justify-between pt-5"
                onClick={() => handleActiveDialog(faq)}
              >
                <Textt variant="h6-satoshi" className="text-start">
                  {faq.question}
                </Textt>
                <Image
                  src={
                    activeDialog.id === faq.id
                      ? "/assets/icons/up-icon.svg"
                      : "/assets/icons/down-icon.svg"
                  }
                  alt=""
                  width={12}
                  height={8}
                />
              </button>

              <Textt
                variant="p2-satoshi"
                className={` overflow-hidden text-start transition-all duration-300 ${activeDialog.id === faq.id ? "mb-5 mt-4 h-max" : "h-0"}`}
              >
                {faq.answer}
              </Textt>
            </Card>
          ))}
        </div>
      ))}
    </section>
  );
}

export default HelpFaqAccordion;
