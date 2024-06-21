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

const Email = (props: Props) => {
  const { form } = useFormContext();
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Alamat Email</FormLabel>
            <FormControl>
              <Input placeholder="Alamat Email" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export default Email;
