import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  onSelectionChange: (selectedValues: string[]) => void;
  options: Option[];
  title?: string;
};

const CheckBoxGroup = ({ onSelectionChange, options, title }: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectionChange = (value: string) => {
    let newSelectedValues: string[] = [];

    if (value === "") {
      // If selecting "All", clear all selected values
      newSelectedValues = [];
    } else {
      const currentIndex = selectedValues.indexOf(value);
      if (currentIndex === -1) {
        newSelectedValues = [...selectedValues, value];
      } else {
        newSelectedValues = selectedValues.filter((val) => val !== value);
      }
    }

    setSelectedValues(newSelectedValues);
    onSelectionChange(newSelectedValues);
  };

  const isSelected = (value: string) => selectedValues.includes(value);

  return (
   <div className="p-4 flex-wrap flex w-full gap-2 z-10 ">
   <button
     className={`px-4 py-2 text-xs font-medium max-w-max rounded-full border ${
       selectedValues.length === 0
         ? "bg-primary text-white border-primary"
         : "bg-white border-primary text-primary"
     }`}
     onClick={() => handleSelectionChange("")}
   >
     All
   </button>
   {options.map((option, index) => (
     <button
       key={index}
       className={`px-4 py-2 text-xs font-medium max-w-max rounded-full border ${
         isSelected(option.value)
           ? "bg-primary text-white border-primary"
           : "bg-white border-primary text-primary"
       }`}
       onClick={() => handleSelectionChange(option.value)}
     >
       {option.label}
     </button>
   ))}
 </div>
  );
};

export default CheckBoxGroup;
