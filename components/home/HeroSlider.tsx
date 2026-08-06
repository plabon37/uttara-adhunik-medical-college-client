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

  useEffect(() => {
    if (heroes.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) =>
        prev === heroes.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [heroes]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroes.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroes.length - 1 : prev - 1
    );
  };

  const hero = heroes[current];

  return (
    <section className="relative isolate h-screen min-h-[850px] w-full overflow-hidden">

      {/* Background */}

      <Image
        src={hero.backgroundImage}
        alt={hero.title}
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/45" />

      {/* Left Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Bottom Green Gradient */}

      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#005B4B]/90 via-[#005B4B]/30 to-transparent" />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-10
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:110px_110px]
        "
      />

      {/* Container */}

      <div className="relative z-20 mx-auto flex h-full max-w-[1500px] flex-col px-5 md:px-10 xl:px-16">
              {/* ========================= */}
      {/* Top Navigation */}
      {/* ========================= */}

      <div className="flex h-28 items-center justify-between">

        {/* PREV */}

        <button
          onClick={prevSlide}
          className="hidden items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:text-[#F4C542] lg:flex"
        >
          <ChevronLeft size={18} />
          PREV
        </button>

        {/* Counter */}

        <div className="mx-auto flex items-center gap-6 md:gap-8">

          {heroes.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="group flex items-center gap-6"
            >

              <span
                className={`text-xl font-semibold transition-all duration-300 ${
                  current === index
                    ? "text-[#F4C542]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {index !== heroes.length - 1 && (
                <span className="hidden h-px w-14 bg-white/20 xl:block" />
              )}

            </button>

          ))}

        </div>

        {/* NEXT */}

        <button
          onClick={nextSlide}
          className="hidden items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:text-[#F4C542] lg:flex"
        >
          NEXT
          <ChevronRight size={18} />
        </button>

      </div>

      {/* ========================= */}
      {/* Hero Content */}
      {/* ========================= */}

      <div className="flex flex-1 items-center">

        <div className="grid w-full items-center gap-20 xl:grid-cols-[1.15fr_480px]">

          {/* ========================= */}
          {/* Left Side */}
          {/* ========================= */}

          <div className="max-w-3xl">

            {/* Tagline */}

            <span className="
              inline-flex
              rounded-full
              border
              border-white/20
              bg-white/10
              px-6
              py-3
              text-sm
              font-medium
              tracking-wide
              text-white
              backdrop-blur-xl
            ">
              {hero.tagline}
            </span>

            {/* Heading */}

            <h1 className="
              mt-10
              text-5xl
              font-bold
              leading-[1.08]
              text-white
              md:text-6xl
              xl:text-7xl
              2xl:text-[88px]
            ">

              {hero.title}{" "}

              <span className="text-[#F4C542]">
                {hero.highlightText}
              </span>

              {" "}

              {hero.lastTitle}

            </h1>

            {/* Button */}

            <div className="mt-14">

              <Link
                href={hero.buttonLink}
                className="
                  inline-flex
                  items-center
                  gap-4
                  rounded-full
                  bg-white
                  px-8
                  py-4
                  text-base
                  font-semibold
                  text-slate-900
                  transition-all
                  duration-300
                  hover:bg-[#F4C542]
                "
              >
                {hero.buttonText}

                <ArrowUpRight size={18} />

              </Link>

            </div>

          </div>
                    {/* ========================= */}
          {/* Right Glass Card */}
          {/* ========================= */}

          <div className="relative">

            {/* Glow */}

            <div className="absolute -inset-5 rounded-[42px] bg-emerald-400/10 blur-3xl" />

            <div
              className="
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-white/15
                bg-white/[0.08]
                p-8
                backdrop-blur-3xl
                shadow-[0_30px_80px_rgba(0,0,0,.35)]
                lg:p-10
              "
            >

              {/* Top */}

              <div className="mb-8">

                <p className="text-sm font-semibold uppercase tracking-[0.30em] text-white/70">
                  Academic Program
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white lg:text-4xl">
                  {hero.rightTitle}
                </h2>

              </div>

              {/* Course One */}

              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  transition-all
                  duration-300
                  hover:bg-white/10
                "
              >

                <h3 className="text-xl font-semibold text-white">
                  {hero.courseOneTitle}
                </h3>

                <p className="mt-4 leading-8 text-white/70">
                  {hero.courseOneDescription}
                </p>

              </div>

              {/* Divider */}

              <div className="my-8 h-px bg-white/10" />

              {/* Course Two */}

              <div
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  transition-all
                  duration-300
                  hover:bg-white/10
                "
              >

                <h3 className="text-xl font-semibold text-white">
                  {hero.courseTwoTitle}
                </h3>

                <p className="mt-4 leading-8 text-white/70">
                  {hero.courseTwoDescription}
                </p>

              </div>

              {/* Bottom */}

              <div className="mt-10 flex items-center justify-between">

                <span className="text-sm tracking-[0.25em] text-white/50 uppercase">
                  Explore
                </span>

                <button
                  onClick={nextSlide}
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0B7D63]
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-[#0FA37F]
                  "
                >
                  <ArrowUpRight size={22} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
            {/* ========================= */}
      {/* Mobile Navigation */}
      {/* ========================= */}

      <div className="mt-10 flex items-center justify-center gap-4 lg:hidden">

        <button
          onClick={prevSlide}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            text-white
            backdrop-blur-xl
          "
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-3">

          {heroes.map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 ${
                current === index
                  ? "h-3 w-10 rounded-full bg-[#F4C542]"
                  : "h-3 w-3 rounded-full bg-white/40"
              }`}
            />

          ))}

        </div>

        <button
          onClick={nextSlide}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            text-white
            backdrop-blur-xl
          "
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </div>

    {/* Decorative Gradient */}

    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#004B3F]/70 via-[#004B3F]/30 to-transparent" />

  </section>
);
}