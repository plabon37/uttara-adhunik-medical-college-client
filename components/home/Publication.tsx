"use client";

import Link from "next/link";
import {
  Clock3,
  Download,
  ExternalLink,
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
}

const categories = [
  "Journal",
  "Tenders",
] as const;

type Category = (typeof categories)[number];

export default function Publication() {
  const [publications, setPublications] =
    useState<Publication[]>([]);

  const [activeCategory, setActiveCategory] =
    useState<Category>("Journal");

  const [loading, setLoading] =
    useState(true);

  // ==========================
  // FETCH PUBLICATIONS
  // ==========================

  useEffect(() => {
    async function getPublications() {
      try {
        setLoading(true);

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

        const data = await res.json();

        /*
         * API may return:
         * 1. direct array
         * 2. { data: [...] }
         */

        const publicationData =
          Array.isArray(data)
            ? data
            : Array.isArray(data.data)
            ? data.data
            : [];

        const publishedPublications =
          publicationData.filter(
            (publication: Publication) =>
              publication.isPublished
          );

        setPublications(
          publishedPublications
        );
      } catch (error) {
        console.error(
          "PUBLICATION FETCH ERROR:",
          error
        );

        setPublications([]);
      } finally {
        setLoading(false);
      }
    }

    getPublications();
  }, []);

  // ==========================
  // FILTER PUBLICATIONS
  // ==========================

  const filteredPublications = useMemo(() => {
    return [...publications]
      .filter(
        (publication) =>
          publication.category ===
          activeCategory
      )
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
      <div className="min-w-0 w-full">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
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
          </h2>

          <Link
            href="/publications"
            className="
              inline-flex
              w-fit
              items-center
              gap-1
              border-b
              border-[#008B45]
              pb-1
              text-sm
              font-medium
              text-[#008B45]
              sm:text-base
            "
          >
            View All
            <ExternalLink size={16} />
          </Link>
        </div>

        <div className="mt-10 w-full bg-[#EEF0F9]">
          <div className="h-[70px] animate-pulse bg-[#EEF0F9]" />
        </div>

        <div className="mt-4 h-[145px] w-full animate-pulse bg-[#EEF0F9]" />
      </div>
    );
  }

  return (
    <div className="min-w-0 w-full">
      {/* =========================
          HEADER
      ========================= */}

      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
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

      {/* =========================
          TABS
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
          PUBLICATION LIST
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
        {filteredPublications.length ===
        0 ? (
          <div
            className="
              flex
              min-h-[300px]
              w-full
              items-center
              justify-center
              bg-[#EEF0F9]
              px-6
              text-center
            "
          >
            <div>
              <h3 className="text-xl font-semibold text-slate-700">
                No Publications Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                There are no published{" "}
                {activeCategory.toLowerCase()}{" "}
                publications available.
              </p>
            </div>
          </div>
        ) : (
          filteredPublications.map(
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

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                      <Clock3
                        size={17}
                        strokeWidth={1.8}
                      />

                      <span className="shrink-0">
                        {publication.time}
                      </span>
                    </div>
                  </div>

                  
                  
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}