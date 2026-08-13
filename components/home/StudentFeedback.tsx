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

interface StudentFeedbackApiResponse {
  success?: boolean;

  message?: string;

  data?: StudentFeedback[];
}

// =========================================================
// COMPONENT
// =========================================================

export default function StudentFeedback() {
  const [feedbackList, setFeedbackList] =
    useState<StudentFeedback[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // LOAD FEEDBACK
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    async function loadStudentFeedback() {
      try {
        // =================================================
        // ADMIN URL
        // =================================================

        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        // =================================================
        // CLEAN BASE URL
        // =================================================

        const baseUrl =
          adminUrl.replace(/\/+$/, "");

        const apiUrl =
          `${baseUrl}/api/student-feedback`;

        console.log(
          "STUDENT FEEDBACK API URL:",
          apiUrl
        );

        // =================================================
        // FETCH
        // =================================================

        const response =
          await fetch(apiUrl, {
            method: "GET",

            cache: "no-store",

            headers: {
              Accept:
                "application/json",
            },
          });

        // =================================================
        // RESPONSE STATUS
        // =================================================

        console.log(
          "STUDENT FEEDBACK STATUS:",
          response.status
        );

        // =================================================
        // READ RESPONSE
        // =================================================

        const responseText =
          await response.text();

        console.log(
          "STUDENT FEEDBACK RAW RESPONSE:",
          responseText
        );

        // =================================================
        // CHECK HTTP ERROR
        // =================================================

        if (!response.ok) {
          throw new Error(
            `Student Feedback API returned ${response.status}.`
          );
        }

        // =================================================
        // PARSE JSON
        // =================================================

        let result:
          StudentFeedbackApiResponse;

        try {
          result =
            JSON.parse(
              responseText
            );
        } catch {
          throw new Error(
            "Student Feedback API returned invalid JSON."
          );
        }

        console.log(
          "STUDENT FEEDBACK API RESPONSE:",
          result
        );

        // =================================================
        // API SUCCESS CHECK
        // =================================================

        if (!result.success) {
          throw new Error(
            result.message ||
              "Student Feedback API failed."
          );
        }

        // =================================================
        // DATA
        // =================================================

        const feedbackData =
          Array.isArray(
            result.data
          )
            ? result.data
            : [];

        // =================================================
        // PUBLISHED FEEDBACK ONLY
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
                Number(
                  a.order ?? 0
                ) -
                Number(
                  b.order ?? 0
                )
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