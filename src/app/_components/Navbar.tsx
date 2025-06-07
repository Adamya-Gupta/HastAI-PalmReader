"use client"
import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

function Navbar() {

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);


  return (
    <nav className={`top-0 w-full border-b backdrop-blur  z-50
    ${
        mounted && theme === "dark"
          ? ("bg-gray-900 text-white")
         
          :("bg-stone-200 text-gray-900")
      }
    `}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
              HastAI
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;