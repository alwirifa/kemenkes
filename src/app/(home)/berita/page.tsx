"use client"

import Image from "next/image";
import React, { useState } from "react";

// NewsCard Component
type NewsCardProps = {

  image: string;
  onClick: () => void;
};

const NewsCard: React.FC<NewsCardProps> = ({

  image,
  onClick,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 flex flex-col justify-between">
      <div className="w-full flex items-center justify-center py-6">
        <img src={image} className="h-[300px] bg-cover bg-center" alt={image} />
      </div>
      <button
        onClick={onClick}
        className="text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80"
      >
        Selengkapnya
      </button>
    </div>
  );
};

// Page Component
type Props = {};

const Page = (props: Props) => {
  const news = [
    {

      image: "/images/tracer1.jpg",
    },
    {

      image: "/images/tracer2.jpg",
    },
    {
   
      image: "/images/tracer3.jpg",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleOpenModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Berita Terkini</h2>
        <p className="text-gray-600 mb-12">
          Update terbaru: Pastikan PT anda telah melaporkan data Tracer Studi
          pelaksanaan tahun 2019, untuk memenuhi data pemeringkatan tahun 2020
        </p>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {news.map((item, index) => (
            <NewsCard
              key={index}
           
              image={item.image}
              onClick={() => handleOpenModal(item.image)}
            />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-12 relative">

            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-2xl text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <img src={modalImage} alt="Modal Image" className="h-full max-w-[500px] w-full bg-center" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
