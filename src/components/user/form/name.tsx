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
import { Input } from "@/components/ui/input";

type Props = {};

const Name = (props: Props) => {
  const { form } = useFormContext();
  return (
    <Form {...form}>
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
    </Form>
  );
};

export default Name;
