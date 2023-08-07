import { Typography } from "@mui/material"
import { useLoaderData } from "react-router-dom";

    

const Recipes = () => {

    const recipesList = useLoaderData();

    console.log("recipes component recipesList", recipesList);
    return <Typography>{<pre>{JSON.stringify(recipesList, null, 4)}</pre>}</Typography>
}

export default Recipes;