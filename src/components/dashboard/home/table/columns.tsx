import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: (info) => info.row.index + 1, 
  },
  {
    accessorKey: "poltekkes",
    header: "Poltekkes",
  },
  {
    accessorKey: "lulusan",
    header: "Lulusan (2020 - 2023)",
  },
  {
    accessorKey: "responden",
    header: "Responden",
  },
  {
    accessorKey: "bekerja",
    header: "Bekerja",
  },
  {
    accessorKey: "belumbekerja",
    header: "Belum Bekerja",
  },
  {
    accessorKey: "melanjutkanpendidikan",
    header: "Melanjutkan Pendidikan",
  },
  {
    accessorKey: "urutan",
    header: "Urutan",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(data.poltekkes).then(() => {
            console.log("Text copied to clipboard");
          }).catch(err => {
            console.error("Could not copy text: ", err);
          });
        } else {
          console.error("Clipboard API not supported or unavailable");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
