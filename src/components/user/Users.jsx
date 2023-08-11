import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Outlet, useFetcher, useLoaderData, useLocation, useNavigate, useNavigation } from "react-router-dom";
import TableTemplate from "../lib/TableTemplate";
import { getToken } from "../../utils/token";

const Users = () => {
    const usersList = useLoaderData();
    const [users, setUsers] = useState(structuredClone(usersList));
    const location = useLocation();
    const fetcher = useFetcher();
    const nav = useNavigate();

    const handleRemoveItem = (e, item, collection) => {
        fetcher.submit(
          {},
          {
            method: "delete",
            action: `/admin/users/${item.id}`,
          }
        );
        nav("/admin/users");
      };

    // Ne prikazujemo recepte u tabeli, videce se kad se klikne na edit
    const usersTableProps = {
        tableLabel: "Users",
        tableHeaders: ["Id", "First name", "Last name", "Email", "Username"],
        tableData: users,
        tdConfig: ["id", "firstName", "lastName", "email", "username"],
        removeFn: handleRemoveItem,
        collectionName: "users",
        editUrl: "/admin/users",
        editBtn: true,
      };

    return (
        <Box sx = {{width: "90vw", margin: "auto"}}>
            {location.pathname === "/admin/users" && <TableTemplate props = {usersTableProps} />}
            <Outlet />
        </Box>
    )
}

export default Users;