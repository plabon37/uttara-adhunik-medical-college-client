"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { useEffect, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

interface MenuItem {
  label: string;
  href: string;
}

/* =========================================================
   ABOUT UAMC
========================================================= */

const aboutMenu: MenuItem[] = [
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
    label: "Founder Members",
    href: "/about/founder-members",
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

/* =========================================================
   FACILITIES
========================================================= */

const facilitiesMenu: MenuItem[] = [
  {
    label: "Hospital Service",
    href: "/facilities/hospital-service",
  },
  {
    label: "Departments",
    href: "/facilities/departments",
  },
  {
    label: "Library",
    href: "/facilities/library",
  },
  {
    label: "Medical Education Unit",
    href: "/facilities/medical-education-unit",
  },
  {
    label: "Training",
    href: "/facilities/training",
  },
  {
    label: "Publications",
    href: "/facilities/publications",
  },
  {
    label: "Seminar",
    href: "/facilities/seminar",
  },
  {
    label: "Hostel",
    href: "/facilities/hostel",
  },
  {
    label: "Laboratory",
    href: "/facilities/laboratory",
  },
  {
    label: "Cafeteria",
    href: "/facilities/cafeteria",
  },
];

/* =========================================================
   ADMISSION
========================================================= */

const admissionMenu: MenuItem[] = [
  {
    label: "Admission Procedure & Fees",
    href: "/admission/procedure-fees",
  },
  {
    label: "Admission Papers",
    href: "/admission/papers",
  },
  {
    label: "Application Form",
    href: "/admission/application-form",
  },
  {
    label: "Admission Results",
    href: "/admission/results",
  },
  {
    label: "Online Registration",
    href: "/admission/online-registration",
  },
];

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [mobileDropdown, setMobileDropdown] =
    useState<string | null>(null);

  const [searchOpen, setSearchOpen] =
    useState(false);

  /* =======================================================
     ESCAPE
  ======================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileDropdown(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =======================================================
     CLOSE ALL
  ======================================================= */

  const closeAll = () => {
    setOpenMenu(null);
    setMobileDropdown(null);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  /* =======================================================
     DESKTOP MENU
  ======================================================= */

  const toggleDesktopMenu = (
    menu: string
  ) => {
    setOpenMenu((prev) =>
      prev === menu ? null : menu
    );
  };

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const toggleMobileMenu = (
    menu: string
  ) => {
    setMobileDropdown((prev) =>
      prev === menu ? null : menu
    );
  };

  return (
    <>
      {/* ===================================================
          HEADER
      ==================================================== */}

      <header
        className="
          sticky
          top-0
          z-[100]
          w-full
          border-b
          border-slate-200
          bg-white
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        "
      >
        {/* =================================================
            FULL WIDTH CONTAINER
        ================================================== */}

        <div
          className="
            flex
            min-h-[86px]
            w-full
            items-center
            px-4
            sm:px-6
            md:px-8
            lg:px-10
            xl:px-14
            2xl:px-20
          "
        >
          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            onClick={closeAll}
            className="
              flex
              shrink-0
              items-center
              gap-3
            "
          >
            <div
              className="
                relative
                h-[58px]
                w-[58px]
                shrink-0
                sm:h-[64px]
                sm:w-[64px]
              "
            >
              <Image
                src="/logo.png"
                alt="Uttara Adhunik Medical College"
                fill
                priority
                sizes="64px"
                className="object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <h1
                className="
                  whitespace-nowrap
                  font-serif
                  text-xl
                  font-bold
                  leading-tight
                  text-slate-900
                  lg:text-2xl
                "
              >
                Uttara Adhunik
              </h1>

              <p
                className="
                  whitespace-nowrap
                  text-sm
                  leading-tight
                  text-slate-700
                  lg:text-base
                "
              >
                Medical College (UAMC)
              </p>
            </div>
          </Link>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              mx-4
              hidden
              h-10
              w-px
              shrink-0
              bg-slate-300
              md:block
              lg:mx-6
            "
          />

          {/* =================================================
              SOCIAL
          ================================================== */}

          <div
            className="
              hidden
              items-center
              gap-4
              xl:flex
            "
          >
            <a
              href="#"
              aria-label="Facebook"
              className="
                text-slate-900
                transition
                hover:text-[#008B45]
              "
            >
              <FaFacebookF size={15} />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              className="
                text-slate-900
                transition
                hover:text-[#008B45]
              "
            >
              <FaYoutube size={16} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="
                text-slate-900
                transition
                hover:text-[#008B45]
              "
            >
              <FaLinkedinIn size={16} />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="
                text-slate-900
                transition
                hover:text-[#008B45]
              "
            >
              <FaInstagram size={16} />
            </a>
          </div>

          {/* =================================================
              DESKTOP NAV
          ================================================== */}

          <nav
            className="
              ml-auto
              hidden
              items-center
              gap-5
              lg:flex
              xl:gap-7
              2xl:gap-9
            "
          >
            {/* HOME */}

            <Link
              href="/"
              onClick={closeAll}
              className="
                relative
                flex
                h-[86px]
                items-center
                whitespace-nowrap
                font-serif
                text-[16px]
                font-medium
                text-slate-900
                transition
                hover:text-[#008B45]
                xl:text-[17px]
              "
            >
              HOME

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  h-[2px]
                  bg-[#008B45]
                "
              />
            </Link>

            {/* ABOUT */}

            <DesktopMenu
              label="ABOUT UAMC"
              menuKey="about"
              items={aboutMenu}
              openMenu={openMenu}
              toggleMenu={
                toggleDesktopMenu
              }
              setOpenMenu={setOpenMenu}
            />

            {/* FACILITIES */}

            <DesktopMenu
              label="FACILITIES"
              menuKey="facilities"
              items={facilitiesMenu}
              openMenu={openMenu}
              toggleMenu={
                toggleDesktopMenu
              }
              setOpenMenu={setOpenMenu}
            />

            {/* ADMISSION */}

            <DesktopMenu
              label="ADMISSION"
              menuKey="admission"
              items={admissionMenu}
              openMenu={openMenu}
              toggleMenu={
                toggleDesktopMenu
              }
              setOpenMenu={setOpenMenu}
            />

            {/* NOTICE */}

            <Link
              href="/notice-media"
              onClick={closeAll}
              className="
                flex
                h-[86px]
                items-center
                whitespace-nowrap
                font-serif
                text-[16px]
                font-medium
                text-slate-900
                transition
                hover:text-[#008B45]
                xl:text-[17px]
              "
            >
              NOTICE & MEDIA
            </Link>

            {/* CAREER */}

            <Link
              href="/career"
              onClick={closeAll}
              className="
                flex
                h-[86px]
                items-center
                whitespace-nowrap
                font-serif
                text-[16px]
                font-medium
                text-slate-900
                transition
                hover:text-[#008B45]
                xl:text-[17px]
              "
            >
              CAREER
            </Link>
          </nav>

          {/* =================================================
              RIGHT ACTIONS
          ================================================== */}

          <div
            className="
              ml-5
              hidden
              items-center
              gap-5
              lg:flex
              xl:ml-7
              2xl:ml-9
            "
          >
            <div
              className="
                h-8
                w-px
                bg-slate-300
              "
            />

            <button
              type="button"
              aria-label="Search"
              onClick={() =>
                setSearchOpen(
                  (prev) => !prev
                )
              }
              className="
                text-slate-900
                transition
                hover:text-[#008B45]
              "
            >
              <Search
                size={27}
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() =>
                setMobileOpen(true)
              }
              className="
                text-slate-900
                transition
                hover:text-[#008B45]
              "
            >
              <Menu
                size={28}
                strokeWidth={1.8}
              />
            </button>
          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================== */}

          <div
            className="
              ml-auto
              flex
              items-center
              gap-2
              lg:hidden
            "
          >
            <button
              type="button"
              aria-label="Search"
              onClick={() =>
                setSearchOpen(
                  (prev) => !prev
                )
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-slate-900
              "
            >
              <Search size={23} />
            </button>

            <button
              type="button"
              aria-label="Open navigation"
              onClick={() =>
                setMobileOpen(true)
              }
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                text-slate-900
              "
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* =================================================
            SEARCH BAR
        ================================================== */}

        {searchOpen && (
          <div
            className="
              w-full
              border-t
              border-slate-200
              bg-white
              px-4
              py-4
              sm:px-8
              lg:px-10
              xl:px-14
              2xl:px-20
            "
          >
            <div
              className="
                mx-auto
                w-full
                max-w-3xl
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  py-3
                "
              >
                <Search
                  size={20}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                  "
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          MOBILE DRAWER
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-[200]
            lg:hidden
          "
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              absolute
              inset-0
              bg-black/40
              backdrop-blur-sm
            "
          />

          <aside
            className="
              absolute
              right-0
              top-0
              flex
              h-full
              w-[88%]
              max-w-[390px]
              flex-col
              overflow-y-auto
              bg-white
              shadow-2xl
              sm:w-[380px]
            "
          >
            {/* MOBILE HEADER */}

            <div
              className="
                flex
                min-h-[82px]
                items-center
                justify-between
                border-b
                border-slate-200
                px-5
              "
            >
              <Link
                href="/"
                onClick={closeAll}
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    relative
                    h-12
                    w-12
                  "
                >
                  <Image
                    src="/logo.png"
                    alt="UAMC Logo"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>

                <div>
                  <p
                    className="
                      font-serif
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >
                    Uttara Adhunik
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Medical College
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-100
                  text-slate-800
                "
              >
                <X size={22} />
              </button>
            </div>

            {/* MOBILE NAV */}

            <nav
              className="
                flex-1
                px-5
                py-5
              "
            >
              <MobileLink
                href="/"
                label="HOME"
                onClick={closeAll}
              />

              <MobileDropdown
                label="ABOUT UAMC"
                items={aboutMenu}
                isOpen={
                  mobileDropdown ===
                  "about"
                }
                onToggle={() =>
                  toggleMobileMenu(
                    "about"
                  )
                }
                onNavigate={closeAll}
              />

              <MobileDropdown
                label="FACILITIES"
                items={facilitiesMenu}
                isOpen={
                  mobileDropdown ===
                  "facilities"
                }
                onToggle={() =>
                  toggleMobileMenu(
                    "facilities"
                  )
                }
                onNavigate={closeAll}
              />

              <MobileDropdown
                label="ADMISSION"
                items={admissionMenu}
                isOpen={
                  mobileDropdown ===
                  "admission"
                }
                onToggle={() =>
                  toggleMobileMenu(
                    "admission"
                  )
                }
                onNavigate={closeAll}
              />

              <MobileLink
                href="/notice-media"
                label="NOTICE & MEDIA"
                onClick={closeAll}
              />

              <MobileLink
                href="/career"
                label="CAREER"
                onClick={closeAll}
              />
            </nav>

            {/* SOCIAL */}

            <div
              className="
                border-t
                border-slate-200
                px-5
                py-5
              "
            >
              <p
                className="
                  mb-4
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-slate-400
                "
              >
                Follow Us
              </p>

              <div className="flex items-center gap-5">
                <FaFacebookF
                  size={18}
                  className="text-slate-700"
                />

                <FaYoutube
                  size={19}
                  className="text-slate-700"
                />

                <FaLinkedinIn
                  size={19}
                  className="text-slate-700"
                />

                <FaInstagram
                  size={19}
                  className="text-slate-700"
                />
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

/* ===========================================================
   DESKTOP DROPDOWN
=========================================================== */

function DesktopMenu({
  label,
  menuKey,
  items,
  openMenu,
  toggleMenu,
  setOpenMenu,
}: {
  label: string;
  menuKey: string;
  items: MenuItem[];
  openMenu: string | null;
  toggleMenu: (menu: string) => void;
  setOpenMenu: (
    value: string | null
  ) => void;
}) {
  const isOpen = openMenu === menuKey;

  return (
    <div
      className="relative"
      onMouseEnter={() =>
        setOpenMenu(menuKey)
      }
      onMouseLeave={() =>
        setOpenMenu(null)
      }
    >
      <button
        type="button"
        onClick={() =>
          toggleMenu(menuKey)
        }
        className={`
          flex
          h-[86px]
          items-center
          gap-2
          whitespace-nowrap
          font-serif
          text-[16px]
          font-medium
          transition
          xl:text-[17px]
          ${
            isOpen
              ? "text-[#008B45]"
              : "text-slate-900 hover:text-[#008B45]"
          }
        `}
      >
        {label}

        {isOpen ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>

      {isOpen && (
        <DesktopDropdown
          items={items}
        />
      )}
    </div>
  );
}

/* ===========================================================
   DESKTOP DROPDOWN
=========================================================== */

function DesktopDropdown({
  items,
}: {
  items: MenuItem[];
}) {
  return (
    <div
      className="
        absolute
        right-0
        top-full
        z-[300]
        w-[375px]
        overflow-hidden
        border-t
        border-[#F4C542]
        bg-slate-700/95
        shadow-[0_20px_50px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
      "
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="
            group
            flex
            min-h-[66px]
            items-center
            justify-between
            gap-4
            border-b
            border-[#F4C542]/60
            px-5
            text-base
            font-medium
            text-white
            transition
            hover:bg-white/10
            sm:text-lg
          "
        >
          <span className="min-w-0">
            {item.label}
          </span>

          <ArrowRight
            size={25}
            className="
              shrink-0
              transition-transform
              group-hover:translate-x-1
            "
          />
        </Link>
      ))}
    </div>
  );
}

/* ===========================================================
   MOBILE LINK
=========================================================== */

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        flex
        min-h-[56px]
        items-center
        border-b
        border-slate-100
        px-2
        font-serif
        text-base
        font-medium
        text-slate-900
        hover:text-[#008B45]
      "
    >
      {label}
    </Link>
  );
}

/* ===========================================================
   MOBILE DROPDOWN
=========================================================== */

function MobileDropdown({
  label,
  items,
  isOpen,
  onToggle,
  onNavigate,
}: {
  label: string;
  items: MenuItem[];
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-slate-100">
      <button
        type="button"
        onClick={onToggle}
        className="
          flex
          min-h-[56px]
          w-full
          items-center
          justify-between
          px-2
          font-serif
          text-base
          font-medium
          text-slate-900
        "
      >
        {label}

        {isOpen ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>

      {isOpen && (
        <div
          className="
            mb-3
            ml-2
            overflow-hidden
            border-l-2
            border-[#008B45]
            bg-slate-50
          "
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="
                flex
                min-h-[50px]
                items-center
                justify-between
                gap-3
                border-b
                border-slate-200
                px-4
                text-sm
                text-slate-700
                hover:text-[#008B45]
              "
            >
              <span>{item.label}</span>

              <ArrowRight
                size={17}
                className="shrink-0"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}