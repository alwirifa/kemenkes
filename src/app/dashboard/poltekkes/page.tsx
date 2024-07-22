"use client";

import Container from "@/components/Container";
import PoltekkesCard from "@/components/dashboard/poltekkes/card/card";
import React from "react";

function page() {
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
