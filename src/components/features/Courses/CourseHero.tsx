import { Button } from "@/components/shared/button";
import { YoutubeEmbed } from "@/components/shared/youtubeEmbed";
import { useCustomNavigation } from "@/lib/hooks/useCustomNavigation";
import type { Course } from "@/types/course";
import { Lock } from "lucide-react";
import { useState } from "react";
import { CiDollar } from "react-icons/ci";

import { FaListCheck, FaRegCirclePlay } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import { TfiStatsUp } from "react-icons/tfi";

export function CourseHeroSection({ course }: { course: Course }) {
  const navigate = useCustomNavigation();
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <section className="relative w-full px-48 overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="flex justify-between items-center gap-24 lg:gap-12">
        {/* Left Content */}
        <div className="space-y-6 w-1/3">
          {/* Title */}
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            {course?.title}
          </h1>

          {/* Description */}
          <p className="text-sm leading-relaxed text-brand-gray md:text-base">
            {course?.description}
          </p>

          {/* Course Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Level */}
            <div className="flex items-center gap-3">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <TfiStatsUp className="m-2 p-1 size-9" />
              </div>
              <span className="text-sm font-medium md:text-base">
                Level: {course?.level}
              </span>
            </div>

            {/* Sessions */}
            <div className="flex items-center gap-3 ">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <PiVideo className="m-2 p-1 size-9" />
              </div>
              <span className="text-sm font-medium md:text-base">
                sessions: {course?.sessions_count}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 ">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <LuCalendarClock className="m-2 p-1 size-9" />
              </div>{" "}
              <span className="text-sm font-medium md:text-base">
                {course?.duration} weeks
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 ">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <CiDollar className="m-2 p-1 size-9" />
              </div>{" "}
              <span className="text-sm font-medium md:text-base">
                {course?.price} {course?.currency}
              </span>
            </div>
          </div>

          {/* Learning Plan Button */}
          <button className="flex w-full items-center justify-between border-2 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <FaListCheck className="m-2 p-1 size-8" />
              </div>
              <span className="text-sm font-medium md:text-base">
                Learning Plan
              </span>
            </div>
            <Lock className="h-5 w-5 text-gray-400" />
          </button>

          {/* CTA Button */}
          <Button
            onClick={() => navigate("/checkout", { state: { course } })}
            className="w-full text-lg px-8 py-6 md:w-auto"
          >
            Start learn now
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative flex items-center justify-center w-1/2">
          <div
            style={{
              top: 220,
              left: 300,
              transform: `rotate(${-14}deg) scale(${6})`,
            }}
            className="absolute w-36 h-16 bg-[#66BEFF] rounded-[50%] z-n1"
          ></div>
          <div
            style={{
              top: 220,
              left: 300,
              transform: `rotate(${30}deg) scale(${6})`,
            }}
            className="absolute w-36 h-16 bg-linear-to-t from-[#90d1ff] via-[#C6E7FF] to-white rounded-[50%] z-n1"
          ></div>
          {/* Image Container */}

          {/* TODO: this is preview video */}
          <div className="aspect-square w-[450px] relative overflow-hidden rounded-2xl">
            {playVideo ? (
              <YoutubeEmbed url={course?.preview_video} title={course?.title} />
            ) : (
              <>
                <img
                  src={course?.preview_video_thumbnail}
                  alt="English course illustration"
                  className="h-full w-full object-cover"
                />
                <FaRegCirclePlay
                  onClick={() => setPlayVideo(true)}
                  size={100}
                  className="cursor-pointer text-white/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
