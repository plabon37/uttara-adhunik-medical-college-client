import Hero from "@/components/home/Hore";
import Notice from "@/components/home/Notice";
import Publication from "@/components/home/Publication";
import About from "@/components/home/About";
import Statistics from "@/components/home/Statistics";
import DepartmentSection from "@/components/home/DepartmentSection";
import Admission from "@/components/home/Admission";

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* =========================
          HERO
      ========================= */}

      <Hero />

      {/* =========================
          NOTICE + PUBLICATION
      ========================= */}

      <section className="w-full bg-white">
        <div
          className="
            mx-auto
            w-full
            max-w-[1500px]
            px-5
            py-12
            sm:px-8
            sm:py-16
            lg:px-10
            lg:py-20
            xl:px-12
            2xl:px-16
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-12
              lg:grid-cols-2
              lg:gap-10
              xl:gap-12
              2xl:gap-16
            "
          >
            {/* NOTICE */}

            <div className="min-w-0 w-full">
              <Notice />
            </div>

            {/* PUBLICATION */}

            <div className="min-w-0 w-full">
              <Publication />
            </div>
          </div>
        </div>
      </section>
      <About/>
      <Statistics/>
      <DepartmentSection/>
      <Admission/>
    </main>
  );
}