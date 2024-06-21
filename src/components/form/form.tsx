"use client";

import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useFormContext } from "./context";
import { formSchema } from "./schemas/formSchema";
import Email from "./email";
import Name from "./name";
import JenisKelamin from "./jeniskelamin";
import Container from "../home/Container";
import TanggalLahir from "./tanggal_lahir";
import ProvinsiDomisili from "./provinsi_domisili";
import NomorHandphone from "./nomor_handphone";
import STR from "./str";
import Status from "./status";
import Poltekkes from "./poltekkes";
import SocialMedia from "./social_media";
import SumberSurvey from "./asal_survey";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { ComboboxDemo } from "./combobox";

export default function FormKuesioner() {
  const { form } = useFormContext();
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // toast
    //   .promise(
    //     axios.post(
    //       `https://tracerstudy-poltekkeskemenkes.id/api/v1/trace-study`,
    //       values
    //     ),
    //     {
    //       loading: "Submitting form...",
    //       success: "Form submitted successfully",
    //       error: "Error submitting form",
    //     }
    //   )
    //   .then(() => {
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });
    console.log({ values });
  };

  const [listForm, setListForm] = useState(false);
  const handleNext = () => {
    setListForm(true);
  };

  return (
    <main className="flex flex-col w-full">
      <Container>
        <div className="pb-16">
          <h1 className="text-4xl text-center font-medium text-muted-foreground">
            Tracer Study Lulusan Poltekkes Kemenkes
          </h1>
        </div>
        <div className="w-full max-w-7xl mx-auto border lg:p-16 p-4 px-8 rounded-xl shadow-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" w-full flex flex-col gap-4"
            >
              <p
                className={`text-2xl font-bold ${listForm ? "flex" : "hidden"}`}
              >
                Identitas
              </p>
              <div className="lg:flex gap-6 ">
                <Name />
                <JenisKelamin />
              </div>
              <div className=":lg:flex gap-6 ">
                <TanggalLahir />
                {/* <ComboboxDemo /> */}
                <ProvinsiDomisili/>
              </div>
              <div className="lg:flex gap-6 ">
                <NomorHandphone />
                <Email />
              </div>
              <div className="flex w-full justify-center mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className={`text-sm font-medium px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 ${
                    listForm ? "hidden" : "flex"
                  }`}
                >
                  Selanjutnya
                </button>
              </div>
              <p
                className={`text-2xl font-bold ${listForm ? "flex" : "hidden"}`}
              >
                Kuesioner
              </p>
              {listForm && (
                <>
                  <Poltekkes />
                  <STR />
                  <Status />
                  <SocialMedia />
                  <SumberSurvey />
                </>
              )}
              <div className="w-full flex justify-center">
                <div
                  className={`max-w-max w-full ${listForm ? "flex" : "hidden"}`}
                >
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </Container>
    </main>
  );
}
