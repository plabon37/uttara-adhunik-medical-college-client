"use client";

import Image from "next/image";

import Link from "next/link";

import {
  CalendarDays,
  ArrowUpRight,
  UserRound,
} from "lucide-react";

import {
  News,
} from "./News";

// =========================================================
// PROPS
// =========================================================

interface NewsBoardProps {
  news: News[];
}

// =========================================================
// DATE FORMAT
// =========================================================

function formatDate(
  value: string
) {
  if (!value) {
    return "";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

// =========================================================
// COMPONENT
// =========================================================

export default function NewsBoard({
  news,
}: NewsBoardProps) {
  const visibleNews =
    news.slice(0, 2);

  return (
    <section
      className="
        w-full
        bg-white
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-5
            sm:mb-12
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          {/* LEFT */}

          <div>
            <h2
              className="
                text-3xl
                font-semibold
                tracking-tight
                text-slate-900
                sm:text-4xl
                lg:text-5xl
              "
            >
              Read Our Latest News
            </h2>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-slate-500
                sm:text-base
              "
            >
              You’ll find something to
              spark your curiosity...
            </p>
          </div>

          {/* VIEW ALL */}

          <Link
            href="/news"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              border-b
              border-slate-900
              pb-1
              text-sm
              font-semibold
              text-slate-900
              transition
              hover:border-[#008B45]
              hover:text-[#008B45]
            "
          >
            View All

            <ArrowUpRight
              size={16}
            />
          </Link>
        </div>

        {/* =================================================
            NEWS GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >
          {visibleNews.map(
            (item) => (
              <Link
                key={item._id}
                href={`/news/${item.slug}`}
                className="
                  group
                  block
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    aspect-[16/9]
                    w-full
                    overflow-hidden
                    bg-slate-100
                  "
                >
                  {item.image ? (
                    <Image
                      src={
                        item.image
                      }
                      alt={
                        item.title
                      }
                      fill
                      sizes="
                        (max-width: 1024px) 100vw,
                        50vw
                      "
                      className="
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-sm
                        text-slate-400
                      "
                    >
                      No image
                    </div>
                  )}
                </div>

                {/* =================================================
                    CONTENT
                ================================================= */}

                <div
                  className="
                    p-5
                    sm:p-6
                  "
                >
                  {/* CATEGORY */}

                  <span
                    className="
                      inline-flex
                      rounded-full
                      bg-[#EAF5EE]
                      px-3
                      py-1.5
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-[#008B45]
                    "
                  >
                    {item.category}
                  </span>

                  {/* TITLE */}

                  <h3
                    className="
                      mt-4
                      line-clamp-2
                      text-xl
                      font-semibold
                      leading-8
                      text-slate-900
                      transition
                      group-hover:text-[#008B45]
                      sm:text-2xl
                    "
                  >
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-3
                      line-clamp-3
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {item.description}
                  </p>

                  {/* =================================================
                      META
                  ================================================= */}

                  <div
                    className="
                      mt-6
                      flex
                      flex-wrap
                      items-center
                      gap-x-5
                      gap-y-2
                      border-t
                      border-slate-100
                      pt-4
                      text-xs
                      text-slate-500
                    "
                  >
                    {/* AUTHOR */}

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                      "
                    >
                      <UserRound
                        size={14}
                      />

                      {item.author}
                    </span>

                    {/* DATE */}

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                      "
                    >
                      <CalendarDays
                        size={14}
                      />

                      {formatDate(
                        item.date
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}