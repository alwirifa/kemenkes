"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
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
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().email(),
  birth_date: z.string().min(1, "Tanggal Lahir harus diisi"),
});

const handleDateChange = (field: any, date: Date | undefined) => {
  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
  field.onChange(formattedDate);
};

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      birth_date: "",
    },
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.promise(
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/login-user`, values, {
          withCredentials: true,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("id", response.data.data.id);
          document.cookie = `token=${response.data.data.token}; path=/;`;
          document.cookie = `role=${response.data.data.role}; path=/;`;

          router.push("/user-profile");
          console.log("Response:", response.data);
        }),
      {
        loading: "Loading...",
        success: "Login successful!",
        error: "Login failed. Please try again.",
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 lg:px-0 lg:grid lg:grid-cols-2">
      <div className="flex flex-col gap-6 justify-center px-4 md:px-16 lg:px-24 xl:px-32 w-full lg:w-auto mx-auto lg:mx-0">
        <div className="absolute top-8 left-8 md:left-16 lg:left-24 xl:left-32">
          <Image
            src={"/icons/logo_kemenkes.png"}
            alt="logo"
            height={10}
            width={200}
          />
        </div>
        <h1 className="text-3xl lg:text-5xl font-semibold">
          Masuk ke Akun anda
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-semibold">Email address</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        placeholder="Email address"
                        type="email"
                        {...field}
                        className="py-6 placeholder:italic placeholder:text-muted text-primary"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                      />
                      <div
                        className={`absolute right-0 pr-4 ${
                          isFocused ? "text-primary" : "text-[#B8B8BC]"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-mail"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 py-6 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span className="text-muted italic">
                              Pilih Tanggal Lahir
                            </span>
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
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
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

            <div className="mt-4 w-full max-w-max lg:mx-0">
              <button
                type="submit"
                className="px-10 py-3 rounded-md text-sm text-white bg-primary hover:bg-primary/80 font-medium "
              >
                Masuk
              </button>
            </div>
          </form>
        </Form>
        <Link
          href={"/kuesioner"}
          className="text-sm text-muted-foreground  lg:text-left"
        >
          Belum memiliki akun?
          <span className="ml-1 hover:underline cursor-pointer">
            Isi kuesioner
          </span>
        </Link>
      </div>
      <div className="hidden lg:block h-full w-full relative">
        <Image
          src="/images/loginBanner1.webp"
          alt="logo"
          layout="fill"
          priority={true}
        />
      </div>
    </div>
  );
}
