import React from "react";
import { Link } from "react-router-dom";
import { GovtLogo, RiverLogo } from "../assets";

const Header = () => {
  return (
    <div className="flex w-screen justify-between  items-center  py-4 md:px-10 px-4 bg-slate-200 select-none">
      <div className="max-md:max-w-10">
        <img src={GovtLogo} alt="" className="max-h-[100px]" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <Link to={"/"}>
          <h1 className="text-3xl max-md:text-xl font-bold">RABI-TRACK</h1>
        </Link>
        <h1 className="max-md:text-xs text-center">
          Initiative by{" "}
          <a
            href="https://www.river.edu.in/"
            target="_blank"
            className="max-md:hidden font-semibold"
          >
            Rajiv Gandhi Institute of Veterinary Education and Research
            (RIVER-CVA) Rabies Diagnostic Laboratory,
          </a>
          <a
            href="https://www.river.edu.in/"
            target="_blank"
            className="md:hidden"
          >
            RIVER Rabies Diagnostic Laboratory,
          </a>
          <h2>Department of Veterinary Public Health and Epidemiology</h2>
        </h1>
      </div>
      <div className="max-md:max-w-[55px]">
        <img src={RiverLogo} alt="" className="max-h-[100px]" />
      </div>
    </div>
  );
};

export default Header;
