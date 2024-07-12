"use client";

import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import NavButton from "@/components/nav-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const routes = [
  {
    href: "/dashboard",
    label: "Beranda",
  },
  {
    href: "/dashboard/responden",
    label: "Responden",
  },
  {
    href: "/dashboard/instansi",
    label: "Intansi",
  },
  {
    href: "/dashboard/poltekkes",
    label: "Poltekkes",
  },
  {
    href: "/dashboard/nakes",
    label: "Nakes",
  },
];

const DashboardNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex justify-between items-center w-full ">
          <div className="absolute top-7 left-6">

          <Image
            src={"/icons/logo_kemenkes.png"}
            alt="logo"
            height={10}
            width={200}
          />
            </div>
          <SheetTrigger>
            <Button
              variant="outline"
              size="sm"
              className="font-normal  hover:text-primary border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black fpcus:bg-white/30 transition"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent side="right" className="px-2">
          <nav className="flex flex-col gap-y-2 py-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </div>
  );
};

export default DashboardNavigation;
