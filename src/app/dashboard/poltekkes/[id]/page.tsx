"use client";

import Container from "@/components/Container";
import PoltekkesCardDetail from "@/components/dashboard/poltekkes/detail/card/detail-card";
import PieChartComponentDetail from "@/components/dashboard/poltekkes/detail/chart/pie-chart";
import React, { useEffect, useState } from "react";
import PoltekkesIntasnsiCard from "@/components/dashboard/poltekkes/detail/card/instansi-card";
import AlumniDetailTable from "@/components/dashboard/poltekkes/detail/table/table";
import BarChartDetailComponent from "@/components/dashboard/poltekkes/detail/chart/bar-chart";
import Link from "next/link";

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-6">
          <Link href={`/dashboard/poltekkes`} className="flex gap-1 hover:fill-primary hover:text-primary">
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
              className="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <p>Kembali ke Halaman Poltekkes</p>
          </Link>
          <PoltekkesCardDetail id={parseInt(params.id)} />
          <div className="flex md:flex-row flex-col gap-6 items-center">
            <BarChartDetailComponent id={parseInt(params.id)} />
            <PieChartComponentDetail id={parseInt(params.id)} />
          </div>

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
            <p className="font-bold text-2xl">
              Tempat Bekerja Berdasarkan Kelompok Intansi
            </p>
          </div>
          <PoltekkesIntasnsiCard id={parseInt(params.id)} />
          <AlumniDetailTable id={parseInt(params.id)} />
        </div>
      </Container>
    </div>
  );
}

export default page;
