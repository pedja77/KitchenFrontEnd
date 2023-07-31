import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Users from "../user/Users";
import Cooks from "../cook/Cooks";
import Recipes from "../recipe/Recipes";
import Ingredients from "../ingredient/Ingredients";
import LimitingFactors from "../limiting_factor/LimitingFactors";

const Dashboard = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

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
          <Tab label="Users"  />
          <Tab label="Cooks"  />
          <Tab label="Recipes" />
          <Tab label="Ingredients" />
          <Tab label="Limiting Factors" />
        </Tabs>
      </Box>

      {currentTabIndex === 0 && <Users />}
      {currentTabIndex === 1 && <Cooks />}
      {currentTabIndex === 2 && <Recipes />}
      {currentTabIndex === 3 && <Ingredients />}
      {currentTabIndex === 4 && <LimitingFactors />}
     
    </>
  );
};

export default Dashboard;
