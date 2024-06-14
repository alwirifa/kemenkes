"use client";

import KuesionerForm from "@/components/kuesioner/KuesionerForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-full flex justify-center py-16 items-center font-semibold text-3xl">
     <KuesionerForm/>
    </div>
  );
};

export default page;
