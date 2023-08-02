import { Typography } from "@mui/material"
import TableTemplate from "../lib/TableTemplate";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/token";

const Ingredients = () => {

    const [ing] = useLoaderData();
    console.log("ing ", ing);
    const [ingredients, setIngredients] = useState(structuredClone(ing));
    // useEffect(() => {
    //     let ignore = false;
    //     const getData = async () => {
    //       const response = await fetch(
    //         `http://localhost:8080/api/v1/project/ingredient/allIngredients`,
    //         {
    //           method: "GET",
    //           headers: {
    //             Authorization: getToken(),
    //           },
    //         }
    //       );
    //       if (!ignore) {
    //         const s = await response.json();
    //         // dispatch({
    //         //   type: "subjects_changed",
    //         //   sub: s,
    //         // });
    //         setIngredients(s);
    //       }
    //     };
    //     getData();
    //     return () => (ignore = true);
    //   }, []);

    const ingredientsTableProps = {
        tableLabel: "Ingredients",
        tableHeaders: ["Name", "Unit", "Calories(kcal)", "Carbohydrates", "Sugars", "Fats", "Saturated fats", "Proteins"],
        tableData: ingredients,
        tdConfig: ["name", "unit", "calories", "carbs", "sugars", "fats", "saturatedFats", "proteins"],
        removeFn: () => {},
        collectionName: "ingredients",
        editUrl: "/",
      };

    return (
        <>
        <Typography>Ingredients list</Typography>
        <TableTemplate props={ingredientsTableProps} />
        {/* {ingredients.map(e => <Typography>{e.name}</Typography>)} */}
        </>
)}

export default Ingredients;