"use client";

import Link from "next/link";

import {
  ArrowRight,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

// =========================================================
// FACILITY ITEM TYPE
// =========================================================

interface FacilityItem {
  _id: string;

  name: string;

  title: string;

  description: string;

  detailsText: string;

  detailsLink: string;

  isActive: boolean;

  order: number;
}

// =========================================================
// FACILITIES DATA TYPE
// =========================================================

interface FacilitiesData {
  _id: string;

  tagline: string;

  title: string;

  image: string;

  facilities: FacilityItem[];

  programButtonText: string;

  programButtonLink: string;

  isActive: boolean;

  createdAt?: string;

  updatedAt?: string;
}

// =========================================================
// COMPONENT
// =========================================================

export default function Facilities() {
  // =======================================================
  // FACILITIES STATE
  // =======================================================

  const [
    facilities,
    setFacilities,
  ] = useState<FacilitiesData | null>(
    null
  );

  // =======================================================
  // SELECTED FACILITY
  // =======================================================

  const [
    selectedFacilityId,
    setSelectedFacilityId,
  ] = useState<string | null>(
    null
  );

  // =======================================================
  // LOADING
  // =======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // FETCH FACILITIES
  // =======================================================

  useEffect(() => {
    async function loadFacilities() {
      try {
        // =================================================
        // ADMIN API
        // =================================================

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/facilities`,
          {
            cache: "no-store",
          }
        );

        // =================================================
        // API ERROR
        // =================================================

        if (!res.ok) {
          throw new Error(
            "Failed to fetch facilities."
          );
        }

        // =================================================
        // RESPONSE
        // =================================================

        const result =
          await res.json();

        // =================================================
        // DATA
        // =================================================

        const facilitiesData:
          | FacilitiesData
          | null =
          result.data || null;

        // =================================================
        // NO DATA
        // =================================================

        if (
          !facilitiesData
        ) {
          setFacilities(
            null
          );

          return;
        }

        // =================================================
        // INACTIVE SECTION
        // =================================================

        if (
          !facilitiesData.isActive
        ) {
          setFacilities(
            null
          );

          return;
        }

        // =================================================
        // SAVE FACILITIES
        // =================================================

        setFacilities(
          facilitiesData
        );

        // =================================================
        // ACTIVE FACILITIES
        // =================================================

        const activeFacilities =
          (
            facilitiesData.facilities ||
            []
          )
            .filter(
              (
                facility
              ) =>
                facility.isActive
            )
            .sort(
              (
                a,
                b
              ) =>
                a.order -
                b.order
            );

        // =================================================
        // DEFAULT SELECTED FACILITY
        // =================================================

        if (
          activeFacilities.length >
          0
        ) {
          setSelectedFacilityId(
            activeFacilities[0]._id
          );
        }
      } catch (error) {
        console.error(
          "CLIENT FACILITIES ERROR:",
          error
        );

        setFacilities(
          null
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    loadFacilities();
  }, []);

  // =======================================================
  // LOADING
  // =======================================================

  if (
    loading
  ) {
    return (
      <section
        className="
          w-full
          bg-[#F8F5F5]
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[400px]
            w-full
            max-w-[1920px]
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
              border-[#008B45]/20
              border-t-[#008B45]
            "
          />
        </div>
      </section>
    );
  }

  // =======================================================
  // NO DATA
  // =======================================================

  if (
    !facilities
  ) {
    return null;
  }

  // =======================================================
  // ACTIVE FACILITIES
  // =======================================================

  const activeFacilities =
    (
      facilities.facilities ||
      []
    )
      .filter(
        (
          facility
        ) =>
          facility.isActive
      )
      .sort(
        (
          a,
          b
        ) =>
          a.order -
          b.order
      );

  // =======================================================
  // NO ACTIVE FACILITIES
  // =======================================================

  if (
    activeFacilities.length ===
    0
  ) {
    return null;
  }

  // =======================================================
  // SELECTED FACILITY
  // =======================================================

  const selectedFacility =
    activeFacilities.find(
      (
        facility
      ) =>
        facility._id ===
        selectedFacilityId
    ) ||
    activeFacilities[0];

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#F8F5F5]
      "
    >
      {/* =================================================
          SECTION HEADER
      ================================================= */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1920px]
          px-5
          pt-10
          sm:px-8
          sm:pt-14
          md:px-12
          lg:px-[7.3%]
          lg:pt-16
        "
      >
        {/* =================================================
            TAGLINE
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span
            className="
              text-xl
              text-[#008B45]
              sm:text-2xl
            "
          >
            🎓
          </span>

          <span
            className="
              text-sm
              font-medium
              tracking-wide
              text-[#008B45]
              sm:text-base
            "
          >
            {facilities.tagline}
          </span>
        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <h2
          className="
            mt-2
            text-center
            font-serif
            text-4xl
            font-bold
            leading-tight
            text-black
            sm:text-5xl
            md:text-6xl
            lg:text-[64px]
            xl:text-[72px]
          "
        >
          {facilities.title}
        </h2>
      </div>

      {/* =================================================
          MAIN FACILITIES AREA
      ================================================= */}

      <div
        className="
          mx-auto
          mt-12
          w-full
          max-w-[1920px]
          px-5
          pb-12
          sm:px-8
          sm:pb-16
          md:px-12
          lg:mt-16
          lg:px-[7.3%]
          lg:pb-20
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-0
            lg:grid-cols-[1fr_0.75fr_0.92fr]
          "
        >
          {/* =================================================
              LEFT — FACILITY LIST
          ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-5
            "
          >
            {activeFacilities.map(
              (
                facility,
                index
              ) => {
                const isSelected =
                  selectedFacility._id ===
                  facility._id;

                return (
                  <button
                    key={
                      facility._id ||
                      `${facility.name}-${index}`
                    }
                    type="button"
                    onClick={() =>
                      setSelectedFacilityId(
                        facility._id
                      )
                    }
                    className={`
                      group
                      flex
                      min-h-[76px]
                      w-full
                      items-center
                      justify-between
                      px-7
                      text-left
                      transition-all
                      duration-300
                      sm:min-h-[80px]
                      sm:px-8
                      ${
                        isSelected
                          ? "bg-white"
                          : "bg-white hover:bg-white/80"
                      }
                    `}
                  >
                    {/* FACILITY NAME */}

                    <span
                      className={`
                        font-serif
                        text-lg
                        font-bold
                        sm:text-xl
                        ${
                          isSelected
                            ? "text-[#008B45]"
                            : "text-black"
                        }
                      `}
                    >
                      {
                        facility.name
                      }
                    </span>

                    {/* ARROW */}

                    {!isSelected && (
                      <span
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          bg-[#E9F5EE]
                          text-[#FFC400]
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          group-hover:bg-[#DDF0E5]
                        "
                      >
                        <ArrowRight
                          size={25}
                          strokeWidth={
                            1.5
                          }
                        />
                      </span>
                    )}
                  </button>
                );
              }
            )}
          </div>

          {/* =================================================
              CENTER — IMAGE
          ================================================= */}

          <div
            className="
              relative
              mt-5
              h-[420px]
              w-full
              overflow-hidden
              sm:h-[500px]
              lg:mt-0
              lg:h-[580px]
            "
          >
            {facilities.image ? (
              <img
                src={
                  facilities.image
                }
                alt={
                  selectedFacility.title ||
                  "Facilities"
                }
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  bg-slate-100
                  text-sm
                  text-slate-400
                "
              >
                Facilities image
              </div>
            )}
          </div>

          {/* =================================================
              RIGHT — DETAILS
          ================================================= */}

          <div
            className="
              flex
              min-h-[420px]
              flex-col
              justify-center
              bg-white
              px-8
              py-12
              sm:min-h-[500px]
              sm:px-10
              sm:py-14
              lg:min-h-[580px]
              lg:px-10
              xl:px-12
            "
          >
            {/* TITLE */}

            <h3
              className="
                font-serif
                text-3xl
                font-bold
                leading-tight
                text-[#008B45]
                sm:text-4xl
                md:text-[42px]
                lg:text-[38px]
                xl:text-[44px]
              "
            >
              {
                selectedFacility.title
              }
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-8
                text-base
                leading-7
                text-[#555555]
                sm:text-lg
                sm:leading-8
              "
            >
              {
                selectedFacility.description
              }
            </p>

            {/* DETAILS LINK */}

            {
              selectedFacility.detailsText && (
                <Link
                  href={
                    selectedFacility.detailsLink ||
                    "#"
                  }
                  className="
                    group
                    mt-10
                    inline-flex
                    w-fit
                    items-center
                    gap-8
                    border-b
                    border-[#009FE3]
                    pb-1
                    text-sm
                    font-medium
                    text-[#009FE3]
                    transition-all
                    duration-300
                    hover:text-[#007EBA]
                  "
                >
                  <span>
                    {
                      selectedFacility.detailsText
                    }
                  </span>

                  <ArrowRight
                    size={17}
                    strokeWidth={
                      1.5
                    }
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              )
            }

            {/* PROGRAM BUTTON */}

            {
              facilities.programButtonText && (
                <Link
                  href={
                    facilities.programButtonLink ||
                    "#"
                  }
                  className="
                    group
                    mt-16
                    inline-flex
                    min-h-[64px]
                    w-fit
                    items-center
                    justify-center
                    gap-4
                    bg-[#009447]
                    px-8
                    py-4
                    text-base
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#007C3B]
                    hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                    sm:min-w-[280px]
                    sm:text-lg
                  "
                >
                  <span>
                    {
                      facilities.programButtonText
                    }
                  </span>

                  <ArrowRight
                    size={22}
                    strokeWidth={
                      1.7
                    }
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </section>
  );
}