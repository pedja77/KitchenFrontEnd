import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Users from "../user/Users";
import Cooks from "../cook/Cooks";
import Recipes from "../recipe/Recipes";
import Ingredients from "../ingredient/Ingredients";
import LimitingFactors from "../limiting_factor/LimitingFactors";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("tab index", currentTabIndex);
    navigate("/admin/users");
  }, []);

  const handleChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };
  
  return (
    <>
        <Typography variant="h4">Admin Dashboard</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Users"  component={NavLink} to="/admin/users"/>
          <Tab label="Cooks"  component={NavLink} to="/admin/cooks"/>
          <Tab label="Recipes" component={NavLink} to="/admin/recipes"/>
          <Tab label="Ingredients" component={NavLink} to="/admin/ingredients"/>
          <Tab label="Limiting Factors" component={NavLink} to="/admin/limiting-factors"/>
        </Tabs>
      </Box>

      {/* {currentTabIndex === 0 && <Users />}
      {currentTabIndex === 1 && <Cooks />}
      {currentTabIndex === 2 && <Recipes />}
      {currentTabIndex === 3 && <Ingredients />}
      {currentTabIndex === 4 && <LimitingFactors />} */}
     <Outlet />
    </>
  );
};

export default Dashboard;
