import { Logo } from "@/components/shared/Logo";
import { MyLink } from "@/components/shared/MyLink";
import { useGetSettings } from "@/hooks/queries/useSettingsQueries";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaChevronLeft, FaPhone } from "react-icons/fa6";

export function Footer() {
  const { data: settings } = useGetSettings();

  const socialLinks = [
    { icon: FaFacebookF, url: settings?.facebook, label: "Facebook" },
    { icon: FaInstagram, url: settings?.instagram, label: "Instagram" },
    { icon: FaYoutube, url: settings?.youtube, label: "YouTube" },
    { icon: FaLinkedin, url: settings?.linkedin, label: "LinkedIn" },
  ].filter((link) => link.url); // filter out undefined URLs

  const contactLinks = [
    {
      icon: FaWhatsapp,
      url: settings?.whatsapp_num_1
        ? `https://wa.me/${settings.whatsapp_num_1}`
        : undefined,
      label: "WhatsApp 1",
    },
    {
      icon: FaWhatsapp,
      url: settings?.whatsapp_num_2
        ? `https://wa.me/${settings.whatsapp_num_2}`
        : undefined,
      label: "WhatsApp 2",
    },
    {
      icon: FaPhone,
      url: settings?.phone_1 ? `tel:${settings.phone_1}` : undefined,
      label: `Phone ${settings?.phone_1}`,
    },
    {
      icon: FaPhone,
      url: settings?.phone_2 ? `tel:${settings.phone_2}` : undefined,
      label: `Phone ${settings?.phone_2}`,
    },
    { icon: FaTelegramPlane, url: settings?.telegram, label: "Telegram" },
  ].filter((link) => link.url);

  return (
    <footer className="bg-brand-primary text-white py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Grid: 1 col mobile → 4 cols tablet/desktop equally spaced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="flex flex-col items-start">
            <div className="bg-white rounded-xl mb-4">
              <Logo className="w-28 sm:w-32 p-2" />
            </div>
            <p className="text-base sm:text-xl font-medium mb-6 leading-relaxed capitalize">
              learning has no limits
            </p>
          </div>

          <Links
            title="Quick Links"
            links={[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/branches", label: "Branches" },
              { to: "/blogs", label: "Blog" },
              { to: "/courses", label: "Courses" },
              { to: "/contact-us", label: "Contact Us" },
              { to: "/terms-and-conditions", label: "Terms & Conditions" },
              { to: "/privacy-policy", label: "Privacy Policy" },
            ]}
          />

          <Links
            title="Socials"
            links={socialLinks.map((link) => ({
              to: link.url!,
              label: link.label!,
              external: true,
              icon: link.icon,
            }))}
          />

          <Links
            title="Contact"
            links={contactLinks.map((link) => ({
              to: link.url!,
              label: link.label!,
              external: true,
              icon: link.icon,
            }))}
          />
        </div>

        {/* Divider */}
        <div className="mb-4 mt-10 border-t-[1.75px] border-white/60" />

        <p className="text-center text-sm sm:text-base">
          Copyright © 2026 Engli-Vision. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Links({
  title,
  links,
}: {
  title: string;
  links: {
    to: string;
    label: string;
    external?: boolean;
    icon?: React.ElementType;
  }[];
}) {
  if (links.length === 0) return null;

  return (
    <div>
      <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 sm:gap-4 text-sm sm:text-base">
        {links.map((link) => (
          <li
            key={`${link.label}-${link.to}`}
            className="hover:opacity-80 transition-opacity duration-150"
          >
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 w-full h-full"
              >
                {link.icon && <link.icon className="text-white shrink-0" size={14} />}
                {!link.icon && <FaChevronLeft className="text-white shrink-0" size={14} />}
                <span>{link.label}</span>
              </a>
            ) : (
              <MyLink to={link.to} className="flex items-center gap-2 w-full h-full">
                {link.icon && <link.icon className="text-white shrink-0" size={14} />}
                {!link.icon && <FaChevronLeft className="text-white shrink-0" size={14} />}
                <span>{link.label}</span>
              </MyLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
