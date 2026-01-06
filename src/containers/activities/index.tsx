"use client";
import React, { useState, useMemo } from "react";
import { DataGreenItem } from "../../services/type";
import Container from "@/src/components/Container";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Thai month abbreviations
const THAI_MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

// Helper to parse date string to Date object (format: "m/d/yyyy")
const parseDateString = (dateStr?: string): Date | null => {
  if (!dateStr) return null;

  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month - 1, day);
    }
  }
  return null;
};

// Helper to check if date is in the past (before today)
const isDatePast = (dateStr?: string): boolean => {
  const date = parseDateString(dateStr);
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// Helper to format date to Thai format (e.g., "1/11/2026" -> "11 ม.ค.")
const formatToThaiDate = (dateStr?: string): string => {
  if (!dateStr) return "ไม่ระบุวันที่";

  // Try to parse date in format "m/d/yyyy"
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    if (!isNaN(day) && !isNaN(month) && month >= 1 && month <= 12) {
      return `${day} ${THAI_MONTHS[month - 1]}`;
    }
  }

  // Return original if can't parse
  return dateStr;
};

// Group events by date
const groupEventsByDate = (events: DataGreenItem[]) => {
  const groups: { [key: string]: DataGreenItem[] } = {};
  events.forEach((event) => {
    const dateKey = event.date || "ไม่ระบุวันที่";
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
  });
  return groups;
};

const EventCard = ({ event }: { event: DataGreenItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-t border-gray-200 py-4">
      <h3
        className={`typo-link-02 font-semibold text-neutral mb-3 hover:underline hover:underline-offset-2 hover:text-green-1 ${
          event.activity_link ? "underline underline-offset-2 " : ""
        }`}
        onClick={() => {
          if (event.activity_link) {
            window.open(event.activity_link, "_blank");
          }
        }}
      >
        {event.event_name}
      </h3>

      <div className="grid grid-cols-2 gap-y-2 mb-2">
        <div>
          <p className="typo-body-01-semibold text-neutral">จังหวัด</p>
          <p className="typo-body-01-normal text-neutral">
            {event.province || "-"}
          </p>
        </div>
        <div>
          <p className="typo-body-01-semibold text-neutral">เวลา</p>
          <p className="typo-body-01-normal text-neutral">
            {event.time || "-"}
          </p>
        </div>
      </div>

      <div className="mb-2">
        <p className="typo-body-01-semibold text-neutral">สถานที่</p>
        <p className="typo-body-01-normal text-neutral">
          {event.location || "-"}
        </p>
      </div>

      {event.map_url && (
        <a
          href={event.map_url}
          target="_blank"
          rel="noopener noreferrer"
          className="typo-link-01 text-green-1! underline underline-offset-2"
        >
          ดูแผนที่
        </a>
      )}

      <div
        className="flex items-center justify-between py-3 mt-2 bg-base-200  cursor-pointer px-2.5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="typo-body-01-normal text-neutral opacity-50">
          อ่านรายละเอียด
        </span>
        <svg
          className={`w-4 h-4 text-neutral transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isExpanded && (
        <div className="pt-2 pb-4 text-neutral typo-body-01-normal bg-base-200  px-2.5">
          <div className="flex flex-col gap-1">
            <div>
              <p className="typo-body-01-semibold text-neutral">จัดโดย</p>
              <p className="typo-body-01-normal text-neutral">
                {event.coordinator || "-"}
              </p>
            </div>
            <div>
              <p className="typo-body-01-semibold text-neutral">รายละเอียด</p>
              <p className="typo-body-01-normal text-neutral">
                {event.description || "-"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DateGroup = ({
  date,
  events,
  isPast,
}: {
  date: string;
  events: DataGreenItem[];
  isPast: boolean;
}) => {
  // Past dates are collapsed by default, current/future are expanded
  const [isOpen, setIsOpen] = useState(!isPast);

  return (
    <div
      className={`mb-4 border-t-2  ${isPast ? "opacity-50" : "border-neutral"}`}
    >
      <div
        className={`flex items-center justify-between py-3 `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-baseline gap-2">
          <h2
            className={`typo-heading-mobile-01 font-bold ${
              isPast ? "text-gray-400" : "text-neutral"
            }`}
          >
            วันที่ {formatToThaiDate(date)}
          </h2>
          <span
            className={`typo-body-02 ${
              isPast ? "text-gray-400" : "text-gray-500"
            }`}
          >
            ({events.length} กิจกรรม)
          </span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${
            isPast ? "text-gray-400" : "text-neutral"
          } ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </div>

      {isOpen && (
        <div>
          {events.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

const Activities = ({ greenEvent }: { greenEvent: DataGreenItem[] }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return greenEvent;
    const query = searchQuery.toLowerCase();
    return greenEvent.filter(
      (event) =>
        event.province?.toLowerCase().includes(query) ||
        event.event_name?.toLowerCase().includes(query)
    );
  }, [greenEvent, searchQuery]);

  const groupedEvents = useMemo(
    () => groupEventsByDate(filteredEvents),
    [filteredEvents]
  );

  // Sort dates: past dates first, then current/future
  const sortedDates = useMemo(() => {
    return Object.keys(groupedEvents).sort((a, b) => {
      const dateA = parseDateString(a);
      const dateB = parseDateString(b);
      if (!dateA || !dateB) return 0;
      return dateA.getTime() - dateB.getTime();
    });
  }, [groupedEvents]);

  console.log(greenEvent);

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
            {greenEvent.length} Activities
          </p>
        </div>
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="ค้นหากิจกรรมด้วยชื่อจังหวัด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg typo-body-02 text-neutral placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1 focus:border-transparent bg-base-200"
          />
        </div>

        {/* Events List grouped by date */}
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => (
            <DateGroup
              key={date}
              date={date}
              events={groupedEvents[date]}
              isPast={isDatePast(date)}
            />
          ))
        ) : (
          <div className="text-center py-10">
            <p className="typo-body-01 text-gray-500">ไม่พบกิจกรรม</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Activities;
