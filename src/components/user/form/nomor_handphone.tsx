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

const NomorHandphone = (props: Props) => {
  const { form } = useFormContext();
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="nomor_handphone"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Nomor Whatsapp Aktif</FormLabel>
            <FormControl>
              <Input placeholder="+62 |" type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default NomorHandphone;
