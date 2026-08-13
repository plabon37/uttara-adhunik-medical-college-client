import Notice from "@/components/home/Notice";
import Publication from "@/components/home/Publication";
import News from "@/components/home/News";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-white">

      {/* =====================================================
          NOTICE SECTION
      ===================================================== */}

      <section className="w-full bg-[#F7FAF8] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">

          <div className="mb-10 sm:mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-[#008B45]">
              Latest Updates
            </span>

            <h2 className="font-serif text-4xl font-bold leading-tight text-[#171717] sm:text-5xl lg:text-6xl">
              Notice &{" "}
              <span className="text-[#008B45]">
                Announcements
              </span>
            </h2>

            <p className="mt-4 max-w-[650px] text-base leading-7 text-gray-500 sm:text-lg">
              Stay updated with the latest notices, important
              announcements and academic information from UAMC.
            </p>
          </div>

          <div className="w-full">
            <Notice />
          </div>

        </div>
      </section>


      {/* =====================================================
          SECTION DIVIDER
      ===================================================== */}

      <div className="mx-auto h-px w-[90%] bg-gray-200" />


      {/* =====================================================
          PUBLICATION SECTION
      ===================================================== */}

      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">

          <div className="mb-10 sm:mb-12">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-[0.18em] text-[#008B45]">
              Explore More
            </span>

            <h2 className="font-serif text-4xl font-bold leading-tight text-[#171717] sm:text-5xl lg:text-6xl">
              Our{" "}
              <span className="text-[#008B45]">
                Publications
              </span>
            </h2>

            <p className="mt-4 max-w-[650px] text-base leading-7 text-gray-500 sm:text-lg">
              Explore research, academic publications and
              valuable resources from Uttara Adhunik Medical
              College.
            </p>
          </div>

          <div className="w-full">
            <Publication />
          </div>

        </div>
      </section>


      {/* =====================================================
          SECTION DIVIDER
      ===================================================== */}

      <div className="mx-auto h-px w-[90%] bg-gray-200" />


      {/* =====================================================
          NEWS SECTION
      ===================================================== */}

      <section className="w-full bg-[#F7FAF8] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">

          <div className="w-full">
            <News />
          </div>

        </div>
      </section>

    </main>
  );
}