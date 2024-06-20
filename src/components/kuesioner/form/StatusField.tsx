// GenderField.js
import React, { useState } from "react";
import { useFormContext } from "./FormContext";
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
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";

const StatusField = () => {
  const { control, setValue } = useForm();
  const { form, handleFormDataChange } = useFormContext();

  const statusType = form.watch("status_kerja");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [lokasi, setLokasi] = useState("");

  const [negaraBekerja, setNegaraBekerja] = useState("");

  const handleLokasiChange = (value: string) => {
    setLokasi(value);
    if (value === "ina") {
      setNegaraBekerja("Indonesia");
      setValue("negara_kerja", "Indonesia");
    } else {
      setNegaraBekerja("");
      setValue("negara_kerja", "");
    }
  };

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-4">
        {/* Status Type */}
        <FormField
          control={form.control}
          name="status_kerja"
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
                  <SelectItem value="belumBekerja">Belum Bekerja</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Lokasi Bekerja */}
        {statusType === "bekerja" && (
          <>
            <div className="lg:flex gap-6 items-center">
              {/* <FormField
                control={form.control}
                name="negara_bekerja"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Dimana Anda Bekerja</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih lokasi bekerja" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="indonesia">Indonesia</SelectItem>
                        <SelectItem value="luarNegeri">Luar Negeri</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div className="w-full space-y-2">
                <FormLabel>Dimanakah anda bekerja?</FormLabel>
                <Select onValueChange={handleLokasiChange} value={lokasi}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status saat ini" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ina">Indonesia</SelectItem>
                    <SelectItem value="ln">Luar Negeri</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {negaraBekerja && (
                <input
                  type="hidden"
                  name="negara_kerja"
                  value={negaraBekerja}
                />
              )}

              {/* Date of work */}
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

            {/* Lokasi Indonesia */}
            {lokasi === "ina" && (
              <>
                <FormField
                  control={form.control}
                  name="instansi_tempat_kerja"
                  render={({ field }) => (
                    <FormItem>
                      <FormItem>
                        <FormLabel>
                          Jenis Intansi tempat anda bekerja saat ini?
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih intansi tempat bekerja" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PUSKESMAS">Puskesmas</SelectItem>

                            <SelectItem value="RSPEMERINTAH">
                              RS Pemerintah
                            </SelectItem>

                            <SelectItem value="RSSWASTA">RS Swasta</SelectItem>

                            <SelectItem value="KLINKSWASTA">
                              Klinik Swasta
                            </SelectItem>

                            <SelectItem value="FSYANKES">
                              Non Fsyankes
                            </SelectItem>

                            <SelectItem value="LUARNEGERI">
                              Yang lain
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nama_tempat_kerja"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Intansi tempat bekerja</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama intansi" {...field} />
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
                      <FormLabel>
                        Sebutkan Provinsi tempat anda bekerja
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Provinsi Bekerja" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Lokasi Luar Negeri */}
            {lokasi === "ln" && (
              <>
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

                <FormField
                  control={form.control}
                  name="negara_kerja"
                  render={({ field }) => (
                    // <FormItem>
                    //   <FormLabel>Di Negara mana anda bekerja?</FormLabel>
                    //   <Select onValueChange={field.onChange}>
                    //     <FormControl>
                    //       <SelectTrigger>
                    //         <SelectValue placeholder="Pilih Negara" />
                    //       </SelectTrigger>
                    //     </FormControl>
                    //     <SelectContent>
                    //       <SelectItem value="Belanda">Belanda</SelectItem>
                    //       <SelectItem value="Jerman">Jerman</SelectItem>
                    //       <SelectItem value="Jepang">Jepang</SelectItem>
                    //       <SelectItem value="Arab Saudi">Arab Saudi</SelectItem>
                    //       <SelectItem value="Australia">Australia</SelectItem>
                    //       <SelectItem value="Singapura">Singapura</SelectItem>
                    //       <SelectItem value="TEUINGBAHASANAON">
                    //         Yang lain
                    //       </SelectItem>
                    //     </SelectContent>
                    //   </Select>
                    //   <FormMessage />
                    // </FormItem>
                    <FormItem>
                      <FormLabel>Di Negara mana anda bekerja?</FormLabel>
                      <FormControl>
                        <Input placeholder="contoh: Amerika" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                <FormField
                  control={form.control}
                  name="nama_tempat_kerja"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sebutkan nama intansi tempat anda bekerja saat ini
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Intansi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jabatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sebutkan posisi/jabatan saat ini. Contoh: caregiver/
                        nurse/ manager/ dsb.
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Jabatan saat ini" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sk_internasional"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Sebutkan sertifikat kompetensi standar internasional
                        yang anda miliki
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih sertifikat" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NCLEX">NCLEX</SelectItem>
                          <SelectItem value="PROMETRIC">Prometric</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <FormDescription>
                        Kosongkan jika tidak punya
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sertifikat_bahasa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Level Kemampuan Bahasa Asing Anda. Contoh: Bahasa Jerman
                        B-1/ Bahasa Jepang N2/ Bahasa Inggris C-1
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Level kemampuan bahasa asing"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </>
        )}

        {/* Jenjang Pendidikan */}
        {statusType === "melanjutkanPendidikan" && (
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
                    Nama perguruan tinggi tempat anda menempuh pendidikan saat
                    ini
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
      </div>
    </Form>
  );
};

export default StatusField;
