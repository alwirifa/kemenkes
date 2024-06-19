"use client";

import KuesionerForm from "@/components/kuesioner/KuesionerForm";
import Home from "@/components/kuesioner/form";
import { FormProvider } from "@/components/kuesioner/form/FormContext";

import MainForm from "@/components/kuesioner/form/MainForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-full flex justify-center py-16 items-center font-semibold text-3xl">
      {/* <KuesionerForm /> */}
      <FormProvider>
        <MainForm />
      </FormProvider>
      {/* <Home/> */}
    </div>
  );
};

export default page;
