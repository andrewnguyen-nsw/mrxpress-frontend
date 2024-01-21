'use client';

import { useState } from 'react';
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link
} from "@nextui-org/react";
// import Link from 'next/link';
import Image from 'next/image';

import MrXpressLogo from '@public/assets/logo/logo_transparent_239x100.png';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Home",
    "Book a Repair",
    "Become a Technician",
    "About Us",
    "Profile",
    "Log Out",
  ];

  return (
    <Navbar
      position="static"
      // shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='bg-foreground py-2 rounded-xl w-auto mb-2 sm:mb-3'
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-1 sm:pr-3" justify="center">
        <NavbarBrand>
          <Image src={MrXpressLogo} alt="MrXpress Logo" height={70}/>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 px-0" justify="center">
        <NavbarBrand className='pr-4'>
          <Image src={MrXpressLogo} alt="MrXpress Logo" height={70}/>
        </NavbarBrand>
        <NavbarItem>
          <Link className='text-copy' href="/book">
            Book a Repair
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-copy' href="/career">
            Become a Technician
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-copy' href="/services">
            Services
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className='text-copy' href="/about-us">
            About Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className='text-copy' href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} className='px-5 leading-none' radius='full' color='primary' href="#" variant="solid">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='bg-foreground py-2 rounded-xl m-2 w-auto pt-5'>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="leading-normal">
            <Link
              className="w-full text-copy"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;