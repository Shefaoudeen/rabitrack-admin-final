import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import Papa from "papaparse";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";

//Data set up for filter section
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DISTRICTS = ["Puducherry", "Karaikal", "Mahe", "Yanam"]
let years = []
const PUBLISHED_YEAR = 2024
const date = new Date()
for (let i = date.getFullYear(); i >= PUBLISHED_YEAR; i--) {
  years.push(i)
}

const ViewReports = () => {
  const [allReports, SetAllReports] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    district: "",
    year: "",
    month: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const URL = `${import.meta.env.VITE_BASE_URL}/getCases?page=${page}&district=${filter.district}&year=${filter.year}&month=${filter.month}`
    setIsLoading(true);
    setError("");
    axios
      .get(URL)
      .then((res) => {
        SetAllReports(res.data);
        //console.log(res.data);
        setIsLoading(false);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth", // Enables smooth scrolling
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
        if (err.status == 404)
          return setError("No cases found!");
        if (err.status == 401)
          return navigate('/login')
        setError("Something went Wrong, Please reload this page!");
      });
  }, [page, filter]);




  function handleClearFilter() {
    setFilter({ ...filter, district: "", year: "", month: "" });
  }

  function handleYearChange({target}){
    if(target.value === "")
      setFilter({...filter,year : target.value, month : ""}) //remove the month filter
    else
    setFilter({...filter,year : target.value})
  }
  function onNext() {
    setPage((page) => page + 1);
    setIsLoading(true);
  }
  function onPrev() {
    setPage((page) => page - 1);
    setIsLoading(true);
  }

  const downloadCSV = () => {
    const URL_ENDPOINT = `${import.meta.env.VITE_BASE_URL}/getFullReport?page=${page}&district=${filter.district}&year=${filter.year}&month=${filter.month}`
    axios.get(URL_ENDPOINT)
      .then((res) => {
      // console.log(res.data);
      const csv = Papa.unparse(res.data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download",  //month-year_district.csv
        `${filter.year && filter.year + "-"}${filter.month && filter.month.toString().padStart(2,'0')+'_'}${filter.district === "" ? "All" : filter.district}_cases.csv`); // File name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(err => {
      console.log(err);
      alert("Something went wrong in downloading the report!")
    })
  };

  return (
    <div className="flex flex-col items-center w-screen py-10 relative">
      {/* Loader */}
      <div className="absolute left-5 top-5 md:left-10 md:top-10 hover:scale-110 duration-300">
        <Link to={"/"} className="bg-slate-300 rounded-full" title="go back">
          <IoArrowBackCircleOutline size={40} color="#3B82F6" />
        </Link>
      </div>
      <h1 className="text-xl font-bold">REPORTS</h1>
      {isLoading ? (
        <div className="h-[30vw] flex items-center justify-center"><PulseLoader color="#2f8afd" size={12} /></div>
      ) : (
        <>
          {/*Filter sections */}
            <div className={`py-5 flex md:gap-5 max-md:flex-col flex-col md:flex-row max-w-[80vw] md:w-fit max-md:${`flex-col gap-4`} justify-center gap-10 items-start md:items-center`}>
              <div className="flex items-center w-full md:w-auto justify-between gap-4">
                <label>Select District</label>
                <select
                  title="Select District"
                  value={filter.district}
                  onChange={(e) => {
                    setFilter({ ...filter, district: e.target.value });
                    setPage(1);
                  }}
                  className="min-w-40 md:min-w-32 border p-2 rounded-md"
                >
                  <option value={""}>All</option>
                  {DISTRICTS.map((district) => <option>{district}</option>)}
                </select>
              </div>
              <div className="flex w-full md:w-fit md:justify-center justify-between items-center gap-4">
                <label>Select Year</label>
                <select title="Select Year" value={filter.year} onChange={handleYearChange} className="min-w-40 md:min-w-32 border p-2 rounded-md">
                  <option value={""}>All</option>
                  {years.map((year) => <option>{year}</option>)}
                </select>
              </div>
              {/* only filter months when year is selected */}
              {filter.year && (
                <div className="flex items-center gap-4">
                  <label>Select Month</label>
                  <select title="Select Month" value={filter.month} onChange={(e) => setFilter({ ...filter, month: e.target.value })} className="min-w-40 md:min-w-32 border p-2 rounded-md">
                    <option value={""}>All</option>
                    {MONTHS.map((month, i) => <option value={i + 1}>{month}</option>)}
                  </select>
                </div>
              )}
              {/* filter button */}
              {/* <button className={`text-md bg-blue-500 text-white py-2 px-3 rounded-xl hover:bg-blue-400 duration-300`}>Filter</button> */}
              <div className="flex w-full md:w-auto md:gap-4 justify-between">
              <button onClick={downloadCSV} className="group bg-blue-500 duration-300 text-white p-2 rounded-lg flex items-center gap-1" title={`download reports for ${filter.district || "All districts"} ${filter.year} ${filter.month}`}>
                <MdDownload size={25} className="group-hover:scale-110 duration-300"/>
                Download CSV
              </button>
              {(filter.district || filter.year) && (
                  <button onClick={handleClearFilter} className="text-red-500 rounded-full">
                    clear filter
                  </button>
                )}
              </div>
            </div>
          

          {/* {/*Reports */}
          {error ?
            <div className="h-[30vw] flex items-center justify-center">
              <h2 className="text-red-500 ">{error}</h2>
            </div> : 
            <>
              <div className={`${allReports.length > 2 ? "grid lg:grid-cols-3 md:grid-cols-2 gap-10" : "flex gap-10"} max-md:flex max-md:flex-col px-5 py-10`}>
                {allReports.map((cases, index) => (
                  <div key={index} className="max-w-[340px] md:min-w-[360px] border-2 p-5 rounded-xl bg-white shadow-2xl shadow-black/50  hover:border-black/50 duration-300">
                    <table className="mb-5">
                      <tr className=" items-center">
                        <td className="font-semibold text-lg">Case ID </td>
                        <td className="font-medium">: {cases?.case_id}</td>
                      </tr>
                      <tr className=" items-center">
                        <td className="font-semibold text-lg">Doctor Name </td>
                        <td>: {cases?.doctor_name}</td>
                      </tr>
                      <tr className=" items-center">
                        <td className="font-semibold text-lg">Attacker Species </td>
                        <td>: {cases?.attacker_species || "unknown"}</td>
                      </tr>
                      <tr className=" items-center">
                        <td className="font-semibold text-lg">Victim Species</td>
                        <td>: {cases?.victim_species || "unknown"}</td>
                      </tr>
                      <tr className=" items-center">
                        <td className="font-semibold text-lg">Attack Date </td>
                        <td>: {cases?.attack_date}</td>
                      </tr>
                      <tr className=" items-center">
                        <td className="font-semibold text-lg">District </td>
                        <td>: {cases?.district}</td>
                      </tr>
                    </table>
                    <Link to={`/case/${cases?.case_id}`}>
                      <button className="w-full bg-blue-500 py-2 text-white rounded-xl">Full Details</button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* pagination */}
              <div className="flex justify-center items-center gap-5 mt-10">
                <button onClick={onPrev} disabled={page === 1} className={`text-md bg-blue-500 text-white py-2 px-5 rounded-lg ${page === 1 && "cursor-not-allowed bg-slate-200 text-blue-500"}`}>
                  Prev
                </button>
                <h4 className="text-md bg-white shadow-lg text-blue-500 py-1 px-3 rounded-full">{page}</h4>
                <button onClick={onNext} disabled={allReports.length < 15} className={`text-md bg-blue-500 text-white py-2 px-5 rounded-lg ${allReports.length < 15 && "cursor-not-allowed bg-slate-200 text-blue-500"}`}>
                  Next
                </button>
              </div>
            </>
          }
        </>
      )}
    </div>
  );
};

export default ViewReports;
