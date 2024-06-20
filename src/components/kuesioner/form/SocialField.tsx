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
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SocialField = () => {
  const { form, schema, handleFormDataChange } = useFormContext();
  const [showKeluargaFields, setShowKeluargaFields] = useState(false);

  const [sumberSurvey, setSumberSurvey] = useState("");
  const handleValueSkInternasionalChange = (value: string) => {
    setShowKeluargaFields(value === "keluarga");
    setSumberSurvey("keluarga");
    handleFormDataChange("sumber_survey", value); 
  };


  return (
    <Form {...form}>
      <div className="">
        <div className="w-full lg:flex flex-col gap-4">
          <FormField
            control={form.control}
            name="sosial_media"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Sebutkan akun media sosial yang anda miliki
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Contoh: Instagram @ditjennakes; Facebook Kementerian Kesehatan; Twitter @ditjennakes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* sk internasional */}
          <div className="space-y-2">
            <Label>Dari mana anda mengetahui survey ini?</Label>
            <div className="flex flex-col  gap-2 lg:gap-6 items-end">
              <FormField
                control={form.control}
                name="sumber_survey"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select onValueChange={handleValueSkInternasionalChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih sumber" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="keluarga">
                          Keluarga/Kerabat/Teman
                        </SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="social">
                          Social Media
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {sumberSurvey && (
                <input
                  type="hidden"
                  name="sumber_survey"
                  value={sumberSurvey}
                />
              )}

              {showKeluargaFields && (
                <div className="flex gap-6 w-full">
                  <FormField
                    control={form.control}
                    name="sumber_survey_nama"
                    rules={{
                      required: "Nama harus diisi",
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="Nama" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sumber_survey_no_hp"
                    rules={{
                      required: "Nomor HP harus diisi",
                      pattern: {
                        value: /^\d+$/,
                        message: "Nomor HP harus berupa angka",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input placeholder="No. HP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SocialField;
