"use client";

import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Phone,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface VisiteData {
  _id: string;

  title: string;
  description: string;
  secondaryDescription: string;

  phoneNumber: string;
  phoneText: string;

  buttonText: string;
  buttonLink: string;

  imageOne: string;
  imageTwo: string;

  badgeNumber: string;
  badgeText: string;

  isPublished: boolean;
}

export default function Visite() {
  const [visite, setVisite] =
    useState<VisiteData | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================
  // FETCH VISITE
  // =========================================

  useEffect(() => {
    const loadVisite = async () => {
      try {
        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured.",
          );
        }

        const response =
          await fetch(
            `${adminUrl}/api/visite`,
            {
              cache: "no-store",
            },
          );

        const data =
          await response.json();

        // =====================================
        // NOT FOUND
        // =====================================

        if (response.status === 404) {
          setVisite(null);
          return;
        }

        // =====================================
        // API ERROR
        // =====================================

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Failed to fetch Visite section.",
          );
        }

        // =====================================
        // API RETURNS ARRAY
        // =====================================

        const visiteData =
          Array.isArray(data.data)
            ? data.data[0]
            : data.data;

        // =====================================
        // SUCCESS
        // =====================================

        if (
          visiteData?.isPublished
        ) {
          setVisite(visiteData);
        } else {
          setVisite(null);
        }
      } catch (error) {
        console.error(
          "CLIENT VISITE ERROR:",
          error,
        );

        setVisite(null);
      } finally {
        setLoading(false);
      }
    };

    loadVisite();
  }, []);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto flex min-h-[300px] w-full max-w-[1440px] items-center justify-center px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Loader2
              size={20}
              className="animate-spin text-[#008B45]"
            />

            Loading...
          </div>
        </div>
      </section>
    );
  }

  // =========================================
  // NO VISITE
  // =========================================

  if (!visite) {
    return null;
  }

  // =========================================
  // PHONE LINK
  // =========================================

  const phoneHref =
    `tel:${visite.phoneNumber.replace(
      /\s+/g,
      "",
    )}`;

  // =========================================
  // VISITE SECTION
  // =========================================

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-white
        py-16
        sm:py-20
        lg:py-28
        xl:py-32
      "
    >
      {/* ======================================================
          BACKGROUND DECORATION
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-20
          h-64
          w-64
          rounded-full
          bg-[#E8F5EE]
          opacity-60
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          bottom-20
          h-72
          w-72
          rounded-full
          bg-[#F3F9F5]
          opacity-80
          blur-3xl
        "
      />

      {/* ======================================================
          CONTAINER
      ======================================================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-12
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-16
            xl:gap-24
          "
        >
          {/* ==================================================
              LEFT CONTENT
          =================================================== */}

          <div className="order-2 lg:order-1">

            {/* EYEBROW */}

            <div
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span className="h-[2px] w-10 bg-[#008B45] sm:w-12" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#008B45]
                  sm:text-sm
                "
              >
                Visite UAMC
              </span>
            </div>

            {/* TITLE */}

            <h2
              className="
                max-w-[650px]
                font-serif
                text-4xl
                font-bold
                leading-[1.08]
                text-[#171717]
                sm:text-5xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              {visite.title}
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-[650px]
                text-base
                leading-7
                text-slate-500
                sm:text-lg
                sm:leading-8
              "
            >
              {visite.description}
            </p>

            {/* SECONDARY DESCRIPTION */}

            {visite.secondaryDescription && (
              <p
                className="
                  mt-4
                  max-w-[650px]
                  text-base
                  leading-7
                  text-slate-500
                  sm:text-lg
                  sm:leading-8
                "
              >
                {visite.secondaryDescription}
              </p>
            )}

            {/* PHONE */}

            {visite.phoneNumber && (
              <a
                href={phoneHref}
                className="
                  group
                  mt-7
                  inline-flex
                  items-center
                  gap-4
                "
              >
                <span
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#008B45]
                    text-white
                    shadow-[0_8px_25px_rgba(0,139,69,0.18)]
                    transition
                    duration-300
                    group-hover:scale-105
                  "
                >
                  <Phone size={20} />
                </span>

                <span>
                  <span
                    className="
                      block
                      text-sm
                      font-bold
                      text-[#008B45]
                      sm:text-base
                    "
                  >
                    Call {visite.phoneNumber}
                  </span>

                  {visite.phoneText && (
                    <span
                      className="
                        mt-1
                        block
                        text-xs
                        text-slate-500
                        sm:text-sm
                      "
                    >
                      {visite.phoneText}
                    </span>
                  )}
                </span>
              </a>
            )}

            {/* BUTTON */}

            {visite.buttonText && (
              <div className="mt-8">
                <Link
                  href={
                    visite.buttonLink || "#"
                  }
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    bg-[#008B45]
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_10px_30px_rgba(0,139,69,0.16)]
                    transition
                    duration-300
                    hover:bg-[#00743A]
                  "
                >
                  <span>
                    {visite.buttonText}
                  </span>

                  <ArrowRight
                    size={18}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            )}
          </div>

          {/* ==================================================
              RIGHT IMAGE AREA
          =================================================== */}

          <div
            className="
              order-1
              relative
              min-h-[420px]
              w-full
              sm:min-h-[500px]
              lg:order-2
              lg:min-h-[560px]
              xl:min-h-[600px]
            "
          >
            {/* IMAGE ONE */}

            {visite.imageOne && (
              <div
                className="
                  absolute
                  left-0
                  top-0
                  z-10
                  h-[210px]
                  w-[58%]
                  overflow-hidden
                  border-[5px]
                  border-white
                  bg-[#E8F5EE]
                  shadow-[0_15px_45px_rgba(0,0,0,0.10)]
                  sm:h-[260px]
                  lg:h-[300px]
                  xl:h-[330px]
                "
              >
                <img
                  src={visite.imageOne}
                  alt={visite.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-105
                  "
                />
              </div>
            )}

            {/* IMAGE TWO */}

            {visite.imageTwo && (
              <div
                className="
                  absolute
                  right-0
                  top-16
                  h-[300px]
                  w-[70%]
                  overflow-hidden
                  border-[5px]
                  border-white
                  bg-[#E8F5EE]
                  shadow-[0_20px_55px_rgba(0,0,0,0.13)]
                  sm:h-[370px]
                  lg:h-[450px]
                  xl:h-[500px]
                "
              >
                <img
                  src={visite.imageTwo}
                  alt={visite.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-105
                  "
                />
              </div>
            )}

            {/* FALLBACK */}

            {!visite.imageOne &&
              !visite.imageTwo && (
                <div
                  className="
                    flex
                    h-[420px]
                    w-full
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#E8F5EE]
                    sm:h-[500px]
                    lg:h-[560px]
                  "
                >
                  <div className="text-center text-slate-400">
                    <div
                      className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                      "
                    >
                      <Plus size={25} />
                    </div>

                    <p className="mt-3 text-sm">
                      UAMC
                    </p>
                  </div>
                </div>
              )}

            {/* BADGE */}

            {visite.badgeNumber && (
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  z-20
                  flex
                  min-h-[92px]
                  w-[88%]
                  items-center
                  gap-4
                  bg-[#7DC99F]
                  px-5
                  py-4
                  shadow-[0_15px_40px_rgba(0,0,0,0.10)]
                  sm:min-h-[105px]
                  sm:px-7
                  lg:min-h-[115px]
                  lg:w-[82%]
                  lg:px-8
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#008B45]
                    sm:h-12
                    sm:w-12
                  "
                >
                  <Plus size={20} />
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-3xl
                      font-bold
                      leading-none
                      text-white
                      sm:text-4xl
                    "
                  >
                    {visite.badgeNumber}
                  </p>

                  {visite.badgeText && (
                    <p
                      className="
                        mt-1
                        max-w-[250px]
                        text-xs
                        leading-5
                        text-white
                        sm:text-sm
                      "
                    >
                      {visite.badgeText}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}