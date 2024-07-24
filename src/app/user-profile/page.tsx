"use client";

import Container from "@/components/Container";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

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

        setData(data);
        console.log("User data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container>
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div>
            {data ? (
              <div className="flex flex-col gap-6 font-medium">
                <div className="w-full flex justify-between">
                  <h1 className="text-4xl text-primary font-semibold">
                    Data Anda
                  </h1>
                  <Link href={`/user-profile/edit`} className="flex gap-2 items-center border px-4 py-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-edit"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <p>edit</p>
                  </Link>
                </div>

                <section className="border border-neutral-200 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold">
                    {data.nama_lengkap}
                  </h2>
                  <div className="flex flex-col md:flex-row gap-2 font-medium text-sm md:text-base">
                    <p>Jenis Kelamin: {data.jenis_kelamin}</p>
                    <p className="hidden sm:block">|</p>
                    <p>Tanggal Lahir: {data.tanggal_lahir}</p>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between gap-6 mt-6 px-6 w-full">
                    <div className="flex flex-col gap-2 mb-4 md:mb-0 border border-neutral-200 rounded-lg p-6 w-full">
                      <p>Domisili</p>
                      <p className="text-primary text-2xl">
                        {data.provinsi_domisili}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 mb-4 md:mb-0 border border-neutral-200 rounded-lg p-6 w-full">
                      <p>Whatsapp</p>
                      <p className="text-primary text-2xl">
                        {data.nomor_handphone}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 mb-4 md:mb-0 border border-neutral-200 rounded-lg p-6 w-full">
                      <p>E-mail</p>
                      <p className="text-primary text-2xl">{data.email}</p>
                    </div>
                  </div>
                </section>

                {/* Data Pendidikan */}
                <section className="w-full  border border-neutral-200 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    Data Pendidikan
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-32 ml-0 md:ml-6">
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p>Asal Poltekkes:</p>
                      <span className="font-semibold break-words">
                        {data.nama_poltekkes}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p>Nomor Induk Mahasiswa:</p>
                      <span className="font-semibold break-words">
                        {data.nim}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p>Tanggal Lulus:</p>
                      <span className="font-semibold break-words">
                        {data.tanggal_lulus}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p>Kepemilikan STR:</p>
                      <span className="font-semibold break-words">
                        {data.tanggal_terbit_str}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p>Status saat ini:</p>
                      <span className="font-semibold break-words">
                        {data.work_status.status_kerja}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p>Akun Sosial Media:</p>
                      <span className="font-semibold break-words">
                        {data.sosial_media}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between">
                      <p>Sumber survey:</p>
                      <span className="font-semibold break-words">
                        {data.sumber_survey}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Data Pekerjaan */}
                {data.work_status && (
                  <section className="w-full border border-neutral-200 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      Data Pekerjaan
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-32 ml-0 md:ml-6">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="whitespace-pre-wrap break-words">
                          Lokasi Tempat Bekerja:
                        </p>
                        <span className="font-semibold whitespace-pre-wrap break-words">
                          {data.work_status.nama_tempat_kerja}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="whitespace-pre-wrap break-words">
                          Jenis Instansi Bekerja:
                        </p>
                        <span className="font-semibold whitespace-pre-wrap break-words">
                          {data.work_status.instansi_tempat_kerja}
                        </span>
                      </div>
                      {data.work_status.skema_penempatan_ln && (
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <p className="whitespace-pre-wrap break-words">
                            Skema Penempatan:
                          </p>
                          <span className="font-semibold whitespace-pre-wrap break-words">
                            {data.work_status.skema_penempatan_ln}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="whitespace-pre-wrap break-words">
                          Negara:
                        </p>
                        <span className="font-semibold whitespace-pre-wrap break-words">
                          {data.work_status.negara_kerja}
                        </span>
                      </div>
                      {data.work_status.language_certification && (
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <p className="whitespace-pre-wrap break-words">
                            Sertifikat Bahasa:
                          </p>
                          <span className="font-semibold whitespace-pre-wrap break-words">
                            {data.work_status.language_certification}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="whitespace-pre-wrap break-words">
                          Tanggal Mulai Bekerja:
                        </p>
                        <span className="font-semibold whitespace-pre-wrap break-words">
                          {data.work_status.tanggal_mulai_kerja}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="whitespace-pre-wrap break-words">
                          Provinsi Tempat Bekerja:
                        </p>
                        <span className="font-semibold whitespace-pre-wrap break-words">
                          {data.work_status.provinsi_tempat_kerja}
                        </span>
                      </div>
                      {data.work_status.jabatan && (
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <p className="whitespace-pre-wrap break-words">
                            Posisi Saat Ini:
                          </p>
                          <span className="font-semibold whitespace-pre-wrap break-words">
                            {data.work_status.jabatan}
                          </span>
                        </div>
                      )}
                      {data.work_status.sk_international && (
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <p className="whitespace-pre-wrap break-words">
                            Sertifikat kompetensi intl:
                          </p>
                          <span className="font-semibold whitespace-pre-wrap break-words">
                            {data.work_status.sk_international}
                          </span>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Page;
