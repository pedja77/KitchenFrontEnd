import { Typography } from "@mui/material"
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const LimitingFactors = () => {
    const factorsList = useLoaderData();
    const [factors, setFactors] = useState(structuredClone(factorsList));
    return <>
        {JSON.stringify(factors, null, 4)}
    </>
}

export default LimitingFactors;