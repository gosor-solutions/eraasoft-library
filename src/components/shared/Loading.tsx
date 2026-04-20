import { Loader } from "lucide-react";

export function Loading({
  size = 20,
  color = "#000000",
  fullScreen = false,
}: {
  size?: number;
  color?: string;
  fullScreen?: boolean;
}) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden">
        <div className="relative flex items-center justify-center">
          {/* Circle loading indicator around it */}
          <div 
            className="absolute border-4 border-t-brand-primary border-r-transparent border-b-brand-primary border-l-transparent rounded-full animate-spin"
            style={{ width: "120px", height: "120px" }}
          ></div>
          {/* Logo pulsed */}
          <img 
            src="/englivision-logo-color.png" 
            alt="Englivision" 
            className="w-24 h-24 object-contain animate-pulse-logo z-10"
          />
        </div>
        
        {/* Text with fade in/out effect */}
        <p className="mt-12 text-lg md:text-3xl capitalize font-medium text-brand-primary animate-fade-text tracking-wide px-4 text-center">
          start your learning journey today...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center my-4">
      <Loader size={size} className={`animate-spin`} style={{ color }} />
    </div>
  );
}
