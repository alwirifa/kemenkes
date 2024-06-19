import React from "react";
import Container from "./Container";

type Props = {};

const TentangKemenkes = (props: Props) => {
  return (
    <Container>
      <section className="bg-white ">
        <h2 className="text-4xl text-muted-foreground mb-6">
          Tentang Kemenkes
        </h2>
        <div className="leading-[32px] font-[400]">

       
        <p className="text-gray-600 mb-4 text-justify">
          Tracer study Kemenkes adalah sebuah studi yang dilakukan untuk
          menelusuri jejak lulusan institusi pendidikan di bawah naungan
          Kementerian Kesehatan. Studi ini bertujuan untuk mengumpulkan data
          terkait keterserapan lulusan di dunia kerja, relevansi antara
          pendidikan dan pekerjaan, serta kualitas pendidikan yang telah
          diterima. Melalui tracer study ini, Kemenkes berupaya untuk terus
          meningkatkan kualitas pendidikan dan menyesuaikan kurikulum agar lebih
          sesuai dengan kebutuhan industri dan masyarakat.
        </p>
        <ol className="list-decimal list-inside text-gray-600 mb-4">
          <li>
            Tracer study mengidentifikasi keterserapan lulusan dalam berbagai
            sektor pekerjaan, termasuk rumah sakit, puskesmas, klinik, dan
            industri kesehatan lainnya. Data yang dikumpulkan memberikan
            gambaran jelas mengenai distribusi lulusan dan sektor-sektor yang
            paling membutuhkan tenaga kesehatan.
          </li>
          <li>
            Studi ini juga mengevaluasi relevansi kurikulum pendidikan dengan
            dunia kerja. Informasi yang diperoleh dari lulusan dan pemberi kerja
            membantu dalam memperbarui dan meningkatkan materi pendidikan agar
            sesuai dengan perkembangan ilmu pengetahuan dan teknologi di bidang
            kesehatan.
          </li>
          <li>
            Tracer study menilai kualitas pendidikan dari perspektif lulusan dan
            pemberi kerja. Masukan dari lulusan mengenai pengalaman mereka
            selama pendidikan serta umpan balik dari pemberi kerja mengenai
            kompetensi lulusan menjadi dasar penting bagi Kemenkes untuk
            meningkatkan sistem pendidikan kesehatan di Indonesia.
          </li>
        </ol>
        </div>
      </section>
    </Container>
  );
};

export default TentangKemenkes;
