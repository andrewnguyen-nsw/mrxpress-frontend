'use client';

import { navItems } from '@constants/navData';
import { useAuth } from '@context/useAuth';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import MrXpressLogo from '@public/assets/logo/logo_transparent_239x100.png';
import { sendLogoutRequest } from '@services/authService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const Nav = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userToken, setUserToken, logout } = useAuth(); // Authentication context values
  const router = useRouter(); // Router hook for navigation

  // Handle logout process
  const handleLogOut = async () => {
    try {
      const response = await sendLogoutRequest(userToken);
      if (response.code !== 1000) {
        enqueueSnackbar(response.msg, { variant: 'error' });
        return;
      } else {
        enqueueSnackbar(response.msg, { variant: 'success' });
        logout();
        router.push('/');
        setUserToken(null);
      }
    } catch (error) {
      enqueueSnackbar('Network error', { variant: 'error' });
    }
  };

  return (
    <Navbar
      position='static'
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className='mb-2 w-auto rounded-xl bg-foreground py-2 sm:mb-3'
    >
      {/* Mobile view toggle button */}
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      {/* Logo for mobile view */}
      <NavbarContent className='pr-1 sm:hidden sm:pr-3' justify='center'>
        <NavbarBrand>
          <Image src={MrXpressLogo} alt='MrXpress Logo' height={70} />
        </NavbarBrand>
      </NavbarContent>

      {/* Navbar items for larger screens */}
      <NavbarContent className='hidden gap-4 px-0 sm:flex' justify='center'>
        <NavbarBrand className='pr-4'>
          <Image src={MrXpressLogo} alt='MrXpress Logo' height={70} />
        </NavbarBrand>
        {navItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link className='text-copy' href={item.url}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Conditional rendering based on authentication status */}
      <NavbarContent justify='end'>
        {!userToken ? (
          <>
            <NavbarItem className='hidden lg:flex'>
              <Link className='text-copy' href='/login'>
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className='px-5 leading-none'
                radius='full'
                color='primary'
                href='#'
                variant='solid'
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className='hidden lg:flex'>
              <Link className='text-copy' href='/profile'>
                Profile
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                className='px-5 leading-none'
                radius='full'
                onPress={handleLogOut}
                variant='faded'
              >
                Log out
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Responsive menu for smaller screens */}
      <NavbarMenu className='m-2 w-auto rounded-xl bg-foreground py-2 pt-5'>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.name} className='leading-normal'>
            <Link className='w-full text-copy' href={item.url} size='lg'>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {!userToken ? (
          <NavbarMenuItem className='leading-normal'>
            <Link className='w-full text-copy' href='login' size='lg'>
              Login
            </Link>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem className='leading-normal'>
            <Link className='w-full text-copy' href='profile' size='lg'>
              Profile
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
