import { useState } from "react";

const LimitingFactorsList = ({props}) => {

    const [factors, setFactors] = useState(structuredClone(props.limitingFactors));

    return null; 
}

export default LimitingFactorsList;