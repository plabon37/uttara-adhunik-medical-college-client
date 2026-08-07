"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import {
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const aboutMenu = [
  { title: "Overview", href: "/about/overview" },
  { title: "History", href: "/about/history" },
  { title: "Vision & Mission", href: "/about/vision-mission" },
  { title: "Aim & Objective", href: "/about/aim-objective" },
  {
    title: "Organizational Structure",
    href: "/about/organizational-structure",
  },
  {
    title: "Founder Members",
    href: "/about/founder-members",
  },
  {
    title: "EC Members",
    href: "/about/ec-members",
  },
  {
    title: "GB Members",
    href: "/about/gb-members",
  },
];

const facilitiesMenu = [
  {
    title: "Hospital Service",
    href: "/facilities/hospital-service",
  },
  {
    title: "Departments",
    href: "/facilities/departments",
  },
  {
    title: "Library",
    href: "/facilities/library",
  },
  {
    title: "Medical Education Unit",
    href: "/facilities/medical-education-unit",
  },
  {
    title: "Training",
    href: "/facilities/training",
  },
  {
    title: "Publications",
    href: "/facilities/publications",
  },
  {
    title: "Seminar",
    href: "/facilities/seminar",
  },
  {
    title: "Hostel",
    href: "/facilities/hostel",
  },
  {
    title: "Laboratory",
    href: "/facilities/laboratory",
  },
  {
    title: "Cafeteria",
    href: "/facilities/cafeteria",
  },
];

const admissionMenu = [
  {
    title: "Admission Procedure",
    href: "/admission/procedure",
  },
  {
    title: "Admission Papers",
    href: "/admission/papers",
  },
  {
    title: "Application Form",
    href: "/admission/application-form",
  },
  {
    title: "Admission Result",
    href: "/admission/result",
  },
  {
    title: "Online Registration",
    href: "/admission/online-registration",
  },
];

export default function Navbar() {
  const [sticky, setSticky] = useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header
      className={`sticky top-0 z-[9999] w-full bg-white transition-all duration-300 ${
        sticky
          ? "shadow-xl"
          : ""
      }`}
    >
      <div className="border-b border-slate-200">

        <div className="mx-auto flex h-24 w-full max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">

          {/* ========================= LEFT ========================= */}

<div className="flex items-center gap-8">

  {/* Logo */}

  <Link
    href="/"
    scroll
    className="flex items-center gap-4 shrink-0"
  >
    <Image
      src="/logo.png"
      alt="UAMC Logo"
      width={72}
      height={72}
      priority
      className="h-16 w-16 object-contain lg:h-[72px] lg:w-[72px]"
    />

    <div className="hidden sm:block">

      <h2 className="text-xl font-bold leading-6 text-slate-900">
        Uttara Adhunik
      </h2>

      <p className="text-sm text-slate-600">
        Medical College
      </p>

    </div>

  </Link>

  {/* Social */}

  <div className="hidden 2xl:flex items-center gap-5">

    <Link href="#" className="text-slate-600 hover:text-emerald-600 transition">
      <FaFacebookF size={17} />
    </Link>

    <Link href="#" className="text-slate-600 hover:text-emerald-600 transition">
      <FaYoutube size={18} />
    </Link>

    <Link href="#" className="text-slate-600 hover:text-emerald-600 transition">
      <FaLinkedinIn size={17} />
    </Link>

    <Link href="#" className="text-slate-600 hover:text-emerald-600 transition">
      <FaInstagram size={18} />
    </Link>

  </div>

</div>

{/* ========================= CENTER ========================= */}

<nav className="hidden xl:flex items-center">

  {/* HOME */}

  <Link
    href="/"
    scroll
    className="relative px-5 py-10 text-[16px] font-semibold text-emerald-600 after:absolute after:bottom-7 after:left-5 after:h-[2px] after:w-[40px] after:bg-emerald-600"
  >
    HOME
  </Link>

  {/* ABOUT */}

  <div className="group relative">

    <Link
      href="/about"
      className="flex items-center gap-1 px-5 py-10 text-[16px] font-semibold text-slate-800 hover:text-emerald-600 transition"
    >
      ABOUT UAMC

      <ChevronDown
        size={18}
        className="transition duration-300 group-hover:rotate-180"
      />
    </Link>

    {/* ABOUT DROPDOWN এখানেই থাকবে */}

  </div>

  {/* FACILITIES */}

  <div className="group relative">

    <Link
      href="/facilities"
      className="flex items-center gap-1 px-5 py-10 text-[16px] font-semibold text-slate-800 hover:text-emerald-600 transition"
    >
      FACILITIES

      <ChevronDown
        size={18}
        className="transition duration-300 group-hover:rotate-180"
      />
    </Link>

    {/* FACILITIES DROPDOWN এখানেই থাকবে */}

  </div>

  {/* ADMISSION */}

  <div className="group relative">

    <Link
      href="/admission"
      className="flex items-center gap-1 px-5 py-10 text-[16px] font-semibold text-slate-800 hover:text-emerald-600 transition"
    >
      ADMISSION

      <ChevronDown
        size={18}
        className="transition duration-300 group-hover:rotate-180"
      />
    </Link>

    {/* ADMISSION DROPDOWN এখানেই থাকবে */}

  </div>

  <Link
    href="/notice"
    className="px-5 py-10 text-[16px] font-semibold text-slate-800 hover:text-emerald-600 transition"
  >
    NOTICE & MEDIA
  </Link>

  <Link
    href="/career"
    className="px-5 py-10 text-[16px] font-semibold text-slate-800 hover:text-emerald-600 transition"
  >
    CAREER
  </Link>

</nav>

{/* ========================= RIGHT ========================= */}

<div className="flex items-center gap-5">

  <button className="hidden xl:flex text-slate-700 hover:text-emerald-600 transition">
    <Search size={24} />
  </button>

  <div className="hidden xl:block h-8 w-px bg-slate-300" />

  <button
    onClick={() => setMobileOpen(true)}
    className="rounded-lg p-2 hover:bg-slate-100 transition"
  >
    <Menu size={30} />
  </button>

</div>
<div
  className="
    invisible
    absolute
    left-0
    top-full
    z-[9999]
    mt-0
    w-[320px]
    overflow-hidden
    rounded-xl
    border
    border-slate-200
    bg-white
    opacity-0
    shadow-xl
    transition-all
    duration-300
    group-hover:visible
    group-hover:opacity-100
    group-hover:pointer-events-auto
    pointer-events-none
  "
>

  {aboutMenu.map((item) => (

    <Link
      key={item.href}
      href={item.href}
      className="
        block
        border-b
        border-slate-100
        px-6
        py-4
        text-[15px]
        font-medium
        text-slate-700
        transition-all
        duration-300
        hover:bg-emerald-600
        hover:pl-8
        hover:text-white
      "
    >
      {item.title}
    </Link>

  ))}

</div>
<div
  className="
    invisible
    absolute
    left-0
    top-full
    z-[9999]
    mt-0
    w-[320px]
    overflow-hidden
    rounded-xl
    border
    border-slate-200
    bg-white
    opacity-0
    shadow-xl
    transition-all
    duration-300
    group-hover:visible
    group-hover:opacity-100
    group-hover:pointer-events-auto
    pointer-events-none
  "
>

  {facilitiesMenu.map((item) => (

    <Link
      key={item.href}
      href={item.href}
      className="
        block
        border-b
        border-slate-100
        px-6
        py-4
        text-[15px]
        font-medium
        text-slate-700
        transition-all
        duration-300
        hover:bg-emerald-600
        hover:pl-8
        hover:text-white
      "
    >
      {item.title}
    </Link>

  ))}

</div>
<div
  className="
    invisible
    absolute
    left-0
    top-full
    z-[9999]
    mt-0
    w-[320px]
    overflow-hidden
    rounded-xl
    border
    border-slate-200
    bg-white
    opacity-0
    shadow-xl
    transition-all
    duration-300
    group-hover:visible
    group-hover:opacity-100
    group-hover:pointer-events-auto
    pointer-events-none
  "
>

  {admissionMenu.map((item) => (

    <Link
      key={item.href}
      href={item.href}
      className="
        block
        border-b
        border-slate-100
        px-6
        py-4
        text-[15px]
        font-medium
        text-slate-700
        transition-all
        duration-300
        hover:bg-emerald-600
        hover:pl-8
        hover:text-white
      "
    >
      {item.title}
    </Link>

  ))}

</div>
{/* ========================= RIGHT SIDE ========================= */}

<div className="flex items-center gap-4">

  {/* Search */}

  <button
    className="
      hidden
      xl:flex
      h-11
      w-11
      items-center
      justify-center
      rounded-full
      border
      border-slate-200
      text-slate-700
      transition-all
      duration-300
      hover:border-emerald-600
      hover:bg-emerald-600
      hover:text-white
    "
  >
    <Search size={20} />
  </button>

  {/* Mobile Menu */}

  <button
    onClick={() => setMobileOpen(true)}
    className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-full
      border
      border-slate-200
      text-slate-700
      transition-all
      duration-300
      hover:border-emerald-600
      hover:bg-emerald-600
      hover:text-white
      xl:hidden
    "
  >
    <Menu size={22} />
  </button>

</div>

</div>
</div>

{/* ========================= MOBILE DRAWER ========================= */}

<div
  className={`
    fixed
    inset-0
    z-[99999]
    transition-all
    duration-300
    ${
      mobileOpen
        ? "visible bg-black/50 opacity-100"
        : "invisible opacity-0"
    }
  `}
>

  {/* Overlay */}

  <div
    onClick={() => setMobileOpen(false)}
    className="absolute inset-0"
  />

  {/* Drawer */}

  <div
    className={`
      absolute
      right-0
      top-0
      h-screen
      w-[330px]
      bg-white
      shadow-2xl
      transition-all
      duration-300
      ${
        mobileOpen
          ? "translate-x-0"
          : "translate-x-full"
      }
    `}
  >

    {/* Header */}

    <div className="flex items-center justify-between border-b px-6 py-5">

      <h2 className="text-xl font-bold">
        Menu
      </h2>

      <button
        onClick={() => setMobileOpen(false)}
        className="
          rounded-full
          p-2
          hover:bg-slate-100
        "
      >
        <X size={24} />
      </button>

    </div>

    {/* Menu */}

    <div className="overflow-y-auto pb-10">

      <Link
        href="/"
        onClick={() => setMobileOpen(false)}
        className="block border-b px-6 py-4 font-medium hover:bg-emerald-600 hover:text-white"
      >
        HOME
      </Link>

      {/* ABOUT */}

      <details>

        <summary className="cursor-pointer border-b px-6 py-4 font-medium">
          ABOUT UAMC
        </summary>

        <div>

          {aboutMenu.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-10 py-3 text-sm hover:bg-emerald-600 hover:text-white"
            >
              {item.title}
            </Link>

          ))}

        </div>

      </details>

      {/* FACILITIES */}

      <details>

        <summary className="cursor-pointer border-b px-6 py-4 font-medium">
          FACILITIES
        </summary>

        <div>

          {facilitiesMenu.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-10 py-3 text-sm hover:bg-emerald-600 hover:text-white"
            >
              {item.title}
            </Link>

          ))}

        </div>

      </details>

      {/* ADMISSION */}

      <details>

        <summary className="cursor-pointer border-b px-6 py-4 font-medium">
          ADMISSION
        </summary>

        <div>

          {admissionMenu.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-10 py-3 text-sm hover:bg-emerald-600 hover:text-white"
            >
              {item.title}
            </Link>

          ))}

        </div>

      </details>

      <Link
        href="/notice"
        onClick={() => setMobileOpen(false)}
        className="block border-b px-6 py-4 font-medium hover:bg-emerald-600 hover:text-white"
      >
        NOTICE & MEDIA
      </Link>

      <Link
        href="/career"
        onClick={() => setMobileOpen(false)}
        className="block border-b px-6 py-4 font-medium hover:bg-emerald-600 hover:text-white"
      >
        CAREER
      </Link>

    </div>

  </div>

</div>

</header>
);
}