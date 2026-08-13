"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { sendContactMessage } from "@/app/contact/actions";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setStatus({
      type: null,
      message: "",
    });

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: result.message,
        });

        form.reset();
      } else {
        setStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      console.error("CONTACT FORM ERROR:", error);

      setStatus({
        type: "error",
        message:
          "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full bg-white px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div
        className="
          mx-auto
          grid
          w-full
          max-w-[1500px]
          grid-cols-1
          gap-8
          lg:grid-cols-[435px_minmax(0,1fr)]
          lg:gap-10
          xl:grid-cols-[435px_minmax(0,1fr)]
          xl:gap-11
        "
      >
        {/* =====================================================
            LEFT — CONTACT INFORMATION
        ====================================================== */}

        <aside
          className="
            h-fit
            bg-[#E8F5EE]
            px-8
            py-10
            sm:px-10
            sm:py-12
            lg:px-8
            lg:py-10
            xl:px-10
            xl:py-12
          "
        >
          <h2
            className="
              border-b
              border-white
              pb-5
              font-serif
              text-3xl
              font-bold
              text-[#008B45]
              sm:text-4xl
            "
          >
            Contact Information
          </h2>

          {/* PHONE */}

          <div className="mt-7">
            <h3 className="text-xl font-bold text-[#444444]">
              Phone No:
            </h3>

            <a
              href="tel:0255080711"
              className="
                mt-2
                block
                text-base
                text-black
                transition-colors
                hover:text-[#008B45]
              "
            >
              0255080711
            </a>
          </div>

          {/* EMAIL */}

          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#444444]">
              Email:
            </h3>

            <a
              href="mailto:uamcoffice08@yahoo.com"
              className="
                mt-2
                block
                break-all
                text-base
                text-black
                transition-colors
                hover:text-[#008B45]
              "
            >
              uamcoffice08@yahoo.com
            </a>
          </div>

          {/* LOCATION */}

          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#444444]">
              Location:
            </h3>

            <p className="mt-2 text-base leading-7 text-black">
              H # 34, R # 4, Sector # 9,
              <br />
              Sonargaon Janapath,
              <br />
              Uttara Model Town
            </p>
          </div>

          {/* OPEN HOURS */}

          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#444444]">
              Open Hours:
            </h3>

            <p className="mt-2 text-base leading-7 text-black">
              Monday - Friday: 8:00 am - 5:00 pm
              <br />
              Saturday - Sunday: 8:00 am - 5:00 pm
            </p>
          </div>

          {/* SOCIAL MEDIA */}

          <div className="mt-8">
            <h3 className="text-xl font-bold text-[#444444]">
              Social Media:
            </h3>

            <div className="mt-4 flex items-center gap-5">
              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  text-xl
                  font-bold
                  text-black
                  transition-colors
                  hover:text-[#008B45]
                "
              >
                f
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  text-base
                  font-bold
                  text-black
                  transition-colors
                  hover:text-[#008B45]
                "
              >
                ▶
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  text-base
                  font-bold
                  text-black
                  transition-colors
                  hover:text-[#008B45]
                "
              >
                in
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  text-2xl
                  font-semibold
                  text-black
                  transition-colors
                  hover:text-[#008B45]
                "
              >
                ◎
              </a>
            </div>
          </div>
        </aside>

        {/* =====================================================
            RIGHT — CONTACT FORM
        ====================================================== */}

        <div className="w-full">
          {/* HEADING */}

          <div
            className="
              border-l-4
              border-[#008B45]
              pl-6
              sm:pl-8
            "
          >
            <h1
              className="
                max-w-[1000px]
                font-serif
                text-4xl
                font-bold
                leading-[1.08]
                text-[#444444]
                sm:text-5xl
                lg:text-[46px]
                xl:text-[50px]
              "
            >
              Keep In Touch, We Want To Hear
              From You - Send Us Message
            </h1>
          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            {/* FIRST NAME + LAST NAME */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
              "
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="
                    mb-3
                    block
                    text-base
                    font-bold
                    text-[#444444]
                  "
                >
                  First Name{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Enter Your First Name"
                  className="
                    h-[74px]
                    w-full
                    border
                    border-transparent
                    bg-[#E8F5EE]
                    px-5
                    text-base
                    text-[#444444]
                    outline-none
                    transition
                    placeholder:text-gray-500
                    focus:border-[#008B45]
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="
                    mb-3
                    block
                    text-base
                    font-bold
                    text-[#444444]
                  "
                >
                  Last Name{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Enter Your Last Name"
                  className="
                    h-[74px]
                    w-full
                    border
                    border-transparent
                    bg-[#E8F5EE]
                    px-5
                    text-base
                    text-[#444444]
                    outline-none
                    transition
                    placeholder:text-gray-500
                    focus:border-[#008B45]
                  "
                />
              </div>
            </div>

            {/* EMAIL + PHONE */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
              "
            >
              <div>
                <label
                  htmlFor="email"
                  className="
                    mb-3
                    block
                    text-base
                    font-bold
                    text-[#444444]
                  "
                >
                  Email{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div
                  className="
                    flex
                    h-[74px]
                    bg-[#E8F5EE]
                  "
                >
                  <div
                    className="
                      flex
                      w-[70px]
                      shrink-0
                      items-center
                      justify-center
                      border-r
                      border-gray-300
                    "
                  >
                    <Mail
                      size={25}
                      strokeWidth={1.7}
                      className="text-[#444444]"
                    />
                  </div>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter Your Valid Email Address"
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      px-4
                      text-base
                      text-[#444444]
                      outline-none
                      placeholder:text-gray-500
                    "
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="
                    mb-3
                    block
                    text-base
                    font-bold
                    text-[#444444]
                  "
                >
                  Phone Number{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div
                  className="
                    flex
                    h-[74px]
                    bg-[#E8F5EE]
                  "
                >
                  <div
                    className="
                      flex
                      w-[70px]
                      shrink-0
                      items-center
                      justify-center
                      border-r
                      border-gray-300
                    "
                  >
                    <Phone
                      size={25}
                      strokeWidth={1.7}
                      className="text-[#444444]"
                    />
                  </div>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Enter Your Valid Contact Number"
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      px-4
                      text-base
                      text-[#444444]
                      outline-none
                      placeholder:text-gray-500
                    "
                  />
                </div>
              </div>
            </div>

            {/* MESSAGE */}

            <div>
              <label
                htmlFor="message"
                className="
                  mb-3
                  block
                  text-base
                  font-bold
                  text-[#444444]
                "
              >
                Write your Message Here
              </label>

              <textarea
                id="message"
                name="message"
                rows={7}
                required
                placeholder="Write your message here..."
                className="
                  min-h-[165px]
                  w-full
                  resize-y
                  border
                  border-transparent
                  bg-[#E8F5EE]
                  px-5
                  py-5
                  text-base
                  text-[#444444]
                  outline-none
                  transition
                  placeholder:text-gray-500
                  focus:border-[#008B45]
                "
              />
            </div>

            {/* PRIVACY */}

            <label
              className="
                flex
                cursor-pointer
                items-start
                gap-3
              "
            >
              <input
                type="checkbox"
                name="privacy"
                required
                className="
                  mt-1
                  h-6
                  w-6
                  shrink-0
                  accent-[#008B45]
                "
              />

              <span
                className="
                  text-base
                  leading-7
                  text-[#444444]
                "
              >
                By submitting this form, you agree
                to the UAMC privacy notice.
              </span>
            </label>

            {/* =================================================
                STATUS MESSAGE
            ================================================== */}

            {status.message && (
              <div
                className={`
                  w-full
                  border
                  px-5
                  py-4
                  text-sm
                  font-medium
                  ${
                    status.type === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }
                `}
              >
                {status.message}
              </div>
            )}

            {/* =================================================
                SUBMIT BUTTON
            ================================================== */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex
                min-w-[275px]
                items-center
                justify-center
                gap-4
                bg-[#008B45]
                px-8
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#006F38]
                focus:outline-none
                focus:ring-2
                focus:ring-[#008B45]
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <span>
                {isSubmitting
                  ? "Sending..."
                  : "Send you message"}
              </span>

              {!isSubmitting && (
                <span
                  className="
                    text-2xl
                    leading-none
                  "
                >
                  →
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}