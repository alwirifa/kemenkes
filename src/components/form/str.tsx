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
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

type Props = {};

const STR = (props: Props) => {
  const { form } = useFormContext();
  const strType = form.watch("str_type");

  const handleDateChange = (field: any, date: Date | undefined) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
    field.onChange(formattedDate);
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="str_type"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Apakah anda sudah memiliki STR?</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih STR" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sudah">sudah</SelectItem>
                  <SelectItem value="belum">belum</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      {strType === "sudah" && (
        <FormField
          control={form.control}
          name="tanggal_str"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Sebutkan Tanggal Penerbitan STR Pertama Kali
              </FormLabel>
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
                        <span>Pilih Tanggal Lahir</span>
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
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => handleDateChange(field, date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </Form>
  );
};

export default STR;
