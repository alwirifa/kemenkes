"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/dashboard/poltekkes/detail/table/data-table";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { columns } from "@/components/dashboard/poltekkes/detail/table/columns";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import axios from "axios";
import Link from "next/link";
import Search from "@/components/search";
import CheckBoxGroup from "@/components/dashboard/responden/checkbox";

const instansiOptions = [
  {
    value: "RS Swasta",
    label: "RS Swasta",
  },
  {
    value: "Puskesmas",
    label: "Puskesmas",
  },
  {
    value: "RS Pemerintah",
    label: "RS Pemerintah",
  },
  {
    value: "Klinik Swasta",
    label: "Klinik Swasta",
  },
  {
    value: "Non Fanyakes",
    label: "Non Fanyakes",
  },
];

const statusOptions = [
  {
    value: "",
    label: "All",
  },
  {
    value: "Bekerja",
    label: "Bekerja",
  },
  {
    value: "Belum Bekerja",
    label: "Belum Bekerja",
  },
  {
    value: "Melanjutkan Pendidikan",
    label: "Melanjutkan Pendidikan",
  },
];

type SearchParams = {
  query?: string;
  page?: string;
  limit?: string;
};

type Props = {
  id: number;
  searchParams?: SearchParams;
};

function AlumniDetailTable({ id, searchParams }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const queryParams = useSearchParams();
  const query = queryParams.get("query") || "";
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 10;
  const [totalPages, setTotalPages] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleCheckboxChange = (selectedValues: string[]) => {
    setSelectedCategory(selectedValues.join(","));
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  async function fetchAPIData(): Promise<any[]> {
    try {
      const token = localStorage.getItem("token");

      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/poltekkes-detail/${id}?search=${query}&page=${currentPage}&limit=${limit}`;
      if (selectedCategory) {
        url += `&instansi=${selectedCategory}`;
      }
      if (selectedStatus) {
        url += `&status_kerja=${selectedStatus}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { summary_responden_detail } = response.data.data;
      const { total_page } = response.data.data;

      const formattedData = summary_responden_detail.map((item: any) => ({
        nama_lengkap: item.nama_lengkap,
        tanggal_lahir: item.tanggal_lahir,
        jenis_kelamin: item.jenis_kelamin,
        nomor_handphone: item.nomor_handphone,
        email: item.email,
        domisili: item.domisili,
        social_media: item.social_media,
        jenis_instansi: item.jenis_instansi,
        nama_prodi: item.nama_prodi,
        status_kerja: item.status_kerja,
        negara_kerja: item.negara_kerja,
        nama_tempat_kerja: item.nama_tempat_kerja,
        tanggal_str: item.tanggal_str || "-",
      }));
      console.log(summary_responden_detail);
      setTotalPages(total_page);
      return formattedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const apiData = await fetchAPIData();
      setData(apiData);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    loadData();
  }, [
    searchParams?.page,
    query,
    currentPage,
    selectedCategory,
    selectedStatus,
  ]);

  const handleDownload = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/export-dashboard?type=poltekkes&poltekkes-id=${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", `summary.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-table text-primary"
          >
            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
          </svg>
          <p className="font-bold text-2xl">Detil Alumni</p>
        </div>

        <div className="flex gap-2">
          <div
            onClick={handleDownload}
            className="px-4 py-2 flex gap-2 items-center rounded-md border border-primary text-primary text-sm cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-download"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <p>Download</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="px-4 py-2 rounded-md border border-primary text-primary text-sm cursor-pointer">
                Instansi
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[300px] bg-background rounded-md shadow-lg "
              align="end"
            >
              <DropdownMenuItem className="rounded-md px-3 py-2 text-sm  items-start justify-start flex flex-col gap-2 focus:bg-white">
                <h1 className="font-semibold">Jenis Instansi</h1>
              </DropdownMenuItem>
              <CheckBoxGroup
                title="Category"
                options={instansiOptions}
                onSelectionChange={handleCheckboxChange}
              />
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="px-4 py-2 rounded-md border border-primary text-primary text-sm cursor-pointer">
                Status
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 bg-background rounded-md shadow-lg "
              align="end"
            >
              {statusOptions.map((option) => (
                <div
                  key={option.value}
                  className={`rounded-md px-3 py-2 text-sm cursor-pointer mt-1 ${
                    selectedStatus === option.value
                      ? "font-medium bg-primary text-white"
                      : "hover:bg-primary/20"
                  }`}
                  onClick={() => handleStatusChange(option.value)}
                >
                  <span>{option.label}</span>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Search placeholder="Cari data ..." />
        </div>
      </div>

      {loading ? (
        <div className="mt-32 w-full flex justify-center items-center">
          <Loader2 className={`animate-spin text-primary text-2xl h-12 w-12`} />
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
      <div className="w-full flex justify-end mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default AlumniDetailTable;
