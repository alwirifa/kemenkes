import React from "react";
import { useFormContext } from "./FormContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SocialField = () => {
  const { form} = useFormContext();

  return (
    <Form {...form}>
      <div className="">
        {/* <Label>Sebutkan akun media sosial yang anda miliki</Label> */}
        <div className="w-full lg:flex gap-4">
          <FormField
            control={form.control}
            name="sosial_media"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sebutkan akun media sosial yang anda miliki</FormLabel>
                <FormControl>
                  <Input placeholder="social media" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Form>
  );
};

export default SocialField;
