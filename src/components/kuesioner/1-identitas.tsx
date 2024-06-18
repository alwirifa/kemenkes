"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Calendar } from "../ui/calendar";
import React from "react";
import Container from "../home/Container";

const formSchema = z
  .object({
    fullName: z.string(),
    gender: z.string(),
    dateOfBirth: z.string(),
    provinceLiving: z.string(),
    phoneNumber: z.number(),
    emailAddress: z.string().email(),
    poltekKemenkes: z.string(),
    dateOfGraduated: z.string(),
    str: z.string(),
    status: z.string(),
    socialMedia: z.string(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    statusBekerja: z.string().optional(),
    lokasiBekerjaType: z.enum(["indonesia", "luarNegeri"]),
    lokasiBekerja: z.string().optional(),
    lokasiIndonesia: z.string().optional(),
    lokasiLuarNegeri: z.string().optional(),
    jenjangPendidikan: z.string().optional(),
    statusType: z.enum(["bekerja", "melanjutkanPendidikan", "belumBekerja"]),
  })
  .refine(
    (data) => {
      if (data.accountType === "company") {
        return !!data.companyName;
      }
      return true;
    },
    {
      message: "Company name is required",
      path: ["companyName"],
    }
  )
  .refine((data) => {
    if (data.statusType === "bekerja") {
      return !!data.lokasiBekerja;
    } else if (data.statusType === "melanjutkanPendidikan") {
      return !!data.jenjangPendidikan;
    }
    return true;
  })
  .refine((data) => {
    if (
      data.statusType === "bekerja" &&
      data.lokasiBekerjaType === "indonesia"
    ) {
      return !!data.lokasiIndonesia;
    }
  })
  .refine((data) => {
    if (
      data.statusType === "bekerja" &&
      data.lokasiBekerjaType === "luarNegeri"
    ) {
      return !!data.lokasiLuarNegeri;
    }
  });

export default function Identitas() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      provinceLiving: "",
      phoneNumber: undefined,
      poltekKemenkes: "",
      dateOfGraduated: "",
      str: "",
      status: "",
      socialMedia: "",
      emailAddress: "",
      companyName: "",
      lokasiBekerja: "",
      lokasiIndonesia: "",
      lokasiLuarNegeri: "",
    },
  });

  const accountType = form.watch("accountType");
  const statusType = form.watch("statusType");
  const lokasiBekerjaType = form.watch("lokasiBekerjaType");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className="flex flex-col  w-full">
      <Container>
      
        <div className="w-full max-w-7xl mx-auto ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full flex flex-col gap-4"
            >
              {/* Full Name Field */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nama Lengkap"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-6 w-full">
                {/* Gender Field */}
                <FormField
                  control={form.control}
                  name="gender"
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
                          <SelectItem value="laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth Field */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
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
                                <span>Pilih Tanggal</span>
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
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {/* <FormDescription>
                        Your date of birth is used to calculate your age.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Account Type Field */}
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi domisili saat ini</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih domisili saat ini" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Jawa Barat</SelectItem>
                        <SelectItem value="company">DKI Jakarta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Whatsapp Aktif</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nomor Whatsapp"
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
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Alamat Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

          
            </form>
          </Form>
        </div>
      </Container>
    </main>
  );
}

