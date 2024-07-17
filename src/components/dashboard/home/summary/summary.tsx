import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";

type IntansiPercentageRespone = {
  name: string;
  count: string;
  value: string;
};

function HomeSummary() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/home`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data.data);
        const { percentage_work_statuses } = response.data.data;

        const fetchedData =
          percentage_work_statuses?.map((item: any) => ({
            name: item.work_status,
            count: item.number_responden,
            value: item.percentage_responden,
          })) || [];

        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item: IntansiPercentageRespone, index) => (
            <div
              key={index}
              className="p-4 border border-neutral-200 rounded-md flex flex-col gap-4 hover:bg-primary/10 duration-300 ease-in-out w-full"
            >
              <p className="text-lg font-semibold">{item.name}</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl text-primary font-bold">
                  {item.count}
                  <span className="italic text-sm text-black ml-2 font-normal">
                    Responden
                  </span>
                </p>
                <p className="text-sm italic">({item.value}%) </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeSummary;
