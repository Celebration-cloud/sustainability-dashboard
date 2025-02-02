import "@/styles/globals.css"; // Import global styles
import { Link } from "@heroui/link"; // Import Link component for external navigation
import clsx from "clsx"; // Utility for conditional classNames

import { Providers } from "./providers"; // Theme and context provider wrapper

import { siteConfig } from "@/config/site"; // Site configuration settings
import { fontSans } from "@/config/fonts"; // Custom font configurations
import { Navbar } from "@/components/navbar"; // Navigation bar component

/**
 * Metadata Configuration
 * - Sets default title and description for SEO
 * - Defines site-wide favicon
 */
export const metadata = {
  title: {
    default: siteConfig.name, // Uses site name from config
    template: `%s - ${siteConfig.name}`, // Formats dynamic page titles
  },
  description: siteConfig.description, // Meta description from config
  icons: {
    icon: "/favicon.ico", // Favicon path
  },
};

/**
 * Viewport Configuration
 * - Defines theme color based on user preference
 */
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" }, // Light mode background
    { media: "(prefers-color-scheme: dark)", color: "black" }, // Dark mode background
  ],
};

/**
 * RootLayout Component
 * - Wraps the entire application with global styles, theme providers, and layout structure.
 * - Implements a responsive, accessible layout with a Navbar and Footer.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Nested components (page content)
 *
 * @returns {JSX.Element} - The root layout component
 */
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      {/* Prevents hydration mismatch issues */}
      <head /> {/* Placeholder for head content */}
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased", // Ensures smooth font rendering
          fontSans.variable, // Applies custom font variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            {/* Main content area with spacing */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children} {/* Page content is rendered here */}
            </main>
            {/* Footer Section */}
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://heroui.com?utm_source=next-app-template"
                title="heroui.com homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">Fobework</p> {/* Branding */}
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
