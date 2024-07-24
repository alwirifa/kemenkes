import { FormProvider } from "@/components/user/form/context";
import FormKuesioner from "@/components/user/form/form";
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
