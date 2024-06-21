"use client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { useFormContext } from "./context";
import { formSchema } from "./schemas/formSchema";
import Email from "./email";
import Name from "./name";
import JenisKelamin from "./jeniskelamin";
import Container from "../home/Container";
import TanggalLahir from "./tanggal_lahir";
import ProvinsiDomisili from "./provinsi_domisili";
import NomorHandphone from "./nomor_handphone";
import STR from "./str";
import Status from "./status";

export default function FormKuesioner() {
  const { form } = useFormContext();

  const accountType = form.watch("accountType");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className="flex flex-col w-full">
      <Container>
        <div className="pb-16">
          <h1 className="text-4xl text-center font-medium text-muted-foreground">
            Tracer Study Lulusan Poltekkes Kemenkes
          </h1>
        </div>
        <div className="w-full max-w-7xl mx-auto border lg:p-16 p-4 px-8 rounded-xl shadow-md">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" w-full flex flex-col gap-4"
            >
              {/* <Name /> */}
              {/* <JenisKelamin />
              <TanggalLahir/>
              <ProvinsiDomisili/>
              <NomorHandphone/>
              <Email /> */}
              <STR/>
              <Status/>
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Account type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {accountType === "company" && (
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password confirm</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password confirm"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </main>
  );
}
