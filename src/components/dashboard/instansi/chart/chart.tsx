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

function BarChartComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/summary/instansi`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response:", response.data.data);
        const { percentage_instansi } = response.data.data;

        const fetchedData =
          percentage_instansi?.map((item: any) => ({
            name: item.jenis_instansi,
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
    <div style={{ width: "100%", height: 300 }} className="border rounded-lg p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (

        
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 3" />
            <XAxis dataKey="name" />
            {/* <YAxis dataKey="count"/> */}
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
