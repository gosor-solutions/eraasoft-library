import { ContactUsForm } from "@/components/features/contactUs/ContactUsForm";
import { Banner } from "@/components/shared/Banner";

export function ContactUs() {
  return (
    <>
      <Banner title="Contact Us" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 lg:px-12 py-10 lg:py-0 gap-8 lg:gap-0">
        {/* Image — hidden on mobile, shows on lg+ */}
        <div className="hidden lg:flex items-center justify-center py-16 xl:py-24">
          <img
            src="/contact-us.png"
            alt="contact-us"
            className="w-full max-w-md xl:max-w-lg h-auto object-contain"
          />
        </div>

        {/* Form */}
        <div className="flex items-center justify-center py-10 sm:py-16 lg:py-24 lg:px-8 xl:px-16">
          <div className="w-full max-w-lg">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </>
  );
}
