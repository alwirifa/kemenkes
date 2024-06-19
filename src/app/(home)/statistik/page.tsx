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

const page = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center font-medium text-3xl">
      <Container>
        <div className="pt-16 pb-6">
          <h1 className="text-4xl text-center text-muted-foreground">
            Data Kemenkes
          </h1>
        </div>
        <div className="pb-16 pt-6 max-w-6xl mx-auto w-full">
          {/* <div className="my-2">

          <Label className="my-2">Pilih Peguruan Tinggi</Label>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Perguruan Tinggi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="laki-laki">
                Universitas Pendidikan Indonesia
              </SelectItem>
              <SelectItem value="perempuan">Universitas Indonesia</SelectItem>
              <SelectItem value="perempuan">Universitas Example</SelectItem>
            </SelectContent>
          </Select> */}
          <div className="relative max-h-[600px] h-[600px] w-full">
            <Image
              src="/images/mahasiswaAktif.png"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative max-h-[600px] h-[600px] w-full">
            <Image
              src="/images/poltekes.png"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
