"use client";

import React, { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema } from "./schemas/formSchema";

export type FormData = z.infer<typeof formSchema>;

const initialData: FormData = {
  // emailAddress: "",
  // password: "",
  // passwordConfirm: "",
  // accountType: "personal", // Default accountType to "personal"
  // companyName: "",
  nama_lengkap: "",
  jenis_kelamin: "",
  tanggal_lahir: "",
  provinsi_domisili: "",
  nomor_handphone: "",
  email: "",
  str_type: "",
  tanggal_str: "",

  status_kerja: "",

  // luar negeri
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

  poltekkes_id: 0,
  prodi_id: 0,
  tanggal_lulus: "",
  nim: "",
  sosial_media: "",
  sumber_survey_type: "",
  sumber_survey: "",
  sumber_survey_nama: "",
  sumber_survey_no_hp: "",
  sertifikat_bahasa_kemampuan: "",
  // nama_lengkap: "",
  // jenis_kelamin: "",
  // tanggal_lahir: "",
  // provinsi_domisili: "",
  // nomor_handphone: "",
  // email: "",
  // poltekkes_id: 0,
  // prodi_id: 0,
  // tanggal_lulus: "",
  // tanggal_str: "",
};

interface FormContextType {
  form: UseFormReturn<FormData>;
  handleFormDataChange: (name: string, value: string) => void;
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
  const [formData, setFormData] = useState(initialData);
  const [schema] = useState(formSchema);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: formData,
  });

  const handleFormDataChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const contextValue: FormContextType = {
    form,
    handleFormDataChange,
    schema,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
