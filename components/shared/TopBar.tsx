"use client";

import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Users,
  UserRound,
  CalendarDays,
  Contact,
} from "lucide-react";

const topLinks = [
  {
    label: "Student Portal",
    href: "#",
    icon: GraduationCap,
  },
  {
    label: "Teachers Portal",
    href: "#",
    icon: Users,
  },
  {
    label: "Alumni",
    href: "#",
    icon: UserRound,
  },
  {
    label: "Events",
    href: "#",
    icon: CalendarDays,
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: Contact,
  },
];

export default function Topbar() {
  return (
    <div className="w-full border-b border-slate-200 bg-white">
      {/* =====================================================
          DESKTOP TOPBAR
      ====================================================== */}

      <div className="hidden min-h-[70px] w-full items-center lg:flex">
        {/* ===================================================
            LEFT SIDE
        ==================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            justify-start
            gap-6
            px-6
            xl:gap-8
            xl:px-8
            2xl:gap-10
            2xl:px-10
          "
        >
          {/* ================= ADDRESS ================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-3
            "
          >
            <MapPin
              size={25}
              strokeWidth={1.8}
              className="shrink-0 text-slate-500"
            />

            <div
              className="
                text-sm
                leading-5
                text-slate-500
                xl:text-[15px]
              "
            >
              <p className="whitespace-nowrap">
                House - 34, Road - 4, Sector - 9,
              </p>

              <p className="whitespace-nowrap">
                Sonargaon Janapath, Uttara Model Town
              </p>
            </div>
          </div>

          {/* ================= EMAIL ================= */}

          <a
            href="mailto:info@uamc.com"
            className="
              flex
              shrink-0
              items-center
              gap-3
              whitespace-nowrap
              text-sm
              text-slate-500
              transition-colors
              hover:text-[#008B45]
              xl:text-[15px]
            "
          >
            <Mail
              size={24}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span>info@uamc.com</span>
          </a>

          {/* ================= PHONE ================= */}

          <a
            href="tel:+8801700220000"
            className="
              flex
              shrink-0
              items-center
              gap-3
              whitespace-nowrap
              text-sm
              text-slate-500
              transition-colors
              hover:text-[#008B45]
              xl:text-[15px]
            "
          >
            <Phone
              size={24}
              strokeWidth={1.8}
              className="shrink-0"
            />

            <span>+880 1700-220000</span>
          </a>
        </div>

        {/* ===================================================
            RIGHT SIDE — QUICK LINKS
        ==================================================== */}

        <nav
          aria-label="Quick navigation"
          className="
            flex
            shrink-0
            items-center
            pr-6
            xl:pr-8
            2xl:pr-10
          "
        >
          {topLinks.map((link, index) => {
            const Icon = link.icon;

            return (
              <div
                key={link.label}
                className="flex items-center"
              >
                <Link
                  href={link.href}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    whitespace-nowrap
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    transition-colors
                    hover:text-[#008B45]
                    xl:px-4
                    xl:text-[15px]
                  "
                >
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                    className="
                      shrink-0
                      text-slate-500
                      transition-colors
                      group-hover:text-[#008B45]
                    "
                  />

                  <span>{link.label}</span>
                </Link>

                {/* Divider before Contact Us */}

                {index === 3 && (
                  <span
                    className="
                      mx-1
                      h-6
                      w-px
                      shrink-0
                      bg-slate-400
                      xl:mx-2
                    "
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* =====================================================
          MOBILE TOPBAR
      ====================================================== */}

      <div
        className="
          flex
          min-h-[58px]
          w-full
          items-center
          px-4
          sm:px-6
          lg:hidden
        "
      >
        <div
          className="
            flex
            w-full
            items-center
            justify-center
            gap-5
            overflow-x-auto
            whitespace-nowrap
            scrollbar-hide
          "
        >
          {/* ================= EMAIL ================= */}

          <a
            href="mailto:info@uamc.com"
            className="
              flex
              shrink-0
              items-center
              gap-2
              text-xs
              text-slate-500
              transition-colors
              hover:text-[#008B45]
              sm:text-sm
            "
          >
            <Mail
              size={17}
              strokeWidth={1.8}
            />

            <span>info@uamc.com</span>
          </a>

          {/* ================= PHONE ================= */}

          <a
            href="tel:+8801700220000"
            className="
              flex
              shrink-0
              items-center
              gap-2
              text-xs
              text-slate-500
              transition-colors
              hover:text-[#008B45]
              sm:text-sm
            "
          >
            <Phone
              size={17}
              strokeWidth={1.8}
            />

            <span>
              +880 1700-220000
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}