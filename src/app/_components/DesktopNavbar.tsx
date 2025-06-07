import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";


function DesktopNavbar() {


  return (
    <div className="hidden md:flex items-center space-x-4">
      <ThemeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

     
    </div>
  );
}
export default DesktopNavbar;