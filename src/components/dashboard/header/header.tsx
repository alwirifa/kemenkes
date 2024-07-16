import React from "react";
import HeaderLogo from "@/components/header-logo";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Container from "@/components/Container";
import AvatarAdmin from "./avatar";
import DashboardNavigation from "./navigation";
import Search from "../search/search";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="border-b shadow-md  bg-white z-50 sticky top-0 left-0 w-full ">
      <Container>
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center lg:gap-x-16 justify-between">
            <HeaderLogo />

              {/* <Search /> */}
            <div className="flex gap-2">
              <DashboardNavigation />
              <div className="ml-2">
                <AvatarAdmin />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
