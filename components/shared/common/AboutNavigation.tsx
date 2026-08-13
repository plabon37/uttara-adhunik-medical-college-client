"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Overview",
    href: "/about/overview",
  },
  {
    label: "History of UAMC",
    href: "/about/history",
  },
  {
    label: "Vision & Mission",
    href: "/about/vision-mission",
  },
  {
    label: "Aim & Objective",
    href: "/about/aim-objective",
  },
  {
    label: "Organizational Structure",
    href: "/about/organizational-structure",
  },
  {
    label: "Founder Member",
    href: "/about/founder-member",
  },
  {
    label: "EC Members",
    href: "/about/ec-members",
  },
  {
    label: "GB Members",
    href: "/about/gb-members",
  },
];

export default function AboutNavigation() {
  const pathname = usePathname();

  return (
    <section
      className="
        w-full
        bg-white
        px-5
        py-12

        sm:px-8
        sm:py-14

        md:py-16

        lg:px-10
        lg:py-[72px]
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-[1140px]
          justify-center
        "
      >
        <nav
          aria-label="About UAMC navigation"
          className="
            flex
            w-full
            flex-wrap
            justify-center
            gap-x-7
            gap-y-7
          "
        >
          {navigationItems.map((item) => {
            /*
             * IMPORTANT:
             * Exact pathname match.
             *
             * /about           → Overview active
             * /about/history   → History active
             * /about/ec-members → EC Members active
             */

            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  h-[50px]
                  w-[200px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[5px]
                  px-4
                  text-center
                  text-[13px]
                  font-medium
                  leading-tight
                  transition-all
                  duration-300
                  ease-in-out

                  ${
                    isActive
                      ? `
                        bg-[#008B45]
                        text-white
                        shadow-[0_4px_14px_rgba(0,139,69,0.18)]
                      `
                      : `
                        bg-[#747578]
                        text-white
                        hover:bg-[#008B45]
                        hover:text-white
                        hover:shadow-[0_4px_14px_rgba(0,139,69,0.18)]
                      `
                  }

                  max-[639px]:w-full
                  max-[639px]:max-w-[320px]

                  min-[640px]:w-[200px]
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}