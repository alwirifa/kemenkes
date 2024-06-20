import React, { useState } from "react";
import axios from "axios";
import { useFormContext } from "./FormContext";
import FullNameField from "./FullNameField";
import { Button } from "@/components/ui/button";
import Container from "@/components/home/Container";
import { Form } from "@/components/ui/form";
import StatusField from "./StatusField";
import { SubmitHandler } from "react-hook-form"; // Import SubmitHandler from your form library
import { FormData } from "@/components/kuesioner/form/types"; // Import your FormData type
import GenderField from "./GenderField";
import SocialField from "./SocialField";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MainForm: React.FC = () => {
  const { form } = useFormContext();

  // const handleSubmit: SubmitHandler<FormData> = async (values) => {
  //   try {
  //     const response = await axios.post(
  //       "http://tracerstudy-poltekkeskemenkes.id:8082/v1/trace-study",
  //       values
  //     );
  //     console.log("Response:", response.data);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const router = useRouter();
  const handleSubmit: SubmitHandler<FormData> = async (values) => {

    toast
      .promise(
        axios.post(
          "http://tracerstudy-poltekkeskemenkes.id:8082/v1/trace-study",
          values
        ),
        {
          loading: "Submitting form...",
          success: "Form submitted successfully",
          error: "Error submitting form",
        }
      )
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        throw error;
      });
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
        <div className="w-full max-w-7xl mx-auto border lg:p-16 p-4 rounded-xl shadow-md">
          <Form {...form}>
            <form className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-4 w-full">
                <p
                  className={`text-2xl font-bold ${
                    listForm ? "flex" : "hidden"
                  }`}
                >
                  Identitas
                </p>

                <FullNameField />
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
                  className={`text-2xl font-bold ${
                    listForm ? "flex" : "hidden"
                  }`}
                >
                  Kuesioner
                </p>
                {listForm && (
                  <>
                    <GenderField />
                    <StatusField />
                    <SocialField />
                  </>
                )}
              </div>

              <div className="w-full flex justify-center">
                <div
                  className={`max-w-max w-full ${listForm ? "flex" : "hidden"}`}
                >
                  <Button
                    className="w-full mt-4"
                    onClick={form.handleSubmit(handleSubmit)}
                  >
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
};

export default MainForm;
