import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className=" px-4 py-8 lg:px-14">
      <div className="max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
};

export default Container;
