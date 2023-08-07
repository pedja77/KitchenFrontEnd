import { Box, Typography } from "@mui/material"
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
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
      };

    return (
        <Box>
            {location.pathname === "/admin/cooks" && <TableTemplate props = {cooksTableProps} />}
            <Outlet />
        </Box>
    )
}

export default Cooks;