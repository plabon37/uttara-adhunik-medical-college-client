"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { useParams } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  UserRound,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

interface News {
  _id: string;

  title: string;

  slug: string;

  category: string;

  description: string;

  image: string;

  author: string;

  date: string;

  isPublished: boolean;

  order: number;

  createdAt: string;

  updatedAt?: string;
}

interface NewsApiResponse {
  success?: boolean;

  message?: string;

  data?: News | News[];
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
// PAGE
// =========================================================

export default function NewsDetailsPage() {
  const params =
    useParams<{
      slug: string;
    }>();

  const slug =
    params?.slug;

  // =======================================================
  // STATE
  // =======================================================

  const [news, setNews] =
    useState<News | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [notFound, setNotFound] =
    useState(false);

  // =======================================================
  // FETCH NEWS
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      try {
        if (!slug) {
          if (!cancelled) {
            setNotFound(true);
            setLoading(false);
          }

          return;
        }

        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const response =
          await fetch(
            `${adminUrl}/api/news`,
            {
              method: "GET",

              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch news."
          );
        }

        const result:
          NewsApiResponse =
          await response.json();

        // =================================================
        // NORMALIZE DATA
        // =================================================

        const rawData =
          result.data;

        const newsList =
          Array.isArray(
            rawData
          )
            ? rawData
            : rawData
              ? [rawData]
              : [];

        // =================================================
        // FIND MATCHING SLUG
        // =================================================

        const matchedNews =
          newsList.find(
            (item) =>
              item.slug ===
              slug &&
              item.isPublished
          ) ?? null;

        if (!cancelled) {
          if (
            !matchedNews
          ) {
            setNotFound(
              true
            );

            setNews(null);
          } else {
            setNews(
              matchedNews
            );

            setNotFound(
              false
            );
          }
        }
      } catch (error) {
        console.error(
          "CLIENT NEWS DETAILS ERROR:",
          error
        );

        if (!cancelled) {
          setNotFound(true);
          setNews(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadNews();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-white
          px-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            text-sm
            font-medium
            text-slate-500
          "
        >
          <Loader2
            size={22}
            className="
              animate-spin
              text-[#008B45]
            "
          />

          Loading News...
        </div>
      </main>
    );
  }

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (
    notFound ||
    !news
  ) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-white
          px-4
          py-16
        "
      >
        <div
          className="
            w-full
            max-w-xl
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-6
            py-12
            text-center
          "
        >
          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            News Not Found
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-500
            "
          >
            The news article you are
            looking for does not exist
            or is no longer published.
          </p>

          <Link
            href="/"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#008B45]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#00763B]
            "
          >
            <ArrowLeft
              size={17}
            />

            Back to Homepage
          </Link>
        </div>
      </main>
    );
  }

  // =======================================================
  // DETAILS
  // =======================================================

  return (
    <main
      className="
        min-h-screen
        w-full
        bg-white
      "
    >
      <article
        className="
          mx-auto
          w-full
          max-w-[1200px]
          px-4
          py-10
          sm:px-6
          sm:py-14
          lg:px-8
          lg:py-20
        "
      >
        {/* =================================================
            BACK
        ================================================= */}

        <Link
          href="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:text-[#008B45]
          "
        >
          <ArrowLeft
            size={17}
          />

          Back to Homepage
        </Link>

        {/* =================================================
            CATEGORY
        ================================================= */}

        <div
          className="
            mt-8
          "
        >
          <span
            className="
              inline-flex
              rounded-full
              bg-[#EAF5EE]
              px-4
              py-2
              text-xs
              font-bold
              uppercase
              tracking-[0.08em]
              text-[#008B45]
            "
          >
            {news.category}
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h1
          className="
            mt-5
            max-w-5xl
            text-3xl
            font-bold
            leading-tight
            tracking-tight
            text-slate-900
            sm:text-4xl
            lg:text-5xl
            lg:leading-[1.12]
          "
        >
          {news.title}
        </h1>

        {/* =================================================
            META
        ================================================= */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            gap-x-6
            gap-y-3
            text-sm
            text-slate-500
          "
        >
          {/* AUTHOR */}

          <span
            className="
              inline-flex
              items-center
              gap-2
            "
          >
            <UserRound
              size={17}
            />

            {news.author}
          </span>

          {/* DATE */}

          <span
            className="
              inline-flex
              items-center
              gap-2
            "
          >
            <CalendarDays
              size={17}
            />

            {formatDate(
              news.date
            )}
          </span>
        </div>

        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            relative
            mt-10
            aspect-[16/8]
            w-full
            overflow-hidden
            rounded-2xl
            bg-slate-100
            sm:mt-12
          "
        >
          <Image
            src={news.image}
            alt={news.title}
            fill
            priority
            sizes="
              (max-width: 768px) 100vw,
              1200px
            "
            className="
              object-cover
            "
          />
        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div
          className="
            mx-auto
            mt-10
            max-w-4xl
            sm:mt-12
          "
        >
          <p
            className="
              whitespace-pre-line
              text-base
              leading-8
              text-slate-600
              sm:text-lg
              sm:leading-9
            "
          >
            {news.description}
          </p>
        </div>
      </article>
    </main>
  );
}