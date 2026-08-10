"use client";

import Link from "next/link";
import {
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";

// =========================================================
// ADMISSION DATA TYPE
// =========================================================

interface AdmissionData {
  _id: string;

  backgroundImage: string;

  titlePrefix: string;

  title: string;

  description: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}

// =========================================================
// API RESPONSE TYPE
// =========================================================

interface AdmissionApiResponse {
  success?: boolean;

  message?: string;

  data?: AdmissionData;
}

// =========================================================
// COMPONENT
// =========================================================

export default function Admission() {
  // =======================================================
  // ADMISSION STATE
  // =======================================================

  const [
    admission,
    setAdmission,
  ] = useState<AdmissionData | null>(
    null
  );

  // =======================================================
  // LOADING STATE
  // =======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // FETCH ADMISSION
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadAdmission =
      async () => {
        try {
          // =================================================
          // ADMIN URL
          // =================================================

          const adminUrl =
            process.env
              .NEXT_PUBLIC_ADMIN_URL;

          if (!adminUrl) {
            throw new Error(
              "NEXT_PUBLIC_ADMIN_URL is not configured."
            );
          }

          // =================================================
          // FETCH ADMISSION API
          // =================================================

          const response =
            await fetch(
              `${adminUrl}/api/admission`,
              {
                cache: "no-store",
              }
            );

          // =================================================
          // READ RESPONSE
          // =================================================

          const responseText =
            await response.text();

          let data:
            | AdmissionApiResponse
            | null = null;

          // =================================================
          // PARSE JSON
          // =================================================

          try {
            data =
              JSON.parse(
                responseText
              );
          } catch {
            throw new Error(
              "Admission API returned an invalid response."
            );
          }

          // =================================================
          // CANCELLED CHECK
          // =================================================

          if (cancelled) {
            return;
          }

          // =================================================
          // NOT FOUND
          // =================================================

          if (
            response.status ===
            404
          ) {
            setAdmission(
              null
            );

            return;
          }

          // =================================================
          // API ERROR
          // =================================================

          if (
            !response.ok ||
            !data?.success ||
            !data.data
          ) {
            throw new Error(
              data?.message ||
                "Failed to fetch Admission section."
            );
          }

          // =================================================
          // ACTIVE CHECK
          // =================================================

          if (
            data.data.isActive
          ) {
            setAdmission(
              data.data
            );
          } else {
            setAdmission(
              null
            );
          }
        } catch (error) {
          // =================================================
          // ERROR
          // =================================================

          console.error(
            "CLIENT ADMISSION ERROR:",
            error
          );

          if (!cancelled) {
            setAdmission(
              null
            );
          }
        } finally {
          if (!cancelled) {
            setLoading(
              false
            );
          }
        }
      };

    // =====================================================
    // START FETCH
    // =====================================================

    loadAdmission();

    // =====================================================
    // CLEANUP
    // =====================================================

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
          relative
          min-h-[500px]
          w-full
          overflow-hidden
          bg-[#006B35]
        "
      >
        <div
          className="
            absolute
            inset-0
            bg-[#006B35]
          "
        />

        <div
          className="
            relative
            z-10
            flex
            min-h-[500px]
            items-center
            justify-center
          "
        >
          <Loader2
            size={34}
            className="
              animate-spin
              text-white
            "
          />
        </div>
      </section>
    );
  }

  // =======================================================
  // NO ADMISSION
  // =======================================================

  if (!admission) {
    return null;
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#005F2F]
      "
    >
      {/* ===================================================
          BACKGROUND IMAGE
      =================================================== */}

      <div
        className="
          absolute
          inset-0
        "
      >
        <img
          src={
            admission.backgroundImage
          }
          alt="UAMC Admission"
          className="
            h-full
            w-full
            object-cover
          "
        />
      </div>

      {/* ===================================================
          GREEN OVERLAY
      =================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[#006B35]/75
        "
      />

      {/* ===================================================
          BLURRED GREEN LAYER
      =================================================== */}

      <div
        className="
          absolute
          inset-0
          backdrop-blur-[2px]
        "
      />

      {/* ===================================================
          CONTENT WRAPPER
      =================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1920px]
          px-4
          py-12
          sm:px-8
          sm:py-16
          md:px-12
          md:py-20
          lg:px-[5.2%]
          lg:py-[64px]
        "
      >
        {/* =================================================
            MAIN GLASS PANEL
        ================================================= */}

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[390px]
            w-full
            max-w-[1800px]
            flex-col
            items-center
            justify-center
            overflow-hidden
            bg-[#073D22]/65
            px-5
            py-12
            text-center
            backdrop-blur-[10px]
            sm:min-h-[420px]
            sm:px-10
            sm:py-14
            md:px-16
            lg:min-h-[430px]
            lg:px-20
            lg:py-16
            xl:px-24
          "
        >
          {/* =================================================
              SUBTLE PANEL OVERLAY
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-[#003D20]/25
              via-transparent
              to-[#78C39A]/10
            "
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              mx-auto
              w-full
              max-w-[1600px]
            "
          >
            {/* =================================================
                TITLE
            ================================================= */}

            <h2
              className="
                font-serif
                text-4xl
                leading-[1.05]
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-[64px]
                xl:text-[72px]
                2xl:text-[76px]
              "
            >
              {/* TITLE PREFIX */}

              <span
                className="
                  font-bold
                  text-[#FFC62A]
                "
              >
                {admission.titlePrefix}
              </span>

              {/* SPACE */}

              {" "}

              {/* TITLE */}

              <span
                className="
                  font-normal
                  text-white
                "
              >
                {admission.title}
              </span>
            </h2>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mx-auto
                mt-7
                max-w-[1580px]
                text-sm
                leading-6
                text-white
                sm:text-base
                sm:leading-7
                md:text-lg
                md:leading-8
                lg:text-[20px]
                lg:leading-[1.4]
                xl:text-[21px]
              "
            >
              {admission.description}
            </p>

            {/* =================================================
                BUTTON
            ================================================= */}

            {admission.buttonText && (
              <div
                className="
                  mt-9
                  flex
                  justify-center
                "
              >
                <Link
                  href={
                    admission.buttonLink ||
                    "#"
                  }
                  className="
                    group
                    inline-flex
                    min-h-[58px]
                    min-w-[230px]
                    items-center
                    justify-center
                    gap-4
                    bg-[#009447]
                    px-8
                    py-4
                    text-base
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#007C3B]
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)]
                    sm:min-w-[260px]
                    sm:text-lg
                  "
                >
                  {/* BUTTON TEXT */}

                  <span>
                    {admission.buttonText}
                  </span>

                  {/* ARROW */}

                  <ArrowRight
                    size={23}
                    strokeWidth={1.8}
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
        </div>
      </div>
    </section>
  );
}