import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import axios from "axios";

interface ComboboxDemoProps {
 options: string[];
 onChange: (value: string) => void;
 placeholder: string;
}

const ComboboxDemo: React.FC<ComboboxDemoProps> = ({ options, onChange, placeholder }) => {
 const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
   onChange(event.target.value);
 };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [provinceOptions, setProvinceOptions] = React.useState<string[]>([]);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>(0);

  // Function to fetch province data
  const fetchProvinceData = async () => {
    try {
      const response = await axios.get("https://tracerstudy-poltekkeskemenkes.id/api/v1/get-data?type=province");
      setProvinceOptions(response.data);
    } catch (error) {
      console.error("Error fetching province data:", error);
    }
  };

  // Fetch data once when the component mounts
  React.useEffect(() => {
    if (provinceOptions.length === 0) {
      fetchProvinceData();
    }
  }, []); // Empty dependency array ensures this effect runs only once

  // Update trigger width when the component mounts or updates
  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? value // Directly show the selected value
            : "Select province..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: triggerWidth }}>
        <Command className="w-full">
          <CommandInput placeholder="Search province..." />
          <CommandList>
            <CommandEmpty>No province found.</CommandEmpty>
            <CommandGroup>
              {provinceOptions.map((province) => (
                <CommandItem
                  key={province}
                  value={province} // Use the province value as both value and label
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === province ? "opacity-100" : "opacity-0"
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
  );
}

export default ComboboxDemo
