"use client";

import Berita from "@/components/home/berita";
import React from "react";
type Props = {};

const Page = (props: Props) => {
  return (
    <section className="bg-gray-50">
      <Berita />
    </section>
  );
};

export default Page;
