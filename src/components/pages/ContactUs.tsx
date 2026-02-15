import { ContactUsForm } from "@/components/features/contactUs/ContactUsForm";
import { Banner } from "@/components/shared/Banner";
import Image from "next/image";

export function ContactUs() {
  return (
    <>
      {/* TODO: add localization */}
      <Banner title="Contact Us" />
      <div className="grid grid-cols-2 px-6">
        <div className="px-12 w-[800px] h-[700px]">
          <Image
            src="/contact-us.png"
            alt="contact-us"
            width={800}
            height={700}
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
