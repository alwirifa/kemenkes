import React, { useState } from "react";
import { useFormContext } from "./context";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

import axios from "axios";
import { Input } from "@/components/ui/input";

type Props = {};

const SumberSurvey = (props: Props) => {
  const { form } = useFormContext();
  const statusKerja = form.watch("status_kerja");
  const lokasiKerja = form.watch("lokasi_kerja");
  const skInternasionalType = form.watch("sk_internasional_type");
  const sertifikatBahasatype = form.watch("sertifikat_bahasa_type");
  const instansi_tempat_kerja_type = form.watch("instansi_tempat_kerja_type");

  const sumber_survey_type = form.watch("sumber_survey_type");
  const handleDateChange = (field: any, date: Date | undefined) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    field.onChange(formattedDate);
  };

  const [provinceOptions, setProvinceOptions] = useState([]);

  const fetchProvinceData = async () => {
    try {
      const response = await axios.get(
        "https://tracerstudy-poltekkeskemenkes.id/api/v1/get-data?type=province"
      );
      setProvinceOptions(response.data);
    } catch (error) {
      console.error("Error fetching province data:", error);
    }
  };

  if (provinceOptions.length === 0) {
    fetchProvinceData();
  }

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="sumber_survey_type"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Dari mana anda mengetahui survey ini?</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih sumber" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Keluarga/Kerabat/Teman">
                    Keluarga/Kerabat/Teman
                  </SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {sumber_survey_type === "Keluarga/Kerabat/Teman" && (
        <div className="flex gap-6">
          <FormField
            control={form.control}
            name="sumber_survey_nama"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Sumber survey nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="sumber_survey_no_hp"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Sumber survey no hp</FormLabel>
                  <FormControl>
                    <Input placeholder="No. Hp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      )}
    </Form>
  );
};

export default SumberSurvey;
