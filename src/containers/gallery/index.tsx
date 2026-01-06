"use client";
import React, { useMemo } from "react";
import { DataGreenItem, DataStickerItem } from "../../services/type";
import Container from "@/src/components/Container";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type TabType = "all" | "process" | "activities" | "stickers";

const Gallery = ({
  greenEvent,
  dataSticker,
}: {
  greenEvent: DataGreenItem[];
  dataSticker: DataStickerItem[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const activeTab: TabType =
    tabParam === "process" ||
    tabParam === "activities" ||
    tabParam === "stickers"
      ? tabParam
      : "all";

  const handleActiveTab = (tab: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.push(`/gallery?${params.toString()}`);
  };

  // Helper to get all image links from a DataGreenItem
  const getGreenImages = (item: DataGreenItem) => {
    const images: string[] = [];
    if (item.image_link_1) images.push(item.image_link_1);
    if (item.image_link_2) images.push(item.image_link_2);
    if (item.image_link_3) images.push(item.image_link_3);
    if (item.image_link_4) images.push(item.image_link_4);
    if (item.image_link_5) images.push(item.image_link_5);
    return images;
  };

  // Filter images based on active tab
  const allImages = useMemo(() => {
    // Process tab: filter greenEvent for "100 ขบวน"
    if (activeTab === "process") {
      return greenEvent
        .filter(
          (item) =>
            getGreenImages(item).length > 0 &&
            item.activity_type === "100 ขบวน" &&
            item.published?.toUpperCase() !== "FALSE"
        )
        .flatMap((item) =>
          getGreenImages(item).map((src) => ({
            src,
            alt: item.event_name || "Green Event",
          }))
        );
    }

    // Activities tab: filter greenEvent for "1000 activities"
    if (activeTab === "activities") {
      return greenEvent
        .filter(
          (item) =>
            getGreenImages(item).length > 0 &&
            item.activity_type === "1000 activities" &&
            item.published?.toUpperCase() !== "FALSE"
        )
        .flatMap((item) =>
          getGreenImages(item).map((src) => ({
            src,
            alt: item.event_name || "Green Event",
          }))
        );
    }

    // Stickers tab: use only dataSticker
    if (activeTab === "stickers") {
      return dataSticker
        .filter((item) => item.image_link)
        .map((item) => ({
          src: item.image_link!,
          alt: "Sticker",
        }));
    }

    // All tab: show all images
    const greenImages = greenEvent
      .filter(
        (item) =>
          getGreenImages(item).length > 0 &&
          item.published?.toUpperCase() !== "FALSE"
      )
      .flatMap((item) =>
        getGreenImages(item).map((src) => ({
          src,
          alt: item.event_name || "Green Event",
        }))
      );

    const stickerImages = dataSticker
      .filter((item) => item.image_link)
      .map((item) => ({
        src: item.image_link!,
        alt: "Sticker",
      }));

    return [...greenImages, ...stickerImages];
  }, [greenEvent, dataSticker, activeTab]);

  // Distribute images across columns for masonry layout
  // 2 columns on mobile, 3 columns on desktop
  const columns = useMemo(() => {
    const numColumns = 3; // Use max columns, CSS will handle responsive
    const cols: { src: string; alt: string }[][] = Array.from(
      { length: numColumns },
      () => []
    );

    allImages.forEach((image, index) => {
      cols[index % numColumns].push(image);
    });

    return cols;
  }, [allImages]);

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="h-[40px] px-2">
        <div className="flex items-center h-full gap-0.5">
          <Image
            src="/icons/arrow-back.svg"
            alt="Arrow Left"
            width={16}
            height={16}
            className="h-4"
          />
          <p
            className="typo-link-01 text-green-1 cursor-pointer underline underline-offset-2"
            onClick={() => router.push("/")}
          >
            กลับหน้าหลัก
          </p>
        </div>
      </div>

      <Container className="py-6">
        <div className="flex flex-col gap-4 items-center justify-center mb-2.5">
          <p className="typo-heading-mobile-02 text-neutral text-center">
            รูปงานรณรงค์
          </p>
        </div>
        <div className="flex gap-2.5 items-center justify-center mb-2.5">
          <p
            className="typo-link-01 text-neutral text-center underline underline-offset-2"
            onClick={() => handleActiveTab("all")}
          >
            {activeTab === "all" && (
              <span className="text-neutral">ทั้งหมด</span>
            )}
            {activeTab !== "all" && (
              <span className="text-base-300 underline">ทั้งหมด</span>
            )}
          </p>
          <p
            className="typo-link-01 text-neutral text-center underline underline-offset-2"
            onClick={() => handleActiveTab("process")}
          >
            {activeTab === "process" && (
              <span className="text-neutral">ขบวนรณรงค์</span>
            )}
            {activeTab !== "process" && (
              <span className="text-base-300 underline">ขบวนรณรงค์</span>
            )}
          </p>
          <p
            className="typo-link-01 text-neutral text-center underline underline-offset-2"
            onClick={() => handleActiveTab("activities")}
          >
            {activeTab === "activities" && (
              <span className="text-neutral">Activities</span>
            )}
            {activeTab !== "activities" && (
              <span className="text-base-300 underline">Activities</span>
            )}
          </p>
          <p
            className="typo-link-01 text-neutral text-center underline underline-offset-2"
            onClick={() => handleActiveTab("stickers")}
          >
            {activeTab === "stickers" && (
              <span className="text-neutral">Stickers</span>
            )}
            {activeTab !== "stickers" && (
              <span className="text-base-300 underline">Stickers</span>
            )}
          </p>
        </div>
        {allImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className="grid gap-4">
                {column.map((image, imgIndex) => (
                  <div key={imgIndex}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-auto max-w-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 mb-6 rounded-full bg-base-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="typo-heading-mobile-01 text-neutral mb-2">
              ยังไม่มีรูปภาพ
            </p>
            <p className="typo-body-01-normal text-gray-500 text-center">
              ยังไม่มีรูปภาพในหมวดหมู่นี้
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Gallery;
