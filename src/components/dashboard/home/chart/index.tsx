import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#06BCA5", "#6AD7C9", "#9BE4DB"];
const RADIAN = Math.PI / 180;

interface PieData {
  name: string;
  value: number;
  color: string;
}

const PieChartComponent: React.FC = () => {
  const [apiData, setApiData] = useState<PieData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResponden, setTotalResponden] = useState<any>("");
  const [respondeRate, setRespondRate] = useState<any>("")
  const [totalLulusan,setTotalLulusan ] = useState<any>("")

  const formatNumber = (number: any) => {
    const roundedNumber = Math.round(number / 1000) * 1000;
    
    return new Intl.NumberFormat('id-ID').format(roundedNumber);
};



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
        const { total_responden, respond_rate, total_lulusan } = response.data.data;

        const fetchedData: PieData[] =
          percentage_work_statuses?.map((item: any, index: number) => ({
            name: item.work_status,
            value: item.percentage_responden,
            color: COLORS[index % COLORS.length],
          })) || [];

        setTotalResponden(total_responden);
        setTotalLulusan(formatNumber(total_lulusan))
        setRespondRate(respond_rate)
        setApiData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const sin = Math.sin(-midAngle * RADIAN);
    const cos = Math.cos(-midAngle * RADIAN);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke="#000"
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill="#000" stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${(percent * 100).toFixed(2)}%`}</text>
      </g>
    );
  };

  const [chartDimensions, setChartDimensions] = useState({
    width: 600,
    height: 360,
    cx: 300,
    cy: 170,
    outerRadius: 120,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setChartDimensions({
          width: 350,
          height: 300,
          cx: 170,
          cy: 150,
          outerRadius: 60,
        });
      } else if (window.innerWidth <= 768) {
        setChartDimensions({
          width: 500,
          height: 300,
          cx: 250,
          cy: 150,
          outerRadius: 80,
        });
      } else if (window.innerWidth <= 1024) {
        setChartDimensions({
          width: 500,
          height: 300,
          cx: 250,
          cy: 150,
          outerRadius: 100,
        });
      } else {
        setChartDimensions({
          width: 600,
          height: 360,
          cx: 300,
          cy: 170,
          outerRadius: 120,
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { width, height, cx, cy, outerRadius } = chartDimensions;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center h-full w-full relative border p-6 rounded-md">
        <h1 className="absolute top-6 left-6 font-semibold">
          Ringkasan Data *
        </h1>
        <div className="rounded-md ">
          <PieChart width={width} height={height}>
            <Pie
              data={apiData}
              cx={cx}
              cy={cy}
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="value"
            >
              {apiData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex flex-col gap-4">
          {apiData.map((item, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <div
                style={{ backgroundColor: item.color }}
                className="rounded-full h-4 w-4"
              />
              <p>{item.name}</p>
            </div>
          ))}
          <p className="text-muted-foreground italic">
            *Total {totalResponden} responden
          </p>
        </div>
      </div>
      <div className="w-full text-center bg-primary text-white py-4 rounded-b-md mt-6 sm:mt-0">
        Respond Rate: <span className="font-semibold">{respondeRate}%</span> dari{" "}
        <span className="font-semibold">{totalLulusan}</span> Lulusan
      </div>
    </div>
  );
};

export default PieChartComponent;
