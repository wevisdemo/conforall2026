import Container from "@/src/components/Container";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SectionBanner = () => {
  const router = useRouter();

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = "เส้นทางสู่ประชามติรัฐธรรมนูญใหม่ ต้องการคุณ";

  const handleShare = (platform: "facebook" | "x" | "line") => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    };

    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };
  return (
    <div className="bg-green-1">
      <Container className="md:min-h-screen min-h-fit flex justify-center md:max-w-[1000px]!">
        <div className="absolute top-4 right-4">
          <p
            onClick={() => router.push("#footer")}
            className="typo-body-02-semibold text-base-100! underline cursor-pointer"
          >
            รู้จักเรา
          </p>
        </div>
        <div className="md:flex items-center gap-6 md:py-0 py-10">
          <Image
            src="/images/banner-logo.svg"
            alt="Referendum Logo"
            width={200}
            height={200}
            className="mx-auto mb-8 w-lg"
          />
          <div>
            <h1 className="text-center mb-4 typo-heading-mobile-01">
              เส้นทางสู่ประชามติรัฐธรรมนูญใหม่ <br /> ต้องการคุณ
            </h1>
            <div className="w-full">
              <div className="grid grid-cols-2 gap-[5px]">
                <div className="col-span-1">
                  <div
                    className="bg-yellow-1 border-2 border-green-1 rounded-[0.8rem] h-full relative hover:border-2 hover:border-neutral transition-all cursor-pointer"
                    // hover:border-2 hover:border-neutral transition-all h-full cursor-pointer
                    onClick={() => router.push("#detail")}
                  >
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
                    {/* <div className="absolute inset-0 bg-green-1/90 rounded-lg flex items-center justify-center">
                      <p className="typo-body-03-semibold text-base-100 text-center">
                        รอ ครม.
                        <br />
                        เคาะคำถามอยู่
                      </p>
                    </div> */}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-col gap-[5px] h-full">
                    <div
                      className="bg-base-100 border-2 border-base-100 rounded-lg md:h-fit h-full hover:border-2 hover:border-neutral transition-all cursor-pointer"
                      onClick={() => router.push("#map")}
                    >
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
                    <div
                      className="bg-base-100 border-2 border-base-100 rounded-lg md:h-fit h-full hover:border-2 hover:border-neutral transition-all cursor-pointer"
                      onClick={() =>
                        window.open(
                          "https://volunteer.conforall.com/",
                          "_blank"
                        )
                      }
                    >
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
                <div
                  className="bg-green-2 border-2 border-green-2 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full cursor-pointer"
                  onClick={() => router.push("#faq")}
                >
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
                <div
                  className="bg-green-2 border-2 border-green-2 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full cursor-pointer"
                  onClick={() => router.push("#new")}
                >
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
            <div className="flex gap-2.5 justify-center items-center mt-4">
              <p className="typo-body-01-semibold text-neutral">แชร์</p>
              <Image
                src="/icons/facebook.svg"
                alt="Share on Facebook"
                width={32}
                height={32}
                className="object-contain cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleShare("facebook")}
              />
              <Image
                src="/icons/x.svg"
                alt="Share on X"
                width={32}
                height={32}
                className="object-contain cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleShare("x")}
              />
              <Image
                src="/icons/line.svg"
                alt="Share on Line"
                width={32}
                height={32}
                className="object-contain cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleShare("line")}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionBanner;
