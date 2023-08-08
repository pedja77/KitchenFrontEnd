/**
 * TODO:
 * 1. Prikazati podatke o kuvaru u formi
 * 2. Ako je nesto menjano, prilikom submita pisati u bazu i vratiti se
 *    na cooks tab tako da se okine loader
 */

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserEditForm from "../lib/UserEditForm";

const Cook = ({ props }) => {
  const nav = useNavigate();
  const [userData, facts] = useLoaderData();
  const [user, setUser] = useState(structuredClone(userData));
  console.log("User props", props);

  const factors = [];

  const addItemProps = {
    itemName: "Recipe",
    newItemName: "newItem",
    // newItem: state.newFactor,
    // options: state.factors,
    collection: "recipes",
    forFilterOptions: "myLimitigFactors",
    labelOptions: ["limitingFactor"],
    // handleSetNewOption,
    // handleAddNewItem,
  };
  return (
    <Box sx={{ minWidth: "100vh", width: "100%" }}>
      <Button onClick={() => nav("/admin/cooks")}>&lt;&lt; BACK</Button>
      <Box>
        <UserEditForm sx={{ width: "1000px" }} props={{addItemProps, user, factors}}/>
      </Box>
    </Box>
  );
};

export default Cook;
