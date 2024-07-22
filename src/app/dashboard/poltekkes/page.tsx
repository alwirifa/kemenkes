"use client";

import Container from "@/components/Container";
import PoltekkesCard from "@/components/dashboard/poltekkes/card/card";
import React, { Suspense } from "react";

function page() {
  return (
    <div>
      <Container>
        <div className="flex flex-col gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <PoltekkesCard />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}

export default page;
