import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTiktok,
} from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-brand-primary text-white py-20 px-16">
      <div className="grid grid-cols-4 gap-x-6 ">
        <div className="flex flex-col items-start">
          <Image
            width={128}
            height={128}
            src="/englivision-logo.svg"
            alt="gosor-logo"
            className="w-32"
          />
          <p className="text-[20px] font-medium mt-3 mb-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat,
            exercitationem.
          </p>
          <div className="flex gap-2">
            <FaTiktok className="bg-white rounded-sm p-1.5 size-8 text-2xl text-brand-primary" />
            <FaInstagram className="bg-white rounded-sm p-1.5 size-8 text-2xl text-brand-primary" />
            <FaFacebookF className="bg-white rounded-sm p-1.5 size-8 text-2xl text-brand-primary" />
            <FaTelegramPlane className="bg-white rounded-sm p-1.5 size-8 text-2xl text-brand-primary" />
          </div>
        </div>
        <Links />
        <Links />
        <Links />
      </div>
      <div className="mb-4 mt-10  border-t-[1.75px] border-white" />
      <p className="text-center text-medium">
        Copyright © 2026 Gosor. All rights reserved.
      </p>
    </footer>
  );
}

function Links() {
  return (
    <div>
      <h3 className="font-semibold text-[24px] mb-6">Services</h3>
      <ul className="flex flex-col gap-5 text-base">
        <li className="flex items-center gap-2">
          <FaChevronLeft className="text-white" size={18} />
          Service Name
        </li>
        <li className="flex items-center gap-2">
          <FaChevronLeft className="text-white" size={18} />
          Service Name
        </li>
        <li className="flex items-center gap-2">
          <FaChevronLeft className="text-white" size={18} />
          Service Name
        </li>
        <li className="flex items-center gap-2">
          <FaChevronLeft className="text-white" size={18} />
          Service Name
        </li>
      </ul>
    </div>
  );
}
