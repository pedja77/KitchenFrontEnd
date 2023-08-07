import { Box, Container, Grid, Typography } from "@mui/material"
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import RecipeCard from "../lib/RecipeCard";

const Home = () => {
    const recipes = useLoaderData();
    const [recipesList, setRecipes] = useState(structuredClone(recipes));
   
   
   
   
   
   
    return (
    <>
    {/* <Typography sx={{textAlign:"center", paddingTop:"3px"}}>Welcome to Hell's Kitchen!!</Typography> */}
    <Container sx={{backgroundColor: "#bf360c"}}>
    <Grid container spacing={3}>
        {recipesList.map((r) => (
          <RecipeCard props={r}  />
        ))}
      </Grid>
    </Container>
    </>
    )     
}

export default Home;