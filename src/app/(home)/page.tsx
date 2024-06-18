import TentangKemenkes from "@/components/home/TentangKemenkes";
import Welcome from "@/components/home/Welcome";

type NewsCardProps = {
  title?: string;
  description?: string;
  link?: string;
  image: string;
};

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  link,
  image,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 flex flex-col justify-between">
      <div className="w-full flex items-center justify-center py-6">
        {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p> */}
        <img src={image} className="h-[300px] bg-cover bg-center" alt={image} />
      </div>
      <a
        href={link}
        className="text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80"
      >
        Selengkapnya
      </a>
    </div>
  );
};

export default function Home() {
  const news = [
    {
      // title:
      //   "Perpanjangan Batas Waktu Anugerah Pembelajaran dan Kemahasiswaan Tahun 2022 Program Tracer Study",
      // description:
      //   "Yth. 1. Pimpinan Perguruan Tinggi Negeri 2. Pimpinan Perguruan Tinggi Swasta Berdasarkan surat Plt. Direktur Pembelajaran dan Kemahasiswaan nomor 7707/E2/DT.02.01/2022",
      // link: "#",
      image: "/images/tracer1.jpg",
    },
    {
      // title:
      //   "Anugerah Pembelajaran dan Kemahasiswaan Tahun 2022 untuk Perguruan Tinggi Negeri",
      // description:
      //   "Yth. Pimpinan Perguruan Tinggi Negeri Direktorat Jenderal Pendidikan Tinggi, Riset, dan Teknologi, Kemendikbudristek akan menyelenggarakan Anugerah Pembelajaran dan Kemahasiswaan Tahun 2022 untuk Perguruan",
      // link: "#",
      image: "/images/tracer2.jpg",
    },
    {
      // title:
      //   "Anugerah Pembelajaran dan Kemahasiswaan Tahun 2022 untuk Perguruan Tinggi Swasta",
      // description:
      //   "Yth. Pimpinan Perguruan Tinggi Swasta Direktorat Jenderal Pendidikan Tinggi, Riset, dan Teknologi, Kemendikbudristek akan menyelenggarakan Anugerah Pembelajaran dan Kemahasiswaan Tahun 2022 untuk Perguruan",
      // link: "#",
      image: "/images/tracer3.jpg",
    },
  ];

  return (
    <div>
      <Welcome />
      <TentangKemenkes />
      <div className="py-16">
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Berita Terkini
            </h2>
            <p className="text-gray-600 mb-12">
              Update terbaru: Pastikan PT anda telah melaporkan data Tracer
              Studi pelaksanaan tahun 2019, untuk memenuhi data pemeringkatan
              tahun 2020
            </p>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {news.map((item, index) => (
                <NewsCard key={index} image={item.image} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
