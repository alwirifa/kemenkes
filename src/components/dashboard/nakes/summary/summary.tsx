import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";

type IntansiPercentageRespone = {
  name: string;
  count: string;
  value: string;
  bekerja: string;
  belum_bekerja: string;
  melanjutkan_pendidikan: string;
};

type SearchParams = {
  query?: string;
  page?: string;
  limit?: string;
 };
 
 
function NakesSummary() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const queryParams = useSearchParams();
  const query = queryParams.get("query") || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/nakes?search=${query}`,
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
            name: item.nakes,
            bekerja: item.bekerja,
            belum_bekerja: item.belum_bekerja,
            melanjutkan_pendidikan: item.melanjutkan_pendidikan,
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
          <Loader2 className="animate-spin text-primary text-2xl h-12 w-12" />
        </div>
      ) : (
        <div>
          <div>
            <div className="w-full mb-6 flex gap-6 flex-col md:flex-row justify-between items-center">
              <h1 className="text-4xl text-primary font-semibold">Nakes</h1>
              <Search placeholder="Cari data ..." />
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {data.map((item: IntansiPercentageRespone, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 border border-neutral-200 rounded-md flex flex-col gap-4 hover:bg-primary/10 duration-300 ease-in-out w-full"
              >
                <h1 className="text-xl sm:text-2xl font-bold">{item.name}</h1>
                <div className="text-sm sm:text-lg flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p>Bekerja:</p>
                    <p className="font-bold">
                      {item.bekerja}{" "}
                      <span className="font-normal">Responden</span>
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Belum Bekerja:</p>
                    <p className="font-bold">
                      {item.belum_bekerja}{" "}
                      <span className="font-normal">Responden</span>
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Melanjutkan Pendidikan:</p>
                    <p className="font-bold">
                      {item.melanjutkan_pendidikan}{" "}
                      <span className="font-normal">Responden</span>
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

export default NakesSummary;
