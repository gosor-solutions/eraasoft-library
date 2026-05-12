import { Button } from "@/components/shared/button";
import { YoutubeEmbed } from "@/components/shared/youtubeEmbed";
import { useGetSettings } from "@/hooks/queries/useSettingsQueries";
import type { Course } from "@/types/course";
import { Lock } from "lucide-react";
import { useState } from "react";
import { CiDollar } from "react-icons/ci";
import { FaListCheck, FaRegCirclePlay } from "react-icons/fa6";
import { LuCalendarClock } from "react-icons/lu";
import { PiVideo } from "react-icons/pi";
import { TfiStatsUp } from "react-icons/tfi";

export function CourseHeroSection({ course }: { course: Course }) {
  const { data: settings } = useGetSettings();

  const [playVideo, setPlayVideo] = useState(false);

  const infoItems = [
    { icon: TfiStatsUp, label: `Level: ${course?.level}` },
    { icon: PiVideo, label: `Sessions: ${course?.sessions_count}` },
    { icon: LuCalendarClock, label: `${course?.duration} weeks` },
    { icon: CiDollar, label: `${course?.price}` },
  ];

  const handleCTA = () => {
      const whatsappNumber = settings?.whatsapp_num_1 || "";
      const message = encodeURIComponent(
        `Hello, I'm interested in the "${course.title}" course. Can I get more information?`,
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    
  };

  return (
    <section className="relative w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10 lg:gap-12">
        {/* Left Content */}
        <div className="space-y-6 w-full lg:w-1/2 xl:w-1/3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight text-center lg:text-left">
            {course?.title}
          </h1>

          <p className="text-sm leading-relaxed text-brand-gray md:text-base text-center lg:text-left">
            {course?.description}
          </p>

          {/* Course Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {infoItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="bg-brand-secondary rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="m-2 p-1 size-9" />
                </div>
                <span className="text-sm font-medium md:text-base">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Learning Plan */}
          <button  onClick={()=>window.open(course?.learning_plan, "_blank")}  className="flex w-full cursor-pointer  items-center justify-between border-2 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className=" flex items-center gap-3">
              <div className="bg-brand-secondary rounded-lg flex items-center justify-center shrink-0">
                <FaListCheck className="m-2 p-1 size-8" />
              </div>
              <span className="text-sm font-medium md:text-base">
                Learning Plan
              </span>
            </div>
            <Lock className="h-5 w-5 text-gray-400 shrink-0" />
          </button>

          {/* CTA */}
          <Button onClick={handleCTA} className="w-full text-lg px-8 py-6">
            Start learn now
          </Button>
        </div>

        {/* Right Image */}
        <div className="relative flex items-center justify-center w-full lg:w-1/2">
          {/* Decorative blobs — clipped so they don't overflow */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div
              className="absolute w-36 h-16 bg-[#66BEFF] rounded-[50%]"
              style={{
                top: 170,
                left: "50%",
                transform: "translateX(-50%) rotate(-14deg) scale(7)",
              }}
            />
            <div
              className="absolute w-36 h-16 bg-gradient-to-t from-[#90d1ff] via-[#C6E7FF] to-white rounded-[50%]"
              style={{
                top: 170,
                left: "50%",
                transform: "translateX(-50%) rotate(30deg) scale(7)",
              }}
            />
          </div>

          <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] overflow-hidden rounded-2xl">
            {playVideo ? (
              <YoutubeEmbed url={course?.preview_video} title={course?.title} />
            ) : (
              <>
                <img
                  src={course?.preview_video_thumbnail}
                  alt="course illustration"
                  className="h-full w-full object-cover"
                />
                <FaRegCirclePlay
                  onClick={() => setPlayVideo(true)}
                  size={100}
                  className="cursor-pointer text-white/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </>
            )}{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
