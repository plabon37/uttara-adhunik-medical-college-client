"use client";

import { useEffect, useState } from "react";

import NewsBoard from "./NewsBoard";

// =========================================================
// TYPES
// =========================================================

export interface News {
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

// =========================================================
// COMPONENT
// =========================================================

export default function News() {
  const [news, setNews] =
    useState<News[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // FETCH NEWS
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      try {
        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const res =
          await fetch(
            `${adminUrl}/api/news`,
            {
              method: "GET",

              cache: "no-store",
            }
          );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch news."
          );
        }

        const result =
          await res.json();

        const newsData: News[] =
          Array.isArray(
            result?.data
          )
            ? result.data
            : [];

        // =================================================
        // ONLY PUBLISHED NEWS
        // =================================================

        const publishedNews =
          newsData
            .filter(
              (item) =>
                item.isPublished
            )
            .sort(
              (a, b) =>
                Number(
                  a.order ?? 0
                ) -
                Number(
                  b.order ?? 0
                )
            );

        if (!cancelled) {
          setNews(
            publishedNews
          );
        }
      } catch (error) {
        console.error(
          "CLIENT NEWS ERROR:",
          error
        );

        if (!cancelled) {
          setNews([]);
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
  }, []);

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <section
        className="
          flex
          min-h-[500px]
          items-center
          justify-center
        "
      >
        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-slate-200
            border-t-[#008B45]
          "
        />
      </section>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (news.length === 0) {
    return null;
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <NewsBoard
      news={news}
    />
  );
}