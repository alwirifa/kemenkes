"use client";

import Container from "@/components/Container";
import IntansiSummary from "@/components/dashboard/instansi/summary/summary";
import NakesSummary from "@/components/dashboard/nakes/summary/summary";
import PoltekkesCard from "@/components/dashboard/poltekkes/card/card";
import { DataTable } from "@/components/dashboard/poltekkes/detail/table/data-table";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { columns } from "@/components/dashboard/poltekkes/detail/table/columns";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";

function page({
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


  return (
    <div>
      <Container>
        <div className="flex flex-col gap-6">
         
          <PoltekkesCard/>

          
        </div>
      </Container>
    </div>
  );
}

export default page;
