"use client";


import MainForm from "@/components/kuesioner/form/MainForm";
import { FormProvider } from "@/components/kuesioner/form/FormContext";
import FormKuesioner from "@/components/form/form";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-full flex justify-center py-16 items-center font-semibold text-3xl">
      {/* <KuesionerForm /> */}
      <FormProvider>
        <MainForm />
      </FormProvider>
      {/* <FormProvider>
        <FormKuesioner />
      </FormProvider> */}
      {/* <Home/> */}
    </div>
  );
};

export default page;
