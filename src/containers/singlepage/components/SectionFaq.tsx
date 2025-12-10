"use client";

import Container from "@/src/components/Container";
import Image from "next/image";
import { FaqItem } from "@/src/services/type";
import { useState, useMemo, useEffect } from "react";

interface SectionFaqProps {
  faq: FaqItem[];
  onOpenChatbot?: () => void;
}

const SectionFaq = ({ faq, onOpenChatbot }: SectionFaqProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const OTHER_CATEGORY = "อื่น ๆ";

  // Extract unique categories from FAQ data
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    let hasOtherItems = false;

    faq.forEach((item) => {
      if (!item.category || item.category === OTHER_CATEGORY) {
        hasOtherItems = true;
      } else {
        uniqueCategories.add(item.category);
      }
    });

    const result = Array.from(uniqueCategories);
    // Add "อื่น ๆ" at the end if there are items without category or with "อื่น ๆ"
    if (hasOtherItems) {
      result.push(OTHER_CATEGORY);
    }
    return result;
  }, [faq]);

  // Auto-select first category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && selectedCategory === null) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // Filter FAQ items by selected category
  const filteredFaq = useMemo(() => {
    if (!selectedCategory) return [];
    // When "อื่น ๆ" is selected, show items without category or with "อื่น ๆ" category
    if (selectedCategory === OTHER_CATEGORY) {
      return faq.filter(
        (item) => !item.category || item.category === OTHER_CATEGORY
      );
    }
    return faq.filter((item) => item.category === selectedCategory);
  }, [faq, selectedCategory]);

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setExpandedIndex(null); // Reset expanded state when changing category
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

          {/* Category Filter */}
          <div className="w-full">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide flex-wrap justify-center items-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`shrink-0 py-1.5 px-2.5 rounded-full border-2 border-green-1 typo-body-03-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-green-1 text-white"
                      : " text-neutral hover:bg-green-1/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full max-w-3xl flex flex-col">
            {filteredFaq.map((item, index) => (
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
                      {index + 1}. {item.question}
                    </p>

                    {/* Answer - visible when expanded */}
                    {expandedIndex === index && (
                      <p className="typo-body-03 text-neutral mt-4 whitespace-pre-line">
                        {item.answer}
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
          <div
            className="bg-yellow-1 border-2 border-yellow-1 rounded-lg  hover:border-2 hover:border-neutral transition-all w-full max-w-3xl cursor-pointer"
            onClick={onOpenChatbot}
          >
            <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
              <p className="typo-body-03-semibold  text-neutral">
                ทักคุยกับเรา
              </p>
              <Image
                src="/icons/ark-q.svg"
                alt="FAQ Icon"
                width={16}
                height={16}
                className="h-5 w-5 md:mt-1"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionFaq;
