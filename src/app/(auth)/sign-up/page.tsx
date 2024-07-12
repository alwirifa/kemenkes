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

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  );

export default function Home() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "https://close-positive-bunny.ngrok-free.app/api/auth/login",
        values,
        { withCredentials: true }
      );
      router.push("/admin");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
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
          Register akun baru
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const [isFocused, setIsFocused] = useState(false);

                return (
                  <FormItem className="relative">
                    <FormLabel className="font-semibold">
                      Email address
                    </FormLabel>
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
                          className={`absolute right-0 pr-3 ${
                            isFocused ? "text-primary" : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
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
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const [isFocused, setIsFocused] = useState(false);

                return (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                          className="py-6 placeholder:italic placeholder:text-muted text-primary"
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                        />
                        <div
                          className={`absolute right-0 pr-3 ${
                            isFocused ? "text-primary" : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-key"
                          >
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                          </svg>
                        </div>
                      </div>
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
                const [isFocused, setIsFocused] = useState(false);

                return (
                  <FormItem>
                    <FormLabel>Password confirm</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          placeholder="Password confirm"
                          type="password"
                          {...field}
                          className="py-6 placeholder:italic placeholder:text-muted text-primary"
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                        />
                        <div
                          className={`absolute right-0 pr-3 ${
                            isFocused ? "text-primary" : ""
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-key"
                          >
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                          </svg>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="mt-4 w-full max-w-max lg:mx-0">
              <button
                type="submit"
                className="px-10 py-3 rounded-md text-sm text-white bg-primary hover:bg-primary/80 font-medium "
              >
                Daftar
              </button>
            </div>
          </form>
        </Form>
        <Link href={'/sign-in'}
          className="text-sm text-muted-foreground  lg:text-left"
        >
          Sudah memiliki akun?
          <span className="ml-1 hover:underline cursor-pointer">Login</span>
        </Link>
      </div>
      <div className="hidden lg:block h-full w-full relative">
        <Image
          src="/images/loginBanner.webp"
          alt="logo"
          layout="fill"
          priority={true}
        />
      </div>
    </div>
  );
}
