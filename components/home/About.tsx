"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  HandHeart,
} from "lucide-react";

// =================================================
// TYPES
// =================================================

interface AboutData {
  _id: string;

  tagline: string;
  title: string;
  highlightText: string;

  descriptionOne: string;
  descriptionTwo: string;

  imageOne: string;
  imageTwo: string;
  logo: string;

  missionTitle: string;
  missionLink: string;

  visionTitle: string;
  visionLink: string;

  buttonText: string;
  buttonLink: string;

  isActive: boolean;
}

// =================================================
// COMPONENT
// =================================================

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  // =================================================
  // FETCH ABOUT DATA
  // =================================================

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const response = await fetch(`${adminUrl}/api/about`, {
          cache: "no-store",
        });

        const result = await response.json();

        // NOT FOUND

        if (response.status === 404) {
          setAbout(null);
          return;
        }

        // API ERROR

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Failed to fetch About section."
          );
        }

        // ONLY SHOW ACTIVE DATA

        if (result.data?.isActive) {
          setAbout(result.data);
        } else {
          setAbout(null);
        }
      } catch (error) {
        console.error("CLIENT ABOUT ERROR:", error);
        setAbout(null);
      } finally {
        setLoading(false);
      }
    };

    void loadAbout();
  }, []);

  // =================================================
  // LOADING STATE
  // =================================================

  if (loading) {
    return (
      <section className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[1700px]">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20">
            {/* IMAGE SKELETON */}

            <div className="h-[440px] w-full animate-pulse bg-slate-100 sm:h-[520px] lg:h-[600px]" />

            {/* CONTENT SKELETON */}

            <div className="space-y-6">
              <div className="h-6 w-56 animate-pulse rounded bg-slate-100" />

              <div className="h-20 w-4/5 animate-pulse rounded bg-slate-100" />

              <div className="h-28 w-full animate-pulse rounded bg-slate-100" />

              <div className="h-28 w-full animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =================================================
  // EMPTY STATE
  // =================================================

  if (!about) {
    return null;
  }

  // =================================================
  // ABOUT SECTION
  // =================================================

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-12 lg:py-24 xl:px-16 2xl:px-20">
      <div className="mx-auto w-full max-w-[1700px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 xl:gap-20 2xl:gap-24">
          {/* =================================================
              LEFT SIDE — IMAGE COMPOSITION
          ================================================= */}

          <div className="relative mx-auto h-[440px] w-full max-w-[620px] sm:h-[520px] md:h-[570px] lg:mx-0 lg:h-[600px] xl:h-[650px]">
            {/* IMAGE ONE */}

            <div className="absolute bottom-0 left-0 h-[78%] w-[66%] overflow-hidden sm:h-[80%]">
              {about.imageOne ? (
                <img
                  src={about.imageOne}
                  alt="About section"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 px-4 text-center text-sm text-slate-400">
                  Image unavailable
                </div>
              )}
            </div>

            {/* IMAGE TWO */}

            <div className="absolute right-0 top-0 h-[76%] w-[57%] overflow-hidden sm:h-[78%]">
              {about.imageTwo ? (
                <img
                  src={about.imageTwo}
                  alt="About section"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 px-4 text-center text-sm text-slate-400">
                  Image unavailable
                </div>
              )}
            </div>

            {/* CENTER LOGO */}

            {about.logo && (
              <div className="absolute left-[60%] top-[34%] z-20 flex h-[125px] w-[125px] -translate-x-1/2 -translate-y-1/2 items-center justify-center p-3 shadow-[0_8px_30px_rgba(0,0,0,0.18)] sm:h-[150px] sm:w-[150px] sm:p-4 md:h-[165px] md:w-[165px] lg:h-[175px] lg:w-[175px]">
                <img
                  src={about.logo}
                  alt="Organization logo"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>

          {/* =================================================
              RIGHT SIDE — CONTENT
          ================================================= */}

          <div className="min-w-0">
            {/* TAGLINE */}

            {about.tagline && (
              <div className="flex items-center gap-3 text-base font-medium text-[#008B45] sm:text-lg">
                <GraduationCap size={26} strokeWidth={1.6} />

                <span>{about.tagline}</span>
              </div>
            )}

            {/* TITLE */}

            <h2 className="mt-5 font-serif text-5xl leading-[1.05] text-[#1F2937] sm:text-6xl lg:text-[64px] xl:text-[72px] 2xl:text-[78px]">
              {about.title}{" "}

              {about.highlightText && (
                <span className="font-bold text-[#F5B82E]">
                  {about.highlightText}
                </span>
              )}
            </h2>

            {/* DESCRIPTION ONE */}

            {about.descriptionOne && (
              <p className="mt-8 max-w-[850px] text-base leading-8 text-[#737373] sm:text-lg sm:leading-9 lg:text-[19px]">
                {about.descriptionOne}
              </p>
            )}

            {/* DESCRIPTION TWO */}

            {about.descriptionTwo && (
              <p className="mt-6 max-w-[850px] text-base leading-8 text-[#737373] sm:text-lg sm:leading-9 lg:text-[19px]">
                {about.descriptionTwo}
              </p>
            )}

            {/* =================================================
                MISSION & VISION
            ================================================= */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
              {/* MISSION */}

              <Link
                href={about.missionLink || "#"}
                className="group flex min-h-[120px] items-center gap-5 border border-dashed border-[#008B45] px-6 py-5 transition-all duration-300 hover:bg-[#F5FBF8]"
              >
                <HandHeart
                  size={48}
                  strokeWidth={1.2}
                  className="shrink-0 text-[#008B45]"
                />

                <span className="text-base font-medium leading-7 text-[#008B45] sm:text-lg">
                  {about.missionTitle}
                </span>

                <ArrowRight
                  size={20}
                  className="ml-auto shrink-0 text-[#008B45] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>

              {/* VISION */}

              <Link
                href={about.visionLink || "#"}
                className="group flex min-h-[120px] items-center gap-5 border border-dashed border-[#008B45] px-6 py-5 transition-all duration-300 hover:bg-[#F5FBF8]"
              >
                <Building2
                  size={48}
                  strokeWidth={1.2}
                  className="shrink-0 text-[#008B45]"
                />

                <span className="text-base font-medium leading-7 text-[#008B45] sm:text-lg">
                  {about.visionTitle}
                </span>

                <ArrowRight
                  size={20}
                  className="ml-auto shrink-0 text-[#008B45] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </Link>
            </div>

            {/* =================================================
                ACTION BUTTON
            ================================================= */}

            {about.buttonText && (
              <div className="mt-10">
                <Link
                  href={about.buttonLink || "#"}
                  className="group inline-flex min-h-[58px] items-center gap-4 bg-[#008B45] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#00763B] hover:shadow-lg sm:px-9 sm:text-lg"
                >
                  <span>{about.buttonText}</span>

                  <ArrowRight
                    size={21}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}