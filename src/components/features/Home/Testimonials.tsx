export function TestimonialsSection() {
  return (
    <section className="bg-[#E9F2FB] to-gray-50 py-16">
      <div className="">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 text-center mb-12 sm:mb-16">
          Testimonials
        </h2>

        {/* Testimonials Grid */}
        <TestimonialsGrid />
      </div>
    </section>
  );
}

function TestimonialsGrid() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus eget, pretium nulla. Quisqu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus eget, pretium nulla. Quisqu quisqu dolor sit amet, consectetur adipiscing elit, quisqu eu da malesuada consequat.",
    },
    {
      id: 2,
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus eget, pretium nulla. Quisqu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus eget, pretium nulla. Quisqu quisqu dolor sit amet, consectetur adipiscing elit, quisqu eu da malesuada consequat.",
    },
    {
      id: 3,
      name: "John Doe",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus eget, pretium nulla. Quisqu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae libero cursus, suscipit risus eget, pretium nulla. Quisqu quisqu dolor sit amet, consectetur adipiscing elit, quisqu eu da malesuada consequat.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-md rounded-br-[80px] shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
      {/* Avatar and Name */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover mb-3"
        />
        <h3 className="text-lg font-semibold text-gray-900">
          {testimonial.name}
        </h3>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, index) => (
          <svg
            key={index}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-600 text-sm text-center leading-relaxed">
        {testimonial.text}
      </p>
    </div>
  );
}
