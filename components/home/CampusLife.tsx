"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// =========================================================
// TYPES
// =========================================================

interface CampusLifeItem {
  _id?: string;
  title: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
}

interface CampusLifeData {
  _id?: string;
  tagline: string;
  title: string;
  description: string;
  items: CampusLifeItem[];
  isActive: boolean;
}

interface CampusLifeApiResponse {
  success?: boolean;
  message?: string;
  data?: CampusLifeData | null;
}

// =========================================================
// COMPONENT
// =========================================================

export default function CampusLife() {
  const [campusLife, setCampusLife] =
    useState<CampusLifeData | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =======================================================
  // FETCH ADMIN DATA
  // =======================================================

  useEffect(() => {
    async function loadCampusLife() {
      try {
        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const response =
          await fetch(
            `${adminUrl}/api/campus-life`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch Campus Life. Status: ${response.status}`
          );
        }

        const result: CampusLifeApiResponse =
          await response.json();

        if (
          !result.success ||
          !result.data
        ) {
          throw new Error(
            result.message ||
              "Campus Life not found."
          );
        }

        const activeItems =
          Array.isArray(
            result.data.items
          )
            ? [...result.data.items]
                .filter(
                  (item) =>
                    item.isActive
                )
                .sort(
                  (a, b) =>
                    a.order - b.order
                )
            : [];

        setCampusLife({
          ...result.data,
          items: activeItems,
        });
      } catch (error) {
        console.error(
          "CLIENT CAMPUS LIFE ERROR:",
          error
        );

        setCampusLife(null);
      } finally {
        setLoading(false);
      }
    }

    void loadCampusLife();
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
          bg-[#008B45]
        "
      >
        <div
          className="
            h-8
            w-8
            animate-spin
            rounded-full
            border-4
            border-white/30
            border-t-white
          "
        />
      </section>
    );
  }

  // =======================================================
  // HIDE SECTION
  // =======================================================

  if (
    !campusLife ||
    !campusLife.isActive
  ) {
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
        bg-[#008B45]
        px-5
        pb-16
        pt-10
        sm:px-8
        sm:pb-20
        sm:pt-12
        md:px-10
        md:pb-24
        md:pt-14
        lg:px-14
        lg:pb-28
        lg:pt-16
        xl:px-[9%]
        2xl:px-[10%]
      "
    >
      {/* =================================================
          DECORATIVE ELEMENTS
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-[25%]
          top-[-30px]
          hidden
          h-16
          w-10
          rotate-[-18deg]
          rounded-b-[18px]
          border
          border-white/20
          lg:block
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-[80px]
          hidden
          h-10
          w-14
          rotate-[-25deg]
          rounded-full
          border
          border-white/20
          lg:block
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-8
            md:grid-cols-[0.9fr_1.1fr]
            md:gap-10
            lg:grid-cols-[0.85fr_1.15fr]
            lg:gap-16
            xl:gap-20
          "
        >
          {/* =================================================
              DESCRIPTION — LEFT
          ================================================= */}

          <div
            className="
              flex
              items-start
              md:pt-16
              lg:pt-20
              xl:pt-24
            "
          >
            <p
              className="
                max-w-[470px]
                text-[15px]
                font-normal
                leading-7
                text-white
                sm:text-base
                sm:leading-8
                lg:text-[17px]
                lg:leading-9
              "
            >
              {
                campusLife.description
              }
            </p>
          </div>

          {/* =================================================
              TITLE — RIGHT
          ================================================= */}

          <div
            className="
              flex
              justify-start
              md:justify-end
            "
          >
            <h2
              className="
                max-w-[760px]
                text-left
                font-serif
                text-[64px]
                font-normal
                leading-[0.88]
                tracking-[-0.045em]
                text-white
                sm:text-[78px]
                md:text-[86px]
                lg:text-[100px]
                xl:text-[116px]
                2xl:text-[128px]
              "
            >
              {campusLife.title}
            </h2>
          </div>
        </div>

        {/* =================================================
            CARDS
        ================================================= */}

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-10
            sm:mt-20
            sm:grid-cols-2
            sm:gap-8
            lg:mt-24
            lg:grid-cols-3
            lg:gap-10
            xl:gap-12
          "
        >
{campusLife.items.map((item, index) => (
  <a
    key={
      item._id ||
      `${item.title}-${index}`
    }
    href={item.link || "#"}
    className="group block min-w-0"
  >
    {/* IMAGE */}

    <div
      className="
        relative
        aspect-[1.45/1]
        w-full
        overflow-hidden
        bg-white/10
      "
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title || "Campus Life"}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.03]
          "
        />
      ) : null}
    </div>

    {/* TITLE + ARROW */}

    <div
      className="
        mt-5
        flex
        items-center
        justify-between
        gap-5
      "
    >
      <h3
        className="
          min-w-0
          font-serif
          text-[23px]
          font-normal
          leading-tight
          tracking-[-0.015em]
          text-white
          sm:text-[25px]
          lg:text-[27px]
          xl:text-[28px]
        "
      >
        {item.title}
      </h3>

      <ArrowUpRight
        className="
          h-7
          w-7
          shrink-0
          text-white
          transition-transform
          duration-300
          group-hover:-translate-y-1
          group-hover:translate-x-1
        "
        strokeWidth={1.7}
      />
    </div>
  </a>
))}
        </div>
      </div>
    </section>
  );
}