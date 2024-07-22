import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";

type PoltekkesType = {
  poltekkes_id: number;
  poltekkes_name: string;
  bekerja: string;
  belum_bekerja: string;
  melanjutkan_pendidikan: string;
  lulusan: string;
  total_responden: string;
};

function PoltekkesCard() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const queryParams = useSearchParams();
  const query = queryParams.get("query") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/poltekkes?search=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data.data);
        const { data } = response.data;

        const fetchedData =
          data?.map((item: any) => ({
            poltekkes_id: item.poltekkes_id,
            poltekkes_name: item.poltekkes_name,
            bekerja: item.bekerja,
            belum_bekerja: item.belum_bekerja,
            melanjutkan_pendidikan: item.melanjutkan_pendidikan,
            lulusan: item.lulusan,
            total_responden: item.total_responden,
          })) || [];

        setData(fetchedData);
        console.log("dayta", fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query]);

  return (
    <div>
      {isLoading ? (
        <div className="mt-32 w-full flex justify-center items-center">
          <Loader2 className={`animate-spin text-primary text-2xl h-12 w-12`} />
        </div>
      ) : (
        <div>
          <div className="w-full mb-6 flex gap-6 flex-col md:flex-row justify-between items-center">
            <h1 className="text-4xl text-primary font-semibold">
              Politeknik Kesehatan
            </h1>

            <Search placeholder="Cari ..." />
          </div>
          <div className="grid grid-cols-1  xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {data.map((item: PoltekkesType, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 border border-neutral-200 rounded-md flex flex-col gap-4 w-full relative"
              >
                <div className="w-full flex justify-between items-center">
                  <h1 className="text-xl sm:text-2xl font-bold max-w-[16rem] md:max-w-xs">
                    {item.poltekkes_name}
                  </h1>
                  <Link
                    href={`/dashboard/poltekkes/${item.poltekkes_id}`}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium border border-black hover:bg-primary hover:border-primary hover:text-white ease-in-out duration-300 cursor-pointer"
                  >
                    Detail
                  </Link>
                </div>

                <div className="-translate-y-2 text-xs sm:text-sm italic text-primary font-semibold flex gap-2">
                  <p>Lulusan 20-23: {item.lulusan} lulusan</p>
                  <p>|</p>
                  <p>Responden: {item.total_responden} responden</p>
                </div>

                <div className="text-sm sm:text-lg flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>Bekerja:</p>
                    <p className="font-bold flex gap-2">
                      <p>{item.bekerja}</p>
                      <span className="font-normal ml-1">Responden</span>
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Belum Bekerja:</p>
                    <p className="font-bold flex gap-2">
                      <p>{item.belum_bekerja}</p>
                      <span className="font-normal ml-1">Responden</span>
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Melanjutkan Pendidikan:</p>
                    <p className="font-bold flex gap-2">
                      <p>{item.melanjutkan_pendidikan}</p>
                      <span className="font-normal ml-1">Responden</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PoltekkesCard;
