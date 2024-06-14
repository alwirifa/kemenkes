"use client";

import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";
import NavButton from "@/components/nav-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const routes = [
  {
    href: "/",
    label: "Beranda",
  },
  {
    href: "/berita",
    label: "Berita",
  },
  {
    href: "/statistik",
    label: "Statistik",
  },
  {
    href: "/publikasi",
    label: "Publikasi",
  },
  {
    href: "/faq",
    label: "faq",
  },
  {
    href: "/kuesioner",
    label: "Kuesioner",
  },
];

const Navigation = () => {
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
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal  hover:text-primary border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black fpcus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
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

export default Navigation;
