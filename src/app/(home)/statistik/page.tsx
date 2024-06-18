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
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <form className="p-6 pt-0 grid gap-4 w-full">
      <div className="py-8">
        <h1 className="text-gray-500 font-medium text-4xl text-center py-16">
          Data Kemenkes
        </h1>
      </div>
      <Container>
        <div className="py-16 max-w-5xl mx-auto  lex justify-center space-y-2">
         <Label className="my-2">Pilih Peguruan Tinggi</Label>
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
          </Select>
        </div>
      </Container>
    </form>
  );
};

export default page;
