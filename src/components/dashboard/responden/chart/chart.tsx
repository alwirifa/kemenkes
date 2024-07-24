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
} from "recharts";
import { Loader2 } from "lucide-react";

function BarChartComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/responden`,
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
    <div style={{ width: "100%", height: 300 }} className="border rounded-lg p-4">
      {isLoading ? (
        <div className="mt-32 w-full flex justify-center items-center">
          <Loader2 className="animate-spin text-primary text-2xl h-12 w-12" />
        </div>
      ) : (
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#06BCA5">
              <LabelList
                dataKey="value"
                position="top"
                formatter={(value: any) => `${value}%`}
                className="font-semibold"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default BarChartComponent;
