import { FormProvider } from "@/components/form/context";
import FormKuesioner from "@/components/form/form";
import React from "react";

function page() {
  return (
    <div>
      <FormProvider>
        <FormKuesioner />
      </FormProvider>
    </div>
  );
}

export default page;
