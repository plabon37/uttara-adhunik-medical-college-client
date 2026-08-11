"use client";

import { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

import Image from "next/image";

// =========================================================
// TYPES
// =========================================================

interface AlumniEvent {
  _id: string;

  title: string;

  date: string;

  time: string;

  location: string;

  image: string;

  isPublished: boolean;

  order: number;

  createdAt?: string;

  updatedAt?: string;
}

interface AlumniEventApiResponse {
  success?: boolean;

  message?: string;

  data?: AlumniEvent | AlumniEvent[];

  alumniEvents?: AlumniEvent | AlumniEvent[];
}

// =========================================================
// COMPONENT
// =========================================================

export default function AlumniEvent() {
  // =======================================================
  // STATE
  // =======================================================

  const [events, setEvents] =
    useState<AlumniEvent[]>([]);

  // =======================================================
  // GET ALUMNI EVENTS
  // =======================================================

  useEffect(() => {
    async function loadAlumniEvents() {
      try {
        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const response = await fetch(
          `${adminUrl}/api/alumni-events`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch Alumni Events."
          );
        }

        const result: AlumniEventApiResponse =
          await response.json();

        if (result.success === false) {
          throw new Error(
            result.message ||
              "Failed to fetch Alumni Events."
          );
        }

        // =================================================
        // NORMALIZE DATA
        // =================================================

        const rawData =
          result.data ??
          result.alumniEvents ??
          [];

        const eventData = Array.isArray(
          rawData
        )
          ? rawData
          : rawData
            ? [rawData]
            : [];

        // =================================================
        // PUBLISHED + ORDER
        // =================================================

        const publishedEvents =
          eventData
            .filter(
              (event) =>
                event.isPublished
            )
            .sort(
              (a, b) =>
                Number(a.order ?? 0) -
                Number(b.order ?? 0)
            );

        setEvents(
          publishedEvents
        );
      } catch (error) {
        console.error(
          "CLIENT ALUMNI EVENT ERROR:",
          error
        );

        setEvents([]);
      }
    }

    loadAlumniEvents();
  }, []);

  // =======================================================
  // NO DATA
  // =======================================================

  if (events.length === 0) {
    return null;
  }

  // =======================================================
  // FEATURED IMAGE
  // =======================================================

  const featuredEvent =
    events.find(
      (event) =>
        event.image?.trim()
    ) ?? events[0];

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section
      className="
        w-full
        bg-[#EAF5EE]
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-[5%]
        lg:py-24
        xl:py-28
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          mb-10
          flex
          items-start
          justify-between
          gap-6
          sm:mb-14
          lg:mb-16
        "
      >
        {/* TITLE */}

        <h2
          className="
            font-serif
            text-4xl
            font-bold
            leading-none
            text-[#008B45]
            sm:text-5xl
            lg:text-6xl
            xl:text-[68px]
          "
        >
          Alumni Event
        </h2>

        {/* VIEW ALL */}

        <button
          type="button"
          className="
            mt-1
            shrink-0
            border-b
            border-[#008B45]
            pb-1
            text-sm
            font-medium
            text-[#008B45]
            transition
            hover:opacity-70
            sm:text-base
            lg:text-lg
          "
        >
          View All ↗
        </button>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          grid
          w-full
          grid-cols-1
          items-stretch
          gap-6
          lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.9fr)]
          lg:gap-8
          xl:gap-10
        "
      >
        {/* =================================================
            LEFT — EVENT LIST
        ================================================= */}

        <div
          className="
            flex
            min-w-0
            flex-col
            gap-5
            lg:gap-6
          "
        >
          {events.map(
            (event, index) => (
              <article
                key={event._id}
                className="
                  flex
                  min-h-[170px]
                  items-center
                  gap-5
                  bg-white
                  px-5
                  py-7
                  sm:min-h-[185px]
                  sm:px-7
                  sm:py-8
                  lg:min-h-[200px]
                  lg:px-8
                  lg:py-9
                  xl:min-h-[205px]
                  xl:px-9
                "
              >
                {/* =================================================
                    NUMBER
                ================================================= */}

                <div
                  className="
                    shrink-0
                    font-sans
                    text-[58px]
                    font-light
                    leading-none
                    tracking-tight
                    text-transparent
                    [-webkit-text-stroke:1px_#008B45]
                    sm:text-[70px]
                    lg:text-[82px]
                    xl:text-[88px]
                  "
                >
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </div>

                {/* =================================================
                    EVENT INFORMATION
                ================================================= */}

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  {/* TITLE */}

                  <h3
                    className="
                      max-w-[650px]
                      text-lg
                      font-normal
                      leading-7
                      text-[#008B45]
                      sm:text-xl
                      sm:leading-8
                      lg:text-[23px]
                      lg:leading-9
                      xl:text-[25px]
                    "
                  >
                    {event.title}
                  </h3>

                  {/* META */}

                  <div
                    className="
                      mt-5
                      flex
                      flex-wrap
                      items-center
                      gap-x-5
                      gap-y-3
                      text-xs
                      text-slate-600
                      sm:text-sm
                      lg:mt-6
                      lg:text-[15px]
                    "
                  >
                    {/* DATE */}

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        whitespace-nowrap
                      "
                    >
                      <CalendarDays
                        size={17}
                        strokeWidth={1.6}
                      />

                      {event.date}
                    </span>

                    {/* TIME */}

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        whitespace-nowrap
                      "
                    >
                      <Clock3
                        size={17}
                        strokeWidth={1.6}
                      />

                      {event.time}
                    </span>

                    {/* LOCATION */}

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        border-b
                        border-dotted
                        border-slate-500
                        pb-0.5
                      "
                    >
                      <MapPin
                        size={17}
                        strokeWidth={1.6}
                      />

                      {event.location}
                    </span>
                  </div>
                </div>
              </article>
            )
          )}
        </div>

        {/* =================================================
            RIGHT — SINGLE LARGE IMAGE
        ================================================= */}

        <div
          className="
            relative
            min-h-[420px]
            overflow-hidden
            bg-slate-100
            sm:min-h-[500px]
            lg:min-h-[626px]
            xl:min-h-[660px]
            2xl:min-h-[700px]
          "
        >
          {featuredEvent?.image ? (
            <Image
              src={
                featuredEvent.image
              }
              alt={
                featuredEvent.title
              }
              fill
              sizes="
                (max-width: 1024px) 100vw,
                45vw
              "
              className="
                object-cover
              "
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}