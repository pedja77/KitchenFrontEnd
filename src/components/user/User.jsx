import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserEditForm from "../lib/UserEditForm";

const User = ({ props }) => {
  const nav = useNavigate();
  const [userData, factors] = useLoaderData();
  const [user, setUser] = useState(structuredClone(userData));
  console.log("User props", props);

  const addItemProps = {
    itemName: "Limiting factor",
    newItemName: "newItem",
    // newItem: state.newFactor,
    // options: state.factors,
    collection: "myLimitigFactors",
    forFilterOptions: "myLimitigFactors",
    labelOptions: ["limitingFactor"],
    // handleSetNewOption,
    // handleAddNewItem,
  };

  return (
    <Box sx={{minWidth: '100vh', width: '100%'}}>
      <Button onClick={() => nav("/admin/users")}>&lt;&lt; BACK</Button>
      <Box>
        <UserEditForm  props={{addItemProps, user, factors}}/>
      </Box>
    </Box>
  );
};

export default User;
