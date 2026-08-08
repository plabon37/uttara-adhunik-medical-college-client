"use client";

import Link from "next/link";
import { Clock3, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

interface Notice {
  _id: string;
  title: string;
  slug: string;
  category:
    | "General Notice"
    | "Admission Notice"
    | "Reports"
    | "Job Circular";
  description: string;
  pdf: string;
  date: string;
  time: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
}

interface NoticeBoardProps {
  notices: Notice[];
}

const categories = [
  "General Notice",
  "Admission Notice",
  "Reports",
  "Job Circular",
] as const;

type Category = (typeof categories)[number];

export default function NoticeBoard({
  notices,
}: NoticeBoardProps) {
  const [activeCategory, setActiveCategory] =
    useState<Category>("General Notice");

  const filteredNotices = useMemo(() => {
    return notices
      .filter(
        (notice) =>
          notice.category === activeCategory
      )
      .sort(
        (a, b) =>
          a.order - b.order
      );
  }, [notices, activeCategory]);

  // ==========================
  // FORMAT DATE
  // ==========================

  const formatDate = (date: string) => {
    if (!date) {
      return {
        day: "--",
        monthYear: "---",
      };
    }

    let parsedDate: Date;

    if (
      /^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
      const [
        year,
        month,
        day,
      ] = date.split("-").map(Number);

      parsedDate = new Date(
        year,
        month - 1,
        day
      );
    } else if (
      /^\d{2}\/\d{2}\/\d{4}$/.test(date)
    ) {
      const [
        month,
        day,
        year,
      ] = date.split("/").map(Number);

      parsedDate = new Date(
        year,
        month - 1,
        day
      );
    } else {
      parsedDate = new Date(date);
    }

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return {
        day: "--",
        monthYear: "---",
      };
    }

    return {
      day: String(
        parsedDate.getDate()
      ),
      monthYear: `${parsedDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
        }
      )} ${parsedDate
        .getFullYear()
        .toString()
        .slice(-2)}`,
    };
  };

  return (
    <section className="w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1700px] min-w-0 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* =========================
              NOTICE BOARD
          ========================= */}

          <div className="min-w-0 max-w-full">
            {/* Header */}

            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif text-4xl font-bold leading-none text-[#008B45] sm:text-5xl lg:text-6xl">
                Notice Board
              </h2>

              <Link
                href="/notices"
                className="
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-1
                  border-b
                  border-[#008B45]
                  pb-1
                  text-sm
                  font-medium
                  text-[#008B45]
                  transition
                  hover:text-[#006B36]
                  sm:mb-1
                  sm:text-base
                "
              >
                View All
                <ExternalLink size={16} />
              </Link>
            </div>

            {/* =========================
                CATEGORY TABS
            ========================= */}

            <div className="mt-10 w-full max-w-full overflow-x-auto sm:mt-12">
              <div className="flex min-w-max bg-[#EEF0F9]">
                {categories.map(
                  (category) => {
                    const isActive =
                      activeCategory ===
                      category;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() =>
                          setActiveCategory(
                            category
                          )
                        }
                        className={`
                          relative
                          min-w-[145px]
                          px-5
                          py-5
                          text-sm
                          font-medium
                          transition-all
                          duration-200
                          sm:min-w-[180px]
                          sm:text-base
                          ${
                            isActive
                              ? "bg-white font-bold text-[#008B45] shadow-[0_0_18px_rgba(0,0,0,0.12)]"
                              : "text-slate-800 hover:bg-white/60"
                          }
                        `}
                      >
                        {category}

                        {isActive && (
                          <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#008B45]" />
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* =========================
                NOTICE LIST
            ========================= */}

            <div
              className="
                mt-4
                max-h-[625px]
                w-full
                max-w-full
                space-y-3
                overflow-y-auto
                overflow-x-hidden
                pr-1
                sm:pr-2
              "
            >
              {filteredNotices.length ===
              0 ? (
                <div className="flex min-h-[300px] w-full items-center justify-center bg-[#EEF0F9] px-6 text-center">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-700">
                      No Notices Available
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      There are no published
                      notices in this category.
                    </p>
                  </div>
                </div>
              ) : (
                filteredNotices.map(
                  (notice) => {
                    const {
                      day,
                      monthYear,
                    } = formatDate(
                      notice.date
                    );

                    return (
                      <Link
                        key={notice._id}
                        href={`/notices/${notice.slug}`}
                        className="
                          group
                          flex
                          min-h-[145px]
                          w-full
                          max-w-full
                          items-center
                          gap-4
                          overflow-hidden
                          bg-[#EEF0F9]
                          px-4
                          py-6
                          transition-all
                          duration-200
                          hover:bg-[#E6E8F2]
                          sm:gap-7
                          sm:px-6
                        "
                      >
                        {/* Date */}

                        <div className="flex w-[82px] shrink-0 flex-col items-center sm:w-[105px]">
                          <span className="text-3xl font-bold leading-none text-slate-700 sm:text-4xl">
                            {day}
                          </span>

                          <span className="mt-3 flex min-h-[48px] w-full items-center justify-center bg-[#008B45] px-1 text-xs font-bold text-white sm:text-base">
                            {monthYear}
                          </span>
                        </div>

                        {/* Divider */}

                        <div className="h-16 w-px shrink-0 bg-slate-300/70" />

                        {/* Content */}

                        <div className="min-w-0 flex-1">
                          <h3
                            className="
                              line-clamp-2
                              break-words
                              text-base
                              font-medium
                              leading-7
                              text-slate-700
                              transition
                              group-hover:text-[#008B45]
                              sm:text-lg
                              lg:text-xl
                            "
                          >
                            {notice.title}
                          </h3>

                          <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                            <Clock3
                              size={17}
                              strokeWidth={1.8}
                            />

                            <span className="shrink-0">
                              {notice.time}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  }
                )
              )}
            </div>
          </div>

          {/* =========================
              PUBLICATION
          ========================= */}

          <div className="min-w-0 max-w-full">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif text-4xl font-bold leading-none text-[#008B45] sm:text-5xl lg:text-6xl">
                Publication
              </h2>

              <Link
                href="/publications"
                className="
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-1
                  border-b
                  border-[#008B45]
                  pb-1
                  text-sm
                  font-medium
                  text-[#008B45]
                  transition
                  hover:text-[#006B36]
                  sm:mb-1
                  sm:text-base
                "
              >
                View All
                <ExternalLink size={16} />
              </Link>
            </div>

            <div className="mt-10 flex min-h-[400px] w-full max-w-full items-center justify-center overflow-hidden bg-[#EEF0F9] px-6 text-center sm:mt-12 sm:min-h-[625px]">
              <div>
                <h3 className="text-2xl font-bold text-slate-700">
                  Publication
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Publication section will be
                  connected next.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}