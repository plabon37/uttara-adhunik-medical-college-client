"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Download,
  FileText,
  Loader2,
} from "lucide-react";

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

interface NoticeDetailsProps {
  slug: string;
}

export default function NoticeDetails({
  slug,
}: NoticeDetailsProps) {
  const [notice, setNotice] =
    useState<Notice | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadNotice() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/notices/slug/${encodeURIComponent(
            slug
          )}`,
          {
            cache: "no-store",
          }
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(
            result.message ||
              "Failed to fetch notice."
          );
        }

        setNotice(result.data);
      } catch (error) {
        console.error(
          "NOTICE DETAILS ERROR:",
          error
        );

        setError(
          "Failed to load notice details."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotice();
  }, [slug]);

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <section className="flex min-h-[650px] items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <Loader2
            size={42}
            className="animate-spin text-[#008B45]"
          />

          <p className="mt-4 text-sm text-slate-500">
            Loading notice...
          </p>
        </div>
      </section>
    );
  }

  // ==========================
  // ERROR
  // ==========================

  if (error || !notice) {
    return (
      <section className="flex min-h-[650px] items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50">
            <FileText
              size={38}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-800">
            Notice Not Found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            The notice you are looking for is
            unavailable or has been unpublished.
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
              hover:bg-[#006B36]
            "
          >
            <ArrowLeft size={17} />

            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  // ==========================
  // DATE FORMAT
  // ==========================

  const formatDate = (
    date: string
  ) => {
    if (!date) {
      return "--";
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
      return "--";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // ==========================
  // DETAILS
  // ==========================

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
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
              text-slate-600
              transition
              hover:text-[#008B45]
            "
          >
            <ArrowLeft size={18} />

            Back to Notice Board
          </Link>

          {/* ==========================
              CONTENT CARD
          ========================== */}

          <article className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}

            <div className="border-b border-slate-200 px-6 py-8 sm:px-10 sm:py-10">
              {/* Category */}

              <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-[#008B45]">
                {notice.category}
              </span>

              {/* Title */}

              <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
                {notice.title}
              </h1>

              {/* Meta */}

              <div className="mt-6 flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={18}
                    className="text-[#008B45]"
                  />

                  <span>
                    {formatDate(
                      notice.date
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3
                    size={18}
                    className="text-[#008B45]"
                  />

                  <span>
                    {notice.time}
                  </span>
                </div>
              </div>
            </div>

            {/* ==========================
                DESCRIPTION
            ========================== */}

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                Notice Details
              </h2>

              <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg">
                {notice.description}
              </div>

              {/* ==========================
                  PDF
              ========================== */}

              {notice.pdf && (
                <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                        <FileText
                          size={24}
                          className="text-red-600"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-800">
                          Notice Document
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Official PDF document
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      

                      <a
                        href={notice.pdf}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          justify-center
                          gap-2
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
                        <Download size={17} />

                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}