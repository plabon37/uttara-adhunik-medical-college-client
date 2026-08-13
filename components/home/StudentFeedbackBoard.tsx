"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

import type { StudentFeedback } from "./StudentFeedback";

interface StudentFeedbackBoardProps {
  feedbackList: StudentFeedback[];
}

export default function StudentFeedbackBoard({
  feedbackList,
}: StudentFeedbackBoardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = feedbackList.length;

  // =====================================================
  // SAFE INDEX
  // =====================================================

  const safeIndex =
    total > 0
      ? Math.min(activeIndex, total - 1)
      : 0;

  // =====================================================
  // VISIBLE COUNT
  // =====================================================

  const visibleCount = Math.min(3, total);

  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {
    if (total <= visibleCount) {
      return;
    }

    setActiveIndex((previous) =>
      previous >= total - visibleCount
        ? 0
        : previous + 1
    );
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const handlePrevious = () => {
    if (total <= visibleCount) {
      return;
    }

    setActiveIndex((previous) =>
      previous <= 0
        ? total - visibleCount
        : previous - 1
    );
  };

  // =====================================================
  // CURRENT FEEDBACKS
  // =====================================================

  const visibleFeedback =
    feedbackList.slice(
      safeIndex,
      safeIndex + visibleCount
    );

  // =====================================================
  // CARD
  // =====================================================

  const renderCard = (
    item: StudentFeedback
  ) => {
    const rating = Math.min(
      5,
      Math.max(
        0,
        Number(item.rating) || 0
      )
    );

    return (
      <article
        key={item._id}
        className="
          relative
          flex
          min-w-0
          w-full
          min-h-[380px]
          flex-col
          overflow-hidden
          border
          border-slate-200
          bg-white
          p-6
          sm:p-7
        "
      >
        {/* =================================================
            RATING
        ================================================= */}

        <div className="flex shrink-0 items-center gap-1">
          {[1, 2, 3, 4, 5].map(
            (star) => (
              <Star
                key={`${item._id}-star-${star}`}
                size={18}
                strokeWidth={1.8}
                className={
                  star <= rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }
              />
            )
          )}
        </div>

        {/* =================================================
            FEEDBACK
        ================================================= */}

        <div className="relative mt-6 min-h-0 flex-1">
          <p
            className="
              break-words
              [overflow-wrap:anywhere]
              whitespace-normal
              text-[15px]
              leading-7
              text-slate-600
            "
          >
            {item.feedback}
          </p>
        </div>

        {/* =================================================
            STUDENT
        ================================================= */}

        <div
          className="
            mt-7
            flex
            min-w-0
            shrink-0
            items-center
            gap-3
            border-t
            border-slate-100
            pt-5
          "
        >
          {/* =================================================
              IMAGE
          ================================================= */}

          <div
            className="
              relative
              h-14
              w-14
              shrink-0
              overflow-hidden
              rounded-full
              bg-[#EAF5EE]
            "
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name || "Student"}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  text-lg
                  font-bold
                  text-[#008B45]
                "
              >
                {item.name
                  ?.charAt(0)
                  .toUpperCase() || "S"}
              </div>
            )}
          </div>

          {/* =================================================
              INFORMATION
          ================================================= */}

          <div className="min-w-0 flex-1">
            <h3
              className="
                truncate
                text-base
                font-bold
                text-[#008B45]
              "
            >
              {item.name}
            </h3>

            <p
              className="
                mt-1
                truncate
                text-sm
                text-slate-600
              "
            >
              {item.designation}
            </p>
          </div>

          {/* =================================================
              QUOTE
          ================================================= */}

          <div
            className="
              shrink-0
              text-[#008B45]
              opacity-70
            "
          >
            <Quote
              size={55}
              strokeWidth={1.2}
            />
          </div>
        </div>
      </article>
    );
  };

  // =====================================================
  // EMPTY
  // =====================================================

  if (total === 0) {
    return null;
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#F7F9F8]
        px-4
        py-16
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1280px]
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center">
          <h2
            className="
              font-serif
              text-4xl
              font-bold
              text-[#008B45]
              sm:text-5xl
              lg:text-[52px]
            "
          >
            My Students Feedback
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            You’ll find something to spark your
            curiosity and enhance
          </p>
        </div>

        {/* =================================================
            DESKTOP
        ================================================= */}

        <div
          className="
            relative
            mt-12
            hidden
            w-full
            lg:block
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-3
              gap-6
            "
          >
            {visibleFeedback.map(
              (item) =>
                renderCard(item)
            )}
          </div>

          {total > 3 && (
            <>
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous feedback"
                className="
                  absolute
                  -left-5
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  shadow-md
                  transition
                  hover:bg-[#008B45]
                  hover:text-white
                "
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next feedback"
                className="
                  absolute
                  -right-5
                  top-1/2
                  flex
                  h-11
                  w-11
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  shadow-md
                  transition
                  hover:bg-[#008B45]
                  hover:text-white
                "
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* =================================================
            TABLET
        ================================================= */}

        <div
          className="
            relative
            mt-12
            hidden
            w-full
            sm:block
            lg:hidden
          "
        >
          <div
            className="
              grid
              w-full
              grid-cols-2
              gap-5
            "
          >
            {visibleFeedback
              .slice(0, 2)
              .map((item) =>
                renderCard(item)
              )}
          </div>

          {total > 2 && (
            <div
              className="
                mt-7
                flex
                justify-center
                gap-3
              "
            >
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous feedback"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next feedback"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            MOBILE
        ================================================= */}

        <div
          className="
            relative
            mt-10
            block
            w-full
            sm:hidden
          "
        >
          {renderCard(
            feedbackList[safeIndex]
          )}

          {total > 1 && (
            <div
              className="
                mt-7
                flex
                justify-center
                gap-3
              "
            >
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous feedback"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next feedback"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            DOTS
        ================================================= */}

        {total > 3 && (
          <div
            className="
              mt-7
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {feedbackList.map(
              (item, index) => (
                <button
                  key={`dot-${item._id}`}
                  type="button"
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  aria-label={`Show feedback ${
                    index + 1
                  }`}
                  className={
                    safeIndex === index
                      ? "h-2 w-7 rounded-full bg-[#008B45]"
                      : "h-2 w-2 rounded-full bg-slate-300"
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}