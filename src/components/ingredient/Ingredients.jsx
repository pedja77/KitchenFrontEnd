import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import TableTemplate from "../lib/TableTemplate";
import {
  NavLink,
  Outlet,
  useFetcher,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";

const Ingredients = () => {
  const ing = useLoaderData();
  const fetcher = useFetcher();
  console.log("ing ", ing);
  const [ingredients, setIngredients] = useState(structuredClone(ing));
  const [newIngredient, setNewIngredient] = useState(null);
  const location = useLocation();

  const addIngredient = (ing) => {};

  const ingredientsTableProps = {
    tableLabel: "Ingredients",
    tableHeaders: [
      "Id",
      "Name",
      "Unit",
      "Calories(kcal)",
      "Carbohydrates",
      "Sugars",
      "Fats",
      "Saturated fats",
      "Proteins",
    ],
    tableData: ingredients,
    tdConfig: [
      "id",
      "name",
      "unit",
      "calories",
      "carbs",
      "sugars",
      "fats",
      "saturatedFats",
      "proteins",
    ],
    removeFn: () => {},
    collectionName: "ingredients",
    editUrl: "/admin/ingredients",
    editBtn: true,
  };

  return (
    <Box>
      {location.pathname === "/admin/ingredients" && (
        <Stack spacing={2} marginBottom={2}>
          <Button component={NavLink} to="/admin/ingredients/new">
            Add Ingredient
          </Button>

          <TableTemplate props={ingredientsTableProps} />
        </Stack>
      )}
      <Outlet />
    </Box>
  );
};

export default Ingredients;
