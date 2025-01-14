import React from "react";
import Navigation from "@/components/navigation";
import HeaderLogo from "@/components/header-logo";
import { Loader2 } from "lucide-react";
import Container from "./home/Container";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="border-b shadow-md  bg-white z-50 sticky top-0 left-0 w-full ">
      <Container>
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center lg:gap-x-16 justify-between">
            <HeaderLogo />
            <div className="flex gap-2">
              <Navigation />
              <Link
                href={"/sign-in"}
                className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/80"
              >
                sign in
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
