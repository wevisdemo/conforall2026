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
            Lorem ipsum dolor sit amet consectetur. Viverra condimentum vel
            massa neque quam a et. Mauris magna volutpat mattis dignissim dolor
            aliquet diam morbi velit. Phasellus arcu pharetra nulla amet. Lacus
            iaculis consequat senectus in.
          </p>
          <div className="flex flex-col gap-2.5 ">
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
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionFooter;
