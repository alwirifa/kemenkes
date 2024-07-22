"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Responden = {
  id: string;
  amount: number;
  status: "Bekerja" | "Belum Bekerja" | "Melanjutkan Pendidikan";
  email: string;
  name: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "poltekkes",
    header: "Asal poltekkes kemenkes",
  },
  {
    accessorKey: "name",
    header: "Nama lengkap (tanpa gelar)",
  },
  {
    accessorKey: "sex",
    header: "Jenis kelamin",
  },
  {
    accessorKey: "prodi",
    header: "Asal program studi",
  },
  {
    accessorKey: "graduate",
    header: "Tanggal keliar ijazah",
  },
  {
    accessorKey: "status",
    header: "Status anda saat ini",
  },
  {
    accessorKey: "workplace",
    header: "Tempat bekerja saat ini",
  },
  {
    accessorKey: "instansi",
    header: "Jenis Instansi",
  },
  {
    accessorKey: "skill",
    header: "Bidang Keahlian",
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { id } = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Aksi</DropdownMenuLabel>
  //           <DropdownMenuItem>
  //             <Link href={`/dashboard/poltekkes/${id}`}>Lihat Detail</Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
