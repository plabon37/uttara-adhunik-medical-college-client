"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";

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

interface PublicationResponse {
  success: boolean;
  data?: Publication;
  message?: string;
}

export default function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [publication, setPublication] =
    useState<Publication | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadPublication() {
      try {
        setLoading(true);
        setError("");

        const { slug } = await params;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/publications/slug/${encodeURIComponent(
            slug
          )}`,
          {
            cache: "no-store",
          }
        );

        const result: PublicationResponse =
          await res.json();

        if (!res.ok || !result.success || !result.data) {
          throw new Error(
            result.message ||
              "Publication not found."
          );
        }

        setPublication(result.data);
      } catch (error) {
        console.error(
          "PUBLICATION DETAIL ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load publication."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPublication();
  }, [params]);

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F9FC] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-8 h-5 w-48 animate-pulse rounded bg-slate-200" />

          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
            <div className="p-8 sm:p-10">
              <div className="h-8 w-32 animate-pulse rounded-full bg-slate-200" />

              <div className="mt-8 h-12 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="mt-8 h-5 w-64 animate-pulse rounded bg-slate-200" />

              <div className="mt-10 border-t border-slate-200 pt-10">
                <div className="h-7 w-56 animate-pulse rounded bg-slate-200" />

                <div className="mt-6 h-5 w-full animate-pulse rounded bg-slate-200" />

                <div className="mt-3 h-5 w-4/5 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================
  // ERROR / NOT FOUND
  // ==========================

  if (error || !publication) {
    return (
      <main className="min-h-screen bg-[#F7F9FC] px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-[#008B45]"
          >
            <ArrowLeft size={18} />
            Back to Publications
          </Link>

          <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-[24px] border border-slate-200 bg-white px-6 text-center shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Publication Not Found
              </h1>

              <p className="mt-3 text-slate-500">
                {error ||
                  "The requested publication could not be found."}
              </p>

              <Link
                href="/publications"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#008B45] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#006B36]"
              >
                <ArrowLeft size={17} />
                Back to Publications
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================
  // FORMAT DATE
  // ==========================

  const formattedDate = new Date(
    publication.date
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[900px]">

        {/* ==========================
            BACK BUTTON
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
          Back to Publications
        </Link>

        {/* ==========================
            MAIN CARD
        ========================== */}

        <article
          className="
            mt-8
            overflow-hidden
            rounded-[24px]
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >

          {/* ==========================
              HEADER
          ========================== */}

          <div className="px-8 py-9 sm:px-10 sm:py-10">

            {/* CATEGORY */}

            <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-600">
              {publication.category}
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-7
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-[#0F2B4D]
                sm:text-5xl
              "
            >
              {publication.title}
            </h1>

            {/* DATE + TIME */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-7
                gap-y-3
                text-sm
                text-slate-600
              "
            >
              <div className="flex items-center gap-2">
                <CalendarDays
                  size={18}
                  strokeWidth={1.8}
                  className="text-[#008B45]"
                />

                <span>
                  {formattedDate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3
                  size={18}
                  strokeWidth={1.8}
                  className="text-[#008B45]"
                />

                <span>
                  {publication.time}
                </span>
              </div>
            </div>
          </div>

          {/* ==========================
              DETAILS SECTION
          ========================== */}

          <div className="border-t border-slate-200 px-8 py-9 sm:px-10 sm:py-10">

            <h2
              className="
                text-2xl
                font-bold
                text-[#0F2B4D]
                sm:text-3xl
              "
            >
              Publication Details
            </h2>

            <p
              className="
                mt-6
                whitespace-pre-line
                text-base
                leading-8
                text-slate-700
              "
            >
              {publication.description}
            </p>

            {/* ==========================
                PDF DOWNLOAD
            ========================== */}

            <div
              className="
                mt-10
                flex
                flex-col
                gap-5
                rounded-2xl
                border
                border-slate-200
                bg-[#F8FAFC]
                p-5
                sm:flex-row
                sm:items-center
                sm:justify-between
                sm:p-6
              "
            >

              {/* PDF INFO */}

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-50
                  "
                >
                  <FileText
                    size={26}
                    strokeWidth={1.8}
                    className="text-red-500"
                  />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-800 sm:text-lg">
                    Publication Document
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Official PDF document
                  </p>
                </div>
              </div>

              {/* DOWNLOAD BUTTON */}

              <a
                href={publication.pdf}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#008B45]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#006B36]
                  sm:w-auto
                "
              >
                <Download size={18} />
                Download PDF
              </a>

            </div>
          </div>
        </article>
      </div>
    </main>
  );
}