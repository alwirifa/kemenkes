"use client";

import Container from "@/components/home/Container";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center font-medium text-3xl">
      <Container>
        <div className="pt-16 pb-6">
          <h1 className="text-4xl text-center text-muted-foreground">
            Data Kemenkes
          </h1>
        </div>
        <div className="pb-16 pt-6 max-w-6xl mx-auto w-full">
          <div className="relative max-h-[200px] lg:max-h-[600px] h-[600px] w-full">
            <Image
              src="/images/mahasiswaAktif.png"
              alt=""
              fill
              style={{ objectFit: "contain" }}
              className="sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]"
            />
          </div>
          <div className="relative max-h-[200px] lg:max-h-[600px] h-[600px] w-full mt-6">
            <Image
              src="/images/poltekes.png"
              alt=""
              fill
              style={{ objectFit: "contain" }}
              className="sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] xl:max-h-[600px]"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Page;
