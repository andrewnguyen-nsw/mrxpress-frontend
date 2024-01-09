import React from "react";
import { Link, Button } from "@nextui-org/react";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

const Footer = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center bg-foreground rounded-t-xl px-8 py-4">
      <div>Logo</div>
      <div className="flex items-center gap-3">
        <Link href="/tnc" size="sm" className="text-gray-600">
          Terms & Conditions
        </Link>
        <span className="text-gray-600 text-lg">·</span>
        <Link href="/career" size="sm" className="text-gray-600">
          Career
        </Link>
        <span className="text-gray-600 text-lg">·</span>
        <Link href="/about-us" size="sm" className="text-gray-600">
          About Us
        </Link>
      </div>
      <div className="flex">
        <Button as={Link} href="" isIconOnly radius="full" variant="light">
          <IconBrandFacebook size={18} stroke={1} />
        </Button>
        <Button as={Link} href="" isIconOnly radius="full" variant="light">
          <IconBrandInstagram size={18} stroke={1} />
        </Button>
      </div>
    </section>
  );
};

export default Footer;
