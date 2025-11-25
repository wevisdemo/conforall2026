import Container from "@/src/components/Container";
import Image from "next/image";

const SectionDreamCon = () => {
  return (
    <div className="bg-[#BDE6FF]">
      <Container className="py-20">
        <div className="flex flex-col gap-10 items-center justify-center">
          <p className="typo-heading-mobile-03 text-neutral text-center">
            แล้วถ้าอยากส่งเสียงของตัวเอง
            <br />
            เกี่ยวกับรัฐธรรมนูญใหม่
          </p>
          <p className="typo-heading-mobile-01 text-neutral">
            ขอชวนบันทึกความฝันของคุณไว้ที่
          </p>
          <Image
            src="/images/dreamcon-logo.svg"
            alt="Dream Con Image"
            width={400}
            height={136}
            className="mx-auto"
          />
          <p className="typo-body-03-normal text-neutral text-center">
            <span className="typo-body-03-semibold text-neutral text-center">
              Dream Constitution
            </span>
            โครงการรวบรวมความคิดเห็นของคนไทยเพื่อเป็นศูนย์รวมไอเดียในการร่างรัฐธรรมนูญฉบับประชาชนเพราะรัฐธรรมนูญอาจฟังไกลตัวในบางครั้ง
            เราจึงอยากชวนทุกคนนำความคิดฝันที่หลากหลายมาวางไว้ให้กลายเป็นเรื่องราวเดียว
            แล้วส่งต่อให้ผู้มีหน้าที่ในการร่างรัฐธรรมนูญใหม่นำไปประกอบขึ้นเป็นร่างของประชาชนอย่างแท้จริง
          </p>
          <div className="bg-yellow-1 border-2 border-yellow-1 rounded-lg  hover:border-2 hover:border-neutral transition-all w-full">
            <p className="typo-body-03-semibold mt-2.5 mb-2.5 ml-4 mr-4 text-neutral">
              ร่วมส่งเสียงเลย!
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionDreamCon;
