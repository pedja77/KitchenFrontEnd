import { Typography } from "@mui/material"
import { useLoaderData } from "react-router-dom";

    

const Recipes = () => {

    const recipesList = useLoaderData();

    console.log("recipes component recipesList", recipesList);
    return <Typography>Recipes list</Typography>
}

export default Recipes;