"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "./schemas/formSchema";
import axios from "axios";

export type FormData = z.infer<typeof formSchema>;

interface FormContextType {
  form: UseFormReturn<FormData>;
  handleFormDataChange: (name: keyof FormData, value: string | number) => void;
  schema: typeof formSchema;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const initialFormData: FormData = {
    nama_lengkap: "",
    jenis_kelamin: "",
    nomor_handphone: "",
    provinsi_domisili: "",
    poltekkes_id: 0,
    prodi_id: 0,
    nim: "",
    tanggal_lulus: "",
    str_type: "belum",
    tanggal_str: "",
    status_kerja: "Belum Bekerja",
    lokasi_kerja: "",
    negara_kerja: "",
    sk_internasional_type: "",
    sk_internasional: "",
    sertifikat_bahasa: "",
    tahun_mulai_kerja: "",
    skema_penempatan_ln: "",
    nama_tempat_kerja: "",
    jabatan: "",
    instansi_tempat_kerja_type: "",
    instansi_tempat_kerja: "",
    provinsi_tempat_kerja: "",
    jenjang_pendidikan_ditempuh: "",
    prodi_ditempuh: "",
    kampus_ditempuh: "",
    sosial_media: "",
    sumber_survey_type: "",
    sumber_survey: "",
    sumber_survey_nama: "",
    sumber_survey_no_hp: "",
    sertifikat_bahasa_kemampuan: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [schema] = useState(formSchema);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: formData, // Provide initialFormData initially
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/alumni/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("ID:", id);
        console.log("API response:", response.data.data);
        const { data } = response.data;

        // Initialize formData with fetched data
        const initialData: FormData = {
          ...initialFormData, // Ensure all fields are accounted for
          nama_lengkap: data.nama_lengkap || "",
          nomor_handphone: data.nomor_handphone || "",
          sosial_media: data.sosial_media || "",
        };

        setFormData(initialData);
        form.reset(initialData); // Reset form with initialData
        console.log("User data:", initialData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [form]);

  const handleFormDataChange = (name: keyof FormData, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const contextValue: FormContextType = {
    form,
    handleFormDataChange,
    schema,
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading state handling
  }

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
