import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import TableTemplate from "../lib/TableTemplate";
import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";

const Ingredients = () => {
  const ing = useLoaderData();
  const fetcher = useFetcher();
  console.log("ing ", ing);
  const [ingredients, setIngredients] = useState(structuredClone(ing));
  const [newIngredient, setNewIngredient] = useState(null);

  const addIngredient = (ing) => {
    

  }

  const ingredientsTableProps = {
    tableLabel: "Ingredients",
    tableHeaders: [
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
    editUrl: "/",
  };

  return (
    <Box>
      <Stack
        direction={"row"}
        spacing={2}
        marginBottom={2}
      >
        <TextField
          id="outlined-basic"
          label="New Ingredient"
          variant="outlined"
          value={newIngredient}
        />
        <Button onClick={addIngredient}>Add Ingredient</Button>
      </Stack>
      <TableTemplate props={ingredientsTableProps} />
    </Box>
  );
};

export default Ingredients;
