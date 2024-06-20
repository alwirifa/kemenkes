"use client";

import React, { useState } from "react";
import { useFormContext } from "./FormContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";

interface Poltekkes {
  id_poltekkes: number;
  nama_poltekkes: string;
}

interface Prodi {
  id_prodi: number;
  nama_prodi: string;
}

const GenderField: React.FC = () => {
  const { form } = useFormContext();
  const [strType, setStrType] = useState<string>("");

  const [poltekkesOptions, setPoltekkesOptions] = useState<Poltekkes[]>([]);
  const [prodiOptions, setProdiOptions] = useState<Prodi[]>([]);
  const [selectedPoltekkesId, setSelectedPoltekkesId] = useState<number | null>(
    null
  );

  // Function to fetch Poltekkes data
  const fetchPoltekkesData = async () => {
    try {
      const response = await axios.get(
        `https://tracerstudy-poltekkeskemenkes.id/api/v1/get-data?type=poltekkes`
      );
      setPoltekkesOptions(response.data);
    } catch (error) {
      console.error("Error fetching poltekkes data:", error);
    }
  };

  // Function to fetch Prodi data based on selected Poltekkes ID
  const fetchProdiData = async (poltekkesId: number) => {
    try {
      const response = await axios.get<Prodi[]>(
        `https://tracerstudy-poltekkeskemenkes.id/api/v1/get-data?type=prodi&poltekkes_id=${poltekkesId}`
      );
      setProdiOptions(response.data);
    } catch (error) {
      console.error("Error fetching prodi data:", error);
    }
  };

  // Fetch Poltekkes data on component mount
  if (poltekkesOptions.length === 0) {
    fetchPoltekkesData();
  }

  // Handler for when a Poltekkes is selected
  const handlePoltekkesChange = (poltekkesId: number) => {
    setSelectedPoltekkesId(poltekkesId);
    fetchProdiData(poltekkesId);
  };

  const handleDateChange = (field: any, date: Date | undefined) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    field.onChange(formattedDate);
  };

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="poltekkes_id"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Asal Poltekes Kemenkes</FormLabel>
              <Select
                onValueChange={(value) => {
                  const id = parseInt(value, 10);
                  field.onChange(id);
                  handlePoltekkesChange(id);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih poltekkes" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {poltekkesOptions.map((poltekkes) => (
                    <SelectItem
                      key={poltekkes.id_poltekkes.toString()}
                      value={poltekkes.id_poltekkes.toString()}
                    >
                      {poltekkes.nama_poltekkes}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedPoltekkesId !== null && (
          <FormField
            control={form.control}
            name="prodi_id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prodi Kemenkes</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(parseInt(value, 10));
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prodi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {prodiOptions.map((prodi) => (
                      <SelectItem
                        key={prodi.id_prodi.toString()}
                        value={prodi.id_prodi.toString()}
                      >
                        {prodi.nama_prodi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Date of Graduated Field */}
        <FormField
          control={form.control}
          name="tanggal_lulus"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tanggal Lulus (Sesuai Ijazah)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pilih tanggal kelulusan</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    fromYear={1990}
                    toYear={2040}
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => handleDateChange(field, date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* STR Field */}
        <div className="w-full ">
          <div className="my-2">
            <FormLabel>Apakah anda sudah memiliki STR?</FormLabel>
          </div>
          <Select onValueChange={setStrType} value={strType}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Pilih status STR" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="sudah">Sudah</SelectItem>
              <SelectItem value="belum">Belum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {strType === "sudah" && (
          <FormField
            control={form.control}
            name="tanggal_str"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Sebutkan Tanggal Penerbitan STR Pertama Kali
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pilih tanggal penerbitan STR</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      fromYear={1990}
                      toYear={2040}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </Form>
  );
};

export default GenderField;
