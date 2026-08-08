"use client";

import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  updatedAt: string;
}

const categories = [
  "All",
  "General Notice",
  "Admission Notice",
  "Reports",
  "Job Circular",
] as const;

type Category = (typeof categories)[number];

export default function AllNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================
  // FETCH ALL NOTICES
  // ==========================

  useEffect(() => {
    async function loadNotices() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/notices`,
          {
            cache: "no-store",
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch notices."
          );
        }

        const noticeData = Array.isArray(
          result
        )
          ? result
          : Array.isArray(result.data)
          ? result.data
          : [];

        const publishedNotices =
          noticeData.filter(
            (notice: Notice) =>
              notice.isPublished
          );

        setNotices(
          publishedNotices.sort(
            (
              a: Notice,
              b: Notice
            ) =>
              a.order - b.order
          )
        );
      } catch (error) {
        console.error(
          "ALL NOTICES ERROR:",
          error
        );

        setError(
          "Failed to load notices."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

  // ==========================
  // FILTER
  // ==========================

  const filteredNotices = useMemo(() => {
    if (activeCategory === "All") {
      return notices;
    }

    return notices.filter(
      (notice) =>
        notice.category ===
        activeCategory
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
      ] = date
        .split("-")
        .map(Number);

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
      ] = date
        .split("/")
        .map(Number);

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

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <section className="flex min-h-[600px] items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#008B45]" />

          <p className="mt-4 text-sm text-slate-500">
            Loading notices...
          </p>
        </div>
      </section>
    );
  }

  // ==========================
  // ERROR
  // ==========================

  if (error) {
    return (
      <section className="flex min-h-[600px] items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Unable to Load Notices
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            {error}
          </p>

          <Link
            href="/"
            className="
              mt-6
              inline-flex
              rounded-xl
              bg-[#008B45]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#006B36]
            "
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        {/* ==========================
            HEADER
        ========================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="
                inline-flex
                items-center
                text-sm
                font-medium
                text-slate-500
                transition
                hover:text-[#008B45]
              "
            >
              ← Back to Home
            </Link>

            <h1 className="mt-5 font-serif text-4xl font-bold text-[#008B45] sm:text-5xl lg:text-6xl">
              Notice Board
            </h1>

            <p className="mt-3 text-sm text-slate-500 sm:text-base">
              All published notices
            </p>
          </div>

          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-[#008B45]">
            {notices.length}{" "}
            {notices.length === 1
              ? "Notice"
              : "Notices"}
          </div>
        </div>

        {/* ==========================
            CATEGORY FILTER
        ========================== */}

        <div className="mt-10 w-full overflow-x-auto">
          <div className="flex min-w-max rounded-xl bg-[#EEF0F9] p-1">
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
                      rounded-lg
                      px-5
                      py-3
                      text-sm
                      font-medium
                      transition
                      sm:px-6
                      ${
                        isActive
                          ? "bg-white text-[#008B45] shadow-sm"
                          : "text-slate-600 hover:text-[#008B45]"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* ==========================
            NOTICE LIST
        ========================== */}

        <div className="mt-8 space-y-4">
          {filteredNotices.length ===
          0 ? (
            <div className="flex min-h-[350px] items-center justify-center rounded-2xl bg-[#EEF0F9] px-6 text-center">
              <div>
                <h2 className="text-xl font-bold text-slate-700">
                  No Notices Available
                </h2>

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
                      w-full
                      flex-col
                      gap-5
                      rounded-2xl
                      border
                      border-slate-200
                      bg-[#EEF0F9]
                      p-5
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:border-[#008B45]/30
                      hover:shadow-md
                      sm:flex-row
                      sm:items-center
                      sm:gap-6
                      sm:p-6
                    "
                  >
                    {/* Date */}

                    <div className="flex shrink-0 items-center gap-4 sm:w-[120px] sm:flex-col sm:gap-2">
                      <span className="text-3xl font-bold leading-none text-slate-700 sm:text-4xl">
                        {day}
                      </span>

                      <span className="flex min-h-[44px] min-w-[90px] items-center justify-center bg-[#008B45] px-3 text-sm font-bold text-white sm:w-full">
                        {monthYear}
                      </span>
                    </div>

                    {/* Divider */}

                    <div className="hidden h-16 w-px bg-slate-300 sm:block" />

                    {/* Content */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#008B45]">
                          {notice.category}
                        </span>
                      </div>

                      <h2
                        className="
                          mt-3
                          break-words
                          text-lg
                          font-semibold
                          leading-7
                          text-slate-700
                          transition
                          group-hover:text-[#008B45]
                          sm:text-xl
                        "
                      >
                        {notice.title}
                      </h2>

                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                        <Clock3
                          size={17}
                        />

                        <span>
                          {notice.time}
                        </span>
                      </div>
                    </div>

                    {/* Arrow */}

                    <div className="hidden shrink-0 text-2xl text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#008B45] sm:block">
                      →
                    </div>
                  </Link>
                );
              }
            )
          )}
        </div>
      </div>
    </section>
  );
}