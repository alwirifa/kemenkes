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

type Props = {
  id: number;
};

function BarChartDetailComponent({ id }: Props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
        const { summary_work_status_nakes } = response.data.data;

        console.log('nakes', summary_work_status_nakes)
        const fetchedData =
          summary_work_status_nakes?.map((item: any, index: number) => ({
            nakes: item.nakes,
            bekerja: item.bekerja,
            belum_bekerja: item.belum_bekerja,
            melanjutkan_pendidikan: item.melanjutkan_pendidikan,
          })) || [];

        setData(fetchedData);
   
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="h-[500px] w-full border rounded-lg p-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="2 3" />
            <XAxis dataKey="nakes" />
            <Tooltip />
            <Bar dataKey="bekerja" fill="#06BCA5">
              <LabelList
                dataKey="bekerja"
                position="top"
                formatter={(value: any) => `${value}%`}
                className="font-semibold"
              />
            </Bar>
            <Bar dataKey="belum_bekerja" fill="#6AD7C9">
              <LabelList
                dataKey="belum_bekerja"
                position="top"
                formatter={(value: any) => `${value}%`}
                className="font-semibold"
              />
            </Bar>
            <Bar dataKey="melanjutkan_pendidikan" fill="#9BE4DB">
              <LabelList
                dataKey="melanjutkan_pendidikan"
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

export default BarChartDetailComponent;
