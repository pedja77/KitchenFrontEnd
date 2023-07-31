import { Typography } from "@mui/material"
import TableTemplate from "../lib/TableTemplate";


const ingredientsTableProps = {
    tableLabel: "Ingredients",
    tableHeaders: ["Name", "Unit", "Calories(kcal)", "Carbohydrates", "Sugars", "Fats", "Saturated fats", "Proteins"],
    tableData: null,
    tdConfig: ["id", "firstName", "lastName"],
    removeFn: undefined,
    collectionName: "undefined",
    editUrl: "/",
  };
const Ingredients = () => {
    return (
        <>
        <Typography>Ingredients list</Typography>
        <TableTemplate props={ingredientsTableProps} />
        </>
)}

export default Ingredients;