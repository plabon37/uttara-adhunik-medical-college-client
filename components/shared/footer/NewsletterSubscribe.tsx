"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState<"success" | "error" | "">("");

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const trimmedEmail =
      email.trim().toLowerCase();

    if (!trimmedEmail) {
      setMessage(
        "Please enter your email address."
      );

      setMessageType("error");

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setMessage(
        "Please enter a valid email address."
      );

      setMessageType("error");

      return;
    }

    // =====================================================
    // ADMIN URL
    // =====================================================

    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_URL;

    if (!adminUrl) {
      console.error(
        "NEXT_PUBLIC_ADMIN_URL is not configured."
      );

      setMessage(
        "Newsletter service is currently unavailable."
      );

      setMessageType("error");

      return;
    }

    try {
      setLoading(true);

      // ===================================================
      // REMOVE TRAILING SLASH
      // ===================================================

      const baseUrl =
        adminUrl.replace(
          /\/+$/,
          ""
        );

      // ===================================================
      // SEND TO ADMIN API
      // ===================================================

      const response =
        await fetch(
          `${baseUrl}/api/newsletter`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body: JSON.stringify({
              email: trimmedEmail,
            }),
          }
        );

      // ===================================================
      // READ RESPONSE
      // ===================================================

      const result =
        await response.json();

      // ===================================================
      // API ERROR
      // ===================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        setMessage(
          result?.message ||
            "Unable to subscribe. Please try again."
        );

        setMessageType("error");

        return;
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      setMessage(
        "Successfully subscribed to our newsletter!"
      );

      setMessageType("success");

      setEmail("");
    } catch (error) {
      console.error(
        "NEWSLETTER SUBSCRIPTION ERROR:",
        error
      );

      setMessage(
        "Something went wrong. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="w-full">

      {/* =================================================
          FORM
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col sm:flex-row"
      >

        {/* =================================================
            EMAIL
        ================================================= */}

        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          placeholder="Enter Your mail"
          disabled={loading}
          autoComplete="email"
          className="h-[66px] w-full border border-[#008B45] bg-transparent px-6 text-base text-white outline-none placeholder:text-white/90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
        />

        {/* =================================================
            BUTTON
        ================================================= */}

        <button
          type="submit"
          disabled={loading}
          className="flex h-[66px] w-full shrink-0 items-center justify-center gap-2 bg-white px-8 text-base font-medium text-[#171536] transition hover:bg-[#008B45] hover:text-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-[260px]"
        >
          {loading ? (
            <>
              <Loader2
                size={19}
                className="animate-spin"
              />

              Submitting...
            </>
          ) : (
            <>
              Submit Button

              <ArrowUpRight
                size={20}
                strokeWidth={1.8}
              />
            </>
          )}
        </button>
      </form>

      {/* =================================================
          MESSAGE
      ================================================= */}

      {message && (
        <p
          className={`mt-3 text-sm ${
            messageType === "success"
              ? "text-[#4ADE80]"
              : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}