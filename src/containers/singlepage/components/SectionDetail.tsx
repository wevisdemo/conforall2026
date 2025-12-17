import Container from "@/src/components/Container";
import Divider from "@/src/components/Divider";
import Image from "next/image";
import React from "react";

const SectionDetail = () => {
  return (
    <div className="bg-yellow-1">
      <Container className="py-20">
        <div className="flex flex-col gap-10 items-center justify-center">
          <p className="typo-heading-mobile-03 text-neutral text-center">
            ต้องกาอย่างไร?
          </p>
          <div className="md:w-[400px] md:h-[400px] w-[280px] h-[280px] rounded-full bg-green-1 flex items-center justify-center flex-col">
            <p className="text-neutral typo-body-02-semibold">จุดยืนของเรา</p>
            <p className="text-neutral typo-heading-mobile-03 text-center">
              “เห็นชอบ
              <br />
              รัฐธรรมนูญ
              <br />
              ใหม่”
            </p>
          </div>
          <p className="typo-heading-mobile-01 text-neutral text-center">
            รายละเอียดคำถาม
          </p>
          {/* <div className="w-full h-[200px] bg-base-100 flex items-center justify-center">
            <p className="text-neutral">img</p>
          </div> */}
          <div className="w-full flex flex-col gap-5 justify-center items-center">
            <Divider label="คำถามข้อที่ 1" />
            <p className="typo-heading-mobile-01 text-neutral text-center">
              ท่านเห็นชอบหรือไม่ที่จะจัดทำรัฐธรรมนูญฉบับใหม่
            </p>

            <div className="p-2.5 bg-green-1 w-fit">
              <p className="typo-heading-mobile-02 text-neutral">เห็นชอบ</p>
            </div>
            <p className="typo-body-03 text-neutral text-center">
              เพื่อออกจากระบบการเมืองของคณะรัฐประหาร
              เปิดทางเปลี่ยนอนาคตด้วยมือประชาชนเอง
            </p>
          </div>
          {/* <div className="w-full flex flex-col gap-5 justify-center items-center">
            <Divider label="คำถามข้อที่ 2" />
            <p className="typo-heading-mobile-01 text-neutral text-center">
              “Lorem ipsum dolor sit amet consectetur. Ut sapien tempus sem
              ipsum. Vitae dignissim nec et quis eget.”
            </p>

            <div className="p-2.5 bg-accent w-fit">
              <p className="typo-heading-mobile-02 text-neutral">ไม่เห็นชอบ</p>
            </div>
            <p className="typo-body-03 text-neutral text-center">
              เพราะ Lorem ipsum dolor sit amet consectetur. Congue nascetur
              blandit iaculis habitant nibh. Massa in et et imperdiet. Bibendum
              turpis gravida turpis eget eget tristique et.
            </p>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default SectionDetail;
