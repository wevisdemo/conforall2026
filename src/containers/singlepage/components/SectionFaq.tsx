"use client";

import Container from "@/src/components/Container";
import Image from "next/image";
import { FaqItem } from "@/src/services/type";
import { useState } from "react";

interface SectionFaqProps {
  faq: FaqItem[];
}

const SectionFaq = ({ faq }: SectionFaqProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-base-200">
      <Container className="py-20">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Image
              src="/icons/ark-q.svg"
              alt="FAQ Icon"
              width={36}
              height={36}
              className="mx-auto"
            />
            <p className="typo-heading-mobile-03 text-neutral">
              คำถามที่พบบ่อย
            </p>
          </div>

          <div className="w-full max-w-3xl flex flex-col">
            {faq.map((item, index) => (
              <div
                key={index}
                className="flex flex-col border-b border-green-1"
              >
                {/* Question Row */}
                <div
                  className="flex items-start justify-between gap-4 py-2.5 cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex-1">
                    <p
                      className={`typo-body-03-semibold text-neutral hover:text-green-1 transition-all`}
                    >
                      {index + 1}. [คำถาม] {item.question}
                    </p>

                    {/* Answer - visible when expanded */}
                    {expandedIndex === index && (
                      <p className="typo-body-03 text-neutral mt-4">
                        [คำตอบ] {item.answer}
                      </p>
                    )}
                  </div>

                  {/* Toggle Button */}
                  <button
                    className="shrink-0 w-6 h-full flex items-center justify-center text-green-1 text-2xl font-light "
                    aria-label={expandedIndex === index ? "Collapse" : "Expand"}
                  >
                    {expandedIndex === index ? "−" : "+"}
                  </button>
                </div>

                {/* Divider */}
                <div className="w-full h-[2px] bg-primary"></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionFaq;
