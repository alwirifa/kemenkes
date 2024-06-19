import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/home/Container";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-full flex justify-center items-center font-medium text-3xl">
      <Container>
        <div className="pt-16 pb-6">
          <h1 className="text-4xl text-center text-muted-foreground">
            FAQ
          </h1>
        </div>
        <div className="pb-16 pt-6 max-w-6xl mx-auto w-full">

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Apa itu Tracer Study di Poltekkes Kemenkes?
            </AccordionTrigger>
            <AccordionContent>
              Tracer Study di Poltekkes Kemenkes adalah survei yang dilakukan
              untuk melacak lulusan dan mendapatkan umpan balik mengenai
              relevansi pendidikan yang mereka terima dengan dunia kerja.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Mengapa Tracer Study di Poltekkes Kemenkes penting?
            </AccordionTrigger>
            <AccordionContent>
              Tracer Study penting untuk menilai efektivitas program pendidikan
              di Poltekkes Kemenkes dan untuk meningkatkan kualitas kurikulum
              serta proses pembelajaran.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Siapa yang harus mengisi Tracer Study di Poltekkes Kemenkes?
            </AccordionTrigger>
            <AccordionContent>
              Semua lulusan Poltekkes Kemenkes diminta untuk mengisi Tracer
              Study beberapa waktu setelah mereka menyelesaikan pendidikan
              mereka.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Bagaimana cara mengisi Tracer Study di Poltekkes Kemenkes?
            </AccordionTrigger>
            <AccordionContent>
              Tracer Study dapat diisi secara online melalui platform atau link
              yang disediakan oleh Poltekkes Kemenkes. Instruksi lengkap
              biasanya diberikan oleh institusi.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Kapan Tracer Study di Poltekkes Kemenkes dilakukan?
            </AccordionTrigger>
            <AccordionContent>
              Tracer Study biasanya dilakukan sekitar 6 bulan hingga 1 tahun
              setelah lulusan menyelesaikan pendidikan mereka di Poltekkes
              Kemenkes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              Apa manfaat mengikuti Tracer Study bagi lulusan?
            </AccordionTrigger>
            <AccordionContent>
              Dengan mengikuti Tracer Study, lulusan dapat memberikan umpan
              balik yang berharga untuk peningkatan kualitas pendidikan di
              Poltekkes Kemenkes dan membantu calon mahasiswa dalam memilih
              program studi yang sesuai.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        </div>
      </Container>
    </div>
  );
};

export default page;
