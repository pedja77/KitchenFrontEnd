import { Typography } from "@mui/material"
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import TableTemplate from "../lib/TableTemplate";
import { useState } from "react";

const Users = () => {
    const users = useLoaderData();
    const [usersList, setUsersList] = useState(structuredClone(users));
    const location = useLocation();


    const usersTableProps = {
        tableLabel: "Users",
        tableHeaders: ["Id", "First Name", "Last Name", "Email", "Username"],
        tableData: usersList,
        tdConfig: ["id", "firstName", "lastName", "email", "username"],
        removeFn: () => {},
        collectionName: "usersList",
        editUrl: "/admin/users"
    };

    return (
        <>
        {location.pathname === "/admin/users" && <TableTemplate props = {usersTableProps} />}
        <Outlet />
        </>
    )


    
}

export default Users;