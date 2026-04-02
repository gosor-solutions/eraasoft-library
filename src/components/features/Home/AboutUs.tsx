import { Circle } from "@/components/shared/Circle";
import { YoutubeEmbed } from "@/components/shared/youtubeEmbed";
import { useGetCompanyImages, useGetCompanyReviews } from "@/hooks/queries/useAboutUsQueries";
import { useGetSettings } from "@/hooks/queries/useSettingsQueries";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

// Main AboutUs Component
export function AboutUs() {
  const isPage = useLocation().pathname === "/about";

  return (
    <div className="bg-white">
      <section className="py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <AboutContent />
            <AboutImage />
          </div>
        </div>
      </section>

      <Partnerships />
      <VideoSection />
      {isPage && <Gallery />}
      <Feedbacks />
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

// Data Variables
const partnershipsData = {
  title: "Our Trusted Partners",
  subtitle:
    "Collaborating with industry leaders to provide the best opportunities",
  logos: [
    {
      id: 1,
      name: "Partner 1",
      src: "https://cdn.brandfetch.io/ido5G85nya/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1724650640813",
    },
    {
      id: 2,
      name: "Partner 2",
      src: "https://cdn.brandfetch.io/idTqV2BNgX/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1741065942287",
    },
    {
      id: 3,
      name: "Partner 3",
      src: "https://cdn.brandfetch.io/idTHfL51P-/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667591275475",
    },
    {
      id: 4,
      name: "Partner 4",
      src: "https://cdn.brandfetch.io/id0b4FXsG4/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1721707423570",
    },
    {
      id: 5,
      name: "Partner 5",
      src: "https://cdn.brandfetch.io/idBYj5frff/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1673861443459",
    },
    {
      id: 6,
      name: "Partner 6",
      src: "https://cdn.brandfetch.io/idMO17yGRl/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667859596899",
    },
  ],
};



function Partnerships() {
  // Triplicate the logos array to create a seamless loop
  const logos = [
    ...partnershipsData.logos,
    ...partnershipsData.logos,
    ...partnershipsData.logos,
  ];

  return (
    <section className="py-16 bg-gray-50/50 overflow-hidden">
      <style>{`
        @keyframes infinite-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-infinite-slide {
          animation: infinite-slide 10s linear infinite;
        }
        .animate-infinite-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          {partnershipsData.title}
        </h2>
        <p className="text-gray-600 mb-10">{partnershipsData.subtitle}</p>

        <div className="relative w-full overflow-hidden flex">
          <div className="animate-infinite-slide flex gap-16 sm:gap-24 items-center whitespace-nowrap w-max pr-16 sm:pr-24">
            {logos.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.name}
                className="h-12 sm:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
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
          Feedbacks
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 rtl"
          dir="rtl"
        >
          {reviews.map((fb) => (
            <div
              key={fb.id}
              className="bg-white rounded-md rounded-br-[80px] shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300"
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
              <p className="text-gray-600 text-sm text-center leading-relaxed font-medium">
                "{fb.content}"
              </p>
            </div>
          ))}
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
  const { data: images = [] } = useGetCompanyImages();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [lightboxOpen]);

  if (images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  const fullUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, '') || "";
    return `${baseUrl}/storage/${path.replace(/^\/+/, '')}`;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 text-center mb-12">
          Gallery
        </h2>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={fullUrl(img.image_path)}
                alt={img.name || `Gallery image ${idx}`}
                className="w-full h-auto rounded-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity"
            onClick={closeLightbox}
          >
            <button
              className="cursor-pointer absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={closeLightbox}
            >
              <X className="w-10 h-10" />
            </button>

            <button
              className="cursor-pointer absolute left-6 text-white/70 hover:text-white transition-colors p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <button
              className="cursor-pointer absolute right-6 text-white/70 hover:text-white transition-colors p-2"
              onClick={nextImage}
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <img
              src={fullUrl(images[currentIndex].image_path)}
              alt={images[currentIndex].name || `Gallery image ${currentIndex}`}
              className="max-h-[85vh] max-w-[85vw] object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}
