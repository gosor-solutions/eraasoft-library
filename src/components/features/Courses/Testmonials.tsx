import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=12",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "John Doe",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=13",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      name: "John Doe",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=14",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  function renderStars(rating: number) {
    return (
      <div className="flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="w-full border-t border-gray-200 px-4 py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <h2 className="mb-12 text-3xl font-bold md:text-4xl lg:mb-16">
          What other learners are saying about this course
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="mb-2 text-lg font-semibold">{testimonial.name}</h3>

              {/* Rating Stars */}
              <div className="mb-6">{renderStars(testimonial.rating)}</div>

              {/* Review Text */}
              <p className="text-sm leading-relaxed text-gray-600">
                {testimonial.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
