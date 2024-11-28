import React from "react";
import { useParams } from "react-router-dom";
import CaseDetails from "../Components/CaseDetails";

const ViewCase = () => {
  const { id } = useParams();

  return (
    <CaseDetails id={id}/>
  );
};

export default ViewCase;
