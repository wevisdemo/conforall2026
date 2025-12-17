"use client";
import { useState } from "react";
import {
  FaqItem,
  MapItemWithProvince,
  ECTCountByProvince,
} from "@/src/services/type";
import SectionBanner from "./components/SectionBanner";
import SectionDetail from "./components/SectionDetail";
import SectionDreamCon from "./components/SectionDreamCon";
import SectionFaq from "./components/SectionFaq";
import SectionFooter from "./components/SectionFooter";
import SectionMap from "./components/SectionMap";
import SectionNew from "./components/SectionNew";
import Chatbot from "./components/Chatbot";
import Image from "next/image";

interface HomePageProps {
  faq: FaqItem[];
  map: MapItemWithProvince[];
  ectCount: ECTCountByProvince;
}

export default function HomePage({ faq, map, ectCount }: HomePageProps) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  // console.log(map);
  return (
    <div>
      {/* Chatbot Toggle Button - hidden on mobile when chatbot is open */}
      <Image
        src="/icons/chatbot.svg"
        alt="chatbot"
        width={60}
        height={60}
        className={`fixed bottom-5 right-5 cursor-pointer z-50 hover:scale-110 transition-transform ${
          isChatbotOpen ? "hidden md:block" : ""
        }`}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
      />

      {/* Chatbot Popup */}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      <section id="banner">
        <SectionBanner />
      </section>

      <section id="detail">
        <SectionDetail />
      </section>

      <section id="map">
        <SectionMap map={map} ectCount={ectCount} />
      </section>

      <section id="faq">
        <SectionFaq faq={faq} onOpenChatbot={() => setIsChatbotOpen(true)} />
      </section>

      <section id="new">
        <SectionNew />
      </section>

      <section id="dream-con">
        <SectionDreamCon />
      </section>

      <section id="footer">
        <SectionFooter />
      </section>
    </div>
  );
}
