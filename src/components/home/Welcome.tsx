import React from "react";
import Container from "./Container";
import Link from "next/link";

const Welcome = () => {
  return (
    <Container>
      <section className="py-16 flex flex-col gap-4">
        <h2 className="text-4xl text-muted-foreground ">Selamat Datang!</h2>
        <h1 className="text-5xl font-semibold text-primary">ALUMNI POLTEKKES KEMENKES</h1>
        {/* <p className="max-w-xl">
          Selamat datang, di Laman, Kemenkes Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Minima, dolor ut error enim pariatur ex
          veritatis vitae exercitationem excepturi nesciunt voluptas ducimus
          cupiditate inventore accusantium ab dignissimos corrupti autem est?
        </p> */}

        <div className="mt-8">
          <Link
            href={"/kuesioner"}
            className="text-sm px-4 py-3 font-medium bg-primary hover:bg-primary/80 rounded-md text-white shadow-xl"
          >
            Tracer Study Lulusan Poltekkes Kemenkes
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Welcome;
