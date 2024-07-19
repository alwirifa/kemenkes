"use client";

import Container from "@/components/Container";
import IntansiSummary from "@/components/dashboard/instansi/summary/summary";
import NakesSummary from "@/components/dashboard/nakes/summary/summary";
import Search from "@/components/search";
import React from "react";

function page() {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-6">
          <div className="w-full flex justify-between">

          <h1 className="text-4xl text-primary font-semibold">Nakes</h1>
          <Search placeholder="Cari data ..." />
          </div>

          <NakesSummary />
        </div>
      </Container>
    </div>
  );
}

export default page;
