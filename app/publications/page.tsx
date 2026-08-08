"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Download,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Publication {
  _id: string;
  title: string;
  slug: string;
  category: "Journal" | "Tenders";
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
  "Journal",
  "Tenders",
] as const;

type Category = (typeof categories)[number];

export default function PublicationsPage() {
  const [publications, setPublications] =
    useState<Publication[]>([]);

  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================
  // FETCH PUBLICATIONS
  // ==========================

  useEffect(() => {
    async function loadPublications() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/publications`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch publications."
          );
        }

        const result =
          await res.json();

        const data = Array.isArray(result)
          ? result
          : Array.isArray(result.data)
          ? result.data
          : [];

        const published =
          data.filter(
            (publication: Publication) =>
              publication.isPublished
          );

        setPublications(published);
      } catch (error) {
        console.error(
          "PUBLICATIONS PAGE ERROR:",
          error
        );

        setError(
          "Failed to load publications."
        );

        setPublications([]);
      } finally {
        setLoading(false);
      }
    }

    loadPublications();
  }, []);

  // ==========================
  // FILTER + SORT
  // ==========================

  const filteredPublications = useMemo(() => {
    return [...publications]
      .filter((publication) => {
        if (activeCategory === "All") {
          return true;
        }

        return (
          publication.category ===
          activeCategory
        );
      })
      .sort(
        (a, b) =>
          a.order - b.order
      );
  }, [
    publications,
    activeCategory,
  ]);

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
      monthYear:
        `${parsedDate.toLocaleDateString(
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
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="h-10 w-72 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 h-16 animate-pulse rounded bg-slate-100" />

          <div className="mt-5 space-y-3">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="h-[145px] animate-pulse rounded bg-slate-100"
                />
              )
            )}
          </div>
        </div>
      </main>
    );
  }

  // ==========================
  // PAGE
  // ==========================

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:py-14">

        {/* ==========================
            BACK
        ========================== */}

        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-700
            transition
            hover:text-[#008B45]
          "
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* ==========================
            HEADER
        ========================== */}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1
              className="
                font-serif
                text-4xl
                font-bold
                leading-none
                text-[#008B45]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Publication
            </h1>

            <p className="mt-4 max-w-2xl text-slate-500">
              Explore all published journals
              and tenders.
            </p>
          </div>
        </div>

        {/* ==========================
            CATEGORY TABS
        ========================== */}

        <div className="mt-10 w-full overflow-x-auto">
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
                      px-6
                      py-5
                      text-sm
                      font-medium
                      transition-all
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

        {/* ==========================
            ERROR
        ========================== */}

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* ==========================
            EMPTY
        ========================== */}

        {!error &&
          filteredPublications.length ===
            0 && (
            <div className="mt-5 flex min-h-[350px] items-center justify-center bg-[#EEF0F9] px-6 text-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-700">
                  No Publications Available
                </h2>

                <p className="mt-2 text-slate-500">
                  There are no published
                  publications in this category.
                </p>
              </div>
            </div>
          )}

        {/* ==========================
            PUBLICATION LIST
        ========================== */}

        <div className="mt-5 space-y-3">
          {filteredPublications.map(
            (publication) => {
              const {
                day,
                monthYear,
              } = formatDate(
                publication.date
              );

              return (
                <div
                  key={
                    publication._id
                  }
                  className="
                    flex
                    min-h-[145px]
                    w-full
                    items-center
                    gap-4
                    overflow-hidden
                    bg-[#EEF0F9]
                    px-4
                    py-6
                    transition-all
                    hover:bg-[#E6E8F2]
                    sm:gap-7
                    sm:px-6
                  "
                >
                  {/* DATE */}

                  <div className="flex w-[82px] shrink-0 flex-col items-center sm:w-[105px]">
                    <span className="text-3xl font-bold leading-none text-slate-700 sm:text-4xl">
                      {day}
                    </span>

                    <span className="mt-3 flex min-h-[48px] w-full items-center justify-center bg-[#008B45] px-1 text-xs font-bold text-white sm:text-base">
                      {monthYear}
                    </span>
                  </div>

                  {/* DIVIDER */}

                  <div className="h-16 w-px shrink-0 bg-slate-300/70" />

                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/publications/${publication.slug}`}
                      className="
                        line-clamp-2
                        break-words
                        text-base
                        font-medium
                        leading-7
                        text-slate-700
                        transition
                        hover:text-[#008B45]
                        sm:text-lg
                        lg:text-xl
                      "
                    >
                      {publication.title}
                    </Link>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={17}
                          strokeWidth={1.8}
                        />

                        <span>
                          {publication.time}
                        </span>
                      </div>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#008B45]">
                        {publication.category}
                      </span>
                    </div>
                  </div>

                  {/* DOWNLOAD */}

                  <a
                    href={
                      publication.pdf
                    }
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      bg-white
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-slate-700
                      transition
                      hover:bg-green-50
                      hover:text-[#008B45]
                      sm:px-4
                    "
                  >
                    <Download
                      size={17}
                    />

                    <span className="hidden sm:inline">
                      Download
                    </span>
                  </a>
                </div>
              );
            }
          )}
        </div>
      </div>
    </main>
  );
}