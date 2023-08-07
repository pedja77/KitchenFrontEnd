<<<<<<< HEAD
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Outlet, useFetcher, useLoaderData, useLocation, useNavigate, useNavigation } from "react-router-dom";
import TableTemplate from "../lib/TableTemplate";

const Users = () => {
    const usersList = useLoaderData();
    const [users, setUsers] = useState(structuredClone(usersList));
    const location = useLocation();
    const fetcher = useFetcher();
    const nav = useNavigate();

    useEffect(() => {
        if (fetcher.data) {
          nav("/admin/users");
        }
      }, [fetcher.data]);

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
      };

    return (
        <Box>
            {location.pathname === "/admin/users" && <TableTemplate props = {usersTableProps} />}
            <Outlet />
        </Box>
    )
=======
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


    
>>>>>>> main
}

export default Users;