import Container from "@/src/components/Container";
import Image from "next/image";
import React from "react";

const SectionNew = () => {
  return (
    <div className="bg-green-1">
      <Container className="py-20">
        <div className="flex flex-col gap-10 items-center justify-center">
          <p className="typo-heading-mobile-03 text-neutral">
            ข้อเสนอรัฐธรรมนูญใหม่
          </p>
          <p className="typo-body-03-semibold text-base-100">จาก xx องค์กร</p>
        </div>
      </Container>
    </div>
  );
};

export default SectionNew;
