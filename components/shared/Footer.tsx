import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black">

      {/* Top Border */}

      <div className="mx-auto max-w-[1600px] border-t border-white/10" />

      {/* Bottom */}

      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-center px-5">

        <p className="text-center text-base text-gray-500">

          Copyright @{" "}
          <span className="text-gray-400">
            2024.
          </span>{" "}

          All Rights Reserved by{" "}

          <Link
            href="https://unipix.com"
            target="_blank"
            className="
              font-medium
              text-white
              transition
              duration-300
              hover:text-emerald-400
            "
          >
            Unipix
          </Link>

        </p>

      </div>

    </footer>
  );
}