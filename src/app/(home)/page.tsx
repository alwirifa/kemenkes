
import TentangKemenkes from "@/components/home/TentangKemenkes";
import Welcome from "@/components/home/Welcome";
import BeritaTerkini from "@/components/home/Berita";

export default function Home() {
  return (
    <div>
      <Welcome />
      <TentangKemenkes/>
      <BeritaTerkini />
    </div>
  );
}
