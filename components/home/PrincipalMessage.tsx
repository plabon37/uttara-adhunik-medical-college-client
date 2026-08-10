"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// =========================================================
// TYPE
// =========================================================

interface PrincipalMessageData {
  _id?: string;

  tagline: string;

  titlePrefix: string;

  titleHighlight: string;

  signatureImage: string;

  principalName: string;

  designation: string;

  heading: string;

  description: string;

  principalImage: string;

  buttonText: string;

  buttonLink: string;

  isActive: boolean;
}

// =========================================================
// API RESPONSE
// =========================================================

interface PrincipalMessageApiResponse {
  success?: boolean;

  message?: string;

  data?: PrincipalMessageData | null;
}

// =========================================================
// COMPONENT
// =========================================================

export default function PrincipalMessage() {
  // =======================================================
  // STATE
  // =======================================================

  const [principalMessage, setPrincipalMessage] =
    useState<PrincipalMessageData | null>(null);

  const [loading, setLoading] = useState(true);

  // =======================================================
  // FETCH PRINCIPAL MESSAGE
  // =======================================================

  useEffect(() => {
    async function loadPrincipalMessage() {
      try {
        const adminUrl =
          process.env.NEXT_PUBLIC_ADMIN_URL;

        if (!adminUrl) {
          throw new Error(
            "NEXT_PUBLIC_ADMIN_URL is not configured."
          );
        }

        const response = await fetch(
          `${adminUrl}/api/principal-message`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch Principal Message."
          );
        }

        const result: PrincipalMessageApiResponse =
          await response.json();

        if (
          !result.success ||
          !result.data
        ) {
          setPrincipalMessage(null);
          return;
        }

        if (
          !result.data.isActive
        ) {
          setPrincipalMessage(null);
          return;
        }

        setPrincipalMessage(
          result.data
        );
      } catch (error) {
        console.error(
          "CLIENT PRINCIPAL MESSAGE ERROR:",
          error
        );

        setPrincipalMessage(null);
      } finally {
        setLoading(false);
      }
    }

    loadPrincipalMessage();
  }, []);

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <section
        className="
          w-full
          bg-[#EAF6EE]
        "
      >
        <div
          className="
            mx-auto
            min-h-[800px]
            w-full
            max-w-[1920px]
            animate-pulse
            bg-[#EAF6EE]
          "
        />
      </section>
    );
  }

  // =======================================================
  // NO DATA
  // =======================================================

  if (!principalMessage) {
    return null;
  }

  // =======================================================
  // DESIGNATION
  // =======================================================

  const designation =
    principalMessage.designation || "";

  const designationParts =
    designation.split("(");

  const designationMain =
    designationParts[0]?.trim() || "";

  const designationSub =
    designationParts[1]
      ?.replace(")", "")
      .trim() || "";

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#EAF6EE]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1920px]
        "
      >

        {/* =================================================
            TOP HEADER
        ================================================= */}

        <div
          className="
            px-5
            pt-8
            text-center

            sm:px-8
            sm:pt-10

            md:px-10
            md:pt-12

            lg:px-14
            lg:pt-14

            xl:px-16
            xl:pt-16
          "
        >

          {/* =================================================
              TAGLINE
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                text-[18px]
                leading-none

                sm:text-[20px]

                lg:text-[23px]
              "
            >
              🎓
            </span>

            <span
              className="
                text-[14px]
                font-medium
                tracking-[0.02em]
                text-[#008B45]

                sm:text-[15px]

                lg:text-[17px]
              "
            >
              {
                principalMessage.tagline
              }
            </span>
          </div>

          {/* =================================================
              SPACE BETWEEN TAGLINE & TITLE
          ================================================= */}

          <div
            className="
              h-4

              sm:h-5

              lg:h-6
            "
          />

          {/* =================================================
              MAIN TITLE
          ================================================= */}

          <h2
            className="
              m-0
              font-serif
              text-[40px]
              font-bold
              leading-[1.08]
              tracking-[-0.025em]
              text-black

              sm:text-[48px]

              md:text-[56px]

              lg:text-[64px]

              xl:text-[72px]
            "
          >
            {
              principalMessage.titlePrefix
            }{" "}

            <span
              className="
                text-[#F6BE21]
              "
            >
              {
                principalMessage.titleHighlight
              }
            </span>
          </h2>

        </div>

        {/* =================================================
            SPACE BETWEEN HEADER & CONTENT
        ================================================= */}

        <div
          className="
            h-14

            sm:h-16

            md:h-20

            lg:h-24

            xl:h-28
          "
        />

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div
          className="
            mx-auto
            grid
            w-[92%]
            grid-cols-1

            md:w-[91%]

            lg:w-[90%]
            lg:grid-cols-[51%_49%]

            xl:w-[89.5%]
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              flex
              min-h-[700px]
              flex-col
              justify-center

              px-0
              pb-16
              pt-4

              sm:min-h-[720px]
              sm:pb-18

              lg:min-h-[760px]
              lg:pb-20

              xl:min-h-[790px]
            "
          >

            {/* =================================================
                SIGNATURE AREA
            ================================================= */}

            <div
              className="
                mb-8
                flex
                h-[95px]
                w-[230px]
                items-center
                justify-start
                overflow-hidden

                sm:mb-9
                sm:h-[105px]
                sm:w-[260px]

                lg:mb-10
                lg:h-[115px]
                lg:w-[285px]

                xl:h-[125px]
                xl:w-[310px]
              "
            >
              {principalMessage.signatureImage ? (
                <Image
                  src={
                    principalMessage.signatureImage
                  }
                  alt="Principal signature"
                  width={310}
                  height={125}
                  className="
                    block
                    h-full
                    w-full
                    object-contain
                    object-left
                  "
                />
              ) : (
                <div
                  className="
                    h-full
                    w-full
                  "
                />
              )}
            </div>

            {/* =================================================
                HONORABLE
            ================================================= */}

            <p
              className="
                m-0
                font-serif
                text-[26px]
                font-bold
                leading-[1.1]
                text-black

                sm:text-[28px]

                lg:text-[30px]

                xl:text-[32px]
              "
            >
              Honorable
            </p>

            {/* =================================================
                SPACE
            ================================================= */}

            <div
              className="
                h-1
              "
            />

            {/* =================================================
                PRINCIPAL NAME
            ================================================= */}

            <h3
              className="
                m-0
                max-w-[900px]
                font-serif
                text-[28px]
                font-bold
                leading-[1.18]
                text-[#008B45]

                sm:text-[32px]

                md:text-[35px]

                lg:text-[38px]

                xl:text-[41px]
              "
            >
              {
                principalMessage.principalName
              }
            </h3>

            {/* =================================================
                SPACE BEFORE DESIGNATION
            ================================================= */}

            <div
              className="
                h-7

                sm:h-8

                lg:h-9
              "
            />

            {/* =================================================
                DESIGNATION
            ================================================= */}

            <div
              className="
                flex
                flex-wrap
                items-baseline
                gap-x-3
                gap-y-2
              "
            >
              <h4
                className="
                  m-0
                  font-serif
                  text-[58px]
                  font-bold
                  leading-[0.92]
                  tracking-[-0.025em]
                  text-[#454545]

                  sm:text-[64px]

                  md:text-[69px]

                  lg:text-[75px]

                  xl:text-[82px]
                "
              >
                {
                  designationMain
                }
              </h4>

              {designationSub && (
                <span
                  className="
                    font-serif
                    text-[18px]
                    font-medium
                    leading-none
                    text-[#454545]

                    sm:text-[20px]

                    lg:text-[23px]
                  "
                >
                  (
                  {
                    designationSub
                  }
                  )
                </span>
              )}
            </div>

            {/* =================================================
                SPACE BEFORE HEADING
            ================================================= */}

            <div
              className="
                h-5

                sm:h-6

                lg:h-7
              "
            />

            {/* =================================================
                HEADING
            ================================================= */}

            {principalMessage.heading && (
              <h5
                className="
                  m-0
                  max-w-[800px]
                  text-[18px]
                  font-bold
                  leading-[1.3]
                  text-[#454545]

                  sm:text-[20px]

                  lg:text-[22px]

                  xl:text-[23px]
                "
              >
                {
                  principalMessage.heading
                }
              </h5>
            )}

            {/* =================================================
                SPACE BEFORE DESCRIPTION
            ================================================= */}

            <div
              className="
                h-5

                sm:h-6

                lg:h-7
              "
            />

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                m-0
                max-w-[850px]
                text-[15px]
                font-normal
                leading-[1.55]
                text-[#505050]

                sm:text-[16px]

                sm:leading-[1.55]

                lg:text-[17px]

                lg:leading-[1.5]

                xl:text-[18px]
              "
            >
              {
                principalMessage.description
              }
            </p>

            {/* =================================================
                SPACE BEFORE BUTTON
            ================================================= */}

            <div
              className="
                h-9

                sm:h-10

                lg:h-11
              "
            />

            {/* =================================================
                BUTTON
            ================================================= */}

            {principalMessage.buttonText && (
              <div>
                <Link
                  href={
                    principalMessage.buttonLink ||
                    "#"
                  }
                  className="
                    inline-flex
                    h-[54px]
                    min-w-[275px]
                    items-center
                    justify-center
                    gap-5
                    bg-[#008F45]
                    px-8
                    text-[16px]
                    font-medium
                    text-white
                    transition-all
                    duration-300
                    hover:bg-[#007A3B]

                    sm:h-[56px]
                    sm:text-[17px]

                    lg:min-w-[275px]
                  "
                >
                  <span>
                    {
                      principalMessage.buttonText
                    }
                  </span>

                  <span
                    className="
                      text-[25px]
                      leading-none
                      transition-transform
                      duration-300
                    "
                  >
                    →
                  </span>
                </Link>
              </div>
            )}

          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================= */}

          <div
            className="
              relative
              min-h-[580px]
              w-full
              overflow-hidden

              sm:min-h-[650px]

              md:min-h-[700px]

              lg:min-h-[760px]

              xl:min-h-[790px]
            "
          >
            {principalMessage.principalImage ? (
              <Image
                src={
                  principalMessage.principalImage
                }
                alt={
                  principalMessage.principalName
                    ? `Photo of ${principalMessage.principalName}`
                    : "Principal"
                }
                fill
                priority
                sizes="
                  (max-width: 1024px) 100vw,
                  49vw
                "
                className="
                  object-cover
                  object-center
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  min-h-[580px]
                  items-center
                  justify-center
                  bg-white
                  text-sm
                  text-slate-400
                "
              >
                Principal image
              </div>
            )}
          </div>

        </div>

        {/* =================================================
            BOTTOM SPACE
        ================================================= */}

        <div
          className="
            h-14

            sm:h-16

            lg:h-20

            xl:h-24
          "
        />

      </div>
    </section>
  );
}