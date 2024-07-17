"use client";

import Container from "@/components/Container";
import IntansiSummary from "@/components/dashboard/instansi/summary/summary";
import React from "react";

function page() {
  return (
    <div>
      <Container>
        <IntansiSummary />
      </Container>
    </div>
  );
}

export default page;
