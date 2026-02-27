import { Circle } from "@/components/shared/Circle";

export function ProfileHeader() {
  return (
    <div className="relative bg-brand-primary px-4 pt-8 h-52 sm:h-60">
      {/* Circles wrapped in overflow-hidden so they don't cause page scroll,
          but the avatar (outside this div) is NOT clipped */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Circle size={200} x={"90%"} y={-100} color="#FFFFFF1F" />
        <Circle size={100} x={"86%"} y={70} color="#FFFFFF1F" />
        <Circle size={50} x={"86%"} y={10} color="#FFFFFF1F" />
        <Circle size={150} x={"3%"} y={10} color="#FFFFFF1F" />
        <Circle size={100} x={"-2%"} y={140} color="#FFFFFF1F" />
      </div>

      {/* Avatar — sits outside the overflow-hidden div so it shows fully */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0">
        <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
          <img
            src="/user-placeholder.png"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
