import Container from "@/components/home/Container";
import TentangKemenkes from "@/components/home/TentangKemenkes";
import Welcome from "@/components/home/Welcome";
import BeritaTerkini from "@/components/home/Berita";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Welcome />
      <TentangKemenkes/>
      <BeritaTerkini />
    </div>
  );
}
