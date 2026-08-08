"use client";

import { useEffect, useState } from "react";
import NoticeBoard from "./NoticeBoard";

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

export default function Notice() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotices() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/notices`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch notices."
          );
        }

        const result = await res.json();

        const noticeData: Notice[] =
          result.data || [];

        const publishedNotices =
          noticeData
            .filter(
              (notice) =>
                notice.isPublished
            )
            .sort(
              (a, b) =>
                a.order - b.order
            );

        setNotices(publishedNotices);
      } catch (error) {
        console.error(
          "CLIENT NOTICE ERROR:",
          error
        );

        setNotices([]);
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#008B45]" />
      </section>
    );
  }

  if (notices.length === 0) {
    return null;
  }

  return <NoticeBoard notices={notices} />;
}