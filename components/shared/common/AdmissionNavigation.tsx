"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Admission Procedure & Fees",
    href: "/admission/admission-procedure-fees",
  },
  {
    label: "Admission Papers",
    href: "/admission/admission-papers",
  },
  {
    label: "Application Form",
    href: "/admission/application-form",
  },
  {
    label: "Admission Results",
    href: "/admission/admission-results",
  },
  {
    label: "Online Registration",
    href: "/admission/online-registration",
  },
];

export default function AdmissionNavigation() {
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
          aria-label="Admission navigation"
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
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  h-[58px]
                  w-[253px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-[5px]
                  px-4
                  text-center
                  text-[15px]
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

                  max-[639px]:h-[52px]
                  max-[639px]:w-full
                  max-[639px]:max-w-[320px]

                  min-[640px]:w-[253px]
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