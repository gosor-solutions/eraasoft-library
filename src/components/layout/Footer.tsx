import { Logo } from "@/components/shared/Logo";
import { useGetSettings } from "@/hooks/queries/useSettingsQueries";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaChevronLeft, FaPhone, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  const { data: settings } = useGetSettings();

  const socialLinks = [
    { icon: FaFacebookF, url: settings?.facebook },
    { icon: FaXTwitter, url: settings?.x },
    { icon: FaLinkedin, url: settings?.linkedin },
    { icon: FaYoutube, url: settings?.youtube },
    { icon: FaInstagram, url: settings?.instagram },
    { icon: FaTelegramPlane, url: settings?.telegram },
    {
      icon: FaWhatsapp,
      url: settings?.whatsapp_num_1
        ? `https://wa.me/${settings.whatsapp_num_1}`
        : undefined,
    },
    {
      icon: FaPhone,
      url: settings?.phone_1 ? `tel:${settings.phone_1}` : undefined,
    },
  ].filter((link) => link.url); // filter out undefined URLs

  return (
    <footer className="bg-brand-primary text-white py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Grid: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-x-6">
          {/* Brand Column */}
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1">
            <Logo className="w-28 sm:w-32" />
            <p className="text-base sm:text-lg font-medium mt-3 mb-6 leading-relaxed">
              Master English. Unlock the World.
            </p>
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map(({ icon: Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noreferrer">
                  <Icon className="bg-white text-brand-primary rounded-sm p-1.5 size-8 cursor-pointer hover:opacity-80 transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </div>

          <Links />
          <Links />
          <Links />
        </div>

        {/* Divider */}
        <div className="mb-4 mt-10 border-t-[1.75px] border-white/60" />

        <p className="text-center text-sm sm:text-base">
          Copyright © 2026 Englivision. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Links() {
  return (
    <div>
      <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6">
        Services
      </h3>
      <ul className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-150 cursor-pointer"
          >
            <FaChevronLeft className="text-white shrink-0" size={14} />
            Service Name
          </li>
        ))}
      </ul>
    </div>
  );
}
