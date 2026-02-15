import { Button } from "@/components/shared/Button";
import { MyLink } from "@/components/shared/MyLink";
import { Lock } from "lucide-react";
import { CiDollar } from "react-icons/ci";

import Image from "next/image";
import { FaListCheck } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import { TfiStatsUp } from "react-icons/tfi";

export function CourseHeroSection() {
  return (
    <section className="relative w-full px-48 overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="flex justify-between items-center gap-24 lg:gap-12">
        {/* Left Content */}
        <div className="space-y-6 w-1/3">
          {/* Title */}
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            English course
            <br />
            For Adults
          </h1>

          {/* Description */}
          <p className="text-sm leading-relaxed text-brand-gray md:text-base">
            s simply dummy text of the printing and typesetting industry s
            simply dummy text of the printing and typesetting industry
            <br />s simply dummy text of the printing and typesetting industry s
            simply dummy text of the printing and typesetting industry
          </p>

          {/* Course Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Level */}
            <div className="flex items-center gap-3">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <TfiStatsUp className="m-2 p-1 size-9 text-2xl text-brand-primary" />
              </div>
              <span className="text-sm font-medium md:text-base">
                Level: A1
              </span>
            </div>

            {/* Sessions */}
            <div className="flex items-center gap-3 ">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <PiVideo className="m-2 p-1 size-9 text-2xl text-brand-primary" />
              </div>
              <span className="text-sm font-medium md:text-base">
                sessions: 24
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 ">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <LuCalendarClock className="m-2 p-1 size-9 text-2xl text-brand-primary" />
              </div>{" "}
              <span className="text-sm font-medium md:text-base">8 weeks</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 ">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <CiDollar className="m-2 p-1 size-9 text-2xl text-brand-primary" />
              </div>{" "}
              <span className="text-sm font-medium md:text-base">5000 EGP</span>
            </div>
          </div>

          {/* Learning Plan Button */}
          <button className="flex w-full items-center justify-between border-2 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center">
                <FaListCheck className="m-2 p-1 size-8 text-2xl text-brand-primary" />
              </div>
              <span className="text-sm font-medium md:text-base">
                Learning Plan
              </span>
            </div>
            <Lock className="h-5 w-5 text-gray-400" />
          </button>

          {/* CTA Button */}
          <Button
            // onClick={() => navigate("/course-details")}
            className="w-full text-lg px-8 py-6 md:w-auto"
          >
            <MyLink to="/course-details">Start learn now</MyLink>
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative flex items-center justify-center w-1/2">
          {/* Image Container */}
          <div className="aspect-square w-[450px] relative z-10 overflow-hidden rounded-2xl">
            <Image
              src="/course-hero.jpg"
              alt="English course illustration"
              className="h-full w-full object-cover"
              width={450}
              height={450}
            />
          </div>
          <div
            style={{
              top: 170,
              left: 300,
              transform: `rotate(${-14}deg) scale(${7})`,
            }}
            className="absolute w-36 h-16 bg-[#66BEFF] rounded-[50%] z-n1"
          ></div>
          <div
            style={{
              top: 170,
              left: 300,
              transform: `rotate(${30}deg) scale(${7})`,
            }}
            className="absolute w-36 h-16 bg-linear-to-t from-[#90d1ff] via-[#C6E7FF] to-white rounded-[50%] z-n1"
          ></div>
        </div>
      </div>
    </section>
  );
}
