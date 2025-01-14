"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

type Props = {
  id: number;
};

function PoltekkesCardDetail({ id }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [percentageWorkStatus, setPercentageWorkStatus] = useState([]);
  const [totalLulusan, setTotalLulusan] = useState("");
  const [totalResponden, setTotalRespondedn] = useState("");
  const [respondRate, setRespondRate] = useState("");
  const [poltekkseName, setPoltekkesName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/poltekkes-detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data.data);
        const { data } = response.data;
        console.log("data", data);

        const {
          percentage_work_statuses,
          total_responden,
          total_lulusan,
          respond_rate,
          poltekkes_name,
        } = response.data.data;

        setRespondRate(respond_rate);
        setTotalLulusan(total_lulusan);
        setTotalRespondedn(total_responden);
        setPoltekkesName(poltekkes_name);

        console.log(percentage_work_statuses);
        const fetchDataPercentageWorkStatus =
          percentage_work_statuses?.map((item: any) => ({
            work_status: item.work_status,
            number_responden: item.number_responden,
            percentage_responden: item.percentage_responden,
          })) || [];

        setPercentageWorkStatus(fetchDataPercentageWorkStatus);
        console.log("work status", fetchDataPercentageWorkStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl text-primary font-semibold">{poltekkseName}</h1>

      <div className="flex flex-col md:flex-row gap-2 font-medium text-sm md:text-base">
        <p>Jumlah Lulusan (2020 - 2023): {totalLulusan} Lulusan</p>
        <p className="hidden sm:block">|</p>
        <p>
          Responden: {totalResponden} Responden {respondRate}%
        </p>
      </div>
      {isLoading ? (
        <div className="mt-32 w-full flex justify-center items-center">
          <Loader2 className={`animate-spin text-primary text-2xl h-12 w-12`} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {percentageWorkStatus.map((item: any, index) => (
            <div
              key={index}
              className="p-4 border border-neutral-200 rounded-md flex flex-col gap-4 hover:bg-primary/10 duration-300 ease-in-out w-full"
            >
              <p className="text-lg font-semibold">{item.work_status}</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl text-primary font-bold">
                  {item.number_responden || 0}
                  <span className="italic text-sm text-black ml-2 font-normal">
                    Responden
                  </span>
                </p>
                <p className="text-sm italic">
                  ({item.percentage_responden}%){" "}
                </p>
              </div>
            </div>
          ))}

          <div className="p-4 border border-neutral-200 rounded-md flex flex-col gap-4 hover:bg-primary/10 duration-300 ease-in-out w-full">
            <p className="text-lg font-semibold">Total Responden</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl text-primary font-bold">
                {totalResponden}
                <span className="italic text-sm text-black ml-2 font-normal">
                  Responden
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PoltekkesCardDetail;
