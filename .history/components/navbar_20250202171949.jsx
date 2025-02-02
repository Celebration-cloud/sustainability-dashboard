import {
  Navbar as HeroUINavbar, // Importing the Navbar component from HeroUI
  NavbarContent, // Importing the NavbarContent component to define content placement
  NavbarBrand, // Importing the NavbarBrand component to define the branding section of the navbar
} from "@heroui/navbar";
import NextLink from "next/link"; // Importing the Next.js Link component for routing

import { ThemeSwitch } from "@/components/theme-switch"; // Importing the ThemeSwitch component for theme toggling
import { Logo } from "@/components/icons"; // Importing the Logo component for the branding icon

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {" "}
      {/* HeroUI Navbar component with maxWidth of 'xl' and sticky positioning */}
      {/* First NavbarContent: Placing the branding (logo and text) on the left side */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          {" "}
          {/* Branding inside a list item with spacing and max width */}
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {" "}
            {/* Next.js Link component wrapping the brand */}
            <Logo /> {/* Rendering the Logo component */}
            <p className="font-bold text-inherit">
              Sustainability Dashboard
            </p>{" "}
            {/* Text for the branding */}
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      {/* Second NavbarContent: Placing the theme switcher on the right side */}
      <NavbarContent justify="end">
        <ThemeSwitch /> {/* Rendering the ThemeSwitch component */}
      </NavbarContent>
    </HeroUINavbar>
  );
};
