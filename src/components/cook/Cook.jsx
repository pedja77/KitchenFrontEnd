/**
 * TODO:
 * 1. Prikazati podatke o kuvaru u formi
 * 2. Ako je nesto menjano, prilikom submita pisati u bazu i vratiti se 
 *    na cooks tab tako da se okine loader
 */


import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const Cook = ({ props }) => {
    const nav = useNavigate();
    const cookData = useLoaderData();
    const [cook, setCook] = useState(structuredClone(cookData));
    console.log("Cook props", props);
  return (
    <>
        <Button onClick = {() => nav(-1)}>BACK</Button>
      <Typography>Cook data</Typography>
      {JSON.stringify(cook, null, 4)}
    </>
  );
};

export default Cook;
