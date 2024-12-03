import React, { useEffect, useState } from "react";
import {
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
} from "recharts";
import CaseCount from "../Components/Home/CaseCount";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BarGraph from "../Components/Home/BarGraph";
import axios from "axios";
import ViewCase from "./ViewCase";
import CaseDetails from "../Components/CaseDetails";
import Spinner from "../Components/Spinner";
import { BarLoader } from "react-spinners";
import { rabitrackLogo } from "../assets";

const HomePage = () => {
  const datas = [
    {
      Month: "Jan",
      cases: 10,
    },
    {
      Month: "Feb",
      cases: 10,
    },
    {
      Month: "Mar",
      cases: 10,
    },
    {
      Month: "Apr",
      cases: 10,
    },
    {
      Month: "May",
      cases: 10,
    },
    {
      Month: "Jun",
      cases: 10,
    },
    {
      Month: "Jul",
      cases: 10,
    },
    {
      Month: "Aug",
      cases: 10,
    },
    {
      Month: "Sep",
      cases: 10,
    },
    {
      Month: "Oct",
      cases: 10,
    },
    {
      Month: "Nov",
      cases: 10,
    },
    {
      Month: "Dec",
      cases: 10,
    },
  ];

  function onLogout() {
    setPageLoading(true);
    setWelcomeMessage("Logging out");
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/logout`)
      .then((res) => {
        if (res.data.success) navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();
  const [caseID, setCaseID] = useState("");
  const [inputCaseID, setInputCaseID] = useState("");
  const [caseCount, setcaseCount] = useState([]);
  const [isPageLoading, setPageLoading] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Welcome to Rabitrack Dashboard"
  );

  useEffect(() => {
    //just to check if user is Authorized or else return to login page
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/getCaseCount`)
      .then((res) => {
        setcaseCount(res.data || []);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setWelcomeMessage("Something went wrong, Please reload this page!")
        if (err.response.status === 401) navigate("/login");
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-screen">
      {isPageLoading ? (
        <div className="flex flex-1 flex-col gap-5 items-center justify-center w-screen">
          <img src={rabitrackLogo} alt="logo" className="w-12" />
          <h1 className={`text-lg md:text-2xl text-center ${welcomeMessage.charAt(0) === 'S' && "text-red-500 md:text-lg"}`}>{welcomeMessage}</h1>
          {welcomeMessage.charAt(0) === 'S' || <BarLoader color="#2f8afd" />}
        </div>
      ) : (
        <>
          <div className="flex items-start w-screen">
            <button
              onClick={onLogout}
              className="py-1 px-4 bg-red-500 hover:bg-red-400 duration-300 rounded-full max-h-fit text-white translate-x-4 translate-y-4"
            >
              Logout
            </button>
          </div>
          <div className="flex w-screen max-md:flex-col max-md:py-10">
            <div className="md:min-w-[40%] h-full  flex justify-center items-center">
              <CaseCount caseCount={caseCount} />
            </div>
            <div className="md:min-w-[60%] flex flex-col justify-center items-center">
              <div className="w-full flex flex-col shadow-xl drop-shadow-2xl shadow-blue-300 items-center justify-center bg-white  border-2 rounded-2xl scale-75">
                <BarGraph />
                <h1 className="font-bold text-xl pb-2">
                  No of Cases each Months
                </h1>
              </div>
              <div className="flex gap-5">
                <Link to="/reports">
                  <button className="bg-blue-500 px-5 py-2 rounded-xl text-white">
                    View Reports
                  </button>
                </Link>
                <Link to="/map">
                  <button className="bg-blue-500 px-5 py-2 rounded-xl text-white">
                    View Map
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* search case by ID */}
          <div className="flex flex-col justify-center items-center md:min-w-[50vw] min-w-[90vw] max-md:max-w-[80vw] mt-24 mb-16 gap-4 bg-blue-100/30 shadow-lg md:p-10 p-4 rounded-xl border-2">
            <h1 className="text-lg">Get a particular case details</h1>
            <div className="flex w-full flex-col md:flex-row gap-5 justify-center items-center">
              <input
                placeholder="Enter a case ID"
                type="text"
                onKeyDown={(e) => e.key === "Enter" && setCaseID(inputCaseID)}
                onChange={(e) => setInputCaseID(e.target.value)}
                className="w-full md:w-[450px] rounded-md border-2 border-black/30 py-1 px-2"
              />
              <button
                className="px-6 py-1 text-lg bg-blue-500 text-white rounded-full"
                onClick={() => setCaseID(inputCaseID)}
              >
                search
              </button>
            </div>
            {caseID && <CaseDetails id={caseID} />}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
