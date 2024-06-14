import React from "react";
import Navigation from "@/components/navigation";
import HeaderLogo from "@/components/header-logo";
import { Loader2 } from "lucide-react";
import WelcomeMsg from "@/components/welcome-msg";
import { Button } from "./ui/button";
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
              {/* <Button>Login</Button> */}
              {/* <Link href={'/login'} className="text-sm px-4 py-2 font-semibold bg-green-700 hover:bg-green-600 rounded-md text-white ">Login</Link>
            */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
