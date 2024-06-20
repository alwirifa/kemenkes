"use client";

import React from "react";
import TentangKemenkes from "@/components/home/TentangKemenkes";
import Welcome from "@/components/home/Welcome";
import Berita from "@/components/home/berita";

export default function Home() {
  return (
    <div>
      <Welcome />
      <TentangKemenkes />
      <Berita /> 
    </div>
  );
}
