"use client";

import { useEffect, useState } from "react";

import StudentFeedbackBoard from "./StudentFeedbackBoard";

// =========================================================
// TYPES
// =========================================================

export interface StudentFeedback {
  _id: string;

  name: string;

  designation: string;

  feedback: string;

  image: string;

  rating: number;

  isPublished: boolean;

  order: number;

  createdAt: string;

  updatedAt?: string;
}

// =========================================================
// COMPONENT
// =========================================================

export default function StudentFeedback() {
  const [
    feedbackList,
    setFeedbackList,
  ] = useState<StudentFeedback[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // LOAD FEEDBACK
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    async function loadStudentFeedback() {
      try {
        const adminUrl =
          process.env
            .NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const baseUrl =
          adminUrl.replace(
            /\/+$/,
            ""
          );

        // =================================================
        // ADMIN API
        // =================================================

        const response =
          await fetch(
            `${baseUrl}/api/student-feedback`,
            {
              method: "GET",

              cache: "no-store",

              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        // =================================================
        // RESPONSE ERROR
        // =================================================

        if (!response.ok) {
          const responseText =
            await response.text();

          console.error(
            "STUDENT FEEDBACK API ERROR:",
            responseText
          );

          throw new Error(
            "Failed to fetch student feedback."
          );
        }

        // =================================================
        // JSON
        // =================================================

        const result =
          await response.json();

        // =================================================
        // DATA
        // =================================================

        const feedbackData:
          StudentFeedback[] =
          Array.isArray(
            result?.data
          )
            ? result.data
            : [];

        // =================================================
        // PUBLISHED + SORT
        // =================================================

        const publishedFeedback =
          feedbackData
            .filter(
              (item) =>
                item.isPublished ===
                true
            )
            .sort(
              (a, b) =>
                Number(a.order ?? 0) -
                Number(b.order ?? 0)
            );

        // =================================================
        // UPDATE STATE
        // =================================================

        if (!cancelled) {
          setFeedbackList(
            publishedFeedback
          );
        }
      } catch (error) {
        console.error(
          "CLIENT STUDENT FEEDBACK ERROR:",
          error
        );

        if (!cancelled) {
          setFeedbackList([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadStudentFeedback();

    return () => {
      cancelled = true;
    };
  }, []);

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#008B45]" />
      </section>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (
    feedbackList.length === 0
  ) {
    return null;
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <StudentFeedbackBoard
      feedbackList={
        feedbackList
      }
    />
  );
}