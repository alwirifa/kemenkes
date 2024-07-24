"use client";

import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { formSchema } from "./schemas/formSchema";

import Name from "./name";
import JenisKelamin from "./jeniskelamin";
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
import { useState, useEffect } from "react";
import Container from "@/components/Container";
import { useFormContext } from "./context";

export default function FormKuesioner() {
  const { form } = useFormContext();
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setId(localStorage.getItem("id"));
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id || !token) {
      toast.error("ID atau token tidak ditemukan");
      return;
    }

    toast
      .promise(
        axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/alumni/${id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          loading: "Mengirim form...",
          success: "Form berhasil dikirim",
          error: "Terjadi kesalahan saat mengirim form",
        }
      )
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        throw error;
      });
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
          <h1 className="text-4xl font-medium text-muted-foreground">Edit Data</h1>
        </div>
        <div className="w-full max-w-7xl mx-auto border lg:p-16 p-4 px-8 rounded-xl shadow-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <p className={`text-2xl font-bold ${listForm ? "flex" : "hidden"}`}>
                Identitas
              </p>
              <div className="lg:flex gap-6">
                <Name />
                <JenisKelamin />
              </div>
              <div className="lg:flex gap-6">
                <ProvinsiDomisili />
              </div>
              <div className="lg:flex gap-6">
                <NomorHandphone />
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
              <p className={`text-2xl font-bold ${listForm ? "flex" : "hidden"}`}>
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
                <div className={`max-w-max w-full ${listForm ? "flex" : "hidden"}`}>
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
