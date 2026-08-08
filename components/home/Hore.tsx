"use client";

import { useEffect, useState } from "react";
import HeroSlider from "./HeroSlider";

interface Hero {
  _id: string;
  tagline: string;
  title: string;
  highlightText: string;
  lastTitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  rightTitle: string;
  courseOneTitle: string;
  courseOneDescription: string;
  courseTwoTitle: string;
  courseTwoDescription: string;
  slideNumber: number;
  isActive: boolean;
}

export default function Hero() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHeroes() {
      try {
        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const res = await fetch(
          `${adminUrl}/api/hero`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "Failed to fetch hero."
          );
        }

        const data = await res.json();

        /*
         * Support both:
         *
         * 1. API returns array
         * 2. API returns { data: [...] }
         */

        const heroData: Hero[] =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : [];

        const activeHeroes = heroData
          .filter(
            (hero) => hero.isActive
          )
          .sort(
            (a, b) =>
              a.slideNumber -
              b.slideNumber
          );

        setHeroes(activeHeroes);
      } catch (error) {
        console.error(
          "HERO FETCH ERROR:",
          error
        );

        setHeroes([]);
      } finally {
        setLoading(false);
      }
    }

    loadHeroes();
  }, []);

  /* =========================
     LOADING STATE
  ========================= */

  if (loading) {
    return (
      <section
        className="
          flex
          min-h-[600px]
          w-full
          items-center
          justify-center
          bg-slate-950
          sm:min-h-[700px]
          lg:min-h-[800px]
        "
      >
        <div
          className="
            h-12
            w-12
            animate-spin
            rounded-full
            border-4
            border-white/20
            border-t-[#F4C542]
            sm:h-14
            sm:w-14
          "
        />
      </section>
    );
  }

  /* =========================
     EMPTY STATE
  ========================= */

  if (heroes.length === 0) {
    return (
      <section
        className="
          flex
          min-h-[500px]
          w-full
          items-center
          justify-center
          bg-slate-950
          px-5
          text-center
          sm:min-h-[600px]
        "
      >
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-white
              sm:text-3xl
              lg:text-4xl
            "
          >
            No Hero Found
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-white/60
              sm:text-base
            "
          >
            No active hero slides are
            available at the moment.
          </p>
        </div>
      </section>
    );
  }

  /* =========================
     HERO SLIDER
  ========================= */

  return (
    <section className="w-full overflow-hidden">
      <HeroSlider heroes={heroes} />
    </section>
  );
}