import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UserEditForm from "../lib/UserEditForm";

const User = ({ props }) => {
  const nav = useNavigate();
  const userData = useLoaderData();
  const [user, setUser] = useState(structuredClone(userData));
  console.log("User props", props);
  return (
    <Box sx={{minWidth: '100vh', width: '100%'}}>
      <Button onClick={() => nav("/admin/users")}>&lt;&lt; BACK</Button>
      <Box>
        <UserEditForm sx={{width: '1000px'}}/>
      </Box>
    </Box>
  );
};

export default User;
