import Container from "@/src/components/Container";
import Image from "next/image";

const SectionFooter = () => {
  return (
    <div className="bg-base-100">
      <Container className="py-20">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="typo-heading-mobile-03 text-neutral text-center">
            รู้จักเรา
          </p>
          <p className="typo-heading-mobile-01 text-neutral">
            เครือข่ายประชาชนร่างรัฐธรรมนูญ
          </p>
          <Image
            src="/images/conforall-logo.svg"
            alt="Con for All Image"
            width={150}
            height={150}
            className="mx-auto"
          />
          <p className="typo-body-03-normal text-neutral text-center">
            <span className="typo-body-03-semibold text-neutral">
              Conforall
            </span>{" "}
            ชื่อภาษาไทยว่า{" "}
            <span className="typo-body-03-semibold text-neutral">
              กลุ่มประชาชนร่างรัฐธรรมนูญ
            </span>{" "}
            เกิดจากการรวมตัวของกลุ่มนักกิจกรรมและเอ็นจีโอหลายแห่งที่ต้องการเห็นประเทศไทยเป็นประชาธิปไตย
            เมื่อปี 2566 เป็นเจ้าภาพรวบรวมรายชื่อประชาชนกว่า 211,904
            รายชื่อเสนอต่อรัฐบาลเศรษฐา
            ทวีสินให้ทำประชามติเพื่อถามประชาชนว่าเห็นชอบหรือไม่ให้มีการจัดทำรัฐธรรมนูญฉบับใหม่
            และตอนนี้ Conforall กำลังทำแคมเปญ #พร้อมเปลี่ยนเขียนรัฐธรรมนูญใหม่
            ชวนคนไทยไปลงประชามติรัฐธรรมนูญ <br />
            <br />
            Conforall ชื่อนี้มีความหมาย
            เพราะเราต้องการเห็นกระบวนการจัดทำรัฐธรรมนูญฉบับใหม่ที่รวมทุกคน
            ทุกเสียง เพื่อให้ได้กติกาของประเทศเพื่อทุกคนที่มีความต้องการหลากหลาย
            มีความเชื่อหลากหลาย เรารู้ว่า
            มีคนหลายกลุ่มอาจไม่ได้คิดเห็นเหมือนพวกเรา
            ซึ่งเราก็อยากให้รัฐธรรมนูญใหม่เป็นไปเพื่อคนกลุ่มนั้นด้วย
          </p>
          {/* <div className="flex flex-col gap-2.5 ">
            <p className="typo-body-03-semibold text-neutral text-center">
              Partners
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
              <div className="p-2 bg-base-200 flex items-center justify-center">
                <p className="typo-body-02-normal text-base-300">logo</p>
              </div>
            </div>
          </div> */}
        </div>
      </Container>
    </div>
  );
};

export default SectionFooter;
