"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { columns } from "@/components/dashboard/instansi/table/columns";
import { DataTable } from "@/components/dashboard/instansi/table/data-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Loader2 } from "lucide-react";
import BarChartComponent from "@/components/dashboard/instansi/chart/chart";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";
import CheckBoxGroup from "@/components/dashboard/responden/checkbox";
import IntansiSummary from "@/components/dashboard/instansi/summary/summary";

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

  const handleCheckboxChange = (selectedValues: string[]) => {
    setSelectedCategory(selectedValues.join(","));
  };

  async function fetchAPIData(): Promise<any[]> {
    try {
      const token = localStorage.getItem("token");

      let url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/instansi?search=${query}&page=${currentPage}&limit=${limit}`;
      if (selectedCategory) {
        url += `&instansi=${selectedCategory}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { summary_instansi, total_page } = response.data.data;

      const formattedData = summary_instansi.map((item: any) => ({
        poltekkes: item.poltekkes_name,
        total_responden: item.total_responden,
        rs_pemerintah: item.rs_pemerintah,
        klinik_pemerintah: item.klinik_pemerintah,
        puskesmas: item.puskesmas,
        rs_swasta: item.rs_swasta,
        klinik_swasta: item.klinik_swasta,
        non_fayankes: item.non_fayankes,
        luar_negeri: item.luar_negeri,
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
  }, [searchParams?.page, query, currentPage, selectedCategory]);

  return (
    <div className="">
      <Container>
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl text-primary font-semibold">Instansi</h1>
          <IntansiSummary/>
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
              <Search placeholder="Cari data ..." />

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="px-4 py-2 rounded-md border border-primary text-primary text-sm cursor-pointer">
                    Opsi
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

                  <DropdownMenuSeparator className="my-1" />

                  <DropdownMenuItem className="rounded-md px-3 py-2 text-sm focus:bg-white">
                    <div className="w-full rounded-md py-2 border text-center border-primary text-primary hover:bg-primary hover:text-white cursor-pointer">
                      <h1>Unduh Laporan</h1>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
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
