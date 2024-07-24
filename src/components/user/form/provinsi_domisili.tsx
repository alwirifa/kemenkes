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
 Select,
 SelectValue,
 SelectTrigger,
 SelectContent,
 SelectItem,
} from "@/components/ui/select";

import axios from "axios";

type Props = {};

const ProvinsiDomisili = (props: Props) => {
  const { form } = useFormContext();
  const [provinceOptions, setProvinceOptions] = useState<string[]>([]);

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
        name="provinsi_domisili"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Provinsi Domisili Saat Ini</FormLabel>
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
    </Form>
  );
};

export default ProvinsiDomisili;
