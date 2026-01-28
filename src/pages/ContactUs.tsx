import { ContactUsForm } from "@/components/features/ContactUsForm";
import { Banner } from "@/components/shared/Banner";

export function ContactUs() {
  return (
    <>
      {/* TODO: add localization */}
      <Banner title="Contact Us" />
      <div className="grid grid-cols-2 px-6">
        <div className="px-12 w-[800px] h-[700px]">
          <img
            src="/contact-us.png"
            alt="contact-us"
            className="w-full h-full object-contain object-center mt-24"
          />
        </div>
        <div className="my-32 px-16">
          <ContactUsForm />
        </div>
      </div>
    </>
  );
}
