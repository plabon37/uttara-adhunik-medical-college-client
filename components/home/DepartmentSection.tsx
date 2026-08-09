"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ArrowRight,
  GraduationCap,
  Loader2,
} from "lucide-react";

// =========================================================
// DEPARTMENT TYPE
// =========================================================

interface Department {
  _id: string;

  name?: string;

  title?: string;

  image?: string;

  imageUrl?: string;

  isActive?: boolean;
}

// =========================================================
// SECTION TYPE
// =========================================================

interface DepartmentSectionData {
  _id: string;

  title: string;

  description: string;

  searchPlaceholder: string;

  popularSearches: string[];

  imageOne: string;

  imageTwo: string;

  studentCount: string;

  studentCountText: string;

  isActive: boolean;
}

// =========================================================
// COMPONENT
// =========================================================

export default function DepartmentSection() {
  // =======================================================
  // SECTION STATE
  // =======================================================

  const [
    section,
    setSection,
  ] = useState<DepartmentSectionData | null>(
    null
  );

  // =======================================================
  // DEPARTMENT STATE
  // =======================================================

  const [
    departments,
    setDepartments,
  ] = useState<Department[]>([]);

  // =======================================================
  // SEARCH
  // =======================================================

  const [
    searchValue,
    setSearchValue,
  ] = useState("");

  // =======================================================
  // LOADING
  // =======================================================

  const [
    loading,
    setLoading,
  ] = useState(true);

  // =======================================================
  // FETCH DATA
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    const loadData =
      async () => {
        try {
          setLoading(true);

          const adminUrl =
            process.env
              .NEXT_PUBLIC_ADMIN_URL;

          if (!adminUrl) {
            throw new Error(
              "NEXT_PUBLIC_ADMIN_URL is not configured."
            );
          }

          // =================================================
          // FETCH SECTION
          // =================================================

          const sectionResponse =
            await fetch(
              `${adminUrl}/api/department-section`,
              {
                cache: "no-store",
              }
            );

          const sectionText =
            await sectionResponse.text();

          let sectionResult:
            | {
                success?: boolean;
                message?: string;
                data?: DepartmentSectionData;
              }
            | null = null;

          try {
            sectionResult =
              JSON.parse(
                sectionText
              );
          } catch {
            throw new Error(
              "Department Section API returned an invalid response."
            );
          }

          // =================================================
          // SECTION NOT FOUND
          // =================================================

          if (
            sectionResponse.status ===
            404
          ) {
            setSection(null);
            return;
          }

          // =================================================
          // SECTION ERROR
          // =================================================

          if (
            !sectionResponse.ok ||
            !sectionResult?.success ||
            !sectionResult.data
          ) {
            throw new Error(
              sectionResult?.message ||
                "Failed to fetch Department Section."
            );
          }

          // =================================================
          // ACTIVE CHECK
          // =================================================

          if (
            !sectionResult.data
              .isActive
          ) {
            setSection(null);
            return;
          }

          setSection(
            sectionResult.data
          );

          // =================================================
          // FETCH DEPARTMENTS
          // =================================================

          try {
            const departmentResponse =
              await fetch(
                `${adminUrl}/api/departments`,
                {
                  cache: "no-store",
                }
              );

            if (
              departmentResponse.ok
            ) {
              const departmentText =
                await departmentResponse.text();

              let departmentResult:
                | {
                    success?: boolean;
                    data?:
                      | Department[]
                      | {
                          departments?: Department[];
                        };
                  }
                | null = null;

              try {
                departmentResult =
                  JSON.parse(
                    departmentText
                  );
              } catch {
                departmentResult =
                  null;
              }

              if (
                departmentResult?.success
              ) {
                const rawData =
                  departmentResult.data;

                if (
                  Array.isArray(
                    rawData
                  )
                ) {
                  setDepartments(
                    rawData
                  );
                } else if (
                  rawData &&
                  typeof rawData ===
                    "object" &&
                  Array.isArray(
                    rawData.departments
                  )
                ) {
                  setDepartments(
                    rawData.departments
                  );
                }
              }
            }
          } catch (
            departmentError
          ) {
            console.error(
              "DEPARTMENT LIST ERROR:",
              departmentError
            );
          }
        } catch (error) {
          console.error(
            "CLIENT DEPARTMENT SECTION ERROR:",
            error
          );

          if (!cancelled) {
            setSection(null);
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
          }
        }
      };

    loadData();

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
          bg-white
        "
      >
        <Loader2
          size={30}
          className="
            animate-spin
            text-[#008B45]
          "
        />
      </section>
    );
  }

  // =======================================================
  // NO SECTION
  // =======================================================

  if (!section) {
    return null;
  }

  // =======================================================
  // FIRST DEPARTMENT
  // =======================================================

  const activeDepartment =
    departments.find(
      (department) =>
        department.isActive !==
        false
    ) ||
    departments[0];

  // =======================================================
  // DEPARTMENT NAME
  // =======================================================

  const departmentName =
    activeDepartment?.name ||
    activeDepartment?.title ||
    "Department of Microbiology";

  // =======================================================
  // DEPARTMENT IMAGE
  // =======================================================

  const departmentImage =
    activeDepartment?.image ||
    activeDepartment?.imageUrl ||
    section.imageOne;

  // =======================================================
  // SEARCH
  // =======================================================

  const handleSearch = () => {
    const value =
      searchValue.trim();

    if (!value) {
      return;
    }

    console.log(
      "Department search:",
      value
    );
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FCFCFC]
      "
    >
      {/* ===================================================
          GRID BACKGROUND
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-60
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(0,139,69,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(0,139,69,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize:
            "80px 80px",
        }}
      />

      {/* ===================================================
          CONTENT CONTAINER
      =================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1920px]
          px-6
          pb-20
          pt-20
          sm:px-10
          sm:pb-24
          sm:pt-24
          lg:px-[5.2%]
          lg:pb-[110px]
          lg:pt-[120px]
        "
      >
        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-12
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-16
            xl:gap-20
          "
        >
          {/* ===============================================
              LEFT SIDE
          =============================================== */}

          <div
            className="
              min-w-0
              pt-2
              lg:pt-3
            "
          >
            {/* =============================================
                TITLE
            ============================================= */}

            <h2
              className="
                font-serif
                text-4xl
                font-bold
                leading-[1.08]
                text-[#008B45]
                sm:text-5xl
                lg:text-[52px]
                xl:text-[56px]
              "
            >
              {section.title}
            </h2>

            {/* =============================================
                DESCRIPTION
            ============================================= */}

            <p
              className="
                mt-6
                max-w-[920px]
                text-base
                leading-[1.45]
                text-[#737373]
                sm:text-lg
                lg:text-[20px]
                lg:leading-[1.35]
              "
            >
              {section.description}
            </p>

            {/* =============================================
                SEARCH BOX
            ============================================= */}

            <div
              className="
                mt-12
                flex
                h-[86px]
                w-full
                max-w-[965px]
                items-center
                border
                border-white
                bg-[#EDECF7]
                px-6
                shadow-none
                sm:px-7
              "
            >
              <Search
                size={28}
                strokeWidth={2}
                className="
                  shrink-0
                  text-[#008B45]
                "
              />

              <input
                type="text"
                value={
                  searchValue
                }
                onChange={(event) =>
                  setSearchValue(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (
                    event.key ===
                    "Enter"
                  ) {
                    handleSearch();
                  }
                }}
                placeholder={
                  section.searchPlaceholder
                }
                className="
                  ml-7
                  min-w-0
                  flex-1
                  bg-transparent
                  text-base
                  text-slate-700
                  outline-none
                  placeholder:text-[#9292A8]
                  sm:text-lg
                "
              />
            </div>

            {/* =============================================
                POPULAR SEARCH
            ============================================= */}

            {section
              .popularSearches
              .length > 0 && (
              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  items-center
                  gap-x-2
                  gap-y-1
                  text-base
                "
              >
                <span
                  className="
                    font-semibold
                    text-[#42A86F]
                  "
                >
                  Popular Search:
                </span>

                {section.popularSearches.map(
                  (
                    item,
                    index
                  ) => (
                    <button
                      key={`${item}-${index}`}
                      type="button"
                      onClick={() =>
                        setSearchValue(
                          item
                        )
                      }
                      className="
                        text-[#777777]
                        underline
                        decoration-[#777777]
                        underline-offset-2
                        transition
                        hover:text-[#008B45]
                      "
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}

            {/* =============================================
                DEPARTMENT RESULT
            ============================================= */}

            <div
              className="
                mt-16
                w-full
                max-w-[965px]
              "
            >
              <div
                className="
                  relative
                  flex
                  min-h-[150px]
                  items-center
                  border
                  border-dashed
                  border-[#43A96F]
                  bg-[#F3FAF5]/70
                  px-6
                  py-5
                  sm:px-6
                "
              >
                {/* IMAGE */}

                <div
                  className="
                    h-[100px]
                    w-[145px]
                    shrink-0
                    overflow-hidden
                    sm:h-[100px]
                    sm:w-[145px]
                  "
                >
                  <img
                    src={
                      departmentImage
                    }
                    alt={
                      departmentName
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                </div>

                {/* CONTENT */}

                <div
                  className="
                    ml-4
                    min-w-0
                    flex-1
                    sm:ml-5
                  "
                >
                  <span
                    className="
                      inline-flex
                      bg-[#FFC800]
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      text-black
                    "
                  >
                    Popular Program
                  </span>

                  <h3
                    className="
                      mt-4
                      truncate
                      font-serif
                      text-xl
                      font-bold
                      text-[#008B45]
                      sm:text-2xl
                    "
                  >
                    {
                      departmentName
                    }
                  </h3>
                </div>

                {/* ARROW */}

                <button
                  type="button"
                  className="
                    ml-4
                    flex
                    h-[100px]
                    w-[72px]
                    shrink-0
                    items-center
                    justify-center
                    bg-[#008B45]
                    text-[#FFC800]
                    transition
                    hover:bg-[#00763B]
                  "
                >
                  <ArrowRight
                    size={30}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ===============================================
              RIGHT SIDE
          =============================================== */}

          <div
            className="
              relative
              min-h-[600px]
              lg:min-h-[620px]
            "
          >
            {/* =============================================
                IMAGE ONE
                2px GAP FROM IMAGE TWO
            ============================================= */}

            <div
              className="
                absolute
                top-0
                h-[290px]
                w-[47%]
                overflow-hidden
                sm:h-[330px]
                lg:h-[295px]
                xl:h-[320px]
              "
              style={{
                right:
                  "calc(26% + 2px)",
              }}
            >
              <img
                src={
                  section.imageOne
                }
                alt="Department"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            {/* =============================================
                IMAGE TWO
            ============================================= */}

            <div
              className="
                absolute
                right-0
                top-0
                h-[570px]
                w-[42%]
                overflow-hidden
                sm:h-[620px]
                lg:h-[570px]
                xl:h-[600px]
              "
            >
              <img
                src={
                  section.imageTwo
                }
                alt="Department"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            {/* =============================================
                GREEN STATISTICS CARD
            ============================================= */}

            <div
              className="
                absolute
                bottom-[58px]
                left-0
                z-20
                flex
                min-h-[145px]
                w-[72%]
                items-center
                bg-[#55B77D]/90
                px-7
                py-6
                backdrop-blur-[2px]
                sm:min-h-[150px]
                sm:px-9
                lg:w-[73%]
                xl:min-h-[150px]
              "
            >
              {/* ICON */}

              <div
                className="
                  flex
                  h-[78px]
                  w-[78px]
                  shrink-0
                  items-center
                  justify-center
                  text-[#111111]
                "
              >
                <GraduationCap
                  size={70}
                  strokeWidth={1.2}
                />
              </div>

              {/* TEXT */}

              <div className="ml-5">
                <p
                  className="
                    font-serif
                    text-4xl
                    font-bold
                    leading-none
                    text-white
                    sm:text-[44px]
                  "
                >
                  {
                    section.studentCount
                  }
                </p>

                <p
                  className="
                    mt-2
                    max-w-[220px]
                    text-base
                    leading-5
                    text-white
                    sm:text-lg
                  "
                >
                  {
                    section.studentCountText
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}