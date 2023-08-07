import { Typography } from "@mui/material";
import TableTemplate from "../lib/TableTemplate";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";

const Ingredients = () => {
  const ing = useLoaderData();
  console.log("ing ", ing);
  const [ingredients, setIngredients] = useState(structuredClone(ing));

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
      "Contains" 
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
      "...contains" //ne znam kako da namapiram alergene u tabelu, koristim Mapu u DTO-u na javi
    ],
    removeFn: () => {},
    collectionName: "ingredients",
    editUrl: "/",
  };

  return (
    <>
      <TableTemplate props={ingredientsTableProps} />
    </>
  );
};

export default Ingredients;
