"use client";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";

interface SocialIconProps {
  Icon: IconType;
  href: string;
}

function SocialIcon({ Icon, href }: SocialIconProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="text-gray-200 text-2xl hover:text-white cursor-pointer" />
    </a>
  );
}

export default function FooterContact() {
  return (
    <div>
      <h2 className="text-lg font-bold bg-white bg-clip-text text-transparent">
        Get in touch
      </h2>
      <p className="mt-2 text-gray-200">My social media account</p>
      <div className="flex space-x-4 mt-4">
        <SocialIcon Icon={FaInstagram} href="#" />
        <SocialIcon Icon={FaWhatsapp} href="#" />
        <SocialIcon Icon={FaFacebook} href="#" />
      </div>
    </div>
  );
}
