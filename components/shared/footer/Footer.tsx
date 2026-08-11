import Image from "next/image";
import Link from "next/link";

import NewsletterSubscribe from "./NewsletterSubscribe";

// =========================================================
// TYPES
// =========================================================

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  date: string;
}

// =========================================================
// FOOTER
// =========================================================

export default async function Footer() {
  let recentPosts: NewsItem[] = [];

  // =======================================================
  // LOAD RECENT NEWS
  // =======================================================

  try {
    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_URL;

    if (adminUrl) {
      const baseUrl =
        adminUrl.replace(
          /\/+$/,
          ""
        );

      const response =
        await fetch(
          `${baseUrl}/api/news`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept:
                "application/json",
            },
          }
        );

      if (response.ok) {
        const result =
          await response.json();

        const newsData =
          Array.isArray(
            result?.data
          )
            ? result.data
            : [];

        recentPosts =
          newsData
            .filter(
              (item: NewsItem) =>
                item.image
            )
            .slice(0, 2);
      }
    }
  } catch (error) {
    console.error(
      "FOOTER NEWS LOAD ERROR:",
      error
    );
  }

  // =======================================================
  // FORMAT DATE
  // =======================================================

  const formatDate = (
    date: string
  ) => {
    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "";
    }

    return new Intl.DateTimeFormat(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    ).format(parsedDate);
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <footer className="overflow-hidden bg-[#080808] text-white">

      {/* =================================================
          NEWSLETTER
      ================================================= */}

      <section className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-14">

          {/* TITLE */}

          <div className="shrink-0">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Subscribe To Newsletter
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
              Subscribe to get the latest updates,
              news and announcements from UAMC.
            </p>
          </div>

          {/* FORM */}

          <div className="w-full max-w-[680px] lg:ml-auto">
            <NewsletterSubscribe />
          </div>
        </div>
      </section>

      {/* =================================================
          MAIN FOOTER
      ================================================= */}

      <section>
        <div className="mx-auto w-full max-w-[1600px] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr] lg:gap-10">

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="max-w-[360px]">

              {/* LOGO */}

              <Link
                href="/"
                className="inline-flex items-center"
              >
                <Image
                  src="/images/logo.png"
                  alt="Uttara Adhunik Medical College"
                  width={190}
                  height={70}
                  className="h-auto w-[170px] object-contain"
                />
              </Link>

              {/* TITLE */}

              <h3 className="mt-6 text-xl font-semibold leading-7 text-white">
                Uttara Adhunik Medical College
                (UAMC)
              </h3>

              {/* DESCRIPTION */}

              <p className="mt-4 text-sm leading-7 text-white/50">
                Uttara Adhunik Medical College is
                committed to providing quality
                medical education and creating an
                environment where students can
                learn, grow and serve society.
              </p>

              {/* LOCATION */}

              <div className="mt-6 space-y-3">

                <div className="flex items-start gap-3 text-sm text-white/60">
                  <span className="mt-0.5 text-[#008B45]">
                    📍
                  </span>

                  <span>
                    Uttara, Dhaka, Bangladesh
                  </span>
                </div>

                {/* PHONE */}

                <div className="flex items-start gap-3 text-sm text-white/60">
                  <span className="mt-0.5 text-[#008B45]">
                    ☎
                  </span>

                  <span>
                    +880 2 4895 826
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                OUR CAMPUS
            ================================================= */}

            <div>
              <h3 className="text-base font-semibold text-white">
                Our Campus
              </h3>

              <div className="mt-5 space-y-3">

                <Link
                  href="/academic"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Academic
                </Link>

                <Link
                  href="/athletics"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Athletics
                </Link>

                <Link
                  href="/campus-life"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Campus Life
                </Link>

                <Link
                  href="/research"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Research
                </Link>

                <Link
                  href="/academic-area"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Academic Area
                </Link>
              </div>
            </div>

            {/* =================================================
                OUR PAGES
            ================================================= */}

            <div>
              <h3 className="text-base font-semibold text-white">
                Our Pages
              </h3>

              <div className="mt-5 space-y-3">

                <Link
                  href="/about"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  About
                </Link>

                <Link
                  href="/tuition-fee"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Tuition Fee
                </Link>

                <Link
                  href="/alumni"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Alumni
                </Link>

                <Link
                  href="/faculty-staff"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Faculty Staff
                </Link>

                <Link
                  href="/events"
                  className="block text-sm text-white/50 transition hover:text-[#008B45]"
                >
                  Event
                </Link>
              </div>
            </div>

            {/* =================================================
                RECENT POSTS
            ================================================= */}

            <div>
              <h3 className="text-base font-semibold text-white">
                Recent Posts
              </h3>

              <div className="mt-5 space-y-5">

                {recentPosts.length > 0 ? (
                  recentPosts.map(
                    (post) => (
                      <Link
                        key={post._id}
                        href={`/news/${post.slug}`}
                        className="group flex gap-4"
                      >

                        {/* IMAGE */}

                        <div className="relative h-[72px] w-[92px] shrink-0 overflow-hidden rounded-md bg-white/10">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="92px"
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0">
                          <p className="text-xs text-[#008B45]">
                            {formatDate(
                              post.date
                            )}
                          </p>

                          <h4 className="mt-1 line-clamp-2 text-sm font-medium leading-5 text-white/80 transition group-hover:text-white">
                            {post.title}
                          </h4>
                        </div>
                      </Link>
                    )
                  )
                ) : (
                  <p className="text-sm leading-6 text-white/40">
                    No recent posts available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          COPYRIGHT
      ================================================= */}

      <div className="border-t border-white/10">
        <div className="mx-auto flex min-h-[80px] w-full max-w-[1600px] items-center justify-center px-5 sm:px-8 lg:px-12">
          <p className="text-center text-sm text-gray-500 sm:text-base">
            Copyright @{" "}
            <span className="text-gray-400">
              2024.
            </span>{" "}
            All Rights Reserved by{" "}
            <span className="font-medium text-white">
              Unipix
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}