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
import { Input } from "../ui/input";
import axios from "axios";

type Props = {};

interface Poltekkes {
  id_poltekkes: number;
  nama_poltekkes: string;
}

interface Prodi {
  id_prodi: number;
  nama_prodi: string;
}

const Poltekkes = (props: Props) => {
  const { form } = useFormContext();

  const handleDateChange = (field: any, date: Date | undefined) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    field.onChange(formattedDate);
  };

  const [poltekkesOptions, setPoltekkesOptions] = useState<Poltekkes[]>([]);
  const [prodiOptions, setProdiOptions] = useState<Prodi[]>([]);
  const [selectedPoltekkesId, setSelectedPoltekkesId] = useState<number | null>(
    null
  );

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

  if (poltekkesOptions.length === 0) {
    fetchPoltekkesData();
  }

  // Handler for when a Poltekkes is selected
  const handlePoltekkesChange = (poltekkesId: number) => {
    setSelectedPoltekkesId(poltekkesId);
    fetchProdiData(poltekkesId);
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

        <div className="lg:flex gap-6 ">
          <FormField
            control={form.control}
            name="nim"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>NIM</FormLabel>
                <FormControl>
                  <Input placeholder="NIM" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>
      </div>
    </Form>
  );
};

export default Poltekkes;
