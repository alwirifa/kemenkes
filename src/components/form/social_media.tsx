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
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const SocialMedia = (props: Props) => {
  const { form } = useFormContext();
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="sosial_media"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Sebutkan akun media sosial yang anda miliki</FormLabel>
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
    </Form>
  );
};

export default SocialMedia;
