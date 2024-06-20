"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Container from "./Container";

type NewsCardProps = {
  image: string;
  onClick: () => void;
};

const NewsCard: React.FC<NewsCardProps> = ({ image, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 flex flex-col justify-between">
      <div className="w-full flex items-center justify-center py-6">
        <img src={image} className="h-[300px] bg-cover bg-center" alt={image} />
      </div>
      <button
        onClick={onClick}
        className="text-center text-sm font-medium bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80"
      >
        Selengkapnya
      </button>
    </div>
  );
};

const Berita: React.FC = () => {
  const [modalImage, setModalImage] = useState("");

  const handleOpenModal = (image: string) => {
    setModalImage(image);
  };

  const news = [
    { image: "/images/tracer1.jpg" },
    { image: "/images/tracer2.jpg" },
    { image: "/images/tracer3.jpg" },
  ];

  return (
    <div className="h-full flex justify-center items-center font-medium text-3xl">
      <Container>
        <div className="lg:p-16 w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl text-center text-muted-foreground">
            Berita Terkini
          </h1>
          {/* <p className="text-gray-600 mb-12 font-normal mt-2 text-center text-[16px] text-muted-foreground max-w-5xl">
            Update terbaru: Pastikan PT anda telah melaporkan data Tracer Studi
            pelaksanaan tahun 2019, untuk memenuhi data pemeringkatan tahun 2020
          </p> */}
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {news.map((item, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <NewsCard
                    image={item.image}
                    onClick={() => handleOpenModal(item.image)}
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Image Detail</DialogTitle>
                  </DialogHeader>
                  <div className="relative h-[500px] max-w-[500px] w-full">
                    <Image
                      src={modalImage}
                      alt="Modal Image"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  {/* <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose> */}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Berita;
