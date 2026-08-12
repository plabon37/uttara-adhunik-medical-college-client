"use client";

import { useEffect, useState } from "react";

interface StatisticsData {
  _id: string;

  backgroundImage: string;

  statisticOneValue: string;
  statisticOneTitle: string;

  statisticTwoValue: string;
  statisticTwoTitle: string;

  statisticThreeValue: string;
  statisticThreeTitle: string;

  isActive: boolean;
}

export default function Statistics() {
  const [statistics, setStatistics] =
    useState<StatisticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =========================================================
  // FETCH STATISTICS
  // =========================================================

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        // =====================================================
        // ADMIN URL
        // =====================================================

        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL?.replace(
            /\/+$/,
            ""
          );

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const apiUrl =
          `${adminUrl}/api/statistics`;

        console.log(
          "STATISTICS API URL:",
          apiUrl
        );

        // =====================================================
        // FETCH
        // =====================================================

        const response =
          await fetch(apiUrl, {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept:
                "application/json",
            },
          });

        // =====================================================
        // READ RESPONSE
        // =====================================================

        const result =
          await response.json();

        console.log(
          "STATISTICS API RESPONSE:",
          result
        );

        // =====================================================
        // NOT FOUND
        // =====================================================

        if (response.status === 404) {
          console.warn(
            "Statistics section not found."
          );

          setStatistics(null);
          return;
        }

        // =====================================================
        // API ERROR
        // =====================================================

        if (
          !response.ok ||
          !result?.success
        ) {
          throw new Error(
            result?.message ||
              "Failed to fetch Statistics section."
          );
        }

        // =====================================================
        // DATA CHECK
        // =====================================================

        if (!result?.data) {
          console.warn(
            "Statistics API returned no data."
          );

          setStatistics(null);
          return;
        }

        // =====================================================
        // ACTIVE CHECK
        // =====================================================

        if (
          result.data.isActive === true
        ) {
          setStatistics(
            result.data as StatisticsData
          );
        } else {
          console.warn(
            "Statistics section is inactive."
          );

          setStatistics(null);
        }
      } catch (error) {
        console.error(
          "CLIENT STATISTICS ERROR:",
          error
        );

        setStatistics(null);
      } finally {
        setLoading(false);
      }
    };

    loadStatistics();
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <section className="w-full">
        <div
          className="
            h-[360px]
            w-full
            animate-pulse
            bg-slate-200
            sm:h-[390px]
            lg:h-[430px]
          "
        />
      </section>
    );
  }

  // =========================================================
  // NO DATA
  // =========================================================

  if (!statistics) {
    return null;
  }

  // =========================================================
  // STATISTICS SECTION
  // =========================================================

  return (
    <section className="w-full">
      {/* =====================================================
          STATISTICS BACKGROUND SECTION
      ===================================================== */}

      <div
        className="
          relative
          h-[390px]
          w-full
          overflow-hidden
          sm:h-[390px]
        "
      >
        {/* ===================================================
            BACKGROUND IMAGE
        =================================================== */}

        <img
          src={statistics.backgroundImage}
          alt="UAMC Statistics"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* ===================================================
            IMAGE DARK OVERLAY
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            bg-black/25
          "
        />

        {/* ===================================================
            GREEN PANEL
        =================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[264px]
            w-[80%]
            -translate-x-1/2
            -translate-y-1/2
            bg-[#008B45]/80
          "
        >
          {/* =================================================
              STATISTICS GRID
          ================================================= */}

          <div
            className="
              grid
              h-full
              grid-cols-1
              sm:grid-cols-3
            "
          >
            {/* =================================================
                STATISTIC 01
            ================================================= */}

            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                px-6
                text-center
                sm:border-r
                sm:border-white/40
              "
            >
              <h2
                className="
                  font-serif
                  text-[46px]
                  font-normal
                  leading-none
                  text-white
                  lg:text-[56px]
                "
              >
                {statistics.statisticOneValue}
              </h2>

              <p
                className="
                  mt-5
                  max-w-[230px]
                  font-serif
                  text-[18px]
                  font-bold
                  leading-6
                  text-[#FFC72C]
                  lg:text-[20px]
                  lg:leading-7
                "
              >
                {statistics.statisticOneTitle}
              </p>
            </div>

            {/* =================================================
                STATISTIC 02
            ================================================= */}

            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                px-6
                text-center
                sm:border-r
                sm:border-white/40
              "
            >
              <h2
                className="
                  font-serif
                  text-[46px]
                  font-normal
                  leading-none
                  text-white
                  lg:text-[56px]
                "
              >
                {statistics.statisticTwoValue}
              </h2>

              <p
                className="
                  mt-5
                  max-w-[230px]
                  font-serif
                  text-[18px]
                  font-bold
                  leading-6
                  text-[#FFC72C]
                  lg:text-[20px]
                  lg:leading-7
                "
              >
                {statistics.statisticTwoTitle}
              </p>
            </div>

            {/* =================================================
                STATISTIC 03
            ================================================= */}

            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >
              <h2
                className="
                  font-serif
                  text-[46px]
                  font-normal
                  leading-none
                  text-white
                  lg:text-[56px]
                "
              >
                {statistics.statisticThreeValue}
              </h2>

              <p
                className="
                  mt-5
                  max-w-[230px]
                  font-serif
                  text-[18px]
                  font-bold
                  leading-6
                  text-[#FFC72C]
                  lg:text-[20px]
                  lg:leading-7
                "
              >
                {statistics.statisticThreeTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}