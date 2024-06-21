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

const Status = (props: Props) => {
  const { form } = useFormContext();
  const statusKerja = form.watch("status_kerja");
  const lokasiKerja = form.watch("lokasi_kerja");
  const skInternasionalType = form.watch("sk_internasional_type");
  const sertifikatBahasatype = form.watch("sertifikat_bahasa_type");
  const instansi_tempat_kerja_type = form.watch("instansi_tempat_kerja_type");

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
        name="status_kerja"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>
                Status Saat ini? (6 bulan setelah lulus dari Poltekkes Kemenkes)
              </FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status saat ini" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bekerja">Bekerja</SelectItem>
                  <SelectItem value="Melanjutkan Pendidikan">
                    Melanjutkan Pendidikan
                  </SelectItem>
                  <SelectItem value="Belum Bekerja">Belum Bekerja</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {statusKerja === "Melanjutkan Pendidikan" && (
        <>
          <FormField
            control={form.control}
            name="jenjang_pendidikan_ditempuh"
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
                    <SelectItem value="S3">S3</SelectItem>
                    <SelectItem value="Profesi">Profesi</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="prodi_ditempuh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Studi yang sedang ditempuh</FormLabel>
                <FormControl>
                  <Input placeholder="Program Studi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kampus_ditempuh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nama perguruan tinggi tempat anda menempuh pendidikan saat ini
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nama perguruan tinggi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      {statusKerja === "Bekerja" && (
        <>
          {/* <FormField
            control={form.control}
            name="profesi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profesi</FormLabel>
                <FormControl>
                  <Input placeholder="Profesi saat ini" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className="lg:flex gap-6 ">
            <FormField
              control={form.control}
              name="lokasi_kerja"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel>Dimanakah anda bekerja?</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Lokasi kerja" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Indonesia">Indonesia</SelectItem>
                        <SelectItem value="Luar Negeri">Luar Negeri</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="tanggal_kerja"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tanggal anda mulai bekerja?</FormLabel>
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
                            <span>Pilih tanggal mulai bekerja</span>
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
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
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
        </>
      )}

      {/* Indonesia */}
      {statusKerja === "Bekerja" && lokasiKerja === "Indonesia" && (
        <>
          <FormField
            control={form.control}
            name="instansi_tempat_kerja_type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Jenis Instansi tempat anda bekerja saat ini?
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih instansi tempat bekerja" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Puskesmas">Puskesmas</SelectItem>
                    <SelectItem value="RS Pemerintah">RS Pemerintah</SelectItem>
                    <SelectItem value="RS Swasta">RS Swasta</SelectItem>
                    <SelectItem value="Klinik Swasta">Klinik Swasta</SelectItem>
                    <SelectItem value="Non Fayankes">Non Fasyankes</SelectItem>
                    {/* <SelectItem value="yanglain">Yang lain ...</SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {instansi_tempat_kerja_type === "yanglain" && (
            <FormField
              control={form.control}
              name="instansi_tempat_kerja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instansi tempat kerja Lainya</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Keterangan jenis instansi tempat anda bekerja"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}
          <FormField
            control={form.control}
            name="nama_tempat_kerja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Instansi tempat bekerja</FormLabel>
                <FormControl>
                  <Input placeholder="Nama instansi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="provinsi_tempat_kerja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sebutkan Provinsi tempat anda bekerja</FormLabel>
                <Select onValueChange={field.onChange}>
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
        </>
      )}

      {/* Luar Negeri */}
      {statusKerja === "Bekerja" && lokasiKerja === "Luar Negeri" && (
        <>
          {/* Tahun Mulai Kerja */}
          <FormField
            control={form.control}
            name="tahun_mulai_kerja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun berapa anda mulai bekerja</FormLabel>
                <FormControl>
                  <Input placeholder="contoh : 2024" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Skema Penempatan */}
          <FormField
            control={form.control}
            name="skema_penempatan_ln"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sebutkan skema penempatan anda di luar negeri
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih skema penempatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="GTG">
                      G to G/Kerjasama antar pemerintah
                    </SelectItem>
                    <SelectItem value="GTP">
                      G to P/Kerjasama pemerintah dengan pihak swasta
                    </SelectItem>
                    <SelectItem value="PTP">
                      P to P/Kerjasama antar pihak swasta
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nama tempat kerja */}
          <FormField
            control={form.control}
            name="nama_tempat_kerja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sebutkan nama instansi tempat anda bekerja saat ini
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nama Instansi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Jabatan */}
          <FormField
            control={form.control}
            name="jabatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Sebutkan posisi/jabatan saat ini. Contoh: caregiver/ nurse/
                  manager/ dsb.
                </FormLabel>
                <FormControl>
                  <Input placeholder="Jabatan saat ini" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Negara bekerja */}
          <FormField
            control={form.control}
            name="negara_kerja"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Di Negara mana anda bekerja?</FormLabel>
                <FormControl>
                  <Input placeholder="contoh: Amerika" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SK INTERNASIONAL */}
          <FormField
            control={form.control}
            name="sk_internasional_type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Sebutkan sertifikat kompetensi standar internasional yang anda
                  miliki
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih sertifikat" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NCLEX">NCLEX</SelectItem>
                    <SelectItem value="Prometric">Prometric</SelectItem>
                    <SelectItem value="Tidak memiliki sertifikasi internasional">
                      Tidak memiliki sertifikasi internasional
                    </SelectItem>
                    <SelectItem value="skyanglain">Yang lain ...</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {skInternasionalType === "skyanglain" && (
            <FormField
              control={form.control}
              name="sk_internasional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sertifikasi Internasional Lainnya</FormLabel>
                  <FormControl>
                    <Input placeholder="Keterangan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* SERTIFIKAT BAHASA */}
          <FormField
            control={form.control}
            name="sertifikat_bahasa_type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sebutkan sertifikat bahasa yang dimiliki</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih sertifikat" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bahasa Jepang">Bahasa Jepang</SelectItem>
                    <SelectItem value="Bahasa Jerman">Bahasa Jerman</SelectItem>
                    <SelectItem value="Bahasa Inggris">
                      Bahasa Inggris
                    </SelectItem>
                    <SelectItem value="Bahasa Arab">Bahasa Arab</SelectItem>
                    <SelectItem value="Bahasa Belanda">
                      Bahasa Belanda
                    </SelectItem>
                    <SelectItem value="Bahasa Korea">Bahasa Korea</SelectItem>
                    <SelectItem value="Bahasa yang lain">
                      Yang lain ...
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {sertifikatBahasatype === "Bahasa yang lain" && (
            <FormField
              control={form.control}
              name="sertifikat_bahasa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sertifikasi Bahasa Lainya</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Keterangan sertifikat bahasa yang anda miliki"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="sertifikat_bahasa_kemampuan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level Kemampuan Bahasa Asing Anda.</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: B-1/N2/C-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </Form>
  );
};

export default Status;
