import Container from "@/src/components/Container";
import Image from "next/image";
import React from "react";

const SectionFaq = () => {
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
        </div>
      </Container>
    </div>
  );
};

export default SectionFaq;
