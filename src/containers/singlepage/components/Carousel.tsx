"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CarouselItem {
  id: number;
  image: string;
  alt: string;
}

interface CarouselProps {
  items: CarouselItem[];
  type: string;
}

const Carousel = ({ items, type }: CarouselProps) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Responsive scroll amount based on viewport
      const cardWidth = window.innerWidth < 768 ? 100 : 120;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 2;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative flex items-center gap-2 md:gap-4">
      {/* Left Arrow */}
      <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 z-10 h-full bg-gradient-to-r from-green-1 via-green-1 to-transparent">
        <button
          onClick={() => scroll("left")}
          className={` shrink-0 w-8 h-full flex items-center justify-center text-neutral transition-all ${
            !canScrollLeft ? "opacity-30 cursor-default" : "opacity-100"
          }`}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <Image
            src="/icons/icon-left.svg"
            alt="Carousel Left"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* Cards Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex-1 flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items
          .filter((item) => item.image)
          .map((item) => (
            <div
              key={item.id}
              className="relative shrink-0 w-[120px] h-[120px] rounded-[5px] overflow-hidden snap-start"
            >
              <div className="w-full h-full bg-white flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        <div
          className="relative shrink-0 w-[120px] h-[120px] rounded-[5px] overflow-hidden snap-start"
          onClick={() => window.open("https://gallery.conforall.com", "_blank")}
        >
          {/* Card content */}
          <div className="w-full h-full bg-green-2 flex items-center justify-center flex-col">
            <span className="text-neutral typo-body-02-semibold">
              ดูรูปทั้งหมด
            </span>
            <Image
              src="/icons/view-all.svg"
              alt="Plus"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <div className="absolute right-[-1px] top-1/2 -translate-y-1/2 z-10 h-full bg-gradient-to-l from-green-1 via-green-1 to-transparent">
        <button
          onClick={() => scroll("right")}
          className={` shrink-0 w-8 h-full flex items-center justify-center text-neutral transition-all ${
            !canScrollRight ? "opacity-30 cursor-default" : "opacity-100"
          }`}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <Image
            src="/icons/icon-left.svg"
            alt="Carousel Right"
            width={16}
            height={16}
            className="rotate-180 w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
