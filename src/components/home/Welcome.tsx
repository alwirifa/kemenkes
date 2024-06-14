import React from "react";
import Container from "./Container";
import Link from "next/link";

const Welcome = () => {
  return (
    <Container>
      <section className="py-16 flex flex-col gap-4">
        <h2 className="text-3xl font-semibold">Selamat Datang</h2>
        <h1 className="text-5xl font-bold text-primary">Kementrian Kesehatan</h1>
        <p className="max-w-xl">
          Selamat datang, di Laman, Kemenkes Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Minima, dolor ut error enim pariatur ex
          veritatis vitae exercitationem excepturi nesciunt voluptas ducimus
          cupiditate inventore accusantium ab dignissimos corrupti autem est?
        </p>

        <div className="mt-8">
          <Link
            href={"/kuesioner"}
            className="text-sm px-4 py-3 font-semibold bg-primary hover:bg-primary/80 rounded-md text-white shadow-xl"
          >
            Isi Kuesioner
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Welcome;
