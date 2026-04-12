import { Button } from "@/components/shared/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shared/carousel";
import { MyLink } from "@/components/shared/MyLink";
import { useGetHeroSlides } from "@/hooks/queries/useHomeQueries";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

// Main Hero Component
export function HeroSection() {
  const { data: slidesResponse, isLoading } = useGetHeroSlides();
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  if (isLoading) {
    return (
      <section className="min-h-[80vh] relative py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gray-900">
        <div className="animate-pulse w-full max-w-4xl h-64 bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="animate-pulse w-48 h-12 bg-gray-700 rounded mb-8"></div>
        </div>
      </section>
    );
  }

  const slides = slidesResponse?.data || [];
  
  if (slides.length === 0) {
    // Fallback if no slides are returned
    return <StaticHeroFallback />;
  }

  return (
    <section className="min-h-[80vh] relative overflow-hidden group">
      <Carousel
        opts={{loop: true}}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="min-h-[80vh] relative py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image_path}
                    alt={slide.title || "Hero image"}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gray-900/60"></div>
                </div>

                {/* Content */}
                <div className="relative w-full max-w-4xl mx-auto text-center">
                  <div className="space-y-6 sm:space-y-8 py-10 sm:py-14 lg:py-20">
                    <Logo />

                    {slide.title && (
                      <h1 className="font-inter text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
                        {slide.title}
                      </h1>
                    )}

                    {slide.description && (
                      <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
                        {slide.description}
                      </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-6 sm:px-0 mt-6">
                      {slide.cta_text_1 && slide.cta_link_1 && (
                        <DynamicCTA
                          text={slide.cta_text_1}
                          link={slide.cta_link_1}
                          variant="secondary"
                        />
                      )}
                      {slide.cta_text_2 && slide.cta_link_2 && (
                        <DynamicCTA text={slide.cta_text_2} link={slide.cta_link_2} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {slides.length > 1 && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CarouselPrevious className="left-4 lg:left-8 bg-black/30 border-white/20 text-white hover:bg-white hover:text-black" />
            <CarouselNext className="right-4 lg:right-8 bg-black/30 border-white/20 text-white hover:bg-white hover:text-black" />
          </div>
        )}
      </Carousel>
    </section>
  );
}

function DynamicCTA({
  text,
  link,
  variant = "default",
}: {
  text: string;
  link: string;
  variant?: "default" | "secondary";
}) {
  const isExternal = link.startsWith("http") || link.startsWith("https");

  if (isExternal) {
    return (
      <Button
        variant={variant as any}
        className="w-full sm:w-auto px-8 sm:px-12 py-6 shadow-lg text-sm sm:text-base cursor-pointer"
        size="lg"
        asChild
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      </Button>
    );
  }

  return (
    <Button
      variant={variant as any}
      className="w-full sm:w-auto px-8 sm:px-12 py-6 shadow-lg text-sm sm:text-base cursor-pointer"
      size="lg"
    >
      <MyLink to={link}>{text}</MyLink>
    </Button>
  );
}

// Logo Component
function Logo() {
  return (
    <div className="flex justify-center">
      <img
        className="w-48 sm:w-64 md:w-72 lg:w-80"
        src="/englivision-logo.svg"
        alt="Engli-Vision-logo"
      />
    </div>
  );
}

function StaticHeroFallback() {
  return (
    <section className="min-h-[80vh] relative py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Student with books"
          className="w-full h-full object-cover object-top sm:object-[center_-80px] lg:object-[0px_-130px]"
        />
        <div className="absolute inset-0 bg-gray-900/60"></div>
      </div>
      <div className="relative w-full max-w-4xl mx-auto text-center">
        <div className="space-y-6 sm:space-y-8 py-10 sm:py-14 lg:py-20">
          <Logo />
          <h1 className="font-inter text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2">
            Welcome to Engli-Vision
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            Your journey to mastering English starts here. Learn smarter, not
            harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-6 sm:px-0 mt-6">
            <DynamicCTA text="Start now" link="/courses" variant="secondary" />
            <DynamicCTA text="Join us" link="/register" />
          </div>
        </div>
      </div>
    </section>
  );
}
