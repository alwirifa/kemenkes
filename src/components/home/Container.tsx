import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className=" px-4 py-8 lg:px-14 w-full">
      <div className="max-w-screen-2xl mx-auto w-full">{children}</div>
    </div>
  );
};

export default Container;
