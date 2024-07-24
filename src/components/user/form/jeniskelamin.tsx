import React from "react";
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

type Props = {};

const JenisKelamin = (props: Props) => {
  const { form } = useFormContext();
  return (
    <Form {...form}>
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
    </Form>
  );
};

export default JenisKelamin;
