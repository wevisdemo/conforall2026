import Container from "@/src/components/Container";
import Image from "next/image";
import React from "react";

const SectionBanner = () => {
  return (
    <div className="bg-green-1">
      <Container className="min-h-screen flex justify-center md:max-w-[1000px]!">
        <div className="md:flex items-center gap-10">
          <Image
            src="/images/banner-logo.svg"
            alt="Referendum Logo"
            width={200}
            height={200}
            className="mx-auto mb-8 w-lg"
          />
          <div>
            <h1 className="text-4xl text-center mb-4 typo-heading-mobile-01">
              เส้นทางสู่ประชามติ
              <br />
              รัฐธรรมนูญใหม่ ต้องการคุณ
            </h1>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-[5px]">
                <div className="col-span-1">
                  <div className="bg-yellow-1 border-2 border-yellow-1 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full">
                    <p className="typo-body-03-semibold mt-2.5 mb-2.5 ml-4 mr-4 text-neutral">
                      ต้องกาอย่างไร?
                    </p>
                    <Image
                      src="/images/section-detail-image.svg"
                      alt="Section Detail Image"
                      width={113.5}
                      height={113.5}
                      className="mx-auto"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col gap-[5px]">
                    <div className="bg-base-100 border-2 border-base-100 rounded-lg  hover:border-2 hover:border-neutral transition-all">
                      <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
                        <p className="typo-body-03-semibold text-neutral">
                          ค้นหา
                          <br />
                          จุดรณรงค์
                        </p>
                        <Image
                          src="/icons/search.svg"
                          alt="FAQ Icon"
                          width={16}
                          height={16}
                          className="h-4"
                        />
                      </div>
                    </div>
                    <div className="bg-base-100 border-2 border-base-100 rounded-lg  hover:border-2 hover:border-neutral transition-all">
                      <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
                        <p className="typo-body-03-semibold text-neutral">
                          สมัครเป็น
                          <br />
                          จุดรณรงค์
                        </p>
                        <Image
                          src="/icons/export.svg"
                          alt="FAQ Icon"
                          width={16}
                          height={16}
                          className="h-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[5px] flex flex-col gap-[5px]">
                <div className="bg-green-2 border-2 border-green-2 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full">
                  <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
                    <p className="typo-body-03-semibold  text-neutral">
                      คำถามที่พบบ่อย
                    </p>
                    <Image
                      src="/icons/ark-q.svg"
                      alt="FAQ Icon"
                      width={16}
                      height={16}
                      className="h-4"
                    />
                  </div>
                </div>
                <div className="bg-green-2 border-2 border-green-2 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full">
                  <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
                    <p className="typo-body-03-semibold text-neutral">
                      ข้อเสนอรัฐธรรมนูญใหม่
                      <br />
                      <span className="typo-body-02-normal">
                        จากองค์กรเครือข่าย
                      </span>
                    </p>
                    <Image
                      src="/icons/loading.svg"
                      alt="FAQ Icon"
                      width={16}
                      height={16}
                      className="h-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionBanner;
