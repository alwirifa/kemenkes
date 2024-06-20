// GenderField.js
import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import axios from "axios";

const StatusField = () => {
  const { control, setValue } = useForm();
  const { form, handleFormDataChange } = useFormContext();

  const statusType = form.watch("status_kerja");
  // const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [lokasi, setLokasi] = useState("");

  const [negaraBekerja, setNegaraBekerja] = useState("");

  const handleDateChange = (field: any, date: Date | undefined) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    field.onChange(formattedDate);
  };

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

  const [instansi, setInstansi] = useState(false);
  const [instansiValue, setInstansiValue] = useState("");

  const handleValueInstansiChange = (value: string) => {
    if (value === "yanglain") {
      setInstansi(true);
      setInstansiValue("instansi_tempat_kerja");
    } else {
      setInstansi(false);
      form.setValue("instansi_tempat_kerja", value);
    }
  };

  const [skInternasional, setSkInternasional] = useState(false);

  const [skInternasionalValue, setSkInternasionalValue] = useState("");

  const handleValueSkInternasionalChange = (value: string) => {
    if (value === "skyanglain") {
      setSkInternasional(true);
      // Clear any previous value or set initial state for "skyanglain"
      setSkInternasionalValue("sk_internasional");
    } else {
      setSkInternasional(false);
      form.setValue("sk_internasional", value);
    }
  };

  const [sertifikatBahasa, setSertifikatBahasa] = useState(false);

  const [sertifikatBahasaValue, setSertifikatBahasaValue] = useState("");

  const handleValueSertifikatBahasaChange = (value: string) => {
    if (value === "bahasayanglain") {
      setSertifikatBahasa(true);
      setSertifikatBahasaValue("sertifikat_bahasa");
    } else {
      setSertifikatBahasa(false);
      form.setValue("sertifikat_bahasa", value);
    }
  };

  const [provinceOptions, setProvinceOptions] = useState([]);

  // Function to fetch province data
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

  // Fetch data once when the component mounts
  if (provinceOptions.length === 0) {
    fetchProvinceData();
  }

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
                  <SelectItem value="Melanjutkan Pendidikan">
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
                          toYear={2040}
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          // onSelect={(date) =>
                          //   field.onChange(date?.toISOString())
                          // }
                          onSelect={(date) => handleDateChange(field, date)}
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
                <div className="flex flex-col gap-2 lg:gap-2 items-end">
                  <FormField
                    control={form.control}
                    name="instansi_tempat_kerja"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Jenis Instansi tempat anda bekerja saat ini?
                        </FormLabel>
                        <Select onValueChange={handleValueInstansiChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih instansi tempat bekerja" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Puskesmas">Puskesmas</SelectItem>
                            <SelectItem value="RS Pemerintah">
                              RS Pemerintah
                            </SelectItem>
                            <SelectItem value="RS Swasta">RS Swasta</SelectItem>
                            <SelectItem value="Klinik Swasta">
                              Klinik Swasta
                            </SelectItem>
                            <SelectItem value="Non Fasyankes">
                              Non Fasyankes
                            </SelectItem>
                            <SelectItem value="yanglain">
                              Yang lain ...
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {instansi && (
                    <FormField
                      control={form.control}
                      name="instansi_tempat_kerja"
                      render={({ field }) => (
                        <FormItem className="w-full">
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
                  )}
                </div>

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
                      <FormLabel>
                        Sebutkan Provinsi tempat anda bekerja
                      </FormLabel>
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
                        Sebutkan nama instansi tempat anda bekerja saat ini
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Instansi" {...field} />
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

                {/* sk internasional */}
                <div className="space-y-2">
                  <Label>
                    Sebutkan sertifikat kompetensi standar internasional yang
                    anda miliki
                  </Label>
                  <div className="flex flex-col gap-2 lg:gap-2 items-end">
                    <FormField
                      control={form.control}
                      name="sk_internasional"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select
                            onValueChange={handleValueSkInternasionalChange}
                            value={field.value} // Bind the select value to form state
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih sertifikat" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="NCLEX">NCLEX</SelectItem>
                              <SelectItem value="Prometric">
                                Prometric
                              </SelectItem>
                              <SelectItem value="Tidak memiliki sertifikasi internasional">
                                Tidak memiliki sertifikasi internasional
                              </SelectItem>
                              <SelectItem value="skyanglain">
                                Yang lain ...
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {skInternasional && (
                      <FormField
                        control={form.control}
                        name="sk_internasional"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                placeholder="Keterangan sk yang anda miliki"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* sertifikat bahasa */}
                <div className="space-y-2">
                  <Label>Sebutkan sertifikat bahasa yang dimiliki</Label>
                  <div className="flex flex-col  gap-2  items-end">
                    <FormField
                      control={form.control}
                      name="sertifikat_bahasa"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select
                            onValueChange={handleValueSertifikatBahasaChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih sertifikat" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Bahasa Jepang">
                                Bahasa Jepang
                              </SelectItem>
                              <SelectItem value="Bahasa Jerman">
                                Bahasa Jerman
                              </SelectItem>
                              <SelectItem value="Bahasa Inggris">
                                Bahasa Inggris
                              </SelectItem>
                              <SelectItem value="Bahasa Arab">
                                Bahasa Arab
                              </SelectItem>
                              <SelectItem value="Bahasa Belanda">
                                Bahasa Belanda
                              </SelectItem>
                              <SelectItem value="Bahasa Korea">
                                Bahasa Korea
                              </SelectItem>
                              <SelectItem value="bahasayanglain">
                                Yang lain ...
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {sertifikatBahasa && (
                      <FormField
                        control={form.control}
                        name="sertifikat_bahasa"
                        render={({ field }) => (
                          <FormItem className="w-full">
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
                  </div>
                </div>

                {/* sertifikat bahasa */}
                <FormField
                  control={form.control}
                  name="sertifikat_bahasa"
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
          </>
        )}

        {/* Jenjang Pendidikan */}
        {statusType === "Melanjutkan Pendidikan" && (
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
