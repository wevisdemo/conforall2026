import Container from "@/src/components/Container";
import { MapItemWithProvince, ECTCountByProvince } from "@/src/services/type";
import dynamic from "next/dynamic";
import Image from "next/image";

const MapComponent = dynamic(() => import("./SectiontestMap"), {
  ssr: false,
});

interface SectionMapProps {
  map: MapItemWithProvince[];
  ectCount: ECTCountByProvince;
}

const SectionMap = ({ map, ectCount }: SectionMapProps) => {
  // Data now comes with lat, lng, and province already processed
  // console.log(map);

  return (
    <div className="bg-base-100">
      <Container className="py-20">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col gap-5 items-center justify-center">
            <p className="typo-heading-mobile-03 text-neutral">
              ค้นหาจุดรณรงค์
            </p>
            <p className="typo-body-03-normal text-neutral text-center">
              เพื่อรับแผ่นพับและร่วมกิจกรรมต่างๆ
            </p>
            <div className="flex flex-col gap-2.5 items-center justify-center">
              <p className="typo-heading-mobile-01 text-neutral">
                มีจุดรณรงค์แล้ว {map.filter((item) => item.name_id).length} จุด
              </p>
              <p className="typo-body-03-semibold text-neutral">
                ใน 400 เขตเลือกตั้งทั่วประเทศ
              </p>
              <div className="flex items-center justify-center gap-[5px]">
                <div className="w-3.5 h-3.5 bg-yellow-1 border border-neutral"></div>
                <p className="typo-body-02-normal text-neutral">มีจุดรณรงค์</p>

                <div className="w-3.5 h-3.5 bg-green-1 border border-neutral"></div>
                <p className="typo-body-02-normal text-neutral">มีครบทุกเขต</p>

                <div className="w-3.5 h-3.5 bg-base-100 border border-neutral"></div>
                <p className="typo-body-02-normal text-neutral">ยังไม่มี</p>
              </div>
            </div>
          </div>

          <MapComponent mapPoints={map} ectCount={ectCount} />

          <div
            className="bg-neutral border-2 border-neutral w-full rounded-lg  hover:border-2 hover:border-neutral transition-all h-full cursor-pointer "
            onClick={() =>
              window.open("https://volunteer.conforall.com/", "_blank")
            }
          >
            <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
              <div>
                <p className="typo-body-03-semibold  text-base-100">
                  สมัครเป็นจุดรณรงค์
                </p>
                <p className="typo-body-02-normal text-base-100">
                  เพื่อเป็นศูนย์กลางกระจายแคมเปญปร
                  <br className="md:hidden" />
                  ะจำเขตเลือกตั้งของคุณ
                </p>
              </div>

              <Image
                src="/icons/export-w.svg"
                alt="FAQ Icon"
                width={16}
                height={16}
                className="h-4"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionMap;
