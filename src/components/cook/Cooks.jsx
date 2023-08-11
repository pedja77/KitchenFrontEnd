import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import TableTemplate from "../lib/TableTemplate";
import { useState } from "react";

const Cooks = () => {
  const cooks = useLoaderData();
  const [cooksList, setCooksList] = useState(structuredClone(cooks));
  const location = useLocation();

  // Ne prikazujemo recepte u tabeli, videce se kad se klikne na edit
  const cooksTableProps = {
    tableLabel: "Cooks",
    tableHeaders: ["Id", "First name", "Last name", "Email", "Username"],
    tableData: cooksList,
    tdConfig: ["id", "firstName", "lastName", "email", "username"],
    removeFn: () => {},
    collectionName: "cooksList",
    editUrl: "/admin/cooks",
    editBtn: true,
  };

  return (
    <Stack sx={{ width: "90vw", margin: "auto" }}>
      
      {location.pathname === "/admin/cooks" && (
        <Stack>
        <Button component={NavLink} to="/admin/cooks/new">Add Cook</Button>
        <TableTemplate props={cooksTableProps} />
      </Stack>
      )}
      <Outlet />
    </Stack>
  );
};

export default Cooks;
