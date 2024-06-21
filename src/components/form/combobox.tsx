"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "./context";

export function ComboboxDemo() {
  const { form } = useFormContext();
  const [provinceOptions, setProvinceOptions] = React.useState<string[]>([]);

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

  React.useEffect(() => {
    if (provinceOptions.length === 0) {
      fetchProvinceData();
    }
  }, [provinceOptions]);

  const [open, setOpen] = React.useState(false);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="provinsi_domisili"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Provinsi Domisili Saat Ini</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                  {...field}
                  onClick={() => setOpen(!open)}
                >
                  {field.value
                    ? provinceOptions.find((province) => province === field.value)
                    : "Select province..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                <Command>
                  <CommandInput placeholder="Search province..." />
                  <CommandList>
                    <CommandEmpty>No province found.</CommandEmpty>
                    <CommandGroup>
                      {provinceOptions.map((province) => (
                        <CommandItem
                          key={province}
                          value={province}
                          onSelect={(currentValue) => {
                            field.onChange(currentValue);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value === province ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {province}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
