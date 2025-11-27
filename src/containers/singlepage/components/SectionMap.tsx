import Container from "@/src/components/Container";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./SectiontestMap"), {
  ssr: false,
});

const SectionMap = () => {
  return (
    <div className="bg-base-100">
      <Container className="py-20">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className="typo-heading-mobile-03 text-neutral">
              ค้นหาจุดรณรงค์
            </p>
            <p className="typo-body-03-normal text-neutral">
              เพื่อรับแผ่นพับและร่วมกิจกรรมต่างๆ xxxxxxxxxxxxxxxxxxxxxxx
            </p>
            <p className="typo-heading-mobile-01 text-neutral">
              มีจุดรณรงค์แล้วใน xxx เขต
            </p>
          </div>
          <MapComponent />
        </div>
      </Container>
    </div>
  );
};

export default SectionMap;
