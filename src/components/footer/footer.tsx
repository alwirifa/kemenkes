import Image from "next/image";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white text-gray-600 py-8 px-4 lg:px-14">
      {/* <header className=" px-4 py-8 lg:px-14">
     <div className="max-w-screen-2xl mx-auto"> */}
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <div className="space-y-2">
          <Image
            src={"/icons/logo_kemenkes.png"}
            alt="logo"
            height={10}
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
          <p>Gedung D. Jln. Raya Jend Sudirman Pintu I</p>
          <p>Senayan Jakarta 10270</p>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-2">KONTAK</h2>
          <p>Telp : +62 (21) 57946105</p>
          <p>
            <a
              href="mailto:belmawa@dikti.go.id"
              className="text-blue-600 hover:underline"
            >
              belmawa@dikti.go.id
            </a>
          </p>
        </div>
      </div>
      <div className="container mx-auto text-center border-t pt-4 mt-8">
        <p>© Copyright © DIKTI - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
