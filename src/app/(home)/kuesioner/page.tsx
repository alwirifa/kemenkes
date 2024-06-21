"use client";

import { FormProvider } from "@/components/form/context";
import FormKuesioner from "@/components/form/form";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-full flex justify-center py-16 items-center font-semibold text-3xl">
      <FormProvider>
        <FormKuesioner />
      </FormProvider>
    </div>
  );
};

export default page;
