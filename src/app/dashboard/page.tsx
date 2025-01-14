"use client";

import React, { Suspense, useEffect, useState } from "react";
import Container from "@/components/Container";
import { columns } from "@/components/dashboard/home/table/columns";
import { DataTable } from "@/components/dashboard/home/table/data-table";
import PieChartComponent from "@/components/dashboard/home/chart";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import HomeSummary from "@/components/dashboard/home/summary/summary";

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
  const [totalPages, setTotalPages] = useState<any>("");
  const queryParams = useSearchParams();
  const currentPage = Number(queryParams.get("page")) || 1;
  const limit = Number(queryParams.get("limit")) || 10;
  const [chartMode, setChartMode] = useState(false);

  async function fetchAPIData(): Promise<any[]> {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/home?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { summary_respondens } = response.data.data;
      const { total_page } = response.data.data;

      const formattedData = summary_respondens.map((item: any) => ({
        poltekkes: item.poltekkes_name,
        lulusan: item.lulusan,
        responden: item.total_responden,
        bekerja: item.bekerja,
        belumbekerja: item.belum_bekerja,
        melanjutkanpendidikan: item.melanjutkan_pendidikan,
        urutan: item.urutan,
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
  }, [searchParams?.page, currentPage, chartMode]);

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token is missing");
      return;
    }
  
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/export-dashboard?type=home`;
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob'
      });
  
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = urlBlob;
      link.setAttribute('download', 'home-summary.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('There was a problem with the axios operation:', error);
    }
  };
  

  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl text-primary font-semibold">Ringkasan</h1>
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-book-open text-primary"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <p className="font-medium">Overview</p>
              </div>
              <div
                className="text-primary px-4 py-2 border border-primary rounded-md cursor-pointer hover:bg-primary hover:text-white ease-in-out duration-300"
                onClick={() => setChartMode(!chartMode)}
              >
                <p className="font-medium text-sm">
                  {chartMode ? "# Numeric Mode" : "# Chart Mode"}
                </p>
              </div>
            </div>
            <div>
              {loading ? (
                <div className="mt-32 w-full flex justify-center items-center">
                  <Loader2
                    className={`animate-spin text-primary text-2xl h-12 w-12`}
                  />
                </div>
              ) : (
                <div>{chartMode ? <PieChartComponent /> : <HomeSummary />}</div>
              )}
            </div>

            <div className="w-full flex justify-between">
              <div className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-table text-primary"
                >
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
                </svg>
                <p className="font-medium">Summary</p>
              </div>

              <div 
              onClick={handleDownload}
              className="px-4 py-2 flex gap-2 items-center rounded-md border border-primary text-primary text-sm cursor-pointer">
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
      </Suspense>
    </div>
  );
}
