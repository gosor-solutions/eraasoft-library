import { Circle } from "@/components/shared/Circle";
import Image from "next/image"

export function ProfileHeader() {
  return (
    <>
      <div className="relative bg-brand-primary px-4 pb-24 pt-8 h-60">
        <Circle size={200} x={"90%"} y={-100} color="#FFFFFF1F" />
        <Circle size={100} x={"86%"} y={70} color="#FFFFFF1F" />
        <Circle size={50} x={"86%"} y={10} color="#FFFFFF1F" />

        <Circle size={150} x={"3%"} y={10} color="#FFFFFF1F" />
        <Circle size={100} x={"-2%"} y={140} color="#FFFFFF1F" />

        {/* Avatar */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0">
          <div className="h-48 w-h-48 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
            <Image
              width={200}
              height={200}
              src="/user-placeholder.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
