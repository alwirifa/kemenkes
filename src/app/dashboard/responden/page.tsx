"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { columns } from "@/components/dashboard/responden/table/columns";
import { DataTable } from "@/components/dashboard/responden/table/data-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Loader2 } from "lucide-react";
import BarChartComponent from "@/components/dashboard/responden/chart/chart";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import CheckBoxGroup from "@/components/dashboard/responden/checkbox";
import Link from "next/link";

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

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
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

  console.log(selectedCategory)
  async function fetchAPIData(): Promise<any[]> {
    try {
      const token = localStorage.getItem("token");

      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/responden?search=${query}&page=${currentPage}&limit=${limit}`;
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

      const { summary_respondens } = response.data.data;
      const { total_page } = response.data.data;

      const formattedData = summary_respondens.map((item: any) => ({
        poltekkes: item.nama_poltekkes,
        name: item.nama_lengkap,
        sex: item.jenis_kelamin,
        prodi: item.nama_prodi,
        skill: item.bidang_keahlian,
        graduate: item.tanggal_lulus,
        status: item.status_kerja,
        workplace: item.nama_tempat_kerja,
        instansi: item.jenis_instansi,
      }));

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
  }, [searchParams?.page, query, currentPage, selectedCategory, selectedStatus]);

  return (
    <div className="">
      <Container>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl text-primary font-semibold">Responden</h1>
          <BarChartComponent />

          <div className="w-full flex justify-between items-center">
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
              <p className="font-medium">Summary</p>
            </div>
            <div className="flex gap-2">
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
                    <h1 className="font-semibold">Jenis Intansi</h1>
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
                        selectedStatus === option.value ? "font-medium bg-primary text-white" : "hover:bg-primary/20"
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
              <Loader2
                className={`animate-spin text-primary text-2xl h-12 w-12`}
              />
            </div>
          ) : (
            <DataTable columns={columns} data={data} />
          )}
          <div className="w-full flex justify-end mt-4">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </Container>
    </div>
  );
}
