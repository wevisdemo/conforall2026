"use client";
import dynamic from "next/dynamic";
import SectionBanner from "./components/SectionBanner";
import SectionDetail from "./components/SectionDetail";
import SectionDreamCon from "./components/SectionDreamCon";
import SectionFaq from "./components/SectionFaq";
import SectionFooter from "./components/SectionFooter";
import SectionMap from "./components/SectionMap";
import SectionNew from "./components/SectionNew";

export default function HomePage() {
  return (
    <div>
      <section>
        <SectionBanner />
      </section>

      <section>
        <SectionDetail />
      </section>

      <section>
        <SectionMap />
      </section>

      <section>
        <SectionFaq />
      </section>

      <section>
        <SectionNew />
      </section>

      <section>
        <SectionDreamCon />
      </section>

      <section>
        <SectionFooter />
      </section>
    </div>
  );
}
