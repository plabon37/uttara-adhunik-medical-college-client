"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

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
}

interface HeroSliderProps {
  heroes: Hero[];
}

export default function HeroSlider({
  heroes,
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);

  /* =========================
     AUTO SLIDER
  ========================= */

  useEffect(() => {
    if (heroes.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === heroes.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [heroes]);

  /* =========================
     NEXT SLIDE
  ========================= */

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroes.length - 1 ? 0 : prev + 1
    );
  };

  /* =========================
     PREVIOUS SLIDE
  ========================= */

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroes.length - 1 : prev - 1
    );
  };

  const hero = heroes[current];

  if (!hero) {
    return null;
  }

  return (
    <section
      className="
        relative
        isolate
        min-h-[720px]
        w-full
        overflow-hidden
        sm:min-h-[760px]
        lg:h-screen
        lg:min-h-[800px]
        xl:min-h-[850px]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <Image
        src={hero.backgroundImage}
        alt={hero.title}
        fill
        priority
        sizes="100vw"
        className="
          object-cover
          object-center
        "
      />

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}

      <div className="absolute inset-0 bg-black/45" />

      {/* =====================================================
          LEFT GRADIENT
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/60
          to-transparent
        "
      />

      {/* =====================================================
          MOBILE EXTRA DARK OVERLAY
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-black/10
          sm:bg-transparent
        "
      />

      {/* =====================================================
          BOTTOM GREEN GRADIENT
      ====================================================== */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-72
          bg-gradient-to-t
          from-[#005B4B]/90
          via-[#005B4B]/30
          to-transparent
        "
      />

      {/* =====================================================
          GRID
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-10
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:110px_110px]
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          min-h-[720px]
          w-full
          max-w-[1500px]
          flex-col
          px-5
          sm:min-h-[760px]
          sm:px-8
          md:px-10
          lg:h-screen
          lg:min-h-[800px]
          lg:px-12
          xl:px-16
          2xl:px-20
        "
      >
        {/* ===================================================
            TOP NAVIGATION
        ==================================================== */}

        <div
          className="
            flex
            min-h-[82px]
            items-center
            justify-center
            lg:h-28
            lg:justify-between
          "
        >
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              hidden
              items-center
              gap-3
              text-sm
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white
              transition
              hover:text-[#F4C542]
              lg:flex
            "
          >
            <ChevronLeft size={18} />
            PREV
          </button>

          {/* COUNTER */}

          <div
            className="
              flex
              max-w-full
              items-center
              gap-4
              overflow-x-auto
              px-2
              sm:gap-6
              md:gap-8
            "
          >
            {heroes.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="
                  group
                  flex
                  shrink-0
                  items-center
                  gap-3
                  sm:gap-6
                "
              >
                <span
                  className={`
                    text-base
                    font-semibold
                    transition-all
                    duration-300
                    sm:text-xl
                    ${
                      current === index
                        ? "text-[#F4C542]"
                        : "text-white/60 hover:text-white"
                    }
                  `}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {index !== heroes.length - 1 && (
                  <span
                    className="
                      hidden
                      h-px
                      w-10
                      bg-white/20
                      sm:w-14
                      xl:block
                    "
                  />
                )}
              </button>
            ))}
          </div>

          {/* NEXT */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              hidden
              items-center
              gap-3
              text-sm
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white
              transition
              hover:text-[#F4C542]
              lg:flex
            "
          >
            NEXT
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ===================================================
            HERO CONTENT
        ==================================================== */}

        <div
          className="
            flex
            flex-1
            items-start
            pb-10
            pt-6
            sm:pt-8
            lg:items-center
            lg:pb-20
            lg:pt-0
          "
        >
          <div
            className="
              grid
              w-full
              min-w-0
              grid-cols-1
              items-center
              gap-10
              lg:gap-14
              xl:grid-cols-[minmax(0,1.15fr)_480px]
              xl:gap-20
            "
          >
            {/* =================================================
                LEFT SIDE
            ================================================== */}

            <div
              className="
                min-w-0
                max-w-3xl
              "
            >
              {/* TAGLINE */}

              <span
                className="
                  inline-flex
                  max-w-full
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  py-2
                  text-xs
                  font-medium
                  tracking-wide
                  text-white
                  backdrop-blur-xl
                  sm:px-6
                  sm:py-3
                  sm:text-sm
                "
              >
                {hero.tagline}
              </span>

              {/* HEADING */}

              <h1
                className="
                  mt-6
                  break-words
                  text-4xl
                  font-bold
                  leading-[1.08]
                  text-white
                  sm:mt-8
                  sm:text-5xl
                  md:text-6xl
                  lg:mt-10
                  xl:text-7xl
                  2xl:text-[88px]
                "
              >
                {hero.title}{" "}

                <span className="text-[#F4C542]">
                  {hero.highlightText}
                </span>

                {" "}

                {hero.lastTitle}
              </h1>

              {/* BUTTON */}

              <div className="mt-8 sm:mt-10 lg:mt-14">
                <Link
                  href={hero.buttonLink}
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-white
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-slate-900
                    transition-all
                    duration-300
                    hover:bg-[#F4C542]
                    sm:gap-4
                    sm:px-8
                    sm:py-4
                    sm:text-base
                  "
                >
                  <span className="truncate">
                    {hero.buttonText}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0"
                  />
                </Link>
              </div>
            </div>

            {/* =================================================
                RIGHT GLASS CARD
            ================================================== */}

            <div
              className="
                relative
                w-full
                min-w-0
              "
            >
              {/* GLOW */}

              <div
                className="
                  absolute
                  -inset-3
                  rounded-[30px]
                  bg-emerald-400/10
                  blur-3xl
                  sm:-inset-5
                  sm:rounded-[42px]
                "
              />

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/15
                  bg-white/[0.08]
                  p-5
                  backdrop-blur-3xl
                  shadow-[0_30px_80px_rgba(0,0,0,.35)]
                  sm:rounded-[30px]
                  sm:p-7
                  lg:rounded-[36px]
                  lg:p-10
                "
              >
                {/* TOP */}

                <div className="mb-6 sm:mb-8">
                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.20em]
                      text-white/70
                      sm:text-sm
                      sm:tracking-[0.30em]
                    "
                  >
                    Academic Program
                  </p>

                  <h2
                    className="
                      mt-2
                      break-words
                      text-2xl
                      font-bold
                      text-white
                      sm:mt-3
                      sm:text-3xl
                      lg:text-4xl
                    "
                  >
                    {hero.rightTitle}
                  </h2>
                </div>

                {/* COURSE ONE */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                    transition-all
                    duration-300
                    hover:bg-white/10
                    sm:rounded-3xl
                    sm:p-6
                  "
                >
                  <h3
                    className="
                      break-words
                      text-lg
                      font-semibold
                      text-white
                      sm:text-xl
                    "
                  >
                    {hero.courseOneTitle}
                  </h3>

                  <p
                    className="
                      mt-3
                      break-words
                      text-sm
                      leading-6
                      text-white/70
                      sm:mt-4
                      sm:text-base
                      sm:leading-8
                    "
                  >
                    {hero.courseOneDescription}
                  </p>
                </div>

                {/* DIVIDER */}

                <div className="my-5 h-px bg-white/10 sm:my-8" />

                {/* COURSE TWO */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    p-4
                    transition-all
                    duration-300
                    hover:bg-white/10
                    sm:rounded-3xl
                    sm:p-6
                  "
                >
                  <h3
                    className="
                      break-words
                      text-lg
                      font-semibold
                      text-white
                      sm:text-xl
                    "
                  >
                    {hero.courseTwoTitle}
                  </h3>

                  <p
                    className="
                      mt-3
                      break-words
                      text-sm
                      leading-6
                      text-white/70
                      sm:mt-4
                      sm:text-base
                      sm:leading-8
                    "
                  >
                    {hero.courseTwoDescription}
                  </p>
                </div>

                {/* BOTTOM */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    gap-4
                    sm:mt-10
                  "
                >
                  <span
                    className="
                      text-xs
                      uppercase
                      tracking-[0.20em]
                      text-white/50
                      sm:text-sm
                      sm:tracking-[0.25em]
                    "
                  >
                    Explore
                  </span>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#0B7D63]
                      text-white
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:bg-[#0FA37F]
                      sm:h-14
                      sm:w-14
                    "
                  >
                    <ArrowUpRight
                      size={20}
                      className="sm:h-[22px] sm:w-[22px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE SLIDER NAVIGATION
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-center
            gap-4
            pb-8
            lg:hidden
            sm:pb-10
          "
        >
          {/* PREVIOUS */}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-xl
              sm:h-12
              sm:w-12
            "
          >
            <ChevronLeft size={19} />
          </button>

          {/* DOTS */}

          <div
            className="
              flex
              max-w-[180px]
              items-center
              gap-2
              overflow-hidden
              sm:gap-3
            "
          >
            {heroes.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  shrink-0
                  transition-all
                  duration-300
                  ${
                    current === index
                      ? "h-2.5 w-8 rounded-full bg-[#F4C542] sm:h-3 sm:w-10"
                      : "h-2.5 w-2.5 rounded-full bg-white/40 sm:h-3 sm:w-3"
                  }
                `}
              />
            ))}
          </div>

          {/* NEXT */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/10
              text-white
              backdrop-blur-xl
              sm:h-12
              sm:w-12
            "
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      {/* =====================================================
          BOTTOM DECORATIVE GRADIENT
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-32
          bg-gradient-to-t
          from-[#004B3F]/70
          via-[#004B3F]/30
          to-transparent
          sm:h-40
        "
      />
    </section>
  );
}