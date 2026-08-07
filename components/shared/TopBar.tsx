import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">

          {/* ================= Left ================= */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 xl:gap-10">

            {/* Address */}

            <div className="flex items-start gap-3">

              <MapPin
                size={24}
                strokeWidth={1.8}
                className="mt-1 shrink-0 text-slate-500"
              />

              <div className="leading-5">

                <p className="text-sm font-medium text-slate-700 xl:text-base">
                  House - 34, Road - 4, Sector - 9,
                </p>

                <p className="text-sm text-slate-500 xl:text-base">
                  Sonargaon Janapath, Uttara Model Town
                </p>

              </div>

            </div>

            {/* Email */}

            <Link
              href="mailto:info@uamc.com"
              className="flex items-center gap-3 text-slate-600 transition hover:text-emerald-600"
            >
              <Mail size={22} />

              <span className="text-sm xl:text-base">
                info@uamc.com
              </span>
            </Link>

            {/* Phone */}

            <Link
              href="tel:+8801700220000"
              className="flex items-center gap-3 text-slate-600 transition hover:text-emerald-600"
            >
              <Phone size={22} />

              <span className="text-sm xl:text-base">
                +880 1700-220000
              </span>
            </Link>

          </div>

          {/* ================= Right ================= */}

          <div className="flex flex-wrap items-center justify-start gap-y-3 lg:justify-end">

            <Link
              href="#"
              className="px-3 text-sm font-medium text-slate-700 transition hover:text-emerald-600 xl:px-6 xl:text-base"
            >
              Student Portal
            </Link>

            <div className="hidden h-6 w-px bg-slate-300 md:block" />

            <Link
              href="#"
              className="px-3 text-sm font-medium text-slate-700 transition hover:text-emerald-600 xl:px-6 xl:text-base"
            >
              Teachers Portal
            </Link>

            <div className="hidden h-6 w-px bg-slate-300 md:block" />

            <Link
              href="#"
              className="px-3 text-sm font-medium text-slate-700 transition hover:text-emerald-600 xl:px-6 xl:text-base"
            >
              Alumni
            </Link>

            <div className="hidden h-6 w-px bg-slate-300 md:block" />

            <Link
              href="#"
              className="px-3 text-sm font-medium text-slate-700 transition hover:text-emerald-600 xl:px-6 xl:text-base"
            >
              Events
            </Link>

            <div className="hidden h-6 w-px bg-slate-300 md:block" />

            <Link
              href="#"
              className="px-3 text-sm font-medium text-slate-700 transition hover:text-emerald-600 xl:pl-6 xl:text-base"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}