"use client";

import Container from "@/components/Container";
import NakesSummary from "@/components/dashboard/nakes/summary/summary";
import React, { Suspense } from "react";

function page() {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <NakesSummary />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}

export default page;
