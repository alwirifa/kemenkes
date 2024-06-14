import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const HeaderLogo = (props: Props) => {
  return (
    <div>
      <Link href={"/"}>
        <div className="items-center hidden lg:flex ">
          <Image src={"/icons/logo_kemenkes.png"} alt="logo" height={10} width={200} />
          {/* <p className="font-semibold  text-2xl  ">LOGO</p> */}
        </div>
      </Link>
    </div>
  );
};

export default HeaderLogo;

// ml-2.5