import { Loader } from "lucide-react";

export function Loading({
  size = 20,
  color = "#000000",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <div className="w-full flex justify-center my-4">
      <Loader size={size} className={`animate-spin`} style={{ color }} />
    </div>
  );
}
