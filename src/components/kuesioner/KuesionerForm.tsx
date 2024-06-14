import React from "react";
import Container from "../home/Container";

type Props = {};

const KuesionerForm = (props: Props) => {
  return (
    <form className="p-6 pt-0 grid gap-4 w-full ">
      <Container>
        <div className="px-64">
          <div className="flex gap-8 w-full">
            <div className="grid gap-2 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-none text-zinc-950"
              >
                Name Lengkap
              </label>
              <input
                type="text"
                id="email"
                placeholder="gojosatoru@example.com"
                className="h-10 w-full border rounded-md px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-green-600"
              />
            </div>
            <div className="grid gap-2 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-none text-zinc-950"
              >
                Jenis Kelamin
              </label>
              <input
                type="text"
                id="email"
                placeholder="gojosatoru@example.com"
                className="h-10 w-full border rounded-md px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-green-600"
              />
            </div>
          </div>

          <div className="flex gap-8 w-full mt-4">
            <div className="grid gap-2 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-none text-zinc-950"
              >
                Tanggal Lahir
              </label>
              <input
                type="text"
                id="email"
                placeholder="gojosatoru@example.com"
                className="h-10 w-full border rounded-md px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-green-600"
              />
            </div>
            <div className="grid gap-2 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-none text-zinc-950"
              >
                Provinsi domisili saat ini
              </label>
              <input
                type="text"
                id="email"
                placeholder="gojosatoru@example.com"
                className="h-10 w-full border rounded-md px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-green-600"
              />
            </div>
          </div>
        </div>
      </Container>
    </form>
  );
};

export default KuesionerForm;
