import { Circle } from "@/components/shared/Circle";
import { Credits } from "./Credits";
import { YoutubeEmbed } from "@/components/shared/youtubeEmbed";
import { useGetCompanyImages, useGetCompanyReviews, useGetGalleryCategories, useGetPartnerCompanyImages } from "@/hooks/queries/useAboutUsQueries";
import { useGetSettings } from "@/hooks/queries/useSettingsQueries";
import { ChevronLeft, ChevronRight, GraduationCap, Star, BookOpen, Users, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/shared/carousel";

// Main AboutUs Component
export function AboutUs() {
  const isPage = useLocation().pathname === "/about";

  return (
    <div className="bg-white">
      <section className="py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div data-aos="fade-right">
              <AboutContent />
            </div>
            <div data-aos="fade-left">
              <AboutImage />
            </div>
          </div>
        </div>
      </section>

      <Stats />

      <FeatureShowcase />

      <div data-aos="fade-up">
        <Partnerships />
      </div>
      <div data-aos="zoom-in">
        <VideoSection />
      </div>
      <div data-aos="fade-up">
        <Gallery />
      </div>
      {isPage && (
        <div data-aos="fade-up">
          <Credits />
        </div>
      )}
      <div data-aos="fade-up">
        <Feedbacks />
      </div>
    </div>
  );
}

// Content Component
function AboutContent() {
  const { data: settings } = useGetSettings();

  const defaultText = `Engli-Vision is Egypt’s premier gateway to English mastery, blending
world-class pedagogical standards with a deep understanding of the
local learner's journey. We provide a sophisticated learning ecosystem
that combines high-fidelity recorded materials with structured,
results-oriented coursework. By focusing on measurable fluency and
professional confidence, we empower our students to excel in global
academic and corporate environments.

Our methodology is built on years of collective expertise in language
acquisition and digital education. We bridge the gap between basic
understanding and native-level proficiency through a rigorous,
technology-driven curriculum designed for the modern professional. At
Engli-Vision, we don't just teach a language; we provide the linguistic
precision necessary to unlock a lifetime of international
opportunities.`;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-semibold text-gray-900">About Us</h1>
      <div className="space-y-4 text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
        {formatText(settings?.about || defaultText)}
      </div>
    </div>
  );
}

// Image Component
function AboutImage() {
  return (
    <div className="relative">
      <Circle size={300} x={550} y={-150} color="#D2ECFF" />
      <div className="relative rounded-3xl overflow-hidden">
        <img
          src="/about-us.jpg"
          alt="Workspace with laptop and notebook"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

function formatText(text: string) {
  return text.split("\r\n\r\n").map((line, i) => <p key={i}>{line}</p>);
}

function Partnerships() {
  const { data: partnerImages = [] } = useGetPartnerCompanyImages();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(4);

  const calculateRepeat = useCallback(() => {
    if (!containerRef.current || !measureRef.current || partnerImages.length === 0) return;

    const containerWidth = containerRef.current.offsetWidth;
    const singleSetWidth = measureRef.current.scrollWidth;

    if (singleSetWidth > 0) {
      const needed = Math.ceil((containerWidth * 2) / singleSetWidth);
      setRepeatCount(Math.max(2, needed));
    }
  }, [partnerImages.length]);

  useEffect(() => {
    calculateRepeat();

    const observer = new ResizeObserver(calculateRepeat);
    if (containerRef.current) observer.observe(containerRef.current);

    window.addEventListener("resize", calculateRepeat);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateRepeat);
    };
  }, [calculateRepeat]);

  if (partnerImages.length === 0) return null;

  const logos = Array.from({ length: repeatCount * 3 }, () => partnerImages).flat();

  return (
    <section className="py-16 bg-gray-50/50 overflow-hidden">
      <style>{`
        @keyframes infinite-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-200%));
          }
        }
        .animate-infinite-slide {
          animation: infinite-slide 35s linear infinite;
        }
        .animate-infinite-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Our Trusted Partners
        </h2>
        <p className="text-gray-600 mb-10">
          Collaborating with industry leaders to provide the best opportunities
        </p>

        <div
          ref={containerRef}
          className="relative w-full overflow-hidden flex"
        >
          <div className="animate-infinite-slide flex gap-16 sm:gap-24 items-center whitespace-nowrap w-max pr-16 sm:pr-24">
            {logos.map((logo, idx) => (
              <img
                key={`${logo.id}-${idx}`}
                src={logo.image_path}
                alt={logo.name}
                className="h-20 sm:h-32 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>

        <div
          ref={measureRef}
          className="absolute -left-[9999px] -top-[9999px] flex gap-16 sm:gap-24 items-center whitespace-nowrap"
          aria-hidden="true"
        >
          {partnerImages.map((logo) => (
            <img
              key={`measure-${logo.id}`}
              src={logo.image_path}
              alt=""
              className="h-12 sm:h-16 w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Feedbacks() {
  const { data: reviews = [] } = useGetCompanyReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-[#E9F2FB] to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 text-center mb-12 sm:mb-16">
          Success Stories
        </h2>
        <div className="px-12" dir="rtl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: "rtl",
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((fb, index) => (
                <CarouselItem
                  key={fb.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-2 h-full">
                    <div
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="bg-white rounded-md rounded-br-[80px] shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                    >
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-3">
                          {fb.reviewer_name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {fb.reviewer_name}
                        </h3>
                      </div>
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(fb.rating)].map((_, idx) => (
                          <svg
                            key={idx}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm text-center leading-relaxed font-medium flex-grow">
                        "{fb.content}"
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const { data: settings } = useGetSettings();

  const videoUrl = settings?.student_video;

  if (!videoUrl) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 text-center">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group bg-black aspect-video flex items-center justify-center">
          <YoutubeEmbed url={videoUrl} />
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const { data: categories = [], isLoading: catsLoading } =
    useGetGalleryCategories();
  const { data: images = [], isLoading: imgsLoading } = useGetCompanyImages(
    selectedCategoryId
      ? { company_image_category_id: selectedCategoryId }
      : undefined,
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const fullUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") || "";
    return `${baseUrl}/storage/${path.replace(/^\/+/, "")}`;
  };

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
          Our Gallery
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-lg font-bold text-gray-900 mb-6 px-4">
                Categories
              </h3>
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-between group ${selectedCategoryId === null
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]"
                  : "bg-white text-gray-600 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
                  }`}
              >
                <span>All Collections</span>
                <div
                  className={`w-2 h-2 rounded-full transition-all ${selectedCategoryId === null ? "bg-white scale-125" : "bg-gray-300 group-hover:bg-brand-primary"}`}
                />
              </button>

              {catsLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-14 bg-gray-200 animate-pulse rounded-2xl"
                  />
                ))
                : categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-between group ${selectedCategoryId === cat.id
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]"
                      : "bg-white text-gray-600 hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100"
                      }`}
                  >
                    <span>{cat.name}</span>
                    <div
                      className={`w-2 h-2 rounded-full transition-all ${selectedCategoryId === cat.id ? "bg-white scale-125" : "bg-gray-300 group-hover:bg-brand-primary"}`}
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Main Gallery Area */}
          <div className="lg:w-3/4">
            {imgsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] bg-gray-200 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : images.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-100">
                <p className="text-gray-400 text-lg">
                  No images found in this collection.
                </p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() => openLightbox(idx)}
                  >
                    <img
                      src={fullUrl(img.image_path)}
                      alt={img.name || `Gallery image ${idx}`}
                      className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                        <ChevronRight className="w-6 h-6 text-brand-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Portal */}
      {lightboxOpen &&
        images.length > 0 &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-300"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-3 rounded-full z-[10000]"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Counter */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-white/90 font-bold tracking-widest text-lg z-[10000] bg-black/40 px-6 py-2 rounded-full border border-white/10">
              {currentIndex + 1} / {images.length}
            </div>

            {/* Navigation Buttons */}
            <button
              className="hidden sm:flex absolute left-8 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-4 rounded-full items-center justify-center z-[10000] backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="hidden sm:flex absolute right-8 text-white/80 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-4 rounded-full items-center justify-center z-[10000] backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Main Image Container */}
            <div
              className="relative p-6 flex items-center justify-center z-[9999]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullUrl(images[currentIndex].image_path)}
                alt={
                  images[currentIndex].name || `Gallery image ${currentIndex}`
                }
                className="max-h-[85vh] max-w-[90vw] object-contain select-none rounded-2xl animate-in zoom-in-95 duration-500 shadow-[0_0_80px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Mobile Navigation Area */}
            <div className="sm:hidden absolute inset-0 flex z-[9998]">
              <div
                className="w-1/2 h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              />
              <div
                className="w-1/2 h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Trainees", value: 15000, suffix: "+", icon: GraduationCap },
    { label: "Expert Instructors", value: 60, prefix: "+", icon: Users },
    { label: "Courses", value: 50, prefix: "+", icon: BookOpen },
    { label: "Student Satisfaction", value: 98, suffix: "%", icon: Star },
  ];

  return (
    <section className="py-16 bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center space-y-3 hover:shadow-md transition-shadow group"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="p-3 bg-brand-primary/10 rounded-xl group-hover:bg-brand-primary/20 transition-colors">
                <stat.icon className="w-8 h-8 text-brand-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-900">
                {stat.prefix}
                <Counter end={stat.value} />
                {stat.suffix}
              </div>
              <span className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentCount = Math.min(
        Math.floor((progress / duration) * end),
        end
      );

      setCount(currentCount);

      if (currentCount < end) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
}

const showcaseItems = [
  {
    title: "Forging global excellence: A landmark international partnership aimed at elevating Engli-Vision's pedagogical standards and expanding world-class learning opportunities.",
    image: "/events/1.jpg"
  },
  {
    title: "Mastering the IELTS: Staying ahead with the latest exam updates and expert strategies to ensure our students achieve their target scores for global success.",
    image: "/events/2.jpg"
  },
  {
    title: "Nurturing young minds: Proudly announcing our comprehensive kids' diplomas, designed to build a solid linguistic foundation through interactive immersion.",
    image: "/events/3.jpg"
  },
  {
    title: "Empowered change makers: A highlight from the TED Talk event, where Engli-Vision visionaries share insights on language as a catalyst for transformation.",
    image: "/events/4.jpg"
  },
  {
    title: "Visionary leadership in the spotlight: An exclusive TV interview featuring Dr. Muhammed Khalil Moussa discussing the future of innovative English education.",
    image: "/events/5.jpg"
  }
];

function FeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);

  const visibleIndices = [
    activeIndex,
    (activeIndex + 1) % showcaseItems.length,
    (activeIndex + 2) % showcaseItems.length,
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Preview Image */}
          <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl group" data-aos="fade-right">
            <img
              key={activeIndex}
              src={showcaseItems[activeIndex].image}
              alt="Showcase"
              className="w-full h-full object-cover transition-all duration-700 animate-in fade-in zoom-in-95"
            />
            {/* Counter Badge */}
            <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              {activeIndex + 1}/{showcaseItems.length}
            </div>
            {/* Bottom Gradient & Text */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#205b7a] via-[#205b7a]/80 to-transparent p-8 pt-32">
              <p className="text-white text-lg sm:text-xl font-bold leading-snug animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
                {showcaseItems[activeIndex].title}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col gap-10" data-aos="fade-left">
            {/* Header Text */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#145374] mb-5 leading-tight">
                Engli-Vision Partnerships & Educational Events
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Discover the latest partnerships, educational events, and strategic collaborations by Engli-Vision, reflecting our trusted role in developing immersive English language learning experiences for students and institutions worldwide.
              </p>
            </div>

            {/* Thumbnails (3 items) */}
            <div className="grid grid-cols-3 gap-5">
              {visibleIndices.map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 text-center shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-lg ${idx === activeIndex
                    ? "ring-2 ring-brand-primary"
                    : ""
                    }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={showcaseItems[idx].image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Thumbnail"
                    />
                  </div>
                  <div className="p-4 flex-grow flex items-center justify-center">
                    <p className="text-[11px] sm:text-xs font-bold text-gray-500 line-clamp-4 leading-relaxed group-hover:text-gray-800 transition-colors">
                      {showcaseItems[idx].title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between mt-2">
              {/* Dots */}
              <div className="flex gap-2">
                {showcaseItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-brand-primary" : "w-6 bg-gray-200 hover:bg-gray-300"
                      }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="p-3 rounded-full border border-gray-100 bg-white text-brand-primary hover:bg-brand-primary/10
                   transition-all shadow-sm flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="p-3 rounded-full border border-gray-100 bg-white text-brand-primary hover:bg-brand-primary/10 transition-all shadow-sm flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
