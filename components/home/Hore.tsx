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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_URL}/api/hero`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch hero.");
        }

        const data = await res.json();

        const activeHeroes = data
          .filter((hero: Hero) => hero.isActive)
          .sort(
            (a: Hero, b: Hero) =>
              a.slideNumber - b.slideNumber
          );

        setHeroes(activeHeroes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadHeroes();
  }, []);

  if (loading) {
    return (
      <section className="flex h-[700px] items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-300 border-t-teal-600" />
      </section>
    );
  }

 if (heroes.length === 0) {
  return (
    <section className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-red-500">
        No Hero Found
      </h1>
    </section>
  );
}

  return <HeroSlider heroes={heroes} />;
}