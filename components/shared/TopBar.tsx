import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden border-b border-slate-200 bg-white lg:block">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 xl:px-10">

        {/* Left */}

        <div className="flex items-center gap-10">

          {/* Address */}

          <div className="flex items-center gap-4">

            <MapPin
              size={28}
              strokeWidth={1.8}
              className="text-slate-500"
            />

            <div className="leading-6">

              <p className="text-[17px] font-medium text-slate-600">
                House - 34, Road - 4,
                Sector - 9,
              </p>

              <p className="text-[17px] text-slate-500">
                Sonargaon Janapath,
                Uttara Model Town
              </p>

            </div>

          </div>

          {/* Email */}

          <Link
            href="mailto:info@uamc.com"
            className="flex items-center gap-3 transition hover:text-emerald-600"
          >

            <Mail
              size={26}
              strokeWidth={1.8}
            />

            <span className="text-[18px] text-slate-600">
              info@uamc.com
            </span>

          </Link>

          {/* Phone */}

          <Link
            href="tel:+8801700220000"
            className="flex items-center gap-3 transition hover:text-emerald-600"
          >

            <Phone
              size={26}
              strokeWidth={1.8}
            />

            <span className="text-[18px] text-slate-600">
              +880 1700-220000
            </span>

          </Link>

        </div>

        {/* Right */}

        <div className="flex items-center">

          <Link
            href="#"
            className="px-8 text-[18px] font-medium text-slate-700 transition hover:text-emerald-600"
          >
            Student Portal
          </Link>

          <div className="h-8 w-px bg-slate-300" />

          <Link
            href="#"
            className="px-8 text-[18px] font-medium text-slate-700 transition hover:text-emerald-600"
          >
            Teachers Portal
          </Link>

          <div className="h-8 w-px bg-slate-300" />

          <Link
            href="#"
            className="px-8 text-[18px] font-medium text-slate-700 transition hover:text-emerald-600"
          >
            Alumni
          </Link>

          <div className="h-8 w-px bg-slate-300" />

          <Link
            href="#"
            className="px-8 text-[18px] font-medium text-slate-700 transition hover:text-emerald-600"
          >
            Events
          </Link>

          <div className="h-8 w-px bg-slate-300" />

          <Link
            href="#"
            className="pl-8 text-[18px] font-medium text-slate-700 transition hover:text-emerald-600"
          >
            Contact Us
          </Link>

        </div>

      </div>
    </div>
  );
}