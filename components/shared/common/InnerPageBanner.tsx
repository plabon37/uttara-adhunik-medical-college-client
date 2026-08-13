import Image from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface InnerPageBannerProps {
  title: string;
  highlightedTitle?: string;
  breadcrumbs: BreadcrumbItem[];

  decorationImage: string;
  logoImage: string;

  className?: string;
}

export default function InnerPageBanner({
  title,
  highlightedTitle,
  breadcrumbs,
  decorationImage,
  logoImage,
  className = "",
}: InnerPageBannerProps) {
  return (
    <section
      className={`
        relative
        w-full
        overflow-hidden
        bg-[#A8D8BD]
        ${className}
      `}
    >
      {/* =====================================================
          FULL SECTION BACKGROUND IMAGE
      ===================================================== */}

      <Image
        src={decorationImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* =====================================================
          GREEN OVERLAY
          Keeps the background soft like the screenshot
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-[#A8D8BD]/80
        "
      />

      {/* =====================================================
          SOFT LIGHT OVERLAY
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          bg-gradient-to-b
          from-white/10
          via-transparent
          to-[#A8D8BD]/10
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[420px]
          w-full
          max-w-[1920px]
          items-end
          px-6
          pb-10
          pt-20

          sm:min-h-[450px]
          sm:px-10
          sm:pb-11

          lg:min-h-[470px]
          lg:px-16
          lg:pb-12

          xl:min-h-[500px]
          xl:px-20
        "
      >
        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="min-w-0 flex-1">

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <nav
            aria-label="Breadcrumb"
            className="
              mb-5
              flex
              flex-wrap
              items-center
              gap-x-2
              gap-y-2
              text-[13px]
              font-medium
              uppercase
              leading-none
              sm:text-[14px]
              lg:text-[15px]
            "
          >
            {breadcrumbs.map(
              (item, index) => {
                const content = item.href ? (
                  <Link
                    href={item.href}
                    className={`
                      transition-colors
                      duration-200
                      ${
                        item.active
                          ? "text-[#008B45]"
                          : "text-black"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={
                      item.active
                        ? "text-[#008B45]"
                        : "text-black"
                    }
                  >
                    {item.label}
                  </span>
                );

                return (
                  <div
                    key={`${item.label}-${index}`}
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >
                    {content}

                    {index <
                      breadcrumbs.length - 1 && (
                      <span className="text-black">
                        &gt;&gt;
                      </span>
                    )}
                  </div>
                );
              }
            )}
          </nav>

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <h1
            className="
              font-serif
              text-[52px]
              font-light
              leading-[0.9]
              tracking-[-2px]
              text-[#252525]

              sm:text-[60px]

              md:text-[66px]

              lg:text-[72px]

              xl:text-[78px]
            "
          >
            {title}

            {highlightedTitle && (
              <>
                {" "}

                <span
                  className="
                    font-bold
                    text-[#008B45]
                  "
                >
                  {highlightedTitle}
                </span>
              </>
            )}
          </h1>
        </div>

        {/* ===================================================
            RIGHT SIDE LOGO
        =================================================== */}

        <div
          className="
            relative
            hidden
            h-[180px]
            w-[220px]
            shrink-0

            sm:block

            md:h-[200px]
            md:w-[250px]

            lg:h-[230px]
            lg:w-[290px]

            xl:h-[260px]
            xl:w-[330px]
          "
        >
          <Image
            src={logoImage}
            alt="Uttara Adhunik Medical College"
            fill
            priority
            sizes="330px"
            className="
              object-contain
              object-center
            "
          />
        </div>
      </div>
    </section>
  );
}