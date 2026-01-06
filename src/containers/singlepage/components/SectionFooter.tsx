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
            และตอนนี้ Conforall กำลังทำแคมเปญ
            <span className="typo-body-03-semibold text-neutral">
              {" "}
              #พร้อมเปลี่ยนเขียนรัฐธรรมนูญใหม่{" "}
            </span>
            ชวนคนไทยไปลงประชามติรัฐธรรมนูญ <br />
            <br />
            Conforall ชื่อนี้มีความหมาย
            เพราะเราต้องการเห็นกระบวนการจัดทำรัฐธรรมนูญฉบับใหม่ที่รวมทุกคน
            ทุกเสียง เพื่อให้ได้กติกาของประเทศเพื่อทุกคนที่มีความต้องการหลากหลาย
            มีความเชื่อหลากหลาย เรารู้ว่า
            มีคนหลายกลุ่มอาจไม่ได้คิดเห็นเหมือนพวกเรา
            ซึ่งเราก็อยากให้รัฐธรรมนูญใหม่เป็นไปเพื่อคนกลุ่มนั้นด้วย
          </p>
          <div className="flex flex-col gap-2.5 ">
            <p className="typo-body-03-semibold text-neutral text-center">
              Partners
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <Image
                src="/partner/actlab.jpg"
                alt="actlab"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/aid.png"
                alt="aid"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/beach-for-life.jpg"
                alt="beach-for-life"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/call.jpg"
                alt="call"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/can.jpg"
                alt="can"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/conforall.png"
                alt="conforall"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/cool.jpg"
                alt="cool"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/cpcr.jpg"
                alt="cpcr"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/crc.png"
                alt="crc"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/enlaw.jpg"
                alt="enlaw"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/fair.jpg"
                alt="fair"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/gpopc.jpg"
                alt="gpopc"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/greenpeace.jpg"
                alt="greenpeace"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/HOC.jpg"
                alt="HOC"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/idgn.jpg"
                alt="idgn"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/ilaw.png"
                alt="ilaw"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/ipam.jpg"
                alt="ipam"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/knack.jpg"
                alt="knack"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/ku-nerh.jpg"
                alt="ku-nerh"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/lanna.jpg"
                alt="lanna"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/lanner.png"
                alt="lanner"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/mineore.jpeg"
                alt="mineore"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/mos.jpg"
                alt="mos"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/moved.jpg"
                alt="moved"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/musum.png"
                alt="musum"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/nerh.jpg"
                alt="nerh"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/newrum.jpg"
                alt="newrum"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/pdmt.jpg"
                alt="pdmt"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/pmove.jpg"
                alt="pmove"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/poor.jpg"
                alt="poor"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/prp.png"
                alt="prp"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/secure-ranger.jpg"
                alt="secure-ranger"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/sher.jpg"
                alt="sher"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/slum4.jpg"
                alt="slum4"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/sysi.jpg"
                alt="sysi"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/tamtang.jpg"
                alt="tamtang"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/The Patani (ปาตานี).jpg"
                alt="The Patani"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/the-isaan-record.jpg"
                alt="the-isaan-record"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/thumb-rights.jpg"
                alt="thumb-rights"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/Trans Equal.jpg"
                alt="Trans Equal"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/we-fair.jpg"
                alt="we-fair"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/we-watch.jpg"
                alt="we-watch"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/wevis.jpeg"
                alt="wevis"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
              <Image
                src="/partner/work.jpg"
                alt="work"
                width={44}
                height={44}
                className="object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionFooter;
