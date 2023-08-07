import { Typography } from "@mui/material"
import { useLoaderData } from "react-router-dom";

    

const Recipes = () => {

    const recipesList = useLoaderData();

    console.log("recipes component recipesList", recipesList);
    return <pre><Typography>{JSON.stringify(recipesList, null, 4)}</Typography></pre>
}

export default Recipes;