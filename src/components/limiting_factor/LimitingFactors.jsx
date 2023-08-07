import { Typography } from "@mui/material"
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import  TableTemplate  from "../lib/TableTemplate";

const LimitingFactors = () => {
    const factorsList = useLoaderData();
    const [factors, setFactors] = useState(structuredClone(factorsList));

    const limitingFactorTableProps = {
        tableLabel: "Limiting Factors",
        tableHeaders: [
          "id",
          "name",
        ],
        tableData: factors,
        tdConfig: [
          "id",
          "name",
        ],
        removeFn: () => {},
        collectionName: "factors",
        editUrl: "/",
      };
    
      return (
        <>
          <TableTemplate props={limitingFactorTableProps} />
        </>
      );



}

export default LimitingFactors;