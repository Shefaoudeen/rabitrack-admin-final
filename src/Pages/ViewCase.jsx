import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CaseDetails from "../Components/CaseDetails";
import { IoArrowBackCircleOutline  } from "react-icons/io5";

const ViewCase = () => {
  const { id } = useParams();

  return (
    <>
      <div className="absolute md:left-10 md:top-10 hover:scale-110 z-[100] duration-300">
        <Link to={"/reports"} className="bg-slate-300 rounded-full" title="go back">
          <IoArrowBackCircleOutline  size={40} color="#3B82F6"/>
        </Link>
      </div>
      <CaseDetails id={id} />
    </>
  );
};

export default ViewCase;
