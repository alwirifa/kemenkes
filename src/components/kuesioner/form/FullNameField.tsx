import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormContext } from "./FormContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
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

const FullNameField = () => {
  const { form } = useFormContext();
  const [provinceOptions, setProvinceOptions] = useState<string[]>([]);

  // Function to fetch province data
  const fetchProvinceData = async () => {
    try {
      const response = await axios.get("http://tracerstudy-poltekkeskemenkes.id:8082/v1/get-data?type=province");
      setProvinceOptions(response.data);
    } catch (error) {
      console.error("Error fetching province data:", error);
    }
  };

  // Fetch data once when the component mounts
  if (provinceOptions.length === 0) {
    fetchProvinceData();
  }

  const handleDateChange = (field: any, date: Date | undefined) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    field.onChange(formattedDate);
  };

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-4">
        <div className="lg:flex gap-6 w-full">
          {/* Full Name Field */}
          <FormField
            control={form.control}
            name="nama_lengkap"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Lengkap" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Field */}
          <FormField
            control={form.control}
            name="jenis_kelamin"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Jenis Kelamin</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="lg:flex gap-6 w-full">
          {/* Date of Birth Field */}
          <FormField
            control={form.control}
            name="tanggal_lahir"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tanggal Lahir</FormLabel>
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
                          <span>Pilih Tanggal Lahir</span>
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
                      toYear={2023}
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        handleDateChange(field, date)
                      }
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
          {/* Province Living Field */}
          <FormField
            control={form.control}
            name="provinsi_domisili"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Provinsi Domisili Saat Ini</FormLabel>
                <Select
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih domisili saat ini" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinceOptions.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="lg:flex gap-6 w-full">
          {/* Phone Number Field */}
          <FormField
            control={form.control}
            name="nomor_handphone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nomor Whatsapp Aktif</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="+62 |" 
                    type="text" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Address Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Alamat Email</FormLabel>
                <FormControl>
                  <Input placeholder="Alamat Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

      </div>
    </Form>
  );
};

export default FullNameField;
