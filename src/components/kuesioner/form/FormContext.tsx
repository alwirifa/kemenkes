"use client";

import React, { createContext, useContext, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const formSchema = z.object({
  nama_lengkap: z.string().min(1, "Nama Lengkap harus diisi"),
  jenis_kelamin: z.string().min(1, "Jenis Kelamin harus diisi"),
  tanggal_lahir: z.string().min(1, "Tanggal Lahir harus diisi"),
  provinsi_domisili: z.string().min(1, "Provinsi domisili harus diisi"),
  nomor_handphone: z.string().min(1, "Nomor phone harus diisi"),
  email: z.string().email("Invalid email address"),
  poltekkes_id: z.number().int().min(1, "Poltekkes harus diisi"),
  prodi_id: z.number().int().min(1, "Prodi Kemenkes harus diisi"),
  tanggal_lulus: z.string().min(1, "Tanggal lulus harus diisi"),
  tanggal_str: z.string(),
  status_kerja: z.string(),
  tanggal_kerja: z.string(),
  negara_kerja: z.string(),
  instansi_tempat_kerja: z.string(),
  nama_tempat_kerja: z.string(),
  provinsi_tempat_kerja: z.string(),
  tahun_mulai_kerja: z.string(),
  skema_penempatan_ln: z.string(),
  jabatan: z.string(),
  sk_internasional: z.string(),
  sertifikat_bahasa: z.string(),
  jenjang_pendidikan_ditempuh: z.string(),
  prodi_ditempuh: z.string(),
  kampus_ditempuh: z.string(),
  sosial_media: z.string().min(1, "social media harus diisi"),
  sumber_survey: z.string(),
  sumber_survey_nama: z.string(),
  sumber_survey_no_hp: z.string()
})

export type FormData = z.infer<typeof formSchema>;

const initialData: FormData = {
  nama_lengkap: "",
  jenis_kelamin: "",
  tanggal_lahir: "",
  provinsi_domisili: "",
  nomor_handphone: "",
  email: "",
  poltekkes_id: 0,
  prodi_id: 0,
  tanggal_lulus: "",
  tanggal_str: "",
  status_kerja: "",
  tanggal_kerja: "",
  negara_kerja: "",
  instansi_tempat_kerja: "",
  nama_tempat_kerja: "",
  provinsi_tempat_kerja: "",
  tahun_mulai_kerja: "",
  skema_penempatan_ln: "",
  jabatan: "",
  sk_internasional: "",
  sertifikat_bahasa: "",
  jenjang_pendidikan_ditempuh: "",
  prodi_ditempuh: "",
  kampus_ditempuh: "",
  sosial_media: "",
  sumber_survey: "",
  sumber_survey_nama: "",
  sumber_survey_no_hp: "",
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
