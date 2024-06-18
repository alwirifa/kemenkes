import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white text-gray-600 py-8 px-4 lg:px-14">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-2">
          <Image
            src={"/icons/logo_kemenkes.png"}
            alt="logo"
            height={50}
            width={200}
          />
          <div>
            <p>Kementerian Kesehatan</p>
            <p>
              Tracer Study, Direktorat Jenderal Pendidikan Tinggi Kementerian
              Pendidikan dan Kebudayaan
            </p>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <i className="fas fa-globe"></i>
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">ALAMAT</h2>
          <p>Gedung Kemenkes RI</p>
          <p>Jl. HR. Rasuna Said Blok X.5 Kav. 4-9</p>
          <p>Jakarta 12950</p>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-2">KONTAK</h2>
          <p>Telp : +62 (21) 57946105</p>
          <p>
            <a
              href="mailto:belmawa@dikti.go.id"
              className="text-blue-600 hover:underline"
            >
              be@dikti.go.id
            </a>
          </p>
        </div>
      </div>
      <div className="container mx-auto text-center border-t pt-4 mt-8">
        <p>© Copyright © KEMENKES - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
