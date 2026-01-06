import Container from "@/src/components/Container";
import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DataGreenItem,
  DataStickerItem,
  MapItemWithProvince,
  DataHastagItem,
} from "@/src/services/type";

const carouselItems = [
  { id: 1, image: "/images/card-check.jpg", alt: "Campaign 1" },
  { id: 2, image: "/images/card-check.jpg", alt: "Campaign 2" },
  { id: 3, image: "/images/card-check.jpg", alt: "Campaign 3" },
  { id: 4, image: "/images/card-check.jpg", alt: "Campaign 4" },
];

const SectionNewSlide = ({
  map,
  dataGreen,
  dataSticker,
  dataHastag,
}: {
  map: MapItemWithProvince[];
  dataGreen: DataGreenItem[];
  dataSticker: DataStickerItem[];
  dataHastag: DataHastagItem[];
}) => {
  const router = useRouter();
  const [volunteerCount, setVolunteerCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVolunteerCount = async () => {
      try {
        const response = await fetch(
          "https://volunteer.vote62.com/api/volunteer-count/"
        );
        const data = await response.json();
        setVolunteerCount(data.count);
      } catch (error) {
        console.error("Failed to fetch volunteer count:", error);
      }
    };
    fetchVolunteerCount();
  }, []);

  //   console.log(dataHastag);
  return (
    <div className="bg-white">
      <Container className="py-20">
        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <p className="typo-heading-mobile-03 text-neutral text-center">
            ร่วมรณรงค์
          </p>
          <p className="typo-body-03-normal text-neutral text-center">
            ด้วยการเข้าร่วมหรือเป็นสมัครเป็น
            <br className="md:hidden block" />
            ผู้จัดในกิจกรรมต่อไปนี้
          </p>
        </div>
        {/* box1 */}
        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <div className="w-full bg-green-1 rounded-[5px] p-5 flex flex-col gap-2.5">
            <div className="flex flex-col items-center justify-between">
              <p className="typo-heading-mobile-03 text-neutral">100</p>
              <p className="typo-heading-mobile-01 text-neutral">
                ขบวนรณรงค์ธงเขียว
              </p>
            </div>
            <p className="typo-body-03-normal text-neutral text-center">
              ขบวนแสดงออกสีเขียว เดินก็ได้ วิ่งก็ได้
              <br className="md:hidden block" /> พาเหรดก็ได้
            </p>

            {dataGreen
              .filter((item) => item.activity_type === "100 ขบวน")
              .filter(
                (item) =>
                  item.published?.toUpperCase() !== "FALSE" &&
                  (item.image_link_1 ||
                    item.image_link_2 ||
                    item.image_link_3 ||
                    item.image_link_4 ||
                    item.image_link_5)
              ).length > 0 ? (
              <Carousel
                items={dataGreen
                  .filter((item) => item.activity_type === "100 ขบวน")
                  .filter(
                    (item) =>
                      item.published?.toUpperCase() !== "FALSE" &&
                      (item.image_link_1 ||
                        item.image_link_2 ||
                        item.image_link_3 ||
                        item.image_link_4 ||
                        item.image_link_5)
                  )
                  .flatMap((item) =>
                    [
                      item.image_link_1,
                      item.image_link_2,
                      item.image_link_3,
                      item.image_link_4,
                      item.image_link_5,
                    ]
                      .filter((link): link is string => !!link)
                      .map((link) => ({
                        image: link,
                        alt: item.event_name ?? "",
                      }))
                  )
                  .slice(0, 15)
                  .map((item, index) => ({
                    id: index,
                    image: item.image,
                    alt: item.alt,
                  }))}
                type="process"
              />
            ) : (
              <div className="flex items-center justify-center py-8 bg-green-2 rounded-lg">
                <p className="typo-body-03-normal text-neutral opacity-60">
                  ยังไม่มีภาพกิจกรรม
                </p>
              </div>
            )}

            <div
              className="bg-green-2 border-2 border-green-2 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full cursor-pointer"
              onClick={() => router.push("/green-event")}
            >
              <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
                <p className="typo-body-03-semibold  text-neutral">
                  มีแล้ว{" "}
                  {
                    dataGreen.filter(
                      (item) => item.activity_type === "100 ขบวน"
                    ).length
                  }{" "}
                  ขบวน
                </p>
                <Image
                  src="/icons/view-all.svg"
                  alt="View All Icon"
                  width={16}
                  height={16}
                  className="h-4"
                />
              </div>
            </div>

            <div
              className="flex gap-1  justify-center cursor-pointer"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSe3GCOQnHO0xcCNDydrRRhS86U4OsL6vxVojGYWIq2hFJeVGw/viewform"
                )
              }
            >
              <p className="typo-body-02-semibold text-yellow-1 ">สมัครเพิ่ม</p>
              <Image
                src="/icons/export-yellow.svg"
                alt="Plus Icon"
                width={16}
                height={16}
                className="h-4"
              />
            </div>
          </div>
        </div>
        {/* box2 */}
        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <div className="w-full bg-green-1 rounded-[5px] p-5 flex flex-col gap-2.5">
            <div className="flex flex-col items-center justify-between">
              <p className="typo-heading-mobile-03 text-neutral">1,000</p>
              <p className="typo-heading-mobile-01 text-neutral">Activities</p>
            </div>
            <p className="typo-body-03-normal text-neutral text-center">
              งานเสวนาก็ได้ งานอบรมให้ความรู้ก็ได้
              <br className="md:hidden block" /> งานไปตั้งบูธ เดินตลาด
              แจกใบปลิวก็ได้
            </p>

            {dataGreen
              .filter((item) => item.activity_type === "1000 activities")
              .filter(
                (item) =>
                  item.published?.toUpperCase() !== "FALSE" &&
                  (item.image_link_1 ||
                    item.image_link_2 ||
                    item.image_link_3 ||
                    item.image_link_4 ||
                    item.image_link_5)
              ).length > 0 ? (
              <Carousel
                items={dataGreen
                  .filter((item) => item.activity_type === "1000 activities")
                  .filter(
                    (item) =>
                      item.published?.toUpperCase() !== "FALSE" &&
                      (item.image_link_1 ||
                        item.image_link_2 ||
                        item.image_link_3 ||
                        item.image_link_4 ||
                        item.image_link_5)
                  )
                  .flatMap((item) =>
                    [
                      item.image_link_1,
                      item.image_link_2,
                      item.image_link_3,
                      item.image_link_4,
                      item.image_link_5,
                    ]
                      .filter((link): link is string => !!link)
                      .map((link) => ({
                        image: link,
                        alt: item.event_name ?? "",
                      }))
                  )
                  .slice(0, 15)
                  .map((item, index) => ({
                    id: index,
                    image: item.image,
                    alt: item.alt,
                  }))}
                type="activities"
              />
            ) : (
              <div className="flex items-center justify-center py-8 bg-green-2 rounded-lg">
                <p className="typo-body-03-normal text-neutral opacity-60">
                  ยังไม่มีภาพกิจกรรม
                </p>
              </div>
            )}

            <div
              className="bg-green-2 border-2 border-green-2 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full cursor-pointer"
              onClick={() => router.push("/activities")}
            >
              <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
                <p className="typo-body-03-semibold  text-neutral">
                  มีแล้ว{" "}
                  {
                    dataGreen.filter(
                      (item) => item.activity_type === "1000 activities"
                    ).length
                  }{" "}
                  งาน
                </p>
                <Image
                  src="/icons/view-all.svg"
                  alt="View All Icon"
                  width={16}
                  height={16}
                  className="h-4"
                />
              </div>
            </div>

            <div
              className="flex gap-1  justify-center cursor-pointer"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSe3GCOQnHO0xcCNDydrRRhS86U4OsL6vxVojGYWIq2hFJeVGw/viewform"
                )
              }
            >
              <p className="typo-body-02-semibold text-yellow-1">สมัครเพิ่ม</p>
              <Image
                src="/icons/export-yellow.svg"
                alt="Plus Icon"
                width={16}
                height={16}
                className="h-4"
              />
            </div>
          </div>
        </div>
        {/* box3 */}
        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <div className="w-full bg-green-1 rounded-[5px] p-5 flex flex-col gap-2.5">
            <div className="flex flex-col items-center justify-between">
              <p className="typo-heading-mobile-03 text-neutral">10,000</p>
              <p className="typo-heading-mobile-01 text-neutral">
                บ้านเป็นจุดรณรงค์
              </p>
            </div>
            <p className="typo-body-03-normal text-neutral text-center">
              บ้านเรือน ร้านค้า ร้านอาหาร ร้านกาแฟ{" "}
              <br className="md:hidden block" /> สถานศึกษา โรงแรม{" "}
              <br className="md:hidden block" />
              สถานที่สาธารณะที่พร้อมติดป้ายไวนิล{" "}
              <br className="md:hidden block" /> พร้อมวางแจกแผ่นพับ สติ๊กเกอร์
            </p>
            <Carousel
              items={[
                "582453751_25145791678387030_606561801688365614_n.jpg",
                "588699217_1247735680531925_6972207883234341704_n.jpg",
                "597989392_1577294463152524_8082737510605749069_n.jpg",
                "598798493_1419032673146521_1382399480402062695_n.jpg",
                "599211551_832417786433678_6656261521299610114_n.jpg",
                "604658263_4282185151927132_4483440468308153516_n.jpg",
                "605608998_1510213864443943_8549399260366825627_n.jpg",
                "606664318_1239076738109603_8411710164563742050_n (1).jpg",
                "606881937_2103927560420944_7042486158133809113_n.jpg",
                "606967520_1535142114442109_1235340482195413725_n.jpg",
                "606983268_1888507141794097_312423867652090661_n.jpg",
                "607049004_1583325530012076_3429471023986592714_n.jpg",
                "607999099_794598636955353_233115789100569682_n.jpg",
                "608000753_1564179474903517_760910384019616332_n.jpg",
                "line_oa_chat_260106_153324-1.jpg",
                "line_oa_chat_260106_154235-1.jpg",
                "photo_6235768107335093302_y-1.jpg",
                "photo_6257897282082638740_w.jpg",
                "photo_6260280198657936371_w-1.jpg",
              ].map((filename, index) => ({
                id: index,
                image: `/imgmap/${filename}`,
                alt: filename,
              }))}
              type="stickers"
            />
            <div
              className="bg-green-2 border-2 border-green-2 rounded-lg  hover:border-2 hover:border-neutral transition-all h-full cursor-pointer"
              onClick={() => router.push("/map")}
            >
              <div className="flex justify-between mt-2.5 mb-2.5 ml-4 mr-4 h-full">
                <p className="typo-body-03-semibold  text-neutral">
                  มีแล้ว {map.length} จุด
                </p>
                <Image
                  src="/icons/view-all.svg"
                  alt="View All Icon"
                  width={16}
                  height={16}
                  className="h-4"
                />
              </div>
            </div>

            <div
              className="flex gap-1  justify-center cursor-pointer"
              onClick={() =>
                window.open("https://volunteer.conforall.com/apply/")
              }
            >
              <p className="typo-body-02-semibold text-yellow-1">สมัครเพิ่ม</p>
              <Image
                src="/icons/export-yellow.svg"
                alt="Plus Icon"
                width={16}
                height={16}
                className="h-4"
              />
            </div>
          </div>
        </div>
        {/* box4 */}
        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <div className="w-full bg-green-1 rounded-[5px] p-5 flex flex-col gap-2.5">
            <div className="flex flex-col items-center justify-between">
              <p className="typo-heading-mobile-03 text-neutral">100,000</p>
              <p className="typo-heading-mobile-01 text-neutral">
                หน่วยจับตานับคะแนน
              </p>
            </div>
            <p className="typo-body-03-normal text-neutral text-center">
              ซึ่งหนึ่งหน่วยมี 3 หีบที่จะนับพร้อมกัน 3
              <br className="md:hidden block" /> กระดาน จึงต้องใช้คน 300,000 คน
            </p>

            <p className="typo-body-03-normal text-white text-center">
              มีแล้ว{" "}
              {volunteerCount !== null
                ? volunteerCount.toLocaleString()
                : "..."}{" "}
              หน่วย
            </p>

            <div
              className="flex gap-1  justify-center cursor-pointer"
              onClick={() => window.open("https://volunteer.vote62.com/apply/")}
            >
              <p className="typo-body-02-semibold text-yellow-1">สมัครเพิ่ม</p>
              <Image
                src="/icons/export-yellow.svg"
                alt="Plus Icon"
                width={16}
                height={16}
                className="h-4"
              />
            </div>
          </div>
        </div>
        {/* box5 */}
        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <div className="w-full bg-green-1 rounded-[5px] p-5 flex flex-col gap-2.5">
            <div className="flex flex-col items-center justify-between">
              <p className="typo-heading-mobile-03 text-neutral">1,000,000</p>
              <p className="typo-heading-mobile-01 text-neutral">Stickers</p>
            </div>
            <p className="typo-body-03-normal text-neutral text-center">
              ติดสติ๊กเกอร์และโปสเตอร์ “8 กุมภา{" "}
              <br className="md:hidden block" /> กาเห็นชอบ” ให้กว้างขวางที่สุด
            </p>
            <Carousel
              items={[
                "2c3c560d-3083-4c48-9992-4fcdaa4e0e84.jpeg",
                "35707125-7da0-4816-9ca8-fc5bab2c5cf4.jpeg",
                "4588ded3-f4d1-4a52-b583-5246142a1884.jpeg",
                "58e2c4fe-d1e0-434c-9611-4781f7330f43.jpeg",
                "598652865_1642934863752625_6695912139576927836_n.jpg",
                "598697323_2051062122325709_5418268098700187993_n.jpg",
                "606933305_1416805756712499_5888599117693594712_n.jpg",
                "8249fbf7-112a-478d-817b-792ca6716f73.jpeg",
                "88649e30-0f97-41f0-9eaa-000615090c10.jpeg",
                "a8f81f63-2eea-4aa5-a16d-2660a9b65a9f.jpeg",
                "car3.jpg",
                "cars.jpg",
                "eb30f086-ebcb-482b-85c4-a89905491911.jpeg",
                "f0bc7b85-cbcf-47d2-81b0-c884cf9e60ee.jpeg",
                "line_oa_chat_260106_154220.jpg",
                "line_oa_chat_260106_154250.jpg",
                "line_oa_chat_260106_154301.jpg",
                "photo_6165819952124857449_y.jpg",
                "photo_6210563280737078344_y.jpg",
                "photo_6217341748447481369_y.jpg",
                "photo_6235768107335093306_y.jpg",
                "photo_6260069367303310529_y.jpg",
              ].map((filename, index) => ({
                id: index,
                image: `/stickerimg/${filename}`,
                alt: filename,
              }))}
              type="stickers"
            />
            <div
              className="flex gap-1  justify-center cursor-pointer"
              onClick={() =>
                window.open(
                  "https://docs.google.com/forms/d/e/1FAIpQLSf_STUmPL5nWqZHGN7jqBAUKAyyxyRfsErGzIO6DZg4FGGDLg/viewform"
                )
              }
            >
              <p className="typo-body-02-semibold text-yellow-1">อัปโหลดภาพ</p>
              <Image
                src="/icons/export-yellow.svg"
                alt="Plus Icon"
                width={16}
                height={16}
                className="h-4"
              />
            </div>
          </div>
        </div>
        {/* box6*/}
        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <div className="w-full bg-green-1 rounded-[5px] p-5 flex flex-col gap-2.5">
            <div className="flex flex-col items-center justify-between">
              <p className="typo-heading-mobile-03 text-neutral">10,000,000</p>
              <p className="typo-heading-mobile-01 text-neutral">Hashtag</p>
            </div>
            <p className="typo-body-03-normal text-neutral text-center">
              #8กุมภากาเห็นชอบ
              <br className="md:hidden block" /> แสดงออกออนไลน์ทุกพื้นที่
              <br className="md:hidden block" />
              ทุกรูปแบบรวมกัน ให้ทันก่อน 8 กุมภาฯ
            </p>

            <p className="typo-body-03-normal text-white text-center">
              ติดแล้ว {dataHastag[0].count} โพสต์
            </p>

            <div className="flex gap-2.5 justify-center">
              <a
                className="flex gap-1 justify-center cursor-pointer"
                href="https://www.instagram.com/explore/tags/8กุมภากาเห็นชอบ/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="typo-body-02-semibold text-yellow-1">IG</p>
                <Image
                  src="/icons/export-yellow.svg"
                  alt="Plus Icon"
                  width={16}
                  height={16}
                  className="h-4"
                />
              </a>
              <a
                className="flex gap-1 justify-center cursor-pointer"
                href="https://www.facebook.com/hashtag/8กุมภากาเห็นชอบ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="typo-body-02-semibold text-yellow-1">FB</p>
                <Image
                  src="/icons/export-yellow.svg"
                  alt="Plus Icon"
                  width={16}
                  height={16}
                  className="h-4"
                />
              </a>
              <a
                className="flex gap-1 justify-center cursor-pointer"
                href="https://x.com/search?q=%238กุมภากาเห็นชอบ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="typo-body-02-semibold text-yellow-1">Twitter</p>
                <Image
                  src="/icons/export-yellow.svg"
                  alt="Plus Icon"
                  width={16}
                  height={16}
                  className="h-4"
                />
              </a>
              <a
                className="flex gap-1 justify-center cursor-pointer"
                href="https://www.tiktok.com/search?q=%238กุมภากาเห็นชอบ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="typo-body-02-semibold text-yellow-1">TikTok</p>
                <Image
                  src="/icons/export-yellow.svg"
                  alt="Plus Icon"
                  width={16}
                  height={16}
                  className="h-4"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SectionNewSlide;
