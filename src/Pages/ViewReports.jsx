import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";

const ViewReports = () => {
  const [allReports, SetAllReports] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    district : "",
    year : "",
    month : ""
  });
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/getCases/${filter.district}?page=${page}`
      )
      .then((res) => {
        SetAllReports(res.data);
        // console.log(res.data)
        setIsLoading(false);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // Enables smooth scrolling
        });
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  },[page,filter]);


  function handleClearFilter(){
    setFilter({...filter,
       district : "",
       year : "",
       month : ""
    })
  }
  function onNext(){
    setPage((page) => page+1)
    setIsLoading(true)
  }
  function onPrev(){
    setPage((page) => page-1)
    setIsLoading(true)
  }
  return (
    <div className="flex flex-col items-center w-screen py-10">
      <h1 className="text-xl font-bold">REPORTS</h1>
      { isLoading ? <div className="h-[30vw] flex items-center justify-center"><Spinner/></div> : <>
      {/*Filter sections */}
      <div className="py-5 flex md:gap-5 max-md:flex-col">
        <div className="flex items-center gap-4">
          <label>Select District</label>
          <select title="Select District" value={filter.district} onChange={(e) =>{ setFilter({...filter,district : e.target.value}); setPage(1)}} className="border p-2 rounded-md">
            <option value={""}>All</option>
            <option>Puducherry</option>
            <option>Karaikal</option>
            <option>Yanam</option>
            <option>Mahe</option>
            <option>Tamil nadu</option>
          </select>
        </div>
        {/* <div className="flex items-center gap-4">
          <label>Select Year</label>
          <select title="Select Year" value={filter.year} onChange={(e) => setFilter({...filter,year : e.target.value})} className="border p-2 rounded-md">
            <option value={""}>All</option>
            <option>2024</option>
          </select>
        </div>
        {/* only filter months when year is selected */}
        {/* { filter.year &&
          <div className="flex items-center gap-4">
          <label>Select Month</label>
          <select title="Select Month" value={filter.month} onChange={(e) => setFilter({...filter,month : e.target.value})} className="border p-2 rounded-md">
            <option value={""}>All</option>
            <option value={"october"}>October</option>
          </select>
        </div> } */}
        {/* filter button
        <button onClick={handleFilter} className={`text-md bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-400 duration-300`} >Filter</button>
        {(filter.district || filter.year) && <button onClick={handleClearFilter} className="shadow-xl p-2 text-red-500 rounded-full border-2">clear filter</button>} */}
      </div>
        {/*Reports */}
      <div
        className={`${
          allReports.length > 2 ? "grid grid-cols-3 gap-10" : "flex gap-10"
        } max-md:flex max-md:flex-col py-10`}
      >
        {allReports.map((cases, index) => (
          <div
            key={index}
            className="min-w-[360px] border-2 p-5 rounded-xl bg-white shadow-2xl shadow-black/50"
          >
            <table className="mb-5">
              <tr className=" items-center">
                <td className="font-semibold text-lg">Case ID </td>
                <td className="font-medium">:   {cases?.case_id}</td>
              </tr>
              <tr className=" items-center">
                <td className="font-semibold text-lg">Doctor Name </td>
                <td>:   {cases?.doctor_name}</td>
              </tr>
              <tr className=" items-center">
                <td className="font-semibold text-lg">Attacker Species </td>
                <td>:   {cases?.attacker_species || "unknown"}</td>
              </tr>
              <tr className=" items-center">
                <td className="font-semibold text-lg">Victim Species</td>
                <td>:   {cases?.victim_species || "unknown"}</td>
              </tr>
              <tr className=" items-center">
                <td className="font-semibold text-lg">Attack Date </td>
                <td>:   {cases?.attack_date}</td>
              </tr>
              <tr className=" items-center">
                <td className="font-semibold text-lg">District </td>
                <td>:   {cases?.district}</td>
              </tr>
            </table>
            <Link to={`/case/${cases?.case_id}`}>
              <button className="w-full bg-blue-500 py-2 text-white rounded-xl">
                Full Details
              </button>
            </Link>
          </div>
          
        ))}
      </div>
      <div className="flex justify-center items-center gap-5 mt-10">
        <button  onClick={onPrev} disabled={page === 1} className={`text-md bg-blue-500 text-white py-2 px-5 rounded-lg ${page === 1 && "cursor-not-allowed bg-slate-200 text-blue-500"}`}>Prev</button>
        <h4 className="text-md bg-white shadow-lg text-blue-500 py-1 px-3 rounded-full">{page}</h4>
        <button onClick={onNext} disabled={allReports.length<15} className={`text-md bg-blue-500 text-white py-2 px-5 rounded-lg ${allReports.length<15 && "cursor-not-allowed bg-slate-200 text-blue-500"}`}>Next</button>
      </div>
      </>}
      {/* pagination */}
    </div>
  );
};

export default ViewReports;
