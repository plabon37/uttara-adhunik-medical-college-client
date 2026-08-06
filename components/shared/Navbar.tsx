"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  X,
} from "lucide-react";

import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const [aboutOpen, setAboutOpen] =
    useState(false);

  const [facilityOpen, setFacilityOpen] =
    useState(false);

  const [admissionOpen, setAdmissionOpen] =
    useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] =
  useState(false);

const [mobileAboutOpen, setMobileAboutOpen] =
  useState(false);

const [mobileFacilityOpen, setMobileFacilityOpen] =
  useState(false);

const [mobileAdmissionOpen, setMobileAdmissionOpen] =
  useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-[1500px] items-center justify-between px-5 xl:px-10">

        {/* ===================== */}
        {/* Left */}
        {/* ===================== */}

        <div className="flex items-center">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >
            <Image
              src="/logo.png"
              alt="UAMC"
              width={70}
              height={70}
              priority
            />

            <div>

              <h2 className="text-[22px] font-bold leading-7 text-slate-900">
                Uttara Adhunik
              </h2>

              <p className="text-[18px] text-slate-700">
                Medical College (UAMC)
              </p>

            </div>

          </Link>

          {/* Divider */}

          <div className="mx-8 h-10 w-px bg-slate-300" />

          {/* Social */}

          <div className="hidden items-center gap-6 xl:flex">

            <Link
              href="#"
              className="transition hover:text-emerald-600"
            >
              <FaFacebookF size={18} />
            </Link>

            <Link
              href="#"
              className="transition hover:text-emerald-600"
            >
              <FaYoutube size={18} />
            </Link>

            <Link
              href="#"
              className="transition hover:text-emerald-600"
            >
              <FaLinkedinIn size={18} />
            </Link>

            <Link
              href="#"
              className="transition hover:text-emerald-600"
            >
              <FaInstagram size={18} />
            </Link>

          </div>

        </div>
                {/* ===================== */}
        {/* Center Menu */}
        {/* ===================== */}

        <nav className="hidden xl:flex items-center">

          {/* HOME */}

          <Link
            href="/"
            className="
              relative
              px-5
              py-10
              text-[17px]
              font-medium
              text-emerald-600
              after:absolute
              after:bottom-6
              after:left-5
              after:h-[2px]
              after:w-[55px]
              after:bg-emerald-600
            "
          >
            HOME
          </Link>

          {/* ABOUT */}

          <div
            className="relative"
            onMouseEnter={() =>
              setAboutOpen(true)
            }
            onMouseLeave={() =>
              setAboutOpen(false)
            }
          >

            <button
              className="
                flex
                items-center
                gap-2
                px-5
                py-10
                text-[17px]
                font-medium
                text-slate-800
                transition
                hover:text-emerald-600
              "
            >
              ABOUT UAMC

              <ChevronDown
                size={18}
                className={`transition ${
                  aboutOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

          </div>

          {/* FACILITIES */}

          <div
            className="relative"
            onMouseEnter={() =>
              setFacilityOpen(true)
            }
            onMouseLeave={() =>
              setFacilityOpen(false)
            }
          >

            <button
              className="
                flex
                items-center
                gap-2
                px-5
                py-10
                text-[17px]
                font-medium
                text-slate-800
                transition
                hover:text-emerald-600
              "
            >
              FACILITIES

              <ChevronDown
                size={18}
                className={`transition ${
                  facilityOpen
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

          </div>

          {/* ADMISSION */}

          <div
            className="relative"
            onMouseEnter={() =>
              setAdmissionOpen(true)
            }
            onMouseLeave={() =>
              setAdmissionOpen(false)
            }
          >

            <button
              className="
                flex
                items-center
                gap-2
                px-5
                py-10
                text-[17px]
                font-medium
                text-slate-800
                transition
                hover:text-emerald-600
              "
            >
              ADMISSION

              <ChevronDown
                size={18}
                className={`transition ${
                  admissionOpen
                    ? "rotate-180"
                    : ""
                }`}
              />

            </button>

          </div>

          {/* NOTICE */}

          <Link
            href="/notice"
            className="
              px-5
              py-10
              text-[17px]
              font-medium
              text-slate-800
              transition
              hover:text-emerald-600
            "
          >
            NOTICE & MEDIA
          </Link>

          {/* CAREER */}

          <Link
            href="/career"
            className="
              px-5
              py-10
              text-[17px]
              font-medium
              text-slate-800
              transition
              hover:text-emerald-600
            "
          >
            CAREER
          </Link>

        </nav>

        {/* ===================== */}
        {/* Right */}
        {/* ===================== */}

        <div className="flex items-center">

          <div className="hidden xl:flex items-center">

            <div className="mr-8 h-10 w-px bg-slate-300" />

            <button
              className="
                transition
                hover:text-emerald-600
              "
            >
              <Search size={30} />
            </button>

          </div>

<button
  onClick={() => setMobileMenuOpen(true)}
  className="ml-8 transition hover:text-emerald-600 xl:hidden"
>
  <Menu size={34} />
</button>
        </div>

      </div>
                  {/* About Dropdown */}

            {aboutOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-full
                  z-50
                  w-80
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-3
                  shadow-2xl
                "
              >
                <Link
                  href="/about/overview"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Overview
                </Link>

                <Link
                  href="/about/history"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  History
                </Link>

                <Link
                  href="/about/vision-mission"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Vision & Mission
                </Link>

                <Link
                  href="/about/aim-objective"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Aim & Objective
                </Link>

                <Link
                  href="/about/organizational-structure"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Organizational Structure
                </Link>

                <Link
                  href="/about/founder-members"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Founder Members
                </Link>

                <Link
                  href="/about/ec-members"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  EC Members
                </Link>

                <Link
                  href="/about/gb-members"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  GB Members
                </Link>
              </div>
            )}
                        {/* Facilities Dropdown */}

            {facilityOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-full
                  z-50
                  w-80
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-3
                  shadow-2xl
                "
              >
                <Link
                  href="/facilities/hospital-service"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Hospital Service
                </Link>

                <Link
                  href="/facilities/departments"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Departments
                </Link>

                <Link
                  href="/facilities/library"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Library
                </Link>

                <Link
                  href="/facilities/medical-education-unit"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Medical Education Unit
                </Link>

                <Link
                  href="/facilities/training"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Training
                </Link>

                <Link
                  href="/facilities/publications"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Publications
                </Link>

                <Link
                  href="/facilities/seminar"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Seminar
                </Link>

                <Link
                  href="/facilities/hostel"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Hostel
                </Link>

                <Link
                  href="/facilities/laboratory"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Laboratory
                </Link>

                <Link
                  href="/facilities/cafeteria"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Cafeteria
                </Link>
              </div>
            )}
                        {/* Admission Dropdown */}

            {admissionOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-full
                  z-50
                  w-80
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  py-3
                  shadow-2xl
                "
              >
                <Link
                  href="/admission/procedure"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Admission Procedure
                </Link>

                <Link
                  href="/admission/papers"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Admission Papers
                </Link>

                <Link
                  href="/admission/application-form"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Application Form
                </Link>

                <Link
                  href="/admission/result"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Admission Result
                </Link>

                <Link
                  href="/admission/online-registration"
                  className="block px-6 py-3 text-[16px] text-slate-700 transition hover:bg-emerald-600 hover:text-white"
                >
                  Online Registration
                </Link>
              </div>
            )}
            {/* Mobile Menu */}

{mobileMenuOpen && (
  <>
    <div
      onClick={() => setMobileMenuOpen(false)}
      className="fixed inset-0 z-[90] bg-black/50 xl:hidden"
    />

    <aside
      className="
        fixed
        right-0
        top-0
        z-[100]
        flex
        h-screen
        w-[340px]
        flex-col
        bg-white
        shadow-2xl
        xl:hidden
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">

        <h2 className="text-2xl font-bold">
          Menu
        </h2>

        <button
          onClick={() =>
            setMobileMenuOpen(false)
          }
        >
          <X size={30} />
        </button>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto">

        <Link
          href="/"
          onClick={() =>
            setMobileMenuOpen(false)
          }
          className="block border-b px-6 py-4 font-medium"
        >
          Home
        </Link>

        {/* About */}

        <button
          onClick={() =>
            setMobileAboutOpen(
              !mobileAboutOpen
            )
          }
          className="flex w-full items-center justify-between border-b px-6 py-4 font-medium"
        >
          About

          <ChevronRight
            size={18}
            className={`transition ${
              mobileAboutOpen
                ? "rotate-90"
                : ""
            }`}
          />
        </button>

        {mobileAboutOpen && (
          <div className="bg-slate-50">

            <Link
              href="/about/overview"
              className="block px-10 py-3"
            >
              Overview
            </Link>

            <Link
              href="/about/history"
              className="block px-10 py-3"
            >
              History
            </Link>

            <Link
              href="/about/vision-mission"
              className="block px-10 py-3"
            >
              Vision & Mission
            </Link>

            <Link
              href="/about/aim-objective"
              className="block px-10 py-3"
            >
              Aim & Objective
            </Link>

          </div>
        )}

        {/* Facilities */}

        <button
          onClick={() =>
            setMobileFacilityOpen(
              !mobileFacilityOpen
            )
          }
          className="flex w-full items-center justify-between border-b px-6 py-4 font-medium"
        >
          Facilities

          <ChevronRight
            size={18}
            className={`transition ${
              mobileFacilityOpen
                ? "rotate-90"
                : ""
            }`}
          />
        </button>

        {mobileFacilityOpen && (
          <div className="bg-slate-50">

            <Link
              href="/facilities/hospital-service"
              className="block px-10 py-3"
            >
              Hospital Service
            </Link>

            <Link
              href="/facilities/departments"
              className="block px-10 py-3"
            >
              Departments
            </Link>

            <Link
              href="/facilities/library"
              className="block px-10 py-3"
            >
              Library
            </Link>

            <Link
              href="/facilities/hostel"
              className="block px-10 py-3"
            >
              Hostel
            </Link>

          </div>
        )}

        {/* Admission */}

        <button
          onClick={() =>
            setMobileAdmissionOpen(
              !mobileAdmissionOpen
            )
          }
          className="flex w-full items-center justify-between border-b px-6 py-4 font-medium"
        >
          Admission

          <ChevronRight
            size={18}
            className={`transition ${
              mobileAdmissionOpen
                ? "rotate-90"
                : ""
            }`}
          />
        </button>

        {mobileAdmissionOpen && (
          <div className="bg-slate-50">

            <Link
              href="/admission/procedure"
              className="block px-10 py-3"
            >
              Admission Procedure
            </Link>

            <Link
              href="/admission/application-form"
              className="block px-10 py-3"
            >
              Application Form
            </Link>

            <Link
              href="/admission/result"
              className="block px-10 py-3"
            >
              Admission Result
            </Link>

          </div>
        )}

        <Link
          href="/notice"
          className="block border-b px-6 py-4 font-medium"
        >
          Notice & Media
        </Link>

        <Link
          href="/career"
          className="block border-b px-6 py-4 font-medium"
        >
          Career
        </Link>

      </div>
    </aside>
    </>
  )}

    </header>

  );
}
