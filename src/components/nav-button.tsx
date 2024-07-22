"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

const NavButton = ({ href, label, isActive }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full lg:w-auto justify-between hover:underline underline-offset-4 uppercase hover:bg-white font-semibold hover:text-primary border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-muted-foreground transition",
        isActive ? "text-primary underline underline-offset-4" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavButton;
