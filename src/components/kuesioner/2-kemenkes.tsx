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

export default function Kemenkes() {
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
           

              <div className="flex gap-6">
                {/* Poltek Kemenkes Field */}
                <FormField
                  control={form.control}
                  name="poltekKemenkes"
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel>Asal Poltekes Kemenkes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Asal Poltekes Kemenkes"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Graduated Field */}
                <FormField
                  control={form.control}
                  name="dateOfGraduated"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Tanggal Lulus</FormLabel>
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
                                <span>Pick a date</span>
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
                      Your date of graduation is used to calculate your
                      experience.
                    </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* STR Field */}
              <FormField
                control={form.control}
                name="str"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apakah anda sudah memiliki STR?</FormLabel>
                    <FormControl>
                      <Input placeholder="STR" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

         

              {/* Social Media Field */}
              <FormField
                control={form.control}
                name="socialMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Social Media"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Account Type */}
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe akun</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Name */}
              {accountType === "company" && (
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Perusahaan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nama Perusahaan"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Status Type */}
              <FormField
                control={form.control}
                name="statusType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Saat ini?</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status saat ini" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bekerja">Bekerja</SelectItem>
                        <SelectItem value="melanjutkanPendidikan">
                          Melanjutkan Pendidikan
                        </SelectItem>
                        <SelectItem value="belumBekerja">
                          Belum Bekerja
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lokasi Bekerja */}
              {statusType === "bekerja" && (
                <>
                  <FormField
                    control={form.control}
                    name="lokasiBekerjaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lokasi Bekerja</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih lokasi bekerja" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="indonesia">Indonesia</SelectItem>
                            <SelectItem value="luarNegeri">
                              Luar Negeri
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Lokasi Indonesia */}
                  {lokasiBekerjaType === "indonesia" && (
                    <FormField
                      control={form.control}
                      name="lokasiIndonesia"
                      render={({ field }) => (
                        <FormItem>
                          <FormItem>
                            <FormLabel>
                              Jenis Intansi tempat anda bekerja saat ini?
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenjang pendidikan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="indonesia">
                                  Puskesmas
                                </SelectItem>

                                <SelectItem value="indonesia">
                                  RS Pemerintah
                                </SelectItem>

                                <SelectItem value="indonesia">
                                  RS Swasta
                                </SelectItem>

                                <SelectItem value="indonesia">
                                  Klinik Swasta
                                </SelectItem>

                                <SelectItem value="indonesia">
                                  Non Fsyankes
                                </SelectItem>

                                <SelectItem value="indonesia">
                                  Yang lain
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>Nama Intansi tempat bekerja</FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>
                              Sebutkan Provinsi tempat anda bekerja
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Lokasi Luar Negeri */}
                  {lokasiBekerjaType === "luarNegeri" && (
                    <FormField
                      control={form.control}
                      name="lokasiLuarNegeri"
                      render={({ field }) => (
                        <FormItem>
                          <FormItem>
                            <FormLabel>
                              Tahun bekerja anda mulai bekerja
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>Di Negara mana anda bekerja?</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenjang pendidikan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="indonesia">
                                  Belanda
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Jerman
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Jepang
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Arab Saudi
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Australia
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Singapura
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Yang lain
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>
                              Sebutkan skema penempatan anada di luar negeri
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenjang pendidikan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="indonesia">
                                  G to G/Kerjasama anatar pemerintah
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  G to P/Kerjasama pemerintah dengan pihak
                                  swasta
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  P to P/Kerjasama antar pihak swasta
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Arab Saudi
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Australia
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Singapura
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Yang lain
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>
                              Sebutkan nama intansi tempat anda bekerja saat ini
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>
                              Sebutkan posisi/jabatan saat ini. Contoh:
                              caregiver/ nurse/ manager/ dsb.
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>
                              Sebutkan sertifikast kompetensi standar
                              internasional yang anda miliki
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenjang pendidikan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="indonesia">NCLEX</SelectItem>
                                <SelectItem value="luarNegeri">
                                  Prometic
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Tidak Memiliki sertifikasi internasional
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Yang lain
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>
                              Sebutkan sertifikat bahasa yang dimiliki
                            </FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih jenjang pendidikan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="indonesia">
                                  Bahasa Jepang
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Bahasa Jerman
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Bahasa Inggris
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Bahasa Arab
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Bahasa Belanda
                                </SelectItem>
                                <SelectItem value="luarNegeri">
                                  Bahasa Korea
                                </SelectItem>
                                <SelectItem value="indonesia">
                                  Yang lain
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>

                          <FormItem>
                            <FormLabel>
                              Level Kemampuan Bahasa Asing Anda. Contoh: Bahasa
                              Jerman B-1/ Bahasa Jepang N2/ Bahasa Inggris C-1
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </FormItem>
                      )}
                    />
                  )}
                </>
              )}

              {/* Jenjang Pendidikan */}
              {statusType === "melanjutkanPendidikan" && (
                <FormField
                  control={form.control}
                  name="jenjangPendidikan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Jenjang pendidikan yang sedang anda tempuh?
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenjang pendidikan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="D4/STr">D4/STr</SelectItem>
                          <SelectItem value="S1">S1</SelectItem>
                          <SelectItem value="S2">S2</SelectItem>
                          <SelectItem value="S2">S3</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormItem>
                        <FormLabel>
                          Nama program studi yang anda tempuh
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      <FormItem>
                        <FormLabel>
                          Nama perguruan tinggi tempat anda menempuh pendidikan
                          saat ini
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            </form>
          </Form>
        </div>
      </Container>
    </main>
  );
}
