import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
} from "recharts";

import Spinner from '../Spinner'

const BarGraph = () => {
  const [counts, setCounts] = useState([
    {
      Month: "Jan",
      cases: 0,
    },
    {
      Month: "Feb",
      cases: 0,
    },
    {
      Month: "Mar",
      cases: 0,
    },
    {
      Month: "Apr",
      cases: 0,
    },
    {
      Month: "May",
      cases: 0,
    },
    {
      Month: "Jun",
      cases: 0,
    },
    {
      Month: "Jul",
      cases: 0,
    },
    {
      Month: "Aug",
      cases: 0,
    },
    {
      Month: "Sep",
      cases: 0,
    },
    {
      Month: "Oct",
      cases: 0,
    },
    {
      Month: "Nov",
      cases: 0,
    },
    {
      Month: "Dec",
      cases: 0,
    },
  ]);
  const [allData, setAllData] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/getCaseCountByMonth`
      )
      .then((res) => {
        setAllData(res.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, []);

  // useEffect(() => {
  //   console.log(allData);
  //   // allData?.map((data) => {
  //   //   let month = parseInt(data?.attack_date.substring(3, 5));
  //   //   let current_count = counts[month - 1].cases;
  //   //   counts[month - 1].cases = current_count + 1;
  //   //   setCounts(counts);
  //   // });
  //   setTimeout(() => {
  //     setBarChartVisible(true);
  //     setRender(false);
  //   }, 1000);
  // }, [allData]);

  return Loading ? (
    <div className="md:min-w-full h-[400px] flex justify-center items-center">
      <Spinner size={50}/>
    </div>
  ) : (
    <>
      <BarChart
        width={1000}
        height={400}
        data={allData}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
        className="px-10 max-md:hidden"
      >
          <Bar
            dataKey="count"
            fill="#4682B4"
            barSize={40}
            animationDuration={1000}
          />
        <XAxis dataKey="month" />
        <YAxis dataKey="count" />
        <Tooltip cursor={false} />
      </BarChart>

      <BarChart
        width={450}
        height={400}
        data={allData}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
        className="px-10 md:hidden"
      >
          <Bar
            dataKey="count"
            fill="#4682B4"
            barSize={40}
            animationDuration={1000}
          />
        <XAxis dataKey="month" />
        <YAxis dataKey="count" />
        <Tooltip cursor={false} />
      </BarChart>
    </>
  );
};

export default BarGraph;
